'use client';

import { useEffect } from 'react';

// Precisamos desse componente para inicializar o AOS apenas no lado do cliente
const AOSInitializer = () => {
  useEffect(() => {
    const AOS = require('aos');
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  return null;
};

export default AOSInitializer; 