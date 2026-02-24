/**
 * Admin Panel Component
 * Interface for selecting GitHub repositories to display in portfolio
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaStar, FaCheck, FaTimes, FaSpinner, FaCodeBranch } from 'react-icons/fa';
import githubService from '../../services/githubService';
import projectAnalyzer from '../../services/projectAnalyzer';
import projectStorageService from '../../services/projectStorageService';
import { CATEGORY_METADATA } from '../../config/categories.config';

const AdminPanel = ({ onClose, onSave }) => {
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState(new Map()); // Map<repoName, { repo, analysis }>
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [analyzingRepo, setAnalyzingRepo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'selected', 'unselected'

  useEffect(() => {
    loadRepos();
  }, []);

  const loadRepos = async () => {
    setLoading(true);
    try {
      console.log('🔄 Loading repositories...');
      const allRepos = await githubService.fetchAllRepositories();
      setRepos(allRepos);

      // Load previously selected repos
      const saved = projectStorageService.loadSelectedRepos();
      const savedMap = new Map();
      saved.forEach(item => {
        if (item.repo && item.analysis) {
          savedMap.set(item.repo.name, item);
        }
      });
      setSelectedRepos(savedMap);

      console.log(`✅ Loaded ${allRepos.length} repositories, ${savedMap.size} selected`);
    } catch (error) {
      console.error('Failed to load repos:', error);
      alert('Failed to load repositories. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const toggleRepo = async (repo) => {
    const newSelected = new Map(selectedRepos);

    if (newSelected.has(repo.name)) {
      // Deselect
      newSelected.delete(repo.name);
      setSelectedRepos(newSelected);
    } else {
      // Select - analyze first
      setAnalyzingRepo(repo.name);

      try {
        const analysis = await projectAnalyzer.analyze(repo);
        newSelected.set(repo.name, { repo, analysis });
        setSelectedRepos(newSelected);
      } catch (error) {
        console.error(`Failed to analyze ${repo.name}:`, error);
        alert(`Failed to analyze ${repo.name}. Please try again.`);
      } finally {
        setAnalyzingRepo(null);
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // Convert Map to Array
      const selectionsArray = Array.from(selectedRepos.values());

      // Save to storage
      const success = projectStorageService.saveSelectedRepos(selectionsArray);

      if (success) {
        console.log('✅ Saved selections');
        if (onSave) onSave();
        if (onClose) onClose();
      } else {
        alert('Failed to save selections. Please try again.');
      }
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save selections. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSelectAll = async () => {
    const filteredRepos = getFilteredRepos();

    if (filteredRepos.length === 0) return;

    const confirmMsg = `This will analyze and select ${filteredRepos.length} repositories. This may take a while. Continue?`;
    if (!window.confirm(confirmMsg)) return;

    setAnalyzingRepo('batch');

    const newSelected = new Map(selectedRepos);

    for (const repo of filteredRepos) {
      if (!newSelected.has(repo.name)) {
        try {
          const analysis = await projectAnalyzer.analyze(repo);
          newSelected.set(repo.name, { repo, analysis });
        } catch (error) {
          console.error(`Failed to analyze ${repo.name}:`, error);
        }
      }
    }

    setSelectedRepos(newSelected);
    setAnalyzingRepo(null);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all selections?')) {
      setSelectedRepos(new Map());
    }
  };

  const getFilteredRepos = () => {
    let filtered = repos;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(repo =>
        repo.name.toLowerCase().includes(query) ||
        (repo.description && repo.description.toLowerCase().includes(query))
      );
    }

    // Apply selection filter
    if (filter === 'selected') {
      filtered = filtered.filter(repo => selectedRepos.has(repo.name));
    } else if (filter === 'unselected') {
      filtered = filtered.filter(repo => !selectedRepos.has(repo.name));
    }

    return filtered;
  };

  const filteredRepos = getFilteredRepos();

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-[var(--bg-paper)] p-8 rounded-2xl border border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <FaSpinner className="animate-spin text-[var(--text-accent)] text-2xl" />
            <p className="text-[var(--text-primary)] text-lg">Loading repositories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[var(--bg-paper)] rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-[var(--border-color)] shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
              Select GitHub Repositories
            </h2>
            <p className="text-[var(--text-secondary)]">
              Choose repositories to display in your portfolio • {selectedRepos.size} selected
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--text-accent)]"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-accent)]"
          >
            <option value="all">All Repos ({repos.length})</option>
            <option value="selected">Selected ({selectedRepos.size})</option>
            <option value="unselected">Unselected ({repos.length - selectedRepos.size})</option>
          </select>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleSelectAll}
            disabled={analyzingRepo === 'batch'}
            className="px-4 py-2 rounded-lg bg-[var(--text-accent)]/10 text-[var(--text-accent)] hover:bg-[var(--text-accent)]/20 transition-colors text-sm disabled:opacity-50"
          >
            Select All Filtered
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-sm"
          >
            Clear All
          </button>
        </div>

        {/* Repository List */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-3 pr-2">
          <AnimatePresence>
            {filteredRepos.map(repo => {
              const isSelected = selectedRepos.has(repo.name);
              const isAnalyzing = analyzingRepo === repo.name || analyzingRepo === 'batch';
              const analysis = selectedRepos.get(repo.name)?.analysis;

              return (
                <RepoItem
                  key={repo.id}
                  repo={repo}
                  isSelected={isSelected}
                  isAnalyzing={isAnalyzing}
                  analysis={analysis}
                  onToggle={() => toggleRepo(repo)}
                />
              );
            })}
          </AnimatePresence>

          {filteredRepos.length === 0 && (
            <div className="text-center py-12 text-[var(--text-secondary)]">
              No repositories found matching your filters.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-[var(--border-color)]">
          <div className="text-[var(--text-secondary)] text-sm">
            {selectedRepos.size} repositories selected
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || analyzingRepo}
              className="px-6 py-2 rounded-lg bg-[var(--text-accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <FaSpinner className="animate-spin" />}
              {saving ? 'Saving...' : 'Save Selection'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Individual Repository Item
 */
const RepoItem = ({ repo, isSelected, isAnalyzing, analysis, onToggle }) => {
  const categoryMeta = analysis ? CATEGORY_METADATA[analysis.category] : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.01 }}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'border-[var(--text-accent)] bg-[var(--text-accent)]/5'
          : 'border-[var(--border-color)] bg-[var(--bg-tertiary)]/50 hover:border-[var(--text-accent)]/50'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <div
          className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
            isSelected
              ? 'border-[var(--text-accent)] bg-[var(--text-accent)]'
              : 'border-[var(--text-secondary)]'
          }`}
        >
          {isAnalyzing ? (
            <FaSpinner className="animate-spin text-white text-xs" />
          ) : isSelected ? (
            <FaCheck className="text-white text-xs" />
          ) : null}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-center gap-2 mb-2">
            <FaGithub className="text-[var(--text-accent)] flex-shrink-0" />
            <h3 className="font-bold text-[var(--text-primary)] truncate">
              {repo.name}
            </h3>
            {repo.fork && (
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Forked
              </span>
            )}
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
                <FaStar className="text-yellow-500 text-xs" />
                <span>{repo.stargazers_count}</span>
              </div>
            )}
            {repo.forks_count > 0 && (
              <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
                <FaCodeBranch className="text-xs" />
                <span>{repo.forks_count}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">
            {repo.description || 'No description provided'}
          </p>

          {/* Analysis Info */}
          {analysis && (
            <div className="space-y-2">
              {/* Category */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs px-2 py-1 rounded bg-gradient-to-r ${categoryMeta?.gradient} text-white font-medium`}
                >
                  {analysis.category}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  {analysis.confidence}% confidence
                </span>
              </div>

              {/* Project Type */}
              {analysis.projectType && analysis.projectType.length > 0 && (
                <div className="text-xs text-[var(--text-secondary)]">
                  <strong>Type:</strong> {analysis.projectType[0]}
                </div>
              )}

              {/* Frameworks */}
              {analysis.frameworks && analysis.frameworks.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {analysis.frameworks.slice(0, 5).map(fw => (
                    <span
                      key={fw}
                      className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              )}

              {/* Features */}
              {analysis.features && analysis.features.length > 0 && (
                <div className="text-xs text-[var(--text-secondary)]">
                  ⚡ {analysis.features.slice(0, 3).join(' • ')}
                </div>
              )}
            </div>
          )}

          {/* Basic Info (when not analyzed yet) */}
          {!analysis && (
            <div className="flex items-center gap-2 flex-wrap">
              {repo.language && (
                <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400">
                  {repo.language}
                </span>
              )}
              {repo.topics?.slice(0, 3).map(topic => (
                <span
                  key={topic}
                  className="text-xs px-2 py-1 rounded bg-[var(--bg-paper)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPanel;
