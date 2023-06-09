import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/data-visualization/',
  lastUpdated: true,
  title: '数据可视化',
  // description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      { text: '人口', link: '/人口/人口年龄结构和抚养比.md' },
      { text: '价格', link: '/价格/近100年居民消费价格分类指数-2015.md' },
      { text: '房地产', link: '/房地产/房地产开发投资情况.md' },
      { text: '自定义', link: '/自定义/' },
    ],

    sidebar: {
      '/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' },
          ],
        },
      ],
      '/人口/': [
        {
          text: '人口年龄结构和抚养比',
          link: '/人口/人口年龄结构和抚养比.md',
        },
        {
          text: '人口出生率、死亡率和自然增长率',
          link: '/人口/人口出生率、死亡率和自然增长率.md',
        },
      ],
      '/价格/': [
        {
          text: '近100年居民消费价格分类指数-2015',
          link: '/价格/近100年居民消费价格分类指数-2015.md',
        },
      ],
      '/房地产/': [
        {
          text: '房地产开发投资情况',
          link: '/房地产/房地产开发投资情况.md',
        },
      ],
      '/自定义/': [],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zzvaki/data-visualization' },
    ],
  },
});
