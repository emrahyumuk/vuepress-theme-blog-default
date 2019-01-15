const path = require('path');

// Theme API.
module.exports = (options, ctx) => ({
  alias() {
    const { themeConfig, siteConfig } = ctx;
    // resolve algolia
    const isAlgoliaSearch =
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
        base => themeConfig.locales[base].algolia
      );
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js'),
    };
  },
  permalink: '/blog/:slug',
  plugins: [
    path.resolve(__dirname, 'plugins/blog/index.js'),
    '@vuepress/active-header-links',
    '@vuepress/plugin-nprogress',
    '@vuepress/pagination',
    '@vuepress/medium-zoom',
    '@vuepress/back-to-top',
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10,
        test: null,
      },
    ],
  ],
});
