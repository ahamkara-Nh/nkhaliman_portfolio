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
    '/src/assets/case-images/second-case/painpoint1.svg',
    '/src/assets/case-images/second-case/painpoint2.svg',
    '/src/assets/case-images/second-case/painpoint3.svg'
  ];

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
    if (fullscreenImage.includes('story1.svg')) {
      return 'Storyboard AS IS';
    } else if (fullscreenImage.includes('painpoint')) {
      return 'Анализ болей пользователей';
    }
    return 'Анализ болей пользователей'; // Default fallback
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
  return (
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
                <a href="#placeholder" className={styles['case-tbanks__toc-link']}>Coming soon ...</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#placeholder" className={styles['case-tbanks__toc-link']}>Coming soon ...</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#placeholder" className={styles['case-tbanks__toc-link']}>Coming soon ...</a>
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
              onClick={() => openFullscreen("/src/assets/case-images/second-case/story1.svg")}
              style={{ cursor: 'pointer', marginTop: '8px', marginBottom: '24px', width: '100%' }}
            >
              <img
                src="/src/assets/case-images/second-case/story1.svg"
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
    </div>
  );
}
