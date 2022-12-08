import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default (listener: any) => {
  const location = useLocation();

  useEffect(() => {
    listener(location);
  }, [listener, location]);
};
