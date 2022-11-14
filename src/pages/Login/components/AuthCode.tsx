import { useEffect, useState } from 'react';

const baseAuthCodePath = '/scan/t-user/getVerifiCode';

const AuthCode = (params: { onChange: (arg0: string) => void }) => {
  const [imgPath, setImgPath] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const random = Math.random().toFixed(15);
    params.onChange(random);
    setImgPath(`${baseAuthCodePath}?${random}`);
  };

  const handleEnd = () => {
    setLoading(false);
  };

  useEffect(() => {
    console.log(imgPath, 8888);
    const random = Math.random().toFixed(15);
    params.onChange(random);
    setImgPath(`${baseAuthCodePath}?${random}`);
  }, []);

  return (
    <img
      id="auth-code"
      style={{ height: '36px', cursor: 'pointer' }}
      onLoad={handleEnd}
      onError={handleEnd}
      onClick={handleLoad}
      // src={imgPath}
      alt=""
    />
  );
};

export default AuthCode;
