/**
 * Intelligent Project Analyzer
 * Deep scans repositories to extract comprehensive project information
 */

import githubService from './githubService';
import { PROJECT_CATEGORIES, CATEGORY_DETECTION_RULES } from '../config/categories.config';

class ProjectAnalyzer {

  /**
   * Analyze a repository comprehensively
   * @param {Object} repo - GitHub repository object
   * @returns {Promise<Object>} Analyzed project data
   */
  async analyze(repo) {
    console.log(`🔍 Analyzing: ${repo.name}...`);

    try {
      // Fetch all data in parallel for performance
      const [languages, contents, readme, packageJson] = await Promise.all([
        githubService.fetchLanguages(repo.name),
        githubService.fetchContents(repo.name),
        githubService.fetchReadme(repo.name),
        githubService.fetchPackageJson(repo.name)
      ]);

      // Build analysis object
      const analysis = {
        // Basic info
        name: repo.name,
        description: repo.description || '',
        url: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        updatedAt: repo.updated_at,
        topics: repo.topics || [],

        // Deep analysis
        languages: languages,
        primaryLanguage: repo.language || 'Unknown',
        files: this.categorizeFiles(contents),
        frameworks: this.detectFrameworks(contents, packageJson, languages),
        projectType: [],
        techStack: {},
        features: [],
        category: null,
        subcategories: [],
        confidence: 0
      };

      // Determine project type
      analysis.projectType = this.detectProjectType(analysis, contents, packageJson);

      // Extract tech stack
      analysis.techStack = this.extractTechStack(analysis, packageJson, readme);

      // Extract features
      analysis.features = this.extractFeatures(readme, repo.description);

      // Determine category
      const categoryResult = this.determineCategory(analysis);
      analysis.category = categoryResult.primary;
      analysis.subcategories = categoryResult.secondary;
      analysis.confidence = categoryResult.confidence;

      // Generate enhanced description
      analysis.enhancedDescription = this.generateDescription(analysis);

      console.log(`✅ ${repo.name} → ${analysis.category} (${analysis.confidence}% confidence)`);

      return analysis;

    } catch (error) {
      console.error(`❌ Failed to analyze ${repo.name}:`, error);
      return this.basicAnalysis(repo);
    }
  }

  /**
   * Categorize files found in repository
   */
  categorizeFiles(contents) {
    const files = {
      config: [],
      ios: [],
      android: [],
      web: [],
      backend: [],
      mobile: [],
      ml: [],
      desktop: []
    };

    if (!Array.isArray(contents)) return files;

    contents.forEach(item => {
      const name = item.name.toLowerCase();

      // iOS specific
      if (name.endsWith('.xcodeproj') || name.endsWith('.xcworkspace')) {
        files.ios.push(name);
      }
      if (name === 'podfile' || name === 'podfile.lock') {
        files.ios.push('CocoaPods');
      }
      if (name === 'package.swift') {
        files.ios.push('Swift Package Manager');
      }
      if (name === 'cartfile') {
        files.ios.push('Carthage');
      }

      // Android specific
      if (name === 'build.gradle' || name === 'settings.gradle') {
        files.android.push(name);
      }
      if (name === 'androidmanifest.xml') {
        files.android.push(name);
      }

      // Cross-platform mobile
      if (name === 'pubspec.yaml') {
        files.mobile.push('Flutter');
      }
      if (name === 'app.json' || name === 'app.config.js') {
        files.mobile.push('React Native');
      }
      if (name.includes('capacitor') || name === 'capacitor.config.json') {
        files.mobile.push('Capacitor');
      }
      if (name === 'ionic.config.json') {
        files.mobile.push('Ionic');
      }

      // Web
      if (name === 'package.json') {
        files.web.push(name);
      }
      if (name === 'index.html') {
        files.web.push(name);
      }
      if (name === 'next.config.js' || name === 'next.config.ts') {
        files.web.push('Next.js');
      }
      if (name === 'nuxt.config.js' || name === 'nuxt.config.ts') {
        files.web.push('Nuxt.js');
      }
      if (name === 'vite.config.js' || name === 'vite.config.ts') {
        files.web.push('Vite');
      }
      if (name === 'webpack.config.js') {
        files.web.push('Webpack');
      }

      // Backend
      if (name === 'requirements.txt' || name === 'pipfile') {
        files.backend.push('Python');
      }
      if (name === 'go.mod') {
        files.backend.push('Go');
      }
      if (name === 'cargo.toml') {
        files.backend.push('Rust');
      }
      if (name === 'dockerfile') {
        files.backend.push('Docker');
      }
      if (name === 'docker-compose.yml' || name === 'docker-compose.yaml') {
        files.backend.push('Docker Compose');
      }

      // ML/AI
      if (name.endsWith('.ipynb')) {
        files.ml.push('Jupyter Notebook');
      }

      // Desktop
      if (name === 'electron.js' || name === 'electron.config.js') {
        files.desktop.push('Electron');
      }
      if (name.endsWith('.pro')) {
        files.desktop.push('Qt');
      }
      if (name === 'cmakelists.txt') {
        files.desktop.push('CMake');
      }
    });

    return files;
  }

  /**
   * Detect frameworks and libraries
   */
  detectFrameworks(contents, packageJson, languages) {
    const frameworks = new Set();

    // From package.json dependencies
    if (packageJson) {
      const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };

      // React ecosystem
      if (deps.react) frameworks.add('React');
      if (deps.next) frameworks.add('Next.js');
      if (deps['react-native']) frameworks.add('React Native');
      if (deps.gatsby) frameworks.add('Gatsby');
      if (deps.expo) frameworks.add('Expo');

      // Vue ecosystem
      if (deps.vue) frameworks.add('Vue.js');
      if (deps.nuxt) frameworks.add('Nuxt.js');

      // Angular
      if (deps['@angular/core']) frameworks.add('Angular');

      // Backend frameworks
      if (deps.express) frameworks.add('Express');
      if (deps['@nestjs/core']) frameworks.add('NestJS');
      if (deps.fastify) frameworks.add('Fastify');
      if (deps.koa) frameworks.add('Koa');

      // Mobile
      if (deps['@ionic/react'] || deps['@ionic/angular'] || deps['@ionic/vue']) {
        frameworks.add('Ionic');
      }
      if (deps['@capacitor/core']) frameworks.add('Capacitor');

      // UI Libraries
      if (deps.tailwindcss) frameworks.add('Tailwind CSS');
      if (deps['styled-components']) frameworks.add('Styled Components');
      if (deps['@mui/material']) frameworks.add('Material-UI');
      if (deps['framer-motion']) frameworks.add('Framer Motion');

      // State management
      if (deps.redux) frameworks.add('Redux');
      if (deps['@reduxjs/toolkit']) frameworks.add('Redux Toolkit');
      if (deps.mobx) frameworks.add('MobX');
      if (deps.zustand) frameworks.add('Zustand');

      // Testing
      if (deps.jest) frameworks.add('Jest');
      if (deps.cypress) frameworks.add('Cypress');
      if (deps.vitest) frameworks.add('Vitest');

      // 3D/Graphics
      if (deps.three || deps['@react-three/fiber']) frameworks.add('Three.js');
    }

    // From file structure
    if (Array.isArray(contents)) {
      const files = this.categorizeFiles(contents);

      // Add detected mobile frameworks
      files.mobile.forEach(fw => frameworks.add(fw));
      files.ios.forEach(fw => frameworks.add(fw));
      files.backend.forEach(fw => frameworks.add(fw));
      files.desktop.forEach(fw => frameworks.add(fw));
      files.web.forEach(fw => {
        if (fw !== 'package.json' && fw !== 'index.html') {
          frameworks.add(fw);
        }
      });
    }

    return Array.from(frameworks);
  }

  /**
   * Detect project type
   */
  detectProjectType(analysis, contents, packageJson) {
    const types = [];
    const files = analysis.files;

    // iOS Native
    if (files.ios.length > 0 && !files.mobile.includes('React Native')) {
      types.push('Native iOS App');
    }

    // Android Native
    if (files.android.length > 0 && !files.mobile.includes('React Native')) {
      types.push('Native Android App');
    }

    // Cross-Platform Mobile
    if (files.mobile.includes('Flutter')) {
      types.push('Flutter App (iOS/Android)');
    }
    if (files.mobile.includes('React Native')) {
      types.push('React Native App (iOS/Android)');
    }
    if (files.mobile.includes('Ionic') || files.mobile.includes('Capacitor')) {
      types.push('Ionic/Capacitor App');
    }

    // Web Applications
    if (packageJson && files.web.length > 0) {
      if (analysis.frameworks.includes('Next.js')) {
        types.push('Next.js Web Application');
      } else if (analysis.frameworks.includes('Gatsby')) {
        types.push('Gatsby Website');
      } else if (analysis.frameworks.includes('Nuxt.js')) {
        types.push('Nuxt.js Application');
      } else if (analysis.frameworks.includes('React')) {
        types.push('React Web Application');
      } else if (analysis.frameworks.includes('Vue.js')) {
        types.push('Vue.js Application');
      } else if (analysis.frameworks.includes('Angular')) {
        types.push('Angular Application');
      } else if (files.web.includes('index.html')) {
        types.push('Web Application');
      }
    }

    // Backend/API
    if (analysis.frameworks.some(fw => ['Express', 'NestJS', 'Fastify', 'Koa'].includes(fw))) {
      types.push('Backend API/Service');
    }

    // Static Website
    if (files.web.includes('index.html') && !packageJson) {
      types.push('Static Website');
    }

    // Library/Package
    if (packageJson && packageJson.name && !files.web.includes('index.html') && types.length === 0) {
      types.push('JavaScript Library/Package');
    }

    // ML/AI
    if (files.ml.length > 0) {
      types.push('Machine Learning / Data Science');
    }

    // Desktop App
    if (files.desktop.length > 0) {
      if (files.desktop.includes('Electron')) {
        types.push('Electron Desktop App');
      } else {
        types.push('Desktop Application');
      }
    }

    return types.length > 0 ? types : ['Software Project'];
  }

  /**
   * Extract complete tech stack
   */
  extractTechStack(analysis, packageJson, readme) {
    const stack = {
      languages: [],
      frameworks: [],
      tools: [],
      platforms: [],
      databases: []
    };

    // Languages (top 5)
    if (analysis.languages) {
      stack.languages = Object.keys(analysis.languages).slice(0, 5);
    }

    // Frameworks (already detected)
    stack.frameworks = analysis.frameworks;

    // Databases
    if (packageJson) {
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      if (deps.mongoose || deps.mongodb) stack.databases.push('MongoDB');
      if (deps.pg || deps.postgres) stack.databases.push('PostgreSQL');
      if (deps.mysql || deps.mysql2) stack.databases.push('MySQL');
      if (deps.firebase) stack.databases.push('Firebase');
      if (deps.redis) stack.databases.push('Redis');
      if (deps.sqlite || deps.sqlite3) stack.databases.push('SQLite');
    }

    // Platforms
    if (analysis.files.ios.length > 0) stack.platforms.push('iOS');
    if (analysis.files.android.length > 0) stack.platforms.push('Android');
    if (analysis.files.web.length > 0) stack.platforms.push('Web');
    if (analysis.files.desktop.length > 0) stack.platforms.push('Desktop');

    return stack;
  }

  /**
   * Extract features from README and description
   */
  extractFeatures(readme, description) {
    const features = [];
    const text = `${readme || ''} ${description || ''}`.toLowerCase();

    const featurePatterns = [
      { pattern: /authentication|auth|login|signup|oauth/i, feature: 'Authentication' },
      { pattern: /real-time|websocket|socket\.io|live/i, feature: 'Real-time Updates' },
      { pattern: /payment|stripe|paypal|billing/i, feature: 'Payment Integration' },
      { pattern: /map|location|gps|geolocation|mapkit/i, feature: 'Location Services' },
      { pattern: /camera|photo|image|gallery/i, feature: 'Camera/Photo Features' },
      { pattern: /notification|push|fcm/i, feature: 'Push Notifications' },
      { pattern: /offline|cache|pwa/i, feature: 'Offline Support' },
      { pattern: /dark mode|theme|theming/i, feature: 'Theming' },
      { pattern: /responsive|mobile-first/i, feature: 'Responsive Design' },
      { pattern: /api|rest|graphql/i, feature: 'API Integration' },
      { pattern: /search|filter/i, feature: 'Search' },
      { pattern: /chat|messaging|message/i, feature: 'Messaging' },
      { pattern: /dashboard|analytics|chart/i, feature: 'Dashboard/Analytics' },
      { pattern: /admin|management|cms/i, feature: 'Admin Panel' },
      { pattern: /ar\s|augmented reality|arkit/i, feature: 'Augmented Reality' },
      { pattern: /ml|machine learning|ai|neural/i, feature: 'Machine Learning' },
      { pattern: /animation|animated/i, feature: 'Animations' },
      { pattern: /video|streaming/i, feature: 'Video/Streaming' },
      { pattern: /social|share|sharing/i, feature: 'Social Features' },
      { pattern: /internationalization|i18n|localization/i, feature: 'Internationalization' }
    ];

    featurePatterns.forEach(({ pattern, feature }) => {
      if (pattern.test(text)) {
        features.push(feature);
      }
    });

    return [...new Set(features)];
  }

  /**
   * Determine category with confidence scoring
   */
  determineCategory(analysis) {
    const scores = {};
    Object.values(PROJECT_CATEGORIES).forEach(cat => scores[cat] = 0);

    // Score based on project type (highest weight)
    analysis.projectType.forEach(type => {
      const lowerType = type.toLowerCase();

      if (lowerType.includes('ios')) {
        scores[PROJECT_CATEGORIES.IOS] += 40;
      }
      if (lowerType.includes('android')) {
        scores[PROJECT_CATEGORIES.ANDROID] += 40;
      }
      if (lowerType.includes('flutter') || lowerType.includes('react native') || lowerType.includes('ionic')) {
        scores[PROJECT_CATEGORIES.CROSS_PLATFORM] += 45;
      }
      if (lowerType.includes('web') || lowerType.includes('next.js') || lowerType.includes('react') || lowerType.includes('vue') || lowerType.includes('angular')) {
        scores[PROJECT_CATEGORIES.WEB] += 35;
      }
      if (lowerType.includes('backend') || lowerType.includes('api')) {
        scores[PROJECT_CATEGORIES.BACKEND] += 35;
      }
      if (lowerType.includes('machine learning') || lowerType.includes('data science')) {
        scores[PROJECT_CATEGORIES.ML_AI] += 45;
      }
      if (lowerType.includes('desktop') || lowerType.includes('electron')) {
        scores[PROJECT_CATEGORIES.DESKTOP] += 40;
      }
      if (lowerType.includes('library') || lowerType.includes('package')) {
        scores[PROJECT_CATEGORIES.DEVTOOLS] += 35;
      }
    });

    // Score based on languages
    if (analysis.languages) {
      if (analysis.languages.Swift || analysis.languages['Objective-C']) {
        scores[PROJECT_CATEGORIES.IOS] += 25;
      }
      if (analysis.languages.Kotlin) {
        scores[PROJECT_CATEGORIES.ANDROID] += 20;
      }
      if (analysis.languages.Java && analysis.files.android.length > 0) {
        scores[PROJECT_CATEGORIES.ANDROID] += 15;
      }
      if (analysis.languages.Dart) {
        scores[PROJECT_CATEGORIES.CROSS_PLATFORM] += 30;
      }
      if (analysis.languages.JavaScript || analysis.languages.TypeScript) {
        scores[PROJECT_CATEGORIES.WEB] += 15;
      }
      if (analysis.languages.Python) {
        scores[PROJECT_CATEGORIES.ML_AI] += 12;
        scores[PROJECT_CATEGORIES.BACKEND] += 12;
      }
    }

    // Score based on frameworks
    analysis.frameworks.forEach(fw => {
      if (['CocoaPods', 'Swift Package Manager', 'Carthage'].includes(fw)) {
        scores[PROJECT_CATEGORIES.IOS] += 20;
      }
      if (['React', 'Next.js', 'Vue.js', 'Angular', 'Gatsby', 'Nuxt.js'].includes(fw)) {
        scores[PROJECT_CATEGORIES.WEB] += 18;
      }
      if (['React Native', 'Flutter', 'Ionic', 'Capacitor', 'Expo'].includes(fw)) {
        scores[PROJECT_CATEGORIES.CROSS_PLATFORM] += 25;
      }
      if (['Express', 'NestJS', 'Fastify', 'Koa'].includes(fw)) {
        scores[PROJECT_CATEGORIES.BACKEND] += 20;
      }
      if (['Electron'].includes(fw)) {
        scores[PROJECT_CATEGORIES.DESKTOP] += 25;
      }
    });

    // Detect Full Stack (both frontend and backend indicators)
    if (scores[PROJECT_CATEGORIES.WEB] > 25 && scores[PROJECT_CATEGORIES.BACKEND] > 25) {
      scores[PROJECT_CATEGORIES.FULLSTACK] =
        Math.round((scores[PROJECT_CATEGORIES.WEB] + scores[PROJECT_CATEGORIES.BACKEND]) * 0.8);
    }

    // Score based on topics
    analysis.topics.forEach(topic => {
      const lowerTopic = topic.toLowerCase();

      Object.entries(CATEGORY_DETECTION_RULES).forEach(([category, rules]) => {
        if (rules.topics.includes(lowerTopic)) {
          scores[category] += 12;
        }
      });
    });

    // Find top categories
    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .filter(([, score]) => score > 0);

    if (sorted.length === 0) {
      return {
        primary: PROJECT_CATEGORIES.OTHER,
        secondary: [],
        confidence: 30
      };
    }

    const primary = sorted[0][0];
    const secondary = sorted.slice(1, 3).map(([cat]) => cat);
    const maxScore = sorted[0][1];

    // Calculate confidence (0-100)
    const confidence = Math.min(100, Math.round((maxScore / 100) * 100));

    return { primary, secondary, confidence };
  }

  /**
   * Generate enhanced description
   */
  generateDescription(analysis) {
    const parts = [];

    // Start with original description
    if (analysis.description) {
      parts.push(analysis.description);
    }

    // Add project type
    if (analysis.projectType.length > 0) {
      parts.push(`This is a ${analysis.projectType[0]}.`);
    }

    // Add tech stack
    if (analysis.frameworks.length > 0) {
      const frameworks = analysis.frameworks.slice(0, 3).join(', ');
      parts.push(`Built with ${frameworks}.`);
    }

    // Add key features
    if (analysis.features.length > 0) {
      const features = analysis.features.slice(0, 3).join(', ');
      parts.push(`Features include: ${features}.`);
    }

    return parts.join(' ');
  }

  /**
   * Basic analysis fallback
   */
  basicAnalysis(repo) {
    const primaryLanguage = repo.language || 'Unknown';
    let category = PROJECT_CATEGORIES.OTHER;

    // Simple categorization
    if (primaryLanguage === 'Swift' || primaryLanguage === 'Objective-C') {
      category = PROJECT_CATEGORIES.IOS;
    } else if (primaryLanguage === 'JavaScript' || primaryLanguage === 'TypeScript') {
      category = PROJECT_CATEGORIES.WEB;
    } else if (primaryLanguage === 'Kotlin') {
      category = PROJECT_CATEGORIES.ANDROID;
    } else if (primaryLanguage === 'Python') {
      category = PROJECT_CATEGORIES.BACKEND;
    }

    return {
      name: repo.name,
      description: repo.description || 'No description available',
      enhancedDescription: repo.description || 'No description available',
      url: repo.html_url,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      updatedAt: repo.updated_at,
      topics: repo.topics || [],
      languages: primaryLanguage ? { [primaryLanguage]: 100 } : {},
      primaryLanguage,
      files: {},
      frameworks: [],
      projectType: ['Software Project'],
      techStack: { languages: [primaryLanguage], frameworks: [], tools: [], platforms: [], databases: [] },
      features: [],
      category,
      subcategories: [],
      confidence: 50
    };
  }
}

export default new ProjectAnalyzer();
