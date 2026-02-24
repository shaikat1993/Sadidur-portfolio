/**
 * useProjects Hook
 * Custom hook for managing and fetching project data
 */

import { useState, useEffect, useCallback } from 'react';
import projectStorageService from '../services/projectStorageService';
import { projects as staticProjects } from '../constants';
import { PROJECT_CATEGORIES } from '../config/categories.config';

export const useProjects = () => {
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load and merge projects
   */
  const loadProjects = useCallback(() => {
    setLoading(true);
    setError(null);

    try {
      console.log('📚 Loading projects...');

      // Load GitHub projects from storage
      const githubProjects = projectStorageService.getGroupedProjects();

      // Merge with static projects
      const merged = mergeProjects(staticProjects, githubProjects);

      setProjects(merged);
      console.log('✅ Projects loaded successfully');

    } catch (err) {
      console.error('❌ Failed to load projects:', err);
      setError(err.message);
      // Fallback to static projects only
      setProjects(staticProjects);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Refresh projects (call after updating selections)
   */
  const refresh = useCallback(() => {
    console.log('🔄 Refreshing projects...');
    loadProjects();
  }, [loadProjects]);

  /**
   * Get project count by category
   */
  const getProjectCount = useCallback((category) => {
    return projects[category]?.length || 0;
  }, [projects]);

  /**
   * Get total project count
   */
  const getTotalCount = useCallback(() => {
    return Object.values(projects).reduce((sum, categoryProjects) => {
      return sum + (categoryProjects?.length || 0);
    }, 0);
  }, [projects]);

  /**
   * Get categories with projects
   */
  const getActiveCategories = useCallback(() => {
    return Object.keys(projects).filter(category => {
      return projects[category] && projects[category].length > 0;
    });
  }, [projects]);

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    loading,
    error,
    refresh,
    getProjectCount,
    getTotalCount,
    getActiveCategories
  };
};

/**
 * Merge static and GitHub projects
 * @param {Object} staticProjects - Manually defined projects
 * @param {Object} githubProjects - Projects from GitHub
 * @returns {Object} Merged projects by category
 */
function mergeProjects(staticProjects, githubProjects) {
  const merged = {};

  // Get all possible categories
  const allCategories = new Set([
    ...Object.keys(staticProjects),
    ...Object.keys(githubProjects)
  ]);

  allCategories.forEach(category => {
    // Combine static and GitHub projects for this category
    const staticList = staticProjects[category] || [];
    const githubList = githubProjects[category] || [];

    // Merge and remove duplicates (by name)
    merged[category] = removeDuplicates([...staticList, ...githubList]);

    // Sort by updatedAt (newest first), with fallback for projects without dates
    merged[category].sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(0);
      const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(0);
      return dateB - dateA;
    });
  });

  // Only return categories that are defined in PROJECT_CATEGORIES
  // This filters out any unexpected categories
  const validCategories = Object.values(PROJECT_CATEGORIES);
  const filtered = {};

  Object.keys(merged).forEach(category => {
    if (validCategories.includes(category) && merged[category].length > 0) {
      filtered[category] = merged[category];
    }
  });

  return filtered;
}

/**
 * Remove duplicate projects by name
 * Static projects take precedence over GitHub projects
 * @param {Array} projects - Array of projects
 * @returns {Array} Deduplicated projects
 */
function removeDuplicates(projects) {
  const seen = new Map();

  projects.forEach(project => {
    const key = project.name.toLowerCase().trim();

    if (!seen.has(key)) {
      seen.set(key, project);
    } else {
      // If duplicate, prefer the one with more data (likely static/manual)
      const existing = seen.get(key);

      // Keep the one that's NOT from GitHub (i.e., manually created)
      if (existing.fromGitHub && !project.fromGitHub) {
        seen.set(key, project);
      }
      // Or keep the one with an app store link (more valuable)
      else if (!existing.app_store_link && project.app_store_link) {
        seen.set(key, project);
      }
    }
  });

  return Array.from(seen.values());
}
