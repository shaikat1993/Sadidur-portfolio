/**
 * Project Storage Service
 * Manages selected repositories and their analysis data
 */

import { STORAGE_CONFIG } from '../config/github.config';
import { Project } from '../models/Project';

class ProjectStorageService {
  constructor() {
    this.storageKey = STORAGE_CONFIG.selectedReposKey;
    this.analysisKey = STORAGE_CONFIG.analysisDataKey;
  }

  /**
   * Save selected repositories with their analysis
   * @param {Array} selectedReposWithAnalysis - Array of { repo, analysis }
   */
  saveSelectedRepos(selectedReposWithAnalysis) {
    try {
      const data = {
        selections: selectedReposWithAnalysis,
        lastUpdated: new Date().toISOString(),
        version: '1.0'
      };

      localStorage.setItem(this.storageKey, JSON.stringify(data));
      console.log(`💾 Saved ${selectedReposWithAnalysis.length} selected repositories`);

      return true;
    } catch (error) {
      console.error('Failed to save selected repos:', error);
      return false;
    }
  }

  /**
   * Load selected repositories with their analysis
   * @returns {Array} Array of { repo, analysis }
   */
  loadSelectedRepos() {
    try {
      const data = localStorage.getItem(this.storageKey);

      if (!data) {
        console.log('📭 No saved repositories found');
        return [];
      }

      const parsed = JSON.parse(data);

      if (!parsed.selections || !Array.isArray(parsed.selections)) {
        console.warn('Invalid data structure in storage');
        return [];
      }

      console.log(`📂 Loaded ${parsed.selections.length} selected repositories`);
      return parsed.selections;

    } catch (error) {
      console.error('Failed to load selected repos:', error);
      return [];
    }
  }

  /**
   * Transform selected repos to categorized projects
   * @param {Array} selectedReposWithAnalysis - Array of { repo, analysis }
   * @returns {Object} Projects grouped by category
   */
  transformToProjects(selectedReposWithAnalysis) {
    const categorized = {};

    selectedReposWithAnalysis.forEach(({ analysis }) => {
      if (!analysis || !analysis.category) {
        console.warn('Skipping repo with invalid analysis');
        return;
      }

      // Create Project instance from analysis
      const project = Project.fromGitHubAnalysis(analysis);

      // Validate project
      const validation = project.validate();
      if (!validation.valid) {
        console.warn(`Invalid project ${project.name}:`, validation.errors);
        return;
      }

      // Initialize category array if needed
      if (!categorized[analysis.category]) {
        categorized[analysis.category] = [];
      }

      // Add to category
      categorized[analysis.category].push(project.toJSON());
    });

    return categorized;
  }

  /**
   * Get all projects grouped by category
   * @returns {Object} Projects grouped by category
   */
  getGroupedProjects() {
    const selections = this.loadSelectedRepos();
    return this.transformToProjects(selections);
  }

  /**
   * Check if a repository is selected
   * @param {string} repoName - Repository name
   * @returns {boolean}
   */
  isRepoSelected(repoName) {
    const selections = this.loadSelectedRepos();
    return selections.some(item => item.repo?.name === repoName);
  }

  /**
   * Get analysis for a specific repo
   * @param {string} repoName - Repository name
   * @returns {Object|null} Analysis object or null
   */
  getRepoAnalysis(repoName) {
    const selections = this.loadSelectedRepos();
    const found = selections.find(item => item.repo?.name === repoName);
    return found?.analysis || null;
  }

  /**
   * Clear all selections
   */
  clearSelections() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log('🗑️ Cleared all selected repositories');
      return true;
    } catch (error) {
      console.error('Failed to clear selections:', error);
      return false;
    }
  }

  /**
   * Get storage info
   * @returns {Object} Storage information
   */
  getStorageInfo() {
    try {
      const data = localStorage.getItem(this.storageKey);

      if (!data) {
        return {
          hasData: false,
          count: 0,
          lastUpdated: null,
          sizeKB: 0
        };
      }

      const parsed = JSON.parse(data);
      const sizeKB = Math.round((data.length * 2) / 1024); // Rough estimate

      return {
        hasData: true,
        count: parsed.selections?.length || 0,
        lastUpdated: parsed.lastUpdated,
        sizeKB,
        version: parsed.version
      };

    } catch (error) {
      console.error('Failed to get storage info:', error);
      return {
        hasData: false,
        count: 0,
        lastUpdated: null,
        sizeKB: 0,
        error: error.message
      };
    }
  }

  /**
   * Export selections as JSON (for backup)
   * @returns {string} JSON string
   */
  exportSelections() {
    const data = localStorage.getItem(this.storageKey);
    return data || '{}';
  }

  /**
   * Import selections from JSON (for restore)
   * @param {string} jsonData - JSON string
   * @returns {boolean} Success status
   */
  importSelections(jsonData) {
    try {
      // Validate JSON
      const parsed = JSON.parse(jsonData);

      if (!parsed.selections || !Array.isArray(parsed.selections)) {
        throw new Error('Invalid data structure');
      }

      // Save to storage
      localStorage.setItem(this.storageKey, jsonData);
      console.log('✅ Successfully imported selections');

      return true;
    } catch (error) {
      console.error('Failed to import selections:', error);
      return false;
    }
  }
}

export default new ProjectStorageService();
