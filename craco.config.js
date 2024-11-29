const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find and modify the source-map-loader rule
      const sourceMapRule = webpackConfig.module.rules.find(
        (rule) => rule.enforce === 'pre' && rule.use && rule.use[0].loader === 'source-map-loader'
      );

      if (sourceMapRule) {
        sourceMapRule.exclude = /node_modules\/@mediapipe\/tasks-vision/;
      }

      // Add rule for PDF files
      webpackConfig.module.rules.push({
        test: /\.pdf$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name][ext]'
        }
      });

      return webpackConfig;
    },
  },
  style: {
    postcss: {
      mode: 'file',
    },
  },
};
