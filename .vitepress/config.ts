import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/data-visualization/',
  title: '数据可视化',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      { text: '人口', link: '/人口/人口年龄结构和抚养比.md' },
      { text: '价格', link: '/价格/近100年居民消费价格分类指数-2015.md' },
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
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
});
