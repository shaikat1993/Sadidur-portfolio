/**
 * GitHub Integration Configuration
 */

export const GITHUB_CONFIG = {
  username: 'shaikat1993',
  apiBaseUrl: 'https://api.github.com',

  // API settings
  perPage: 100,
  sortBy: 'updated', // 'updated', 'created', 'pushed', 'full_name'

  // Filter settings
  includeForks: true, // Include forked repos (projects you worked on with others)
  includeArchived: false, // Set to true if you want to include archived repos

  // Cache settings
  cacheEnabled: true,
  cacheTTL: 3600000, // 1 hour in milliseconds
  cacheKey: 'portfolio_github_cache'
};

export const STORAGE_CONFIG = {
  selectedReposKey: 'portfolio_selected_repos',
  analysisDataKey: 'portfolio_analysis_data'
};
