import styles from './case-tbanks.module.css';
import { useState, useRef, useEffect } from 'react';

export default function CaseTBanks() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState('');
  const [zoomLevel, setZoomLevel] = useState(0.25); // 25% default zoom for screenshots
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const diagramRef = useRef<HTMLDivElement>(null);
  const touchStartDistance = useRef<number>(0);

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselImages = [
    '/src/assets/case-images/second-case/painpoint1.png',
    '/src/assets/case-images/second-case/painpoint2.png',
    '/src/assets/case-images/second-case/painpoint3.png'
  ];

  // Solution carousel state
  const [currentSolutionImageIndex, setCurrentSolutionImageIndex] = useState(0);
  const solutionCarouselImages = [
    '/src/assets/case-images/second-case/tobe1.png',
    '/src/assets/case-images/second-case/tobe2.png'
  ];

  // Prototype loading state
  const [isPrototypeLoaded, setIsPrototypeLoaded] = useState(false);
  const [isOutcomesLoaded, setIsOutcomesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Lazy loading states for iframes
  const [isPrototypeInView, setIsPrototypeInView] = useState(false);
  const [isOutcomesInView, setIsOutcomesInView] = useState(false);
  const prototypeRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);

  // Back to top state
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openFullscreen = (imageSrc: string) => {
    setFullscreenImage(imageSrc);
    setIsFullscreen(true);
    // Set default zoom based on device type
    const isMobile = window.innerWidth <= 768;
    setZoomLevel(isMobile ? 2.0 : 0.85); // 200% for mobile, 85% for desktop
    setCurrentPosition({ x: 0, y: 0 }); // Reset position
  };

  // Determine header based on image source
  const getFullscreenHeader = () => {
    if (fullscreenImage.includes('story1.png')) {
      return 'Storyboard AS IS';
    } else if (fullscreenImage.includes('painpoint')) {
      return 'Анализ болей пользователей';
    }
    return 'Storyboard TO BE'; // Default fallback
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(0.25); // Reset zoom when closing fullscreen
    setCurrentPosition({ x: 0, y: 0 }); // Reset position when closing fullscreen
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3)); // Max zoom 3x, 5% increment
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.1)); // Min zoom 0.1x (10%), 5% decrement
  };

  const resetZoom = () => {
    setZoomLevel(0.25);
    setCurrentPosition({ x: 0, y: 0 });
  };

  // Handle mouse wheel zoom
  const handleWheelZoom = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  // Handle mouse drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - currentPosition.x, y: e.clientY - currentPosition.y });
    if (diagramRef.current) {
      diagramRef.current.style.cursor = 'grabbing';
    }
  };

  // Handle mouse drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setCurrentPosition({ x: newX, y: newY });
    }
  };

  // Handle mouse drag end
  const handleMouseUp = () => {
    setIsDragging(false);
    if (diagramRef.current) {
      diagramRef.current.style.cursor = 'grab';
    }
  };

  // Handle touch pinch zoom and panning
  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault(); // Prevent default scrolling behavior
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      touchStartDistance.current = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
    } else if (e.touches.length === 1) {
      // Single touch for panning
      e.preventDefault(); // Prevent default scrolling behavior
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - currentPosition.x,
        y: e.touches[0].clientY - currentPosition.y
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault(); // Prevent default scrolling behavior
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      if (touchStartDistance.current > 0) {
        const scaleChange = currentDistance / touchStartDistance.current;
        const newZoomLevel = Math.min(Math.max(zoomLevel * scaleChange, 0.5), 3);
        setZoomLevel(newZoomLevel);
        touchStartDistance.current = currentDistance;
      }
    } else if (e.touches.length === 1 && isDragging) {
      e.preventDefault(); // Prevent default scrolling behavior
      const newX = e.touches[0].clientX - dragStart.x;
      const newY = e.touches[0].clientY - dragStart.y;
      setCurrentPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartDistance.current = 0;
  };

  // Update cursor based on zoom level and dragging state
  useEffect(() => {
    if (diagramRef.current) {
      if (isDragging) {
        diagramRef.current.style.cursor = 'grabbing';
      } else {
        diagramRef.current.style.cursor = 'grab';
      }
    }
  }, [isDragging]);

  // Carousel navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Solution carousel navigation functions
  const nextSolutionImage = () => {
    setCurrentSolutionImageIndex((prev) => (prev + 1) % solutionCarouselImages.length);
  };

  const prevSolutionImage = () => {
    setCurrentSolutionImageIndex((prev) => (prev - 1 + solutionCarouselImages.length) % solutionCarouselImages.length);
  };

  const goToSolutionImage = (index: number) => {
    setCurrentSolutionImageIndex(index);
  };

  // Add event listeners for zoom functionality
  useEffect(() => {
    if (isFullscreen && diagramRef.current) {
      const element = diagramRef.current;

      // Add wheel event listener
      element.addEventListener('wheel', handleWheelZoom as EventListener, { passive: false });

      // Add touch event listeners
      element.addEventListener('touchstart', handleTouchStart as EventListener, { passive: false });
      element.addEventListener('touchmove', handleTouchMove as EventListener, { passive: false });
      element.addEventListener('touchend', handleTouchEnd as EventListener, { passive: false });

      return () => {
        element.removeEventListener('wheel', handleWheelZoom as EventListener);
        element.removeEventListener('touchstart', handleTouchStart as EventListener);
        element.removeEventListener('touchmove', handleTouchMove as EventListener);
        element.removeEventListener('touchend', handleTouchEnd as EventListener);
      };
    }
  }, [isFullscreen, zoomLevel, isDragging, currentPosition]);

  // Intersection Observer for lazy loading iframes
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === prototypeRef.current) {
            setIsPrototypeInView(true);
          } else if (entry.target === outcomesRef.current) {
            setIsOutcomesInView(true);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (prototypeRef.current) {
      observer.observe(prototypeRef.current);
    }

    if (outcomesRef.current) {
      observer.observe(outcomesRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style>
        {`
          .case-lowfodmap__telegram-button {
            background: linear-gradient(135deg, #9b9cff, #6cdfdb);
            border: none;
            border-radius: 8px;
            color: #000;
            font-size: 1.125rem;
            font-weight: 600;
            padding: 16px 32px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(155, 156, 255, 0.3);
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          .case-lowfodmap__telegram-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(155, 156, 255, 0.4);
          }

          .case-lowfodmap__telegram-button:active {
            transform: translateY(0);
          }

          @media (max-width: 768px) {
            .case-lowfodmap__telegram-button {
              font-size: 1rem;
              padding: 14px 24px;
            }
          }
        `}
      </style>
      <div className={`${styles['case-page']} ${styles['case-tbanks']}`} role="main" aria-label="Case: T-Bank Recommendation System">
      <section className={styles['case-content']} aria-label="Storyline content">
        <header className={styles['case-tbanks__header']}>
          <h1 className={styles['case-tbanks__title']}>Концепт рекомендательной системы в Т-Банк "Город"</h1>
          <p className={styles['case-tbanks__subtitle']}>Учебный проект с компанией "ТеДо" (Технологии Доверия)</p>
        </header>
        <div className={styles['case-tbanks__description']}>
          <p>
            От безликого раздела к персональному гиду: как мы планировали внедрение новой рекомендательной системы, 
            чтобы увеличить конверсию в 1.5 раза для сервиса "Город" в Т-Банке.
            Разработка концепции рекомендательной системы на основе байесовских сетей — 
            от исследования пользователей до дорожной карты внедрения.
          </p>
        </div>

        <div className={styles['case-tbanks__content-row']}>
          <div className={styles['case-tbanks__table-of-contents']}>
            <h2 className={styles['case-tbanks__section-title']}>Содержание</h2>
            <ul className={styles['case-tbanks__toc-list']}>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#about-project" className={styles['case-tbanks__toc-link']}>1. О проекте</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#user-pain-points" className={styles['case-tbanks__toc-link']}>2. Боли пользователей</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#our-solution" className={styles['case-tbanks__toc-link']}>3. Наше решение</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#outcomes" className={styles['case-tbanks__toc-link']}>4. Итоги</a>
              </li>
            </ul>
          </div>

          <div className={styles['case-tbanks__key-results']}>
            <h2 className={styles['case-tbanks__section-title']}>Мой вклад в групповой проект</h2>
            <div className={styles['case-tbanks__results-grid']}>
              <div className={styles['case-tbanks__result-card']}>
                <div className={styles['case-tbanks__result-number']}>Макет</div>
                <div className={styles['case-tbanks__result-label']}>интерфейса рекомендаций</div>
              </div>
              <div className={styles['case-tbanks__result-card']}>
                <div className={styles['case-tbanks__result-number']} style ={{ minWidth: '100px' }}>3</div>
                <div className={styles['case-tbanks__result-label']}>story board'a</div>
              </div>
              <div className={styles['case-tbanks__result-card']}>
                <div className={styles['case-tbanks__result-number']}>Proposal</div>
                <div className={styles['case-tbanks__result-label']}>презентация</div>
              </div>
            </div>
          </div>
        </div>

        {/* About Project Section */}
        <section id="about-project" className={styles['case-tbanks__about-section']}>
          <h2 className={styles['case-tbanks__about-header']}>О проекте</h2>
          <div className={styles['case-tbanks__about-content']}>
            <div className={styles['case-tbanks__about-text']}>
              <p>
                <strong>Цель проекта</strong> заключалась в том, чтобы превратить сложную технологию — байесовские сети — в понятный и полезный для пользователя продукт. По сути, нам дали алгоритм и попросили «упаковать» его так, чтобы он выглядел как современная рекомендательная система для платформ по продаже билетов.
              </p>
              <p>
                В качестве платформы нами был выбран "<strong>Т.Банк Город</strong>". Мы прорабатывали бизнес-модель и интерфейс, который показывает путь пользователя от первого интереса до покупки билета, помогая ему открывать новые форматы досуга — от музеев и ресторанов до уникальных активностей.
              </p>
              <p>
                <strong>Роль и команда:</strong> Я выступал в роли UX/UI Designer в команде из 4 человек: аналитика, менеджера и исследователя. Мы работали вместе как кросс-функциональная команда, где каждый отвечал за свою экспертизу.
              </p>
              <p>
                <strong>Длительность</strong>: 3 месяца
              </p>
            </div>
            <div className={styles['case-tbanks__about-image']}>
              <img
                src="/src/assets/case-images/second-case/phone_mockup.png"
                alt="Phone mockup showing T-Bank City interface"
                className={styles['case-tbanks__mockup-image']}
              />
            </div>
          </div>
        </section>

        {/* User Pain Points Section */}
        <section id="user-pain-points" className={styles['case-tbanks__pain-section']}>
          <h2 className={styles['case-tbanks__pain-header']}>Боли пользователей</h2>
          <div className={styles['case-tbanks__pain-content']}>
            <p>
              В роли UI/UX дизайнера в этом групповом проекте я взял на себя анализ существующего интерфейса раздела "Город" в мобильном приложении Т-Банка. Это был ключевой шаг, чтобы понять, почему пользователи не получают от сервиса того, чего ожидают: удобного и персонализированного доступа к городской жизни. Я изучил пользовательские пути, проанализировал отзывы и протестировал интерфейс на предмет usability. В результате выявил несколько критических болей, но главной проблемой оказалась полное отсутствие персонализации — раздел "Город" предлагал всем пользователям один и тот же контент, игнорируя их интересы, историю взаимодействий и контекст.
            </p>
            <p>
              Например, главная страница встречала пользователей лишь статичными кнопками сервисов, без каких-либо подсказок или рекомендаций, адаптированных под индивидуальные предпочтения. В самих сервисах контент ограничивался общей лентой новостей и статей, которая не учитывала прошлые действия пользователя, делая навигацию скучной и неэффективной. А в разделе "Афиша" мероприятия сортировались по стандартным категориям — без учета вкусов, геолокации или предыдущих выборов, что заставляло пользователей тратить время на бесполезный скроллинг.
            </p>
            <div
              className="case-lowfodmap__screenshot-container"
              onClick={() => openFullscreen("/src/assets/case-images/second-case/story1.png")}
              style={{ cursor: 'pointer', marginTop: '8px', marginBottom: '24px', width: '100%' }}
            >
              <img
                src="/src/assets/case-images/second-case/story1.png"
                alt="User pain points illustration"
                className="case-lowfodmap__phase-screenshot2"
              />
            </div>
            <p style={{ marginBottom: '1vw', marginTop: '0.5vw' }}>
              Эти проблемы приводили к фрустрации: пользователи, как Серёжа из сториборда, часто уходили ни с чем, не найдя подходящего досуга. 
              Ниже я приведу три слайда из презентации, которые визуально иллюстрируют эти боли на примерах реального интерфейса.
            </p>

            {/* Image Carousel */}
            <div className={styles['case-tbanks__carousel']}>
              <div className={styles['case-tbanks__carousel-container']}>
                

                <div className={styles['case-tbanks__carousel-content']}>
                  <div
                    className={styles['case-tbanks__carousel-image-container']}
                    onClick={() => openFullscreen(carouselImages[currentImageIndex])}
                  >
                    <img
                      src={carouselImages[currentImageIndex]}
                      alt={`Pain point illustration ${currentImageIndex + 1}`}
                      className={styles['case-tbanks__carousel-image']}
                    />
                    <div className={styles['case-tbanks__carousel-fullscreen-hint']}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 21H3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 3L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 21L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Полный экран</span>
                    </div>
                  </div>

                  <div className={styles['case-tbanks__carousel-controls']}>
                    <div
                    className={`${styles['case-tbanks__carousel-arrow']} ${styles['case-tbanks__carousel-arrow--left']}`}
                    onClick={prevImage}
                    aria-label="Previous image"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    <div className={styles['case-tbanks__carousel-indicators']}>
                      {carouselImages.map((_, index) => (
                        <div
                          key={index}
                          className={`${styles['case-tbanks__carousel-indicator']} ${index === currentImageIndex ? styles['active'] : ''}`}
                          onClick={() => goToImage(index)}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div
                    className={`${styles['case-tbanks__carousel-arrow']} ${styles['case-tbanks__carousel-arrow--right']}`}
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Our Solution Section */}
        <section id="our-solution" className={styles['case-tbanks__solution-section']}>
          <h2 className={styles['case-tbanks__solution-header']}>Наше решение</h2>
          <div className={styles['case-tbanks__solution-content']} style={{ alignItems: 'flex-start' }}>
            <h3 className={styles['case-tbanks__solution-subheader']}>Рекомендательная система</h3>
            <p>
              Чтобы преодолеть выявленные боли и превратить раздел "Город" в по-настоящему персонализированный гид по городской жизни, мы предложили внедрить рекомендательную систему на основе байесовских сетей. 
              Данный алгоритм анализирует данные о пользователе (транзакции, история заказов, геолокация, демография и время на странице), чтобы предлагать релевантный контент в реальном времени. 
            </p>
            <p>
              Для иллюстрации, как это изменит пользовательский опыт, я сделал TO BE сториборды. В них Серёжа сразу видит персонализированные предложения на главной странице — например, фильм от любимого режиссёра с удобным временем и 15% кэшбеком, — и легко покупает билеты, уходя довольным. А Алиса, фанатка музыки, получает рекомендацию на концерт в другом городе с доступными билетами на самолёт, что делает поездку реальной.
            </p>

            {/* Solution Image Carousel */}
            <div className={styles['case-tbanks__carousel']}>
              <div className={styles['case-tbanks__carousel-container']}>
                <div className={styles['case-tbanks__carousel-content']}>
                  <div
                    className={styles['case-tbanks__carousel-image-container']}
                    onClick={() => openFullscreen(solutionCarouselImages[currentSolutionImageIndex])}
                  >
                    <img
                      src={solutionCarouselImages[currentSolutionImageIndex]}
                      alt={`TO BE storyboard ${currentSolutionImageIndex + 1}`}
                      className={styles['case-tbanks__carousel-image']}
                    />
                    <div className={styles['case-tbanks__carousel-fullscreen-hint']}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 21H3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 3L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 21L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Полный экран</span>
                    </div>
                  </div>

                  <div className={styles['case-tbanks__carousel-controls']}>
                    <div
                      className={`${styles['case-tbanks__carousel-arrow']} ${styles['case-tbanks__carousel-arrow--left']}`}
                      onClick={prevSolutionImage}
                      aria-label="Previous image"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    <div className={styles['case-tbanks__carousel-indicators']}>
                      {solutionCarouselImages.map((_, index) => (
                        <div
                          key={index}
                          className={`${styles['case-tbanks__carousel-indicator']} ${index === currentSolutionImageIndex ? styles['active'] : ''}`}
                          onClick={() => goToSolutionImage(index)}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div
                      className={`${styles['case-tbanks__carousel-arrow']} ${styles['case-tbanks__carousel-arrow--right']}`}
                      onClick={nextSolutionImage}
                      aria-label="Next image"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className={styles['case-tbanks__solution-subheader']} style={{ marginTop: '32px'}}>Макет интерфейса</h3>
            <p>
              Как UI/UX дизайнер, я взялся за то, чтобы эти рекомендации вписались в существующий интерфейс, начиная от главной страницы, где они встречают пользователя сразу, и до умных всплывающих окон с кросс-рекомендациями, которые подкидывают дополнительные идеи в нужный момент.
            </p>

            <div ref={prototypeRef} className={styles['case-tbanks__prototype-container']}>
              {isMobile && !isPrototypeLoaded ? (
                <div className={styles['case-tbanks__mobile-banner']}>
                  <div className={styles['case-tbanks__mobile-banner-content']}>
                    <div className={styles['case-tbanks__mobile-banner-text']}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>Интерактивный прототип интерфейса</span>
                    </div>
                    <button
                      className="case-lowfodmap__telegram-button"
                      onClick={() => setIsPrototypeLoaded(true)}
                    >
                      Загрузить прототип
                    </button>
                  </div>
                </div>
              ) : isPrototypeInView || isPrototypeLoaded ? (
                <iframe
                  src="https://embed.figma.com/proto/abaStT5Mi9iiEgAs4sdcrK/%D0%A2%D0%B5%D0%94%D0%BE?page-id=0%3A1&node-id=734-32&viewport=1424%2C482%2C0.11&scaling=scale-down&content-scaling=fixed&starting-point-node-id=734%3A32&embed-host=share&footer=false&theme=dark"
                  allowFullScreen
                  title="T-Bank City Interface Prototype"
                />
              ) : (
                <div className={styles['case-tbanks__iframe-placeholder']}>
                  <div className={styles['case-tbanks__iframe-placeholder-content']}>
                    <div className={styles['case-tbanks__iframe-placeholder-text']}>
                      Интерактивный прототип интерфейса
                    </div>
                    <div className={styles['case-tbanks__iframe-placeholder-subtext']}>
                      Прокрутите вниз, чтобы загрузить
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Outcomes Section */}
        <section id="outcomes" className={styles['case-tbanks__outcomes-section']}>
          <h2 className={styles['case-tbanks__outcomes-header']}>Итоги</h2>
          <div className={styles['case-tbanks__outcomes-content']}>
            <p>
              В этом проекте я, как UI/UX дизайнер, взял на себя создание макетов возможного интерфейса для раздела "Город" в приложении Т-Банка, интегрируя туда рекомендательную систему на основе байесовских сетей. Кроме того, я полностью собрал proposal-презентацию: от построения сторителлинга (чтобы "заказчик" сразу вник в суть через истории и визуалы) до финального визуального оформления — выбрал цвета, шрифты, диаграммы, чтобы всё выглядело убедительно и стильно.
              <br /><br />
              Конечно, проект был командным, так что я тесно взаимодействовал с другими участниками: обсуждал, как дизайн стыкуется с технической частью, и оформлял их техническую документацию — диаграммы C4, sequence диаграммы, риски и метрики — чтобы всё вписалось в презентацию гладко и логично. Если хотите погрузиться глубже, полную презентацию можете посмотреть ниже — там все детали, от сторибордов до дорожной карты.
              <br /><br />
              Или можете <a
                href="https://www.figma.com/proto/abaStT5Mi9iiEgAs4sdcrK/%D0%A2%D0%B5%D0%94%D0%BE?page-id=48%3A20&node-id=114-126&starting-point-node-id=114%3A126&scaling=scale-down&content-scaling=fixed&t=zfUzUJYFW0MMz7WD-1"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--accent)',
                  textDecoration: 'underline',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgba(155, 156, 255, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--accent)';
                }}
              >
                перейти по ссылке
              </a>, чтобы открыть презентацию
            </p>
            <div ref={outcomesRef} className={styles['case-tbanks__outcomes-iframe-container']}>
              {isMobile && !isOutcomesLoaded ? (
                <div className={styles['case-tbanks__mobile-banner']}>
                  <div className={styles['case-tbanks__mobile-banner-content']}>
                    <div className={styles['case-tbanks__mobile-banner-text']}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>Figma презентация проекта</span>
                    </div>
                    <button
                      className="case-lowfodmap__telegram-button"
                      onClick={() => setIsOutcomesLoaded(true)}
                    >
                      Загрузить презентацию
                    </button>
                  </div>
                </div>
              ) : isOutcomesInView || isOutcomesLoaded ? (
                <iframe
                  style={{border: '1px solid rgba(0, 0, 0, 0.1)'}}
                  width="800"
                  height="450"
                  src="https://embed.figma.com/proto/abaStT5Mi9iiEgAs4sdcrK/%D0%A2%D0%B5%D0%94%D0%BE?page-id=48%3A20&node-id=114-126&starting-point-node-id=114%3A126&scaling=scale-down&content-scaling=fixed&embed-host=share&footer=false&theme=dark"
                  allowFullScreen
                  title="T-Bank City Interface Prototype - Outcomes"
                />
              ) : (
                <div className={styles['case-tbanks__iframe-placeholder']}>
                  <div className={styles['case-tbanks__iframe-placeholder-content']}>
                    <div className={styles['case-tbanks__iframe-placeholder-text']}>
                      Figma презентация проекта
                    </div>
                    <div className={styles['case-tbanks__iframe-placeholder-subtext']}>
                      Прокрутите вниз, чтобы загрузить
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="case-lowfodmap__fullscreen-overlay case-lowfodmap__fullscreen-overlay--phase2" onClick={closeFullscreen}>
          <div className="case-lowfodmap__fullscreen-modal" onClick={(e) => e.stopPropagation()}>
            <div className="case-lowfodmap__fullscreen-header">
              <h3>{getFullscreenHeader()}</h3>
              <div className="case-lowfodmap__zoom-controls">
                <button
                  className="case-lowfodmap__zoom-button"
                  onClick={zoomOut}
                  aria-label="Уменьшить"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="case-lowfodmap__zoom-level-container">
                  <span className="case-lowfodmap__zoom-level-text">{Math.round(zoomLevel * 100)}%</span>
                  <div className="case-lowfodmap__zoom-level-bar">
                    <div
                      className="case-lowfodmap__zoom-level-fill"
                      style={{ width: `${((zoomLevel - 0.1) / 2.9) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  className="case-lowfodmap__zoom-button"
                  onClick={zoomIn}
                  aria-label="Увеличить"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="case-lowfodmap__zoom-button case-lowfodmap__zoom-reset-button"
                  onClick={resetZoom}
                  aria-label="Сбросить масштаб"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4V9H4.5M4.5 9H9M4.5 9V13.5M20 20V15H19.5M19.5 15H15M19.5 15V9.5M16 16L20 20L16 16ZM8 8L4 4L8 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="case-lowfodmap__fullscreen-close" onClick={closeFullscreen} aria-label="Закрыть">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div
              className={`case-lowfodmap__fullscreen-content--phase2 ${isFullscreen ? 'case-lowfodmap__fullscreen-content--phase2' : ''} ${isDragging ? 'case-lowfodmap__fullscreen-content--dragging' : ''}`}
              ref={diagramRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="case-lowfodmap__zoom-instructions">
                <span className="case-lowfodmap__zoom-instruction-text">
                  Используйте колесо мыши или пинч для масштабирования, перетаскивание для навигации
                </span>
              </div>
              <img
                src={fullscreenImage}
                alt="Иллюстрация болей пользователей"
                className="case-lowfodmap__fullscreen-diagram"
                style={{
                  transform: `scale(${zoomLevel}) translate(${currentPosition.x/zoomLevel}px, ${currentPosition.y/zoomLevel}px)`,
                  transformOrigin: 'center center'
                }}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button
        className={`case-lowfodmap__back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Наверх"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
    </>
  );
}
