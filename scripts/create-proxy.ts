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
      target: 'http://10.1.1.123:8110',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '' } // 路径重写，阿里云地址需要注释掉
    }
  };
`;
    fs.writeFileSync(path.join(__dirname, '../config/proxy-self.ts'), text);
  }
};

createProxySelfFile();
