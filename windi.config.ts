import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  // 开启 attributify
  attributify: true,
  shortcuts: {
    'flex-c': 'flex justify-center items-center'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '48px'
  }
});
