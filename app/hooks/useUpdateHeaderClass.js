import { useEffect } from 'react';
import { useHeaderContext } from '../../lib/HeaderContext'; // Adjust the path as needed

const useUpdateHeaderClass = () => {
  const { setTransparent, setColor, clearHeaderClass } = useHeaderContext();

  useEffect(() => {
    const heroDarkOverlay = document.querySelector('.overlay-dark');
    const heroLightOverlay = document.querySelector('.overlay-light');

    if (heroDarkOverlay) {
      setTransparent();
    } else if (heroLightOverlay) {
      setColor();
    } else {
      clearHeaderClass();
    }
  }, []);

  // Other logic if needed
};

export default useUpdateHeaderClass;
