"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import SkillsSection from "../components/SkillsSection";
import ProjectModal from "../components/ProjectModal";
import VideoTestimonials from "../components/VideoTestimonials";
import Services from "../components/Services";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
const initEmailJS = () => {
  if (typeof window !== 'undefined') {
    emailjs.init("gbDQhCD-KJGUHL6nT");
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initEmailJS();
  }, []);

  // Projetos para a seção de portfólio
  const projects = [
    {
      id: 1,
      title: "Groovalização",
      category: "Produção de Vídeo",
      description: "Groovalização é mais do que um evento de música, é uma celebração da cultura do vinil e da cena independente. Em meio às ruas vibrantes de Salvador, registrei esse encontro único, onde arte, acessibilidade e sonoridade se misturam para criar uma experiência autêntica. Um vídeo que captura a energia do evento e a paixão dos artistas pelo som analógico.",
      coverImage: "/images/projects/project1/grovalizacao_capa.jpg",
      video: "/images/projects/project1/grovalizacao_video.mp4",
      tools: ["Adobe Premiere Pro", "Adobe After Effects", "Adobe Audition"],
      themeColor: "#6b7ed9"
    },
    {
      id: 2,
      title: "FlashGay 3° Edição",
      category: "Cobertura de Eventos",
      description: "Na 3° edição do Flashgay, capturei cada detalhe desse evento que vai além da arte na pele é um espaço de expressão, acolhimento e celebração da comunidade LGBTQIA+. Em um ambiente vibrante e confortável na Dunas Galeria, o vídeo traduz a energia do evento, destacando os traços únicos dos tatuadores, a interação do público e a experiência completa, incluindo gastronomia e conexões autênticas.",
      coverImage: "/images/projects/project2/flashgay_capa.jpg",
      video: "/images/projects/project2/flashgay_video.mp4",
      tools: ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve"],
      themeColor: "#d97fb0"
    },
    {
      id: 3,
      title: "Bastidores Rede Bahia",
      category: "Produção de Vídeo",
      description: "Nos bastidores do programa Papo de Casa Smarçaro, acompanhamos de perto a dinâmica da produção e a essência desse projeto da Rádio GFM em parceria com a Smarçaro Móveis. Com um olhar acessível, registramos detalhes dos preparativos técnicos, mostrando como o programa ganha vida antes de chegar ao público. Um vídeo que traduz a autenticidade e o trabalho por trás dos microfones.",
      coverImage: "/images/projects/project3/redebahia_capa.jpg",
      video: "/images/projects/project3/redebahia_video.mp4",
      tools: ["Adobe Premiere Pro", "Adobe Photoshop", "Adobe Audition"],
      themeColor: "#6c95e6"
    },
    {
      id: 4,
      title: "Fito Educação",
      category: "Design para Rede Social",
      description: "Desenvolvi um conjunto de cards para a Fito Educação, criando conteúdos estratégicos para engajar e informar estudantes que se preparam para o ENEM e vestibulares. Com um design atrativo e uma linguagem acessível, os cards abordam curiosidades educacionais, mensagens motivacionais e convites para aulas experimentais, ajudando a conectar a marca com seu público-alvo de forma dinâmica e inspiradora.",
      coverImage: "/images/projects/project4/fitocapa.png",
      images: ["/images/projects/project4/fito1.png", "/images/projects/project4/fito2.png", "/images/projects/project4/fito3.png"],
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Lightroom"],
      themeColor: "#287a7d"
    },
    {
      id: 5,
      title: "Catalogo Carolla",
      category: "Design de Marca",
      description: "Criei um catálogo digital para a coleção da Carolla Bolsas, unindo elegância e funcionalidade em um material visualmente atrativo. Com um design sofisticado, o catálogo destaca a paleta de cores da coleção, imagens detalhadas dos produtos e informações essenciais. Um material pensado para valorizar cada peça e facilitar a experiência do cliente na escolha do modelo ideal.",
      coverImage: "/images/projects/project5/carollacapa.png",
      images: ["/images/projects/project5/carolla1.png", "/images/projects/project5/carolla2.jpg", "/images/projects/project5/carolla3.jpg"],
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Illustrator"],
      link: "/curriculum/catalogo_carolla.pdf",
      themeColor: "#2a0401"
    },
    {
      id: 6,
      title: "Smarçaro Móveis",
      category: "Social Media",
      description: "Como social media da Smarçaro Móveis, desenvolvo conteúdos que traduzem a sofisticação e qualidade dos produtos vendidos na loja. Explore a elegância e funcionalidade de cada peça clicando no botão Ver Projeto Online para conferir mais no Instagram oficial da loja!",
      coverImage: "/images/projects/project6/smarcarocapa.jpg",
      images: [
        "/images/projects/project6/smarcaro1.JPG", 
        "/images/projects/project6/smarcaro2.JPG", 
        "/images/projects/project6/smarcaro3.jpg",
        "/images/projects/project6/smarcaro4.JPG",
        "/images/projects/project6/smarcaro5.JPG",
        "/images/projects/project6/smarcaro6.jpg",
        "/images/projects/project6/smarcaro7.jpg",
        "/images/projects/project6/smarcaro8.jpg"
      ],
      tools: ["Adobe Photoshop", "Adobe Illustrator", "Lightroom"],
      link: "https://www.instagram.com/smarcaro/",
      themeColor: "#ba9159"
    }
  ];

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeProjectModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Verificar preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Otimização: usar throttle para reduzir chamadas de scroll
    let scrollTimer;
    const handleScroll = () => {
      // Verificar scroll apenas se não houver um timer ativo
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          if (window.scrollY > 50) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
    
          // Atualizar a aba ativa com base na posição do scroll
          const sections = ["home", "about", "services", "skills", "projects", "testimonials", "contact"];
          const scrollPosition = window.scrollY + 150;
    
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;
    
              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setActiveTab(section);
                break;
              }
            }
          }
          
          scrollTimer = null;
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Inicializar as animações
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Impedir rolagem quando o menu estiver aberto
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Fechar menu mobile quando clicar em links ou quando a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);
  
  // Fechar menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (e) => {
      const header = document.querySelector('header');
      const mobileMenu = document.querySelector('.mobile-menu');
      
      if (mobileMenuOpen && 
          e.target !== mobileMenu && 
          !mobileMenu?.contains(e.target) && 
          e.target !== header && 
          !header?.contains(e.target)) {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const form = e.target;
      // Log para verificar os valores do formulário
      const templateParams = {
        from_name: form.from_name.value,
        from_email: form.from_email.value,
        message: form.message.value,
        to_name: 'Natalia Gomes'
      };
      
      console.log('Dados do formulário:', templateParams);
      
      // Verifica se o EmailJS está inicializado
      console.log('EmailJS inicializado:', !!emailjs);
      
      // Usando o método send
      const result = await emailjs.send(
        'service_cekkxcl', // Seu Service ID
        'template_6elivwo', // Seu Template ID
        templateParams,
        'gbDQhCD-KJGUHL6nT' // Sua Public Key
      );
      
      console.log('Resposta do EmailJS:', result);

      setFormStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
      });
      form.reset();
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      // Detalhar melhor o erro
      setFormStatus({
        type: 'error',
        message: `Erro ao enviar: ${error.message || 'Verifique sua conexão e tente novamente'}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Background animado */}
      <AnimatedBackground />
      
      {/* Header/Navbar - Tamanho reduzido */}
      <header className="flex justify-between items-center py-6 px-4 sm:px-8 sticky top-0 bg-white dark:bg-gray-900 z-50 shadow-sm">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg transform hover:rotate-12 transition-transform duration-300 shadow-lg">
            NG
          </div>
          <span className="ml-3 font-medium text-lg">Natalia Gomes</span>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link 
            href="#" 
            className={`text-gray-800 dark:text-white hover:text-primary transition-colors ${activeTab === "home" ? "text-primary font-semibold" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            Home
          </Link>
          <Link 
            href="#about" 
            className={`text-gray-800 dark:text-white hover:text-primary transition-colors ${activeTab === "about" ? "text-primary font-semibold" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            Sobre
          </Link>
          <Link 
            href="#services" 
            className={`text-gray-800 dark:text-white hover:text-primary transition-colors ${activeTab === "services" ? "text-primary font-semibold" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            Serviços
          </Link>
          <Link 
            href="#skills" 
            className={`text-gray-800 dark:text-white hover:text-primary transition-colors ${activeTab === "skills" ? "text-primary font-semibold" : ""}`}
            onClick={() => setActiveTab("skills")}
          >
            Habilidades
          </Link>
          <Link 
            href="#projects" 
            className={`text-gray-800 dark:text-white hover:text-primary transition-colors ${activeTab === "projects" ? "text-primary font-semibold" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Projetos
          </Link>
          <Link 
            href="#testimonials" 
            className={`text-gray-800 dark:text-white hover:text-primary transition-colors ${activeTab === "testimonials" ? "text-primary font-semibold" : ""}`}
            onClick={() => setActiveTab("testimonials")}
          >
            Depoimentos
          </Link>
          <Link 
            href="#contact" 
            className={`text-gray-800 dark:text-white hover:text-primary transition-colors ${activeTab === "contact" ? "text-primary font-semibold" : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            Contato
          </Link>
        </nav>
        
        <div className="flex items-center">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors duration-300"
            aria-label="Alternar tema"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          {/* Hamburger Button */}
          <button 
            className="hamburger-button ml-4" 
            onClick={toggleMobileMenu}
            aria-label="Menu principal"
          >
            <div className={`hamburger-icon ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>

      {/* Menu Mobile */}
      <div 
        className={`mobile-menu ${mobileMenuOpen ? "visible" : "hidden"}`}
        onClick={(e) => e.target === e.currentTarget && toggleMobileMenu()}
      >
        <nav className="flex flex-col space-y-6 text-center">
          <Link 
            href="#" 
            className={`text-xl py-2 border-b border-gray-200 dark:border-gray-800 ${activeTab === "home" ? "text-primary font-semibold" : ""}`}
            onClick={() => { setMobileMenuOpen(false); setActiveTab("home"); document.body.style.overflow = 'auto'; }}
          >
            Home
          </Link>
          <Link 
            href="#about" 
            className={`text-xl py-2 border-b border-gray-200 dark:border-gray-800 ${activeTab === "about" ? "text-primary font-semibold" : ""}`}
            onClick={() => { setMobileMenuOpen(false); setActiveTab("about"); document.body.style.overflow = 'auto'; }}
          >
            Sobre
          </Link>
          <Link 
            href="#services" 
            className={`text-xl py-2 border-b border-gray-200 dark:border-gray-800 ${activeTab === "services" ? "text-primary font-semibold" : ""}`}
            onClick={() => { setMobileMenuOpen(false); setActiveTab("services"); document.body.style.overflow = 'auto'; }}
          >
            Serviços
          </Link>
          <Link 
            href="#skills" 
            className={`text-xl py-2 border-b border-gray-200 dark:border-gray-800 ${activeTab === "skills" ? "text-primary font-semibold" : ""}`}
            onClick={() => { setMobileMenuOpen(false); setActiveTab("skills"); document.body.style.overflow = 'auto'; }}
          >
            Habilidades
          </Link>
          <Link 
            href="#projects" 
            className={`text-xl py-2 border-b border-gray-200 dark:border-gray-800 ${activeTab === "projects" ? "text-primary font-semibold" : ""}`}
            onClick={() => { setMobileMenuOpen(false); setActiveTab("projects"); document.body.style.overflow = 'auto'; }}
          >
            Projetos
          </Link>
          <Link 
            href="#testimonials" 
            className={`text-xl py-2 border-b border-gray-200 dark:border-gray-800 ${activeTab === "testimonials" ? "text-primary font-semibold" : ""}`}
            onClick={() => { setMobileMenuOpen(false); setActiveTab("testimonials"); document.body.style.overflow = 'auto'; }}
          >
            Depoimentos
          </Link>
          <Link 
            href="#contact" 
            className={`text-xl py-2 border-b border-gray-200 dark:border-gray-800 ${activeTab === "contact" ? "text-primary font-semibold" : ""}`}
            onClick={() => { setMobileMenuOpen(false); setActiveTab("contact"); document.body.style.overflow = 'auto'; }}
          >
            Contato
          </Link>
          
          {/* Botão de tema no menu móvel */}
          <div className="py-4 flex justify-center">
            <button 
              onClick={() => { toggleTheme(); setMobileMenuOpen(false); document.body.style.overflow = 'auto'; }}
              className="flex items-center justify-center p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white transition-colors duration-300"
              aria-label="Alternar tema"
            >
              {darkMode ? (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Modo Claro</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>Modo Escuro</span>
                </div>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-16 px-4 sm:px-8 md:px-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 opacity-0 animate-[fadeInUp_0.8s_0.3s_forwards]">
            <span className="gradient-text">Transformando Ideias</span><br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl opacity-0 animate-[fadeInUp_0.8s_1s_forwards]">em Experiências Visuais</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl text-gray-700 dark:text-gray-300 opacity-0 animate-[fadeInUp_0.8s_0.5s_forwards]">
            Social Media com mais de 5 anos de experiência em branding, design gráfico e estratégia digital.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 opacity-0 animate-[fadeInUp_0.8s_0.7s_forwards]">
            <Link href="#projects" className="btn-primary inline-block hover:scale-105 transition-transform duration-300 spotlight">
              Conheça Meus Projetos
            </Link>
            <a 
              href="/curriculum/natalia_cv.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block px-3 sm:px-5 py-2 sm:py-3 bg-white text-primary border border-primary rounded-lg shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 spotlight dark:bg-gray-800 dark:text-gray-300 dark:border-primary font-medium text-sm sm:text-base"
            >
              Baixar Currículo
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex-1 transform translate-y-8 opacity-0 transition-all duration-700 ease-out" 
              data-aos="fade-up">
            <h2 className="text-3xl font-bold mb-6 relative">
              Sobre Mim
              <span className="section-title-underline"></span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 reveal-mask">
            Sou Social Media, Designer Gráfica e Estrategista Digital, especializada em gestão de redes sociais, identidade visual e conteúdo criativo. Minha experiência em diversos nichos me permite compreender as particularidades de cada mercado, adaptando estratégias para destacar o que cada marca tem de mais autêntico e fortalecer sua presença digital. Acredito que interações humanizadas são a chave para criar conexões genuínas e impulsionar o engajamento real do público.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 reveal-mask" style={{ animationDelay: '0.3s' }}>
            Ajudo grandes negócios e marcas pessoais a se destacarem no digital com estratégias personalizadas. Meu trabalho envolve a gestão de redes sociais para aumentar visibilidade e engajamento, a criação de Reels e conteúdos criativos para gerar impacto digital, o desenvolvimento de identidade visual e branding para fortalecer a autoridade da marca e consultoria estratégica para definir um posicionamento de sucesso. Se você deseja levar sua marca para o próximo nível, vamos conversar!
            </p>
          </div>
          <div className="flex-1 relative transform translate-y-8 opacity-0 transition-all duration-700 delay-200 ease-out"
              data-aos="fade-up">
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative h-96 md:h-[450px] rounded-lg overflow-hidden group hover-tilt spotlight" id="profile-img">
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src="/images/profile/natalia_perfil.jpg"
                  alt="Minha Foto de Perfil"
                  className="max-w-full max-h-full object-cover transition-transform duration-300 rounded-lg"
                />
              </div>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <section id="projects" className="py-16 px-8 md:px-16 relative">
        <div className="absolute inset-0 dot-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 relative">
            Projetos em Destaque
            <span className="section-title-underline"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="overflow-hidden transform hover:scale-[1.02] transition-all duration-300 opacity-0 translate-y-8 hover-tilt spotlight rounded-xl shadow-md p-0 relative cursor-pointer group"
                data-aos="fade-up" 
                data-aos-delay={index * 150}
                onClick={() => openProjectModal(project)}
                style={{
                  background: 'var(--card-bg)',
                  boxShadow: 'var(--card-shadow)',
                  borderLeft: '4px solid var(--primary)',
                  borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
                  borderRight: '1px solid rgba(124, 58, 237, 0.1)',
                  borderTop: '1px solid rgba(124, 58, 237, 0.1)'
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {project.coverImage ? (
                    <img 
                      src={project.coverImage} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${project.themeColor}40, ${project.themeColor}20)`,
                          backgroundSize: 'cover',
                        }}>
                      <div className="h-full w-full flex items-center justify-center">
                        <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  )}
                  {project.video && (
                    <div className="absolute bottom-3 right-3 bg-primary/80 rounded-full p-2 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {project.images && project.images.length > 0 && !project.video && (
                    <div className="absolute bottom-3 right-3 bg-primary/80 rounded-full p-2 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold mb-2 inline-block relative gradient-text">
                    {project.category}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                    {project.description.slice(0, 100)}...
                  </p>
                  <div 
                    className="text-primary font-medium hover:underline flex items-center gap-1 gradient-text"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjectModal(project);
                    }}
                  >
                    Ver Detalhes
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-colors duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 relative">
            Depoimentos
            <span className="section-title-underline"></span>
          </h2>
            <VideoTestimonials />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 relative">
            Entre em Contato!
            <span className="section-title-underline"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="opacity-0 translate-y-8" data-aos="fade-up">
              <form onSubmit={handleSubmit} className="space-y-6 rounded-xl shadow-md p-8 border border-transparent relative overflow-hidden"
                    style={{
                      background: 'var(--card-bg)',
                      boxShadow: 'var(--card-shadow)',
                      borderLeft: '4px solid var(--secondary)',
                      borderBottom: '1px solid rgba(37, 99, 235, 0.2)',
                      borderRight: '1px solid rgba(37, 99, 235, 0.1)',
                      borderTop: '1px solid rgba(37, 99, 235, 0.1)'
                    }}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-primary"></div>
                
                {formStatus.message && (
                  <div className={`p-4 rounded-lg ${
                    formStatus.type === 'success' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' 
                      : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100'
                  }`}>
                    {formStatus.message}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Nome</label>
                  <input 
                    type="text" 
                    name="from_name"
                    id="name" 
                    required
                    placeholder="Seu nome" 
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transform transition-transform duration-200 hover:scale-[1.01] focus:scale-[1.01]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    name="from_email"
                    id="email" 
                    required
                    placeholder="seu@email.com" 
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transform transition-transform duration-200 hover:scale-[1.01] focus:scale-[1.01]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">Mensagem</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows="5" 
                    required
                    placeholder="Sua mensagem aqui..." 
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transform transition-transform duration-200 hover:scale-[1.01] focus:scale-[1.01]"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`btn-primary flex items-center gap-2 hover:scale-105 transition-transform duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                      </svg>
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="rounded-xl shadow-md p-8 transform hover:shadow-lg transition-all duration-300 opacity-0 translate-y-8 relative overflow-hidden"
                data-aos="fade-up" data-aos-delay="150"
                style={{
                  background: 'var(--card-bg)',
                  boxShadow: 'var(--card-shadow)',
                  borderLeft: '4px solid var(--accent)',
                  borderBottom: '1px solid rgba(244, 63, 94, 0.2)',
                  borderRight: '1px solid rgba(244, 63, 94, 0.1)',
                  borderTop: '1px solid rgba(244, 63, 94, 0.1)'
                }}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent2"></div>
              <h3 className="text-xl font-bold mb-6 gradient-text">Vamos conversar!</h3>
              <p className="mb-8 text-gray-700 dark:text-gray-300">
              Uma identidade visual forte, conteúdos bem planejados e materiais de qualidade fazem toda a diferença para destacar uma marca, impulsionar um negócio ou fortalecer a presença online. Meu trabalho vai além da estética, busco entender a essência de cada projeto para criar algo autêntico e estratégico. Se você quer elevar sua página, loja ou marca pessoal para um novo nível, estou aqui para ajudar! Vamos conversar? Me chame pelo formulário ou pelas redes sociais, e juntos podemos transformar suas ideias em realidade.
              </p>
              <div className="mb-4">
                <h4 className="font-medium mb-2">Email</h4>
                <a href="mailto:contatonikadigital@gmail.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline gradient-text">contatonikadigital@gmail.com</a>
              </div>
              <div>
                <h4 className="font-medium mb-2">Redes Sociais</h4>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/natalia-de-andrade-gomes-7528b31a4/" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full flex items-center justify-center transform hover:rotate-6 transition-all duration-300"
                    style={{
                      background: 'var(--gradient-primary)',
                      boxShadow: 'var(--card-shadow)',
                      color: 'white'
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg hover:rotate-12 transition-transform duration-300">
                  NG
                </div>
                <span className="ml-2 text-xl font-bold gradient-text">Natalia Gomes</span>
              </div>
              <p className="text-gray-300 mb-4">
                Criando experiências digitais memoráveis que conectam marcas com pessoas.
              </p>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/natalia-de-andrade-gomes-7528b31a4/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 gradient-text">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-300 hover:text-primary transition-colors duration-300">Home</Link></li>
                <li><Link href="#about" className="text-gray-300 hover:text-primary transition-colors duration-300">Sobre</Link></li>
                <li><Link href="#services" className="text-gray-300 hover:text-primary transition-colors duration-300">Serviços</Link></li>
                <li><Link href="#projects" className="text-gray-300 hover:text-primary transition-colors duration-300">Projetos</Link></li>
                <li><Link href="#testimonials" className="text-gray-300 hover:text-primary transition-colors duration-300">Depoimentos</Link></li>
                <li><Link href="#contact" className="text-gray-300 hover:text-primary transition-colors duration-300">Contato</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 gradient-text">Serviços</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-300 hover:text-primary transition-colors duration-300">Design Gráfico</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-primary transition-colors duration-300">Social Media</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-primary transition-colors duration-300">Produção de Fotos e Vídeos</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-primary transition-colors duration-300">Assessoria Profissional</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 gradient-text">Contato</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                    </svg>
                  </div>
                  <a href="mailto:contatonikadigital@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors duration-300">contatonikadigital@gmail.com</a>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                  </div>
                  <span className="text-gray-300">Salvador, BA - Brasil</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Natalia Gomes. Todos os direitos reservados.</p>
            <div className="flex items-center gap-2">
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Projeto */}
      <ProjectModal 
        isOpen={showModal} 
        onClose={closeProjectModal} 
        project={selectedProject} 
      />
    </div>
  );
}

// Definir animações personalizadas para o Tailwind
// Será necessário adicionar ao tailwind.config.js