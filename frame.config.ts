import { resolve } from 'path';

const alias = {
  '@': resolve(__dirname, 'src'),
  '@store': resolve(__dirname, 'src/store'),
  '@router': resolve(__dirname, 'src/router'),
  '@hooks': resolve(__dirname, 'src/hooks'),
  '@pages': resolve(__dirname, 'src/pages'),
  '@types': resolve(__dirname, 'src/types'),
  '@components': resolve(__dirname, 'src/packages/components'),
  '@utils': resolve(__dirname, 'src/utils'),
  '@assets': resolve(__dirname, 'src/assets'),
  '@config': resolve(__dirname, 'src/config'),
  '@service': resolve(__dirname, 'src/service'),
  '@packages': resolve(__dirname, 'src/packages'),
  '@plugins': resolve(__dirname, 'src/plugins')
};

const headers: string[] = [];

export { headers, alias };
