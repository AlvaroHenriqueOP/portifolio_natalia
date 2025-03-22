import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Importando estilos do Swiper
import 'swiper/css';
import 'swiper/css/pagination';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [swiper, setSwiper] = useState(null);
  
  // Desativar rolagem do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Adicionar event listener para fechar o modal com a tecla ESC
      const handleEscKey = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
      
      // Cleanup function
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscKey);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);
  
  // Se não há projeto ou modal não está aberto, não renderizar
  if (!project || !isOpen) return null;

  // Verificar se é um dos 3 primeiros projetos (ids 1, 2 ou 3)
  const isVideoProject = project.id <= 3;
  
  // Verificar se tem múltiplos slides
  const hasMultipleSlides = (project.images && project.images.length > 0) || false;
  
  // Cores para o gradiente, usando a cor temática do projeto se disponível
  const themeColor = project.themeColor || 'var(--primary)';
  const lightThemeColor = `${themeColor}80`; // Versão mais transparente da cor temática (50%)
  
  // Definir cores secundárias para todos os projetos
  let secondaryColor;
  switch(project.id) {
    case 1: // Groovalização
      secondaryColor = '#566bc9';
      break;
    case 2: // FlashGay
      secondaryColor = '#c56c9a';
      break;
    case 3: // Rede Bahia
      secondaryColor = '#5a81d1';
      break;
    case 4: // Fito Educação
      secondaryColor = '#3cc76d';
      break;
    case 5: // Carolla
      secondaryColor = '#b0666e';
      break;
    case 6: // Smarçaro
      secondaryColor = '#a68149';
      break;
    default:
      secondaryColor = 'var(--secondary)';
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)'
      }}
      onClick={(e) => {
        // Fechar o modal apenas se o clique for no fundo (não em conteúdo)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Botão de fechar no canto superior direito */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
        aria-label="Fechar modal"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
      
      {/* Container do conteúdo do modal */}
      <div 
        className="modal-content bg-white dark:bg-gray-900 rounded-xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row max-h-[90vh] relative shadow-2xl"
        style={{
          background: `linear-gradient(165deg, ${themeColor}20, ${secondaryColor}10)`,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Conteúdo à esquerda (texto) */}
        <div 
          className="modal-body w-full md:w-1/3 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto"
          style={{
            background: `linear-gradient(135deg, ${themeColor}99, ${secondaryColor}99)`,
            color: 'white'
          }}
        >
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              {project.title}
            </h3>
            
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 sm:mb-6 bg-white/20">
              {project.category}
            </span>
            
            <p className="mb-4 sm:mb-6 text-white/90">
              {project.description}
            </p>
            
            {/* Mostrar tecnologias apenas para projetos que não são vídeos (id > 3) */}
            {!isVideoProject && project.tools && (
              <div className="mb-4 sm:mb-6">
                <h4 className="font-medium mb-2 text-lg">Tecnologias e Ferramentas</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 text-sm rounded-full transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-lg"
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            {/* Mostrar link apenas para projetos que têm link definido */}
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 sm:px-6 py-2 text-white rounded-full font-medium transition-colors text-sm sm:text-base"
                style={{
                  background: lightThemeColor,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                Ver Projeto Online
              </a>
            )}
          </div>
        </div>
        
        {/* Conteúdo à direita (slider) */}
        <div className="w-full md:w-2/3 h-[40vh] sm:h-[50vh] md:h-auto relative">
          {/* Mostrar setas de navegação apenas quando o projeto tem múltiplos slides */}
          {(!isVideoProject && hasMultipleSlides) && (
            <div className="absolute inset-0 flex items-center justify-between z-10 px-4 pointer-events-none">
              <button 
                onClick={() => swiper?.slidePrev()} 
                className="rounded-full p-2 pointer-events-auto hidden sm:block"
                style={{
                  background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)`
                }}
              >
                <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </button>
              <button 
                onClick={() => swiper?.slideNext()} 
                className="rounded-full p-2 pointer-events-auto hidden sm:block"
                style={{
                  background: `linear-gradient(135deg, ${secondaryColor}, ${secondaryColor}dd)`
                }}
              >
                <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </button>
            </div>
          )}
          
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={!isVideoProject && hasMultipleSlides ? { clickable: true } : false}
            className="h-full"
            onSwiper={setSwiper}
          >
            {/* Slide de vídeo como primeiro elemento se disponível */}
            {project.video && (
              <SwiperSlide>
                <div className="relative h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <video 
                    src={project.video} 
                    controls 
                    autoPlay
                    className="w-full h-full object-contain" 
                    controlsList="nodownload"
                    poster={project.coverImage}
                  >
                    Seu navegador não suporta a reprodução de vídeos.
                  </video>
                </div>
              </SwiperSlide>
            )}
            
            {/* Imagens adicionais do projeto */}
            {project.images && project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <img 
                    src={image} 
                    alt={`${project.title} - Imagem ${index + 1}`} 
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal; 