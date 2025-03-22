import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhotoFilm, 
  faPalette, 
  faVectorSquare, 
  faLayerGroup, 
  faSliders, 
  faWandMagicSparkles,
  faCube,
  faFilm,
  faWaveSquare,
  faObjectGroup,
  faImage,
  faVideo,
  faCamera,
  faBullhorn,
  faUserGroup,
  faPenNib,
  faFileVideo,
  faLightbulb,
  faEnvelope,
  faDesktop,
  faBriefcase,
  faFileWord,
  faChartLine,
  faCalendarAlt,
  faComments,
  faUser,
  faCrop,
  faPhotoVideo,
  faEdit,
  faImages,
  faFileImage,
  faLaptopCode,
  faNetworkWired,
  faFileAlt,
  faTools,
  faPaintBrush,
  faListCheck
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFigma, 
  faSketch, 
  faAdobe, 
  faInvision, 
  faBlender,
  faInstagram,
  faFacebook,
  faYoutube,
  faMicrosoft,
  faWordpress
} from '@fortawesome/free-brands-svg-icons';

const SkillIcon = ({ icon, name }) => {
  return (
    <div className="group relative">
      <div className="skill-card h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-xl shadow-md flex flex-col items-center justify-center p-2 sm:p-3 hover:scale-110 transition-all duration-300 mx-auto"
          style={{
            background: 'var(--card-bg)',
            boxShadow: 'var(--card-shadow)'
          }}>
        <div className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 object-contain mb-1 sm:mb-2 text-primary flex items-center justify-center">
          {icon}
        </div>
        <p className="text-[10px] sm:text-xs md:text-sm text-center font-medium">{name}</p>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const skills = [
    { name: "Photoshop", icon: <FontAwesomeIcon icon={faImage} /> },
    { name: "Illustrator", icon: <FontAwesomeIcon icon={faPaintBrush} /> },
    { name: "Corel Draw", icon: <FontAwesomeIcon icon={faVectorSquare} /> },
    { name: "Canva", icon: <FontAwesomeIcon icon={faLayerGroup} /> },
    { name: "Premiere", icon: <FontAwesomeIcon icon={faPhotoVideo} /> },
    { name: "Sony Vegas", icon: <FontAwesomeIcon icon={faFilm} /> },
    { name: "CapCut", icon: <FontAwesomeIcon icon={faVideo} /> },
    { name: "Lightroom", icon: <FontAwesomeIcon icon={faImages} /> },
    { name: "ClickUp", icon: <FontAwesomeIcon icon={faListCheck} /> },
    { name: "Meta Business", icon: <FontAwesomeIcon icon={faFacebook} /> },
    { name: "Instagram", icon: <FontAwesomeIcon icon={faInstagram} /> },
    { name: "CRM", icon: <FontAwesomeIcon icon={faNetworkWired} /> },
    { name: "Pacote Office", icon: <FontAwesomeIcon icon={faMicrosoft} /> },
    { name: "Slack", icon: <FontAwesomeIcon icon={faComments} /> },
    { name: "YouTube", icon: <FontAwesomeIcon icon={faYoutube} /> }
  ];

  return (
    <section id="skills" className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 relative">
          Minhas Habilidades
          <span className="section-title-underline"></span>
        </h2>
        
        <div className="card p-4 sm:p-5 md:p-6 rounded-xl shadow-md relative overflow-hidden" 
            style={{
              background: 'var(--card-bg)', 
              boxShadow: 'var(--card-shadow)',
              borderLeft: '4px solid var(--secondary)',
              borderBottom: '1px solid rgba(37, 99, 235, 0.2)',
              borderRight: '1px solid rgba(37, 99, 235, 0.1)',
              borderTop: '1px solid rgba(37, 99, 235, 0.1)'
            }}>
          {/* Faixa decorativa no topo */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-primary"></div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 gradient-text">Softwares e Ferramentas</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {skills.map((skill, index) => (
              <SkillIcon key={index} icon={skill.icon} name={skill.name} />
            ))}
          </div>
        </div>

        {/* Habilidades complementares */}
        <div className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-6 md:p-8 rounded-xl shadow-md relative overflow-hidden" 
            style={{
              background: 'var(--card-bg)',
              boxShadow: 'var(--card-shadow)',
              borderLeft: '4px solid var(--accent)',
              borderBottom: '1px solid rgba(244, 63, 94, 0.2)',
              borderRight: '1px solid rgba(244, 63, 94, 0.1)',
              borderTop: '1px solid rgba(244, 63, 94, 0.1)'
            }}>
          {/* Faixa decorativa no topo */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent2"></div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-primary)'}}>Design Gráfico</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-secondary)'}}>Edição de Imagem</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-primary)'}}>Ilustração</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-secondary)'}}>Edição de Vídeos</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-primary)'}}>Cobertura de Eventos</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-secondary)'}}>Criatividade</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-primary)'}}>Mídias Sociais</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-secondary)'}}>Fotografia</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-primary)'}}>Comunicação</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-secondary)'}}>Marketing Digital</span>
            <span className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm hover:scale-110 hover:shadow-lg transition-all duration-300 cursor-default" style={{background: 'var(--gradient-primary)'}}>Estratégia de Conteúdo</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 