import { CameraIcon, LightBulbIcon, WrenchScrewdriverIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] relative overflow-hidden" 
        style={{
          background: 'var(--card-bg)',
          boxShadow: 'var(--card-shadow)',
          borderLeft: '4px solid var(--primary)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
          borderRight: '1px solid rgba(124, 58, 237, 0.1)',
          borderTop: '1px solid rgba(124, 58, 237, 0.1)'
        }}>
      {/* Faixa decorativa no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
      <div className="mb-4 sm:mb-6">
        <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center mb-4 sm:mb-6"
            style={{
              background: 'var(--gradient-primary)',
              boxShadow: 'var(--card-shadow)'
            }}>
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
        </div>
      </div>
      
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 gradient-text">{title}</h3>
      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: WrenchScrewdriverIcon,
      title: "Design Gráfico",
      description: "Criação de identidade visual, artes criativas e profissionais para sua marca, garantindo uma identidade marcante e alinhada aos seus objetivos."
    },
    {
      icon: LightBulbIcon,
      title: "Social Media",
      description: "Gerenciamento de redes sociais, criação de conteúdo, campanhas e estratégias de marketing para aumentar a visibilidade e a presença online da sua marca."
    },
    {
      icon: CameraIcon,
      title: "Produção de Fotos e Vídeos",
      description: "Produzo conteúdos visuais de alta qualidade para destacar sua marca, produtos ou eventos, com edição profissional inclusa."
    },
    {
      icon: PaintBrushIcon,
      title: "Assessoria Profissional",
      description: "Ofereço suporte personalizado para sua presença digital, auxiliando na definição de estratégias, branding e comunicação eficiente."
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 relative">
          Meus Serviços
          <span className="section-title-underline"></span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Cada serviço é personalizado para atender às necessidades específicas do seu projeto, 
            garantindo resultados únicos e de alta qualidade.
          </p>
          <a href="#contact" className="btn-primary inline-block text-sm sm:text-base">
            Solicitar Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services; 