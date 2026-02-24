/**
 * Project Data Model
 * Ensures consistent data structure across the application
 */

export class Project {
  constructor(data) {
    this.name = data.name || '';
    this.description = data.description || '';
    this.enhancedDescription = data.enhancedDescription || data.description || '';
    this.tags = data.tags || [];
    this.icon = data.icon || null;
    this.source_code_link = data.source_code_link || null;
    this.app_store_link = data.app_store_link || null;
    this.live_link = data.live_link || null;
    this.isPersonalProject = data.isPersonalProject ?? true;
    this.category = data.category || null;
    this.subcategories = data.subcategories || [];
    this.stars = data.stars || 0;
    this.forks = data.forks || 0;
    this.updatedAt = data.updatedAt || null;
    this.projectType = data.projectType || [];
    this.frameworks = data.frameworks || [];
    this.techStack = data.techStack || {};
    this.features = data.features || [];
    this.confidence = data.confidence || 0;
    this.fromGitHub = data.fromGitHub || false;
  }

  /**
   * Validate project data
   * @returns {Object} { valid: boolean, errors: string[] }
   */
  validate() {
    const errors = [];

    if (!this.name || this.name.trim() === '') {
      errors.push('Project name is required');
    }

    if (!this.description || this.description.trim() === '') {
      errors.push('Project description is required');
    }

    if (!this.category) {
      errors.push('Project category is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Create Project from GitHub analysis data
   * @param {Object} analysis - Analysis result from ProjectAnalyzer
   * @returns {Project}
   */
  static fromGitHubAnalysis(analysis) {
    return new Project({
      name: formatRepoName(analysis.name),
      description: analysis.description || 'No description available',
      enhancedDescription: analysis.enhancedDescription,
      tags: generateTags(analysis),
      source_code_link: analysis.url,
      isPersonalProject: true,
      category: analysis.category,
      subcategories: analysis.subcategories,
      stars: analysis.stars,
      forks: analysis.forks,
      updatedAt: analysis.updatedAt,
      projectType: analysis.projectType,
      frameworks: analysis.frameworks,
      techStack: analysis.techStack,
      features: analysis.features,
      confidence: analysis.confidence,
      icon: getIconForProject(analysis),
      fromGitHub: true
    });
  }

  /**
   * Convert to plain object for storage
   * @returns {Object}
   */
  toJSON() {
    return {
      name: this.name,
      description: this.description,
      enhancedDescription: this.enhancedDescription,
      tags: this.tags,
      icon: this.icon,
      source_code_link: this.source_code_link,
      app_store_link: this.app_store_link,
      live_link: this.live_link,
      isPersonalProject: this.isPersonalProject,
      category: this.category,
      subcategories: this.subcategories,
      stars: this.stars,
      forks: this.forks,
      updatedAt: this.updatedAt,
      projectType: this.projectType,
      frameworks: this.frameworks,
      techStack: this.techStack,
      features: this.features,
      confidence: this.confidence,
      fromGitHub: this.fromGitHub
    };
  }
}

/**
 * Helper: Format repository name for display
 * @param {string} name - Repository name
 * @returns {string} - Formatted name
 */
function formatRepoName(name) {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Helper: Generate tags from analysis
 * @param {Object} analysis - Analysis data
 * @returns {Array} - Array of tag objects
 */
function generateTags(analysis) {
  const tags = [];
  const colors = ['blue-text-gradient', 'green-text-gradient', 'pink-text-gradient'];
  let colorIndex = 0;

  // Add primary language
  if (analysis.primaryLanguage) {
    tags.push({
      name: analysis.primaryLanguage.toLowerCase(),
      color: colors[colorIndex++ % colors.length]
    });
  }

  // Add top frameworks (max 2 more tags)
  if (analysis.frameworks && analysis.frameworks.length > 0) {
    analysis.frameworks.slice(0, 2).forEach(framework => {
      tags.push({
        name: framework.toLowerCase().replace(/\s+/g, '-'),
        color: colors[colorIndex++ % colors.length]
      });
    });
  }

  // If no frameworks, add topics
  if (tags.length < 3 && analysis.topics && analysis.topics.length > 0) {
    const remaining = 3 - tags.length;
    analysis.topics.slice(0, remaining).forEach(topic => {
      tags.push({
        name: topic,
        color: colors[colorIndex++ % colors.length]
      });
    });
  }

  return tags;
}

/**
 * Helper: Get icon for project based on analysis
 * @returns {null} - Always returns null for GitHub projects to show first letter
 */
function getIconForProject() {
  // Always return null for GitHub-integrated projects
  // This makes them display the first letter of the project name in a styled box
  // instead of broken images from icon name strings

  // Static projects in constants/index.js can use direct component references
  // (like FaReact, FaNode) which work correctly

  return null;
}
