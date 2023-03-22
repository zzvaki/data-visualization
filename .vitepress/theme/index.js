import DefaultTheme from 'vitepress/theme';
import { createPinia } from 'pinia';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    // register your custom global components
    // console.log('enhanceApp', ctx);
    ctx.app.use(createPinia());
  },
};
