"use client";

import { useEffect } from "react";

export default function AOSInitializer() {
  useEffect(() => {
    // Importação dinâmica da biblioteca AOS
    const initAOS = async () => {
      const AOS = (await import("aos")).default;
      
      AOS.init({
        // Configurações globais do AOS
        duration: 800,          // Duração padrão das animações
        easing: 'ease-out-cubic', // Tipo de easing
        once: false,            // Repetir animações ao rolar de volta
        mirror: true,           // Animar elementos ao rolar para cima também
        offset: 120,            // Offset (em px) a partir do ponto de trigger
        delay: 0,               // Atraso padrão
        anchorPlacement: 'top-bottom', // Define qual posição do elemento deve atingir qual posição da janela para acionar a animação
      });
      
      // Adicionar evento para recarregar o AOS ao redimensionar a janela
      window.addEventListener('resize', () => {
        AOS.refresh();
      });
      
      // Recarregar AOS quando o DOM é alterado dinamicamente
      const observer = new MutationObserver(() => {
        AOS.refresh();
      });
      
      // Observar alterações no body e seus filhos
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', AOS.refresh);
      };
    };

    initAOS();
  }, []);

  return null;
} 