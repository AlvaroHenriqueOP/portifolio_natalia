import { useRef, useEffect } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const bubblesRef = useRef([]);
  
  useEffect(() => {
    const container = containerRef.current;
    const ctx = container.getContext('2d');
    
    // Configurar o canvas para o tamanho da tela
    const resizeCanvas = () => {
      container.width = window.innerWidth;
      container.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    // Gerar bolhas apenas uma vez
    if (bubblesRef.current.length === 0) {
      // Cores fixas para os modos claro e escuro
      const bubbleColors = [
        { color: 'rgba(124, 58, 237, 0.08)', darkColor: 'rgba(138, 123, 255, 0.08)' },
        { color: 'rgba(37, 99, 235, 0.07)', darkColor: 'rgba(93, 127, 255, 0.07)' },
        { color: 'rgba(244, 63, 94, 0.06)', darkColor: 'rgba(255, 107, 107, 0.06)' },
        { color: 'rgba(245, 158, 11, 0.07)', darkColor: 'rgba(255, 190, 11, 0.07)' }
      ];
      
      // Verificar se o modo escuro está ativo
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Criar bolhas
      for (let i = 0; i < 20; i++) {
        const colorObj = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        const size = Math.random() * 120 + 80;
        const color = isDarkMode ? colorObj.darkColor : colorObj.color;
        
        bubblesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: size,
          color: color,
          initialX: Math.random() * window.innerWidth,
          initialY: Math.random() * window.innerHeight,
          amplitude: Math.random() * 200 + 100,
          angle: Math.random() * Math.PI * 2,
          angularSpeed: 0.0003 + Math.random() * 0.0002
        });
      }
    }
    
    // Função para atualizar cores quando o tema mudar
    const updateColors = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // Cores fixas para os modos claro e escuro
      const bubbleColors = [
        { color: 'rgba(124, 58, 237, 0.08)', darkColor: 'rgba(138, 123, 255, 0.08)' },
        { color: 'rgba(37, 99, 235, 0.07)', darkColor: 'rgba(93, 127, 255, 0.07)' },
        { color: 'rgba(244, 63, 94, 0.06)', darkColor: 'rgba(255, 107, 107, 0.06)' },
        { color: 'rgba(245, 158, 11, 0.07)', darkColor: 'rgba(255, 190, 11, 0.07)' }
      ];
      
      // Atualizar as cores existentes das bolhas
      bubblesRef.current.forEach((bubble, index) => {
        const colorObj = bubbleColors[index % bubbleColors.length];
        bubble.color = isDarkMode ? colorObj.darkColor : colorObj.color;
      });
    };
    
    // Função de animação
    const animate = () => {
      ctx.clearRect(0, 0, container.width, container.height);
      
      bubblesRef.current.forEach(bubble => {
        // Atualizar ângulo para movimento suave circular
        bubble.angle += bubble.angularSpeed;
        
        // Calcular nova posição usando movimento circular/sinusoidal
        const newX = bubble.initialX + Math.cos(bubble.angle) * bubble.amplitude;
        const newY = bubble.initialY + Math.sin(bubble.angle) * bubble.amplitude;
        
        // Desenhar bolha
        ctx.beginPath();
        ctx.arc(newX, newY, bubble.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    // Iniciar animação
    animate();
    
    // Escutar eventos de mudança de tema
    const handleThemeChange = () => {
      updateColors();
    };
    
    // Usar MutationObserver para detectar mudanças na classe "dark" no html
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          handleThemeChange();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Ajustar o canvas se a janela for redimensionada
    window.addEventListener('resize', resizeCanvas);
    
    // Limpar animação quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <canvas 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
};

export default AnimatedBackground; 