/**
 * Project Categories Configuration
 * Defines all available project categories and their metadata
 */

export const PROJECT_CATEGORIES = {
  IOS: 'iOS Development',
  WEB: 'Web Development',
  ANDROID: 'Android Development',
  CROSS_PLATFORM: 'Cross-Platform Mobile',
  BACKEND: 'Backend Services',
  FULLSTACK: 'Full Stack',
  ML_AI: 'Machine Learning & AI',
  DESKTOP: 'Desktop Applications',
  DEVTOOLS: 'Developer Tools & Libraries',
  OTHER: 'Other Projects'
};

export const CATEGORY_METADATA = {
  [PROJECT_CATEGORIES.IOS]: {
    icon: 'FaMobileAlt',
    color: 'purple',
    gradient: 'from-purple-500 to-blue-500',
    description: 'Native iOS applications built with Swift/Objective-C'
  },
  [PROJECT_CATEGORIES.WEB]: {
    icon: 'FaGlobe',
    color: 'green',
    gradient: 'from-green-500 to-teal-500',
    description: 'Web applications and websites'
  },
  [PROJECT_CATEGORIES.ANDROID]: {
    icon: 'FaAndroid',
    color: 'lime',
    gradient: 'from-lime-500 to-green-500',
    description: 'Native Android applications'
  },
  [PROJECT_CATEGORIES.CROSS_PLATFORM]: {
    icon: 'FaMobile',
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Cross-platform mobile applications (Flutter, React Native)'
  },
  [PROJECT_CATEGORIES.BACKEND]: {
    icon: 'FaServer',
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    description: 'Backend services and APIs'
  },
  [PROJECT_CATEGORIES.FULLSTACK]: {
    icon: 'BsStack',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Full-stack applications with frontend and backend'
  },
  [PROJECT_CATEGORIES.ML_AI]: {
    icon: 'FaBrain',
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    description: 'Machine learning and AI projects'
  },
  [PROJECT_CATEGORIES.DESKTOP]: {
    icon: 'FaDesktop',
    color: 'gray',
    gradient: 'from-gray-500 to-slate-500',
    description: 'Desktop applications'
  },
  [PROJECT_CATEGORIES.DEVTOOLS]: {
    icon: 'FaTools',
    color: 'yellow',
    gradient: 'from-yellow-500 to-amber-500',
    description: 'Developer tools, libraries, and packages'
  },
  [PROJECT_CATEGORIES.OTHER]: {
    icon: 'FaCode',
    color: 'gray',
    gradient: 'from-gray-400 to-gray-600',
    description: 'Other projects'
  }
};

/**
 * Category detection rules for intelligent categorization
 */
export const CATEGORY_DETECTION_RULES = {
  [PROJECT_CATEGORIES.IOS]: {
    languages: ['Swift', 'Objective-C'],
    topics: ['ios', 'swift', 'uikit', 'swiftui', 'xcode', 'cocoapods', 'apple'],
    keywords: ['ios', 'iphone', 'ipad', 'swift', 'apple'],
    fileIndicators: ['.xcodeproj', '.xcworkspace', 'Podfile', 'Package.swift', 'Cartfile']
  },
  [PROJECT_CATEGORIES.ANDROID]: {
    languages: ['Java', 'Kotlin'],
    topics: ['android', 'kotlin', 'java', 'mobile'],
    keywords: ['android', 'kotlin', 'gradle'],
    fileIndicators: ['build.gradle', 'settings.gradle', 'AndroidManifest.xml']
  },
  [PROJECT_CATEGORIES.CROSS_PLATFORM]: {
    languages: ['Dart', 'JavaScript', 'TypeScript'],
    topics: ['flutter', 'react-native', 'ionic', 'capacitor', 'cordova', 'cross-platform'],
    keywords: ['flutter', 'react native', 'ionic', 'capacitor', 'cross-platform'],
    fileIndicators: ['pubspec.yaml', 'app.json', 'capacitor.config.json', 'ionic.config.json']
  },
  [PROJECT_CATEGORIES.WEB]: {
    languages: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
    topics: ['react', 'nextjs', 'vue', 'angular', 'web', 'frontend', 'website'],
    keywords: ['web', 'react', 'next', 'vue', 'angular', 'portfolio', 'website', 'frontend'],
    fileIndicators: ['package.json', 'index.html', 'next.config.js', 'vite.config.js', 'webpack.config.js']
  },
  [PROJECT_CATEGORIES.BACKEND]: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Java', 'Ruby', 'PHP', 'Rust'],
    topics: ['backend', 'api', 'nodejs', 'express', 'fastify', 'nestjs', 'django', 'flask', 'graphql'],
    keywords: ['api', 'backend', 'server', 'rest', 'graphql', 'microservice'],
    fileIndicators: ['Dockerfile', 'docker-compose.yml', 'requirements.txt', 'go.mod', 'Cargo.toml']
  },
  [PROJECT_CATEGORIES.ML_AI]: {
    languages: ['Python', 'R', 'Julia'],
    topics: ['machine-learning', 'ai', 'ml', 'deep-learning', 'neural-network', 'data-science', 'tensorflow', 'pytorch'],
    keywords: ['machine learning', 'neural network', 'deep learning', 'ai', 'ml', 'data science', 'tensorflow', 'pytorch'],
    fileIndicators: ['.ipynb', 'requirements.txt']
  },
  [PROJECT_CATEGORIES.DESKTOP]: {
    languages: ['Python', 'C++', 'C#', 'Java'],
    topics: ['desktop', 'electron', 'qt', 'gtk', 'wpf', 'javafx'],
    keywords: ['desktop', 'electron', 'gui', 'qt'],
    fileIndicators: ['electron.js', '.pro', 'CMakeLists.txt']
  },
  [PROJECT_CATEGORIES.DEVTOOLS]: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust'],
    topics: ['cli', 'tool', 'library', 'package', 'npm', 'pypi', 'cargo'],
    keywords: ['cli', 'tool', 'library', 'package', 'utility', 'framework'],
    fileIndicators: ['setup.py', 'pyproject.toml', 'Cargo.toml']
  }
};
