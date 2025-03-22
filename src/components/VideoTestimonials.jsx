import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

// Importando estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const VideoTestimonial = ({ video, name, company, content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!isLoaded) {
      // Carrega o vídeo apenas no primeiro clique
      if (videoRef.current) {
        videoRef.current.src = video;
        videoRef.current.load();
        setIsLoaded(true);
        
        // Aguardar carregamento suficiente para iniciar
        videoRef.current.oncanplay = () => {
          videoRef.current.play();
          setIsPlaying(true);
        };
      }
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl p-4 sm:p-6 md:p-8 md:px-12 lg:px-16 shadow-md transform hover:translate-y-[-5px] hover:shadow-lg transition-all duration-300 border border-transparent"
      style={{
        background: 'var(--card-bg)',
        boxShadow: 'var(--card-shadow)'
      }}
    >
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-center">
        {/* Lado esquerdo - Conteúdo e informações da pessoa */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-3/5 pl-0 lg:pl-4"
        >
          <div className="text-3xl sm:text-4xl gradient-text mb-2 sm:mb-4">"</div>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 italic">
            {content}
          </p>
          <div className="flex items-center">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden mr-3 sm:mr-4 transform hover:scale-110 transition-transform duration-300"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--card-shadow)'
                }}>
              {/* Aqui poderia ter uma imagem da pessoa */}
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg">{name}</h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{company}</p>
            </div>
          </div>
        </motion.div>
        
        {/* Lado direito - Vídeo em formato de celular */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full lg:w-2/5 mt-6 lg:mt-0 flex justify-center"
        >
          <div 
            className="mx-auto relative rounded-3xl overflow-hidden bg-black shadow-xl w-64 h-[360px] sm:w-72 sm:h-[420px] md:w-80 md:h-[460px]"
            style={{
              borderRadius: '2rem'
            }}
          >
            <video
              ref={videoRef}
              preload="none"
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{
                filter: 'brightness(0.9)'
              }}
            />
            
            <button
              onClick={togglePlay}
              className={`absolute inset-0 w-full h-full flex items-center justify-center z-10 group ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'} transition-opacity duration-300`}
              style={{
                background: !isLoaded ? 'linear-gradient(135deg, var(--primary-light), var(--secondary))' : 'transparent',
                boxShadow: 'inset 0 0 80px rgba(124, 58, 237, 0.2)'
              }}
            >
              {isPlaying ? (
                <PauseIcon className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <PlayIcon className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
            
            {/* Elementos decorativos de celular */}
            <div className="absolute top-0 left-0 right-0 h-4 sm:h-5 md:h-6 bg-black flex justify-center items-center">
              <div className="w-16 sm:w-18 md:w-20 h-3 sm:h-3.5 md:h-4 bg-black rounded-b-xl"></div>
            </div>
            <div className="absolute bottom-1 sm:bottom-1.5 md:bottom-2 left-0 right-0 flex justify-center">
              <div className="w-12 sm:w-14 md:w-16 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const VideoTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      video: "/videos/testimonials/visita_rede_bahia.mp4",
      name: "John Doe",
      company: "Ficticia",
      content: "Em breve"
    },
    {
      id: 2,
      video: "/videos/testimonial-2.mp4",
      name: "John Doe",
      company: "Ficticia",
      content: "Em breve"
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, EffectFade]}
      spaceBetween={30}
      slidesPerView={1}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={800}
      navigation={{
        enabled: true,
        hideOnClick: true
      }}
      pagination={{ 
        clickable: true,
        dynamicBullets: true
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 40
        }
      }}
      className="testimonial-swiper py-8 px-1"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <VideoTestimonial {...testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideoTestimonials; 