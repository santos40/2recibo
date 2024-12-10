import { useState, useEffect } from 'react';

export const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Função para verificar se é dispositivo móvel
    const checkDevice = () => {
      const mobile = window.matchMedia('(max-width: 768px)').matches ||
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    // Verifica inicialmente
    checkDevice();

    // Adiciona listener para mudanças de tamanho da tela
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', checkDevice);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', checkDevice);
  }, []);

  return {
    isMobile,
    isDesktop: !isMobile
  };
};