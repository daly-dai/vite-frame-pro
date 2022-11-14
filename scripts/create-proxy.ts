// 创建属于自己的 请求代理文件 proxy-self.js
import fs from 'fs';
import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
const createProxySelfFile = function () {
  const filePath = resolve('./config/proxy-self.ts');
  try {
    fs.statSync(filePath);
  } catch (e) {
    console.info('创建 proxy-self.ts 文件完成');
    const text = `/* @desc devServer 代理配置 */
export default  {
    '/api': {
      target: 'http://10.10.200.24:5000',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    }
  };
`;
    fs.writeFileSync(path.join(__dirname, '../config/proxy-self.ts'), text);
  }
};

createProxySelfFile();
