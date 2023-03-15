import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '数据可视化',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: '人口', link: '/人口/人口年龄结构和抚养比.md' },
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
          text: '人口',
          items: [
            {
              text: '人口年龄结构和抚养比',
              link: '/人口/人口年龄结构和抚养比.md',
            },
          ],
        },
      ],
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
});
