/**
 * GitHub API Service
 * Handles all interactions with the GitHub API
 */

import { GITHUB_CONFIG } from '../config/github.config';

class GitHubService {
  constructor() {
    this.baseURL = GITHUB_CONFIG.apiBaseUrl;
    this.username = GITHUB_CONFIG.username;
    this.cache = new Map();
  }

  /**
   * Fetch all user repositories
   * @returns {Promise<Array>} Array of repository objects
   */
  async fetchAllRepositories() {
    const cacheKey = 'all_repos';

    // Check cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < GITHUB_CONFIG.cacheTTL) {
        console.log('📦 Using cached repositories');
        return cached.data;
      }
    }

    try {
      console.log('🌐 Fetching repositories from GitHub...');

      const url = `${this.baseURL}/users/${this.username}/repos?sort=${GITHUB_CONFIG.sortBy}&per_page=${GITHUB_CONFIG.perPage}`;
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const repos = await response.json();

      // Filter repos based on config
      const filtered = repos.filter(repo => {
        if (!GITHUB_CONFIG.includeForks && repo.fork) return false;
        if (!GITHUB_CONFIG.includeArchived && repo.archived) return false;
        return true;
      });

      // Cache the result
      this.cache.set(cacheKey, {
        data: filtered,
        timestamp: Date.now()
      });

      console.log(`✅ Fetched ${filtered.length} repositories`);
      return filtered;

    } catch (error) {
      console.error('❌ Failed to fetch repositories:', error);
      throw error;
    }
  }

  /**
   * Fetch detailed repository information
   * @param {string} repoName - Repository name
   * @returns {Promise<Object|null>} Repository details or null
   */
  async fetchRepoDetails(repoName) {
    const cacheKey = `repo_${repoName}`;

    // Check cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < GITHUB_CONFIG.cacheTTL) {
        return cached.data;
      }
    }

    try {
      const url = `${this.baseURL}/repos/${this.username}/${repoName}`;
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        console.warn(`Failed to fetch details for ${repoName}: ${response.status}`);
        return null;
      }

      const data = await response.json();

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;

    } catch (error) {
      console.error(`Error fetching details for ${repoName}:`, error);
      return null;
    }
  }

  /**
   * Fetch repository languages
   * @param {string} repoName - Repository name
   * @returns {Promise<Object>} Languages object with byte counts
   */
  async fetchLanguages(repoName) {
    const cacheKey = `lang_${repoName}`;

    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < GITHUB_CONFIG.cacheTTL) {
        return cached.data;
      }
    }

    try {
      const url = `${this.baseURL}/repos/${this.username}/${repoName}/languages`;
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        return {};
      }

      const data = await response.json();

      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;

    } catch (error) {
      console.error(`Error fetching languages for ${repoName}:`, error);
      return {};
    }
  }

  /**
   * Fetch repository contents (root directory)
   * @param {string} repoName - Repository name
   * @param {string} path - Path within repo (default: root)
   * @returns {Promise<Array>} Array of file/directory objects
   */
  async fetchContents(repoName, path = '') {
    const cacheKey = `contents_${repoName}_${path}`;

    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < GITHUB_CONFIG.cacheTTL) {
        return cached.data;
      }
    }

    try {
      const url = `${this.baseURL}/repos/${this.username}/${repoName}/contents/${path}`;
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        return [];
      }

      const data = await response.json();

      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return Array.isArray(data) ? data : [];

    } catch (error) {
      console.error(`Error fetching contents for ${repoName}/${path}:`, error);
      return [];
    }
  }

  /**
   * Fetch README content
   * @param {string} repoName - Repository name
   * @returns {Promise<string|null>} README content or null
   */
  async fetchReadme(repoName) {
    const cacheKey = `readme_${repoName}`;

    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < GITHUB_CONFIG.cacheTTL) {
        return cached.data;
      }
    }

    try {
      const url = `${this.baseURL}/repos/${this.username}/${repoName}/readme`;
      const response = await fetch(url, {
        headers: {
          ...this.getHeaders(),
          'Accept': 'application/vnd.github.v3.raw'
        }
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.text();

      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;

    } catch (error) {
      console.error(`Error fetching README for ${repoName}:`, error);
      return null;
    }
  }

  /**
   * Fetch package.json for JavaScript/TypeScript projects
   * @param {string} repoName - Repository name
   * @returns {Promise<Object|null>} Parsed package.json or null
   */
  async fetchPackageJson(repoName) {
    const cacheKey = `package_${repoName}`;

    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < GITHUB_CONFIG.cacheTTL) {
        return cached.data;
      }
    }

    try {
      const url = `${this.baseURL}/repos/${this.username}/${repoName}/contents/package.json`;
      const response = await fetch(url, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const content = atob(data.content); // Decode base64
      const parsed = JSON.parse(content);

      this.cache.set(cacheKey, {
        data: parsed,
        timestamp: Date.now()
      });

      return parsed;

    } catch (error) {
      // This is expected for non-JS projects, so don't log error
      return null;
    }
  }

  /**
   * Get request headers
   * @returns {Object} Headers object
   */
  getHeaders() {
    return {
      'Accept': 'application/vnd.github.v3+json'
      // Add token here if you want to increase rate limits:
      // 'Authorization': `token ${YOUR_GITHUB_TOKEN}`
    };
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
    console.log('🗑️ GitHub service cache cleared');
  }

  /**
   * Get rate limit info
   * @returns {Promise<Object>} Rate limit info
   */
  async getRateLimit() {
    try {
      const response = await fetch(`${this.baseURL}/rate_limit`, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rate limit');
      }

      return await response.json();

    } catch (error) {
      console.error('Error fetching rate limit:', error);
      return null;
    }
  }
}

export default new GitHubService();
