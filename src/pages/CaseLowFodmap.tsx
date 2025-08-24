import './case-lowfodmap.css';
import { useState, useRef, useEffect } from 'react';
import { useRive } from '@rive-app/react-canvas';

// Rive Phase Tracker Component
function RivePhaseTracker() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial render
    checkIsMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup listener
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  const { RiveComponent } = useRive({
    src: isMobile ? '/src/assets/fodmap-mobile.riv' : '/src/assets/fodmap.riv',
    autoplay: true,
    stateMachines: isMobile ? 'State Machine 2' : 'State Machine 1', // Use State Machine 2 for mobile
  });

  return (
    <div className="case-lowfodmap__rive-container">
      <RiveComponent className="case-lowfodmap__rive-animation" />
      {!isMobile && (
        <div className="case-lowfodmap__interactive-indicator">
          <svg className="case-lowfodmap__indicator-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="case-lowfodmap__indicator-text">Наведите курсор</span>
        </div>
      )}
    </div>
  );
}

export default function CaseLowFodmap() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPhase2Fullscreen, setIsPhase2Fullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState('');
  const [zoomLevel, setZoomLevel] = useState(0.25); // 25% default zoom for Phase 2
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [currentScreen, setCurrentScreen] = useState(0);
  const diagramRef = useRef<HTMLDivElement>(null);
  const touchStartDistance = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const openFullscreen = () => {
    setIsFullscreen(true);
    setZoomLevel(1); // Reset zoom when opening fullscreen
    setCurrentPosition({ x: 0, y: 0 }); // Reset position when opening fullscreen
  };

  const openPhase2Fullscreen = (imageSrc: string) => {
    setFullscreenImage(imageSrc);
    setIsPhase2Fullscreen(true);
    setZoomLevel(0.25); // Set default zoom to 25% for Phase 2 screenshots
    setCurrentPosition({ x: 0, y: 0 }); // Reset position
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(1); // Reset zoom when closing fullscreen
    setCurrentPosition({ x: 0, y: 0 }); // Reset position when closing fullscreen
  };

  const closePhase2Fullscreen = () => {
    setIsPhase2Fullscreen(false);
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
    setZoomLevel(isPhase2Fullscreen ? 0.25 : 1);
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

  // Add event listeners for zoom functionality
  useEffect(() => {
    if ((isFullscreen || isPhase2Fullscreen) && diagramRef.current) {
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
  }, [isFullscreen, isPhase2Fullscreen, zoomLevel, isDragging, currentPosition]);

  // Handle carousel navigation
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentScreen * 100}%)`;
    }
  }, [currentScreen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentScreen(currentScreen === 0 ? 3 : currentScreen - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentScreen(currentScreen === 3 ? 0 : currentScreen + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentScreen]);

  return (
    <div className="case-page case-lowfodmap" role="main" aria-label="Case: Low-FODMAP">
      <section className="case-content" aria-label="Storyline content">
        <header className="case-lowfodmap__header">
          <h1 className="case-lowfodmap__title">Трекер low-FODMAP диеты, Telegram Mini-App</h1>
          <p className="case-lowfodmap__subtitle">Дипломный проект ВШЭ</p>
        </header>
        <div className="case-lowfodmap__description">
          <p>
            Представьте: вы на сложной диете, где каждый продукт — потенциальный враг, а среди вспомогательных
            инструментов нет полноценного решения. В моей магистерской работе я разобрался в этом хаосе, провёл
            исследования и создал прототип Telegram Mini App. Вот история, как я превратил боль пользователей
            в интуитивный инструмент.
          </p>
        </div>
        
        <div className="case-lowfodmap__content-row">
          <div className="case-lowfodmap__table-of-contents">
            <h2 className="case-lowfodmap__section-title">Содержание</h2>
            <ul className="case-lowfodmap__toc-list">
              <li className="case-lowfodmap__toc-item">
                <a href="#problem" className="case-lowfodmap__toc-link">1. Проблема: Почему low-FODMAP — это вызов?</a>
              </li>
              <li className="case-lowfodmap__toc-item">
                <a href="#research" className="case-lowfodmap__toc-link">2. Исследование: конкурентный анализ, изучение предметной области и инсайты от эксперта.</a>
              </li>
              <li className="case-lowfodmap__toc-item">
                <a href="#design" className="case-lowfodmap__toc-link">3. Дизайн и функционал: От идей к прототипу</a>
              </li>
              <li className="case-lowfodmap__toc-item">
                <a href="#testing" className="case-lowfodmap__toc-link">4. Тестирование и результаты</a>
              </li>
              <li className="case-lowfodmap__toc-item">
                <a href="#conclusion" className="case-lowfodmap__toc-link">5. Выводы и ограничения</a>
              </li>
            </ul>
          </div>
          
          <div className="case-lowfodmap__key-results">
            <h2 className="case-lowfodmap__section-title">Ключевые результаты</h2>
            <div className="case-lowfodmap__results-grid">
              <div className="case-lowfodmap__result-card">
                <div className="case-lowfodmap__result-number">78.5/100</div>
                <div className="case-lowfodmap__result-label">SUS</div>
              </div>
              <div className="case-lowfodmap__result-card">
                <div className="case-lowfodmap__result-number">4</div>
                <div className="case-lowfodmap__result-label">уникальные функции*</div>
              </div>
              <a className="case-lowfodmap__result-card" href="https://t.me/fodmap_tracker_bot" target='_blank'>
                <img src="/src/assets/icons/telegram_white.svg" alt="Telegram" className="case-lowfodmap__result-icon" />
                <div className="case-lowfodmap__result-label">Telegram Mini App</div>
              </a>
            </div>
            <p className="case-lowfodmap__results-footnote">*уникальные среди приложений-конкурентов, функции выявлены в процессе исследования.</p>
          </div>
        </div>

        <section id="problem" className="case-lowfodmap__problem-section">
          <h2 className="case-lowfodmap__problem-header">Проблема: Почему low-FODMAP — это вызов?</h2>
          <div className="case-lowfodmap__problem-content">
            <div className="case-lowfodmap__problem-image">
              <div className="case-lowfodmap__problem-image-slide case-lowfodmap__problem-image-slide--default"></div>
              <div className="case-lowfodmap__problem-image-slide case-lowfodmap__problem-image-slide--hover"></div>
            </div>
            <div className="case-lowfodmap__problem-text">
              <p>
              <b>Low-FODMAP диета</b> — это медицинская диета, которая помогает людям с синдромом раздраженного кишечника (СРК) и другими проблемами пищеварения.<br></br> <br></br> <b>FODMAP</b> — это сложные сахара, которые плохо усваиваются организмом и вызывают неприятные симптомы: вздутие, боли в животе, диарею.
              </p>
            </div>
          </div>
          
          <h3 className="case-lowfodmap__complexity-subheader">Что делает эту диету такой сложной?</h3>
          <div className="case-lowfodmap__complexity-cards">
            <div className="case-lowfodmap__complexity-card">
              <h4 className="case-lowfodmap__complexity-card-title">Сложная классификация продуктов</h4>
              <p className="case-lowfodmap__complexity-card-text">Продукты содержат разные типы FODMAP в различных концентрациях, что затрудняет выбор безопасных вариантов без вспомогательных средств.</p>
            </div>
            <div className="case-lowfodmap__complexity-card">
              <h4 className="case-lowfodmap__complexity-card-title">Кумулятивный эффект</h4>
              <p className="case-lowfodmap__complexity-card-text">Даже маленькие порции разных FODMAP могут суммироваться и вызывать симптомы, требуя точного учета всего рациона.</p>
            </div>
            <div className="case-lowfodmap__complexity-card">
              <h4 className="case-lowfodmap__complexity-card-title">Индивидуальная переносимость</h4>
              <p className="case-lowfodmap__complexity-card-text">Реакция на FODMAP различается у людей, поэтому универсального подхода не существует, нужна персонализация.</p>
            </div>
            <div className="case-lowfodmap__complexity-card">
              <h4 className="case-lowfodmap__complexity-card-title">Скрытые источники FODMAP</h4>
              <p className="case-lowfodmap__complexity-card-text">FODMAP содержатся в обработанных продуктах, соусах, добавках, что требует постоянного внимания к составу.</p>
            </div>
            <div className="case-lowfodmap__complexity-card">
              <h4 className="case-lowfodmap__complexity-card-title">Социальные ограничения</h4>
              <p className="case-lowfodmap__complexity-card-text">Диета ограничивает участие в социальных мероприятиях, требует внимания и планирования, влияя на качество жизни.</p>
            </div>
          </div>
        </section>

        {/* 
        <div className="case-lowfodmap__connection">
          <p className="case-lowfodmap__connection-text">
            Диета эффективна, но довольно сложна для повседневной жизни.
          </p>
        </div>

        
        <div className="case-lowfodmap__connection">
          <p className="case-lowfodmap__connection-text">
            Было бы неплохо сделать инструмент, который поможет людям пройти этот непростой путь, но для начала стоит посмотреть существующие решения.
          </p>
        </div>

      
        <div className="case-lowfodmap__connection">
          <p className="case-lowfodmap__connection-text">
            Возможно подходящий инструмент уже существует?
          </p>
        </div>

        <div className='case-lowfodmap__connection'>
        </div>
        */}   

        {/* Research section */}
        <section id="research" className="case-lowfodmap__research-section">
          <h2 className="case-lowfodmap__problem-header">Исследование: конкурентный анализ, изучение предметной области и инсайты от эксперта.</h2>
          <div className="case-lowfodmap__research-description">
            <p>
              Я решил начать исследование с <b>конкурентного анализа</b>, чтобы понять, что предлагают существующие приложения, выявить их сильные стороны, найти точки роста и определить недостающий или необходимый функционал. Ниже представлен фрагмент из большой сравнительной таблицы, который отражает общее положение дел среди существующих приложений.
            </p>
          </div>
          
          {/* Competitive analysis table */}
          <div className="case-lowfodmap__table-container">
            <table className="case-lowfodmap__competitive-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Поддержка первого этапа диеты</th>
                  <th>Поддержка второго этапа диеты</th>
                  <th>Поддержка третьего этапа диеты</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monash University FODMAP diet</td>
                  <td className="case-lowfodmap__table-cell--medium">Теория без функционала</td>
                  <td className="case-lowfodmap__table-cell--medium">Теория без функционала + специальный тип заметок в дневник</td>
                  <td className="case-lowfodmap__table-cell--medium">Теория без функционала</td>
                </tr>
                <tr>
                  <td>Low FODMAP diet A to Z foods</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                </tr>
                <tr>
                  <td>Low FODMAP Diet: IBS tracker</td>
                  <td className="case-lowfodmap__table-cell--medium">Теория без функционала</td>
                  <td className="case-lowfodmap__table-cell--medium">Можно выбрать группу FODMAP для тестирования</td>
                  <td className="case-lowfodmap__table-cell--medium">Теория без функционала</td>
                </tr>
                <tr>
                  <td>Fodmate: Low FODMAP Foods</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                </tr>
                <tr>
                  <td>FODMAP Friendly</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                </tr>
                <tr>
                  <td>SiboSafe</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                </tr>
                <tr>
                  <td>Cara Care: FODMAP, IBD, IBS Tracker</td>
                  <td className="case-lowfodmap__table-cell--medium">Есть подходящие функции, но они не связаны в единый этап</td>
                  <td className="case-lowfodmap__table-cell--medium">Есть подходящие функции, но они не связаны в единый этап</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                </tr>
                <tr>
                  <td>FODMAP Diet Guide for IBS</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                  <td className="case-lowfodmap__table-cell--bad">Отсутствует</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="case-lowfodmap__research-description" style={{ marginTop: '32px'}}>
            <p>
            В итоге ни одно решение не ведёт пользователя сквозь все три этапа — элиминации, реинтродукции и персонализации — как единую логичную историю. Лишние разделы с социальными фичами лишь отягощают опыт, тогда как настоящие потребности остаются неудовлетворёнными. Именно эта «дыра» в пользовательском пути и побудила меня задуматься о создании действительно цельного и интуитивного продукта.
            </p>
          </div>

        </section>

        {/* Subject Area Section */}
        <section className="case-lowfodmap__subject-area">
          <h2 className="case-lowfodmap__complexity-subheader">Предметная область</h2>
          <div className="case-lowfodmap__subject-description">
            <p>
              Прежде чем проектировать, мне нужно было глубоко понять сам объект мониторинга — <b>low-FODMAP диету</b>. 
              Я осознавал, что это не статичный список продуктов, а сложный, многоэтапный процесс с четкой логикой: 
              элиминация, реинтродукция групп FODMAP, персонализация. Конкурентный анализ показал проблему: 
              существующие приложения предлагали разрозненный набор функций — от избыточных (соцсети, трекеры воды) 
              до критически нехватющих (поддержка фаз). Было непонятно, какой функционал действительно необходим 
              для эффективного отслеживания.
            </p>
          </div>
          
          <div className="case-lowfodmap__diagram-container" onClick={openFullscreen}>
            <img 
              src="/src/assets/case-images/first-case/diagram.svg" 
              alt="Схема процесса соблюдения low-FODMAP диеты" 
              className="case-lowfodmap__diagram"
            />
            <p className="case-lowfodmap__diagram-caption">Схема процесса соблюдения low-FODMAP диеты</p>
            <div className="case-lowfodmap__fullscreen-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Полный экран</span>
            </div>
          </div>
          
          <div className="case-lowfodmap__subject-description">
            <p>
              Поэтому я погрузился в изучение самого процесса: как долго длится каждая фаза, как правильно тестировать группы углеводов, какие симптомы ключевые и как их фиксировать, где пользователи чаще всего "спотыкаются". Мне нужно было вычленить суть — те обязательные шаги и данные, без которых приложение не сможет быть по-настоящему полезным проводником. Это исследование стало фильтром: оно помогло отсечь лишнее (вроде трекеров сна) и сфокусироваться на проектировании ядра — инструментов, которые реально поддерживают пользователя на его пути через все этапы диеты, а не просто добавляют ему цифрового хаоса.
            </p>
          </div>

        </section>

        {/* Expert Interview Section */}
        <section className="case-lowfodmap__expert-interview">
          <h2 className="case-lowfodmap__complexity-subheader">Экспертное интервью</h2>
          <div className="case-lowfodmap__research-description">
            <p>
            Когда я понял, что ни одно из существующих приложений не даёт полного представления о том, как на практике проходит каждый этап low-FODMAP диеты, стало ясно: чтобы не строить продукт на догадках, нужно заглянуть за кулисы работы настоящего гастроэнтеролога.
            </p>
          </div>
          
          <div className="case-lowfodmap__interview-images">
            <div className="case-lowfodmap__interview-image-container">
              <img 
                src="/src/assets/case-images/first-case/interview1.png" 
                alt="Экспертное интервью 1" 
                className="case-lowfodmap__interview-image"
              />
            </div>
            <div className="case-lowfodmap__interview-image-container">
              <img 
                src="/src/assets/case-images/first-case/interview2.png" 
                alt="Экспертное интервью 2" 
                className="case-lowfodmap__interview-image"
              />
            </div>
          </div>
          
          <div className="case-lowfodmap__research-description">
            <p>
            Глубинное интервью с экспертом помогло мне убедиться, что за теоретическими списками продуктов и академическими сроками элиминации стоят реальные нюансы: сколько дней нужно на стабилизацию симптомов, как правильно тестировать каждую группу углеводов, как учитывать эффект «насыщения» разными порциями, и какие симптомы важнее всего фиксировать. 
            </p>
          </div>
        </section>

        {/* Design and Iterations Section */}
        <section id="design" className="case-lowfodmap__design-section">
          <h2 className="case-lowfodmap__problem-header">Дизайн и функционал: От идей к прототипу</h2>
          <div className="case-lowfodmap__design-description">
            <p>
              После глубокого погружения в предметную область и анализа конкурентов стало ясно: нужен инструмент, который будет <b>проводником через все три этапа диеты</b>. Центральным элементом интерфейса стал компонент отслеживания фаз — умный помощник, который автоматически адаптируется под текущий этап пользователя и предоставляет именно ту информацию, которая нужна здесь и сейчас.
            </p>
          </div>

                    <div className="case-lowfodmap__design-decisions">
            <h3 className="case-lowfodmap__complexity-subheader">Ключевые дизайн-решения</h3>
            <div className="case-lowfodmap__decision-cards">
              <div className="case-lowfodmap__decision-card">
                <div className="case-lowfodmap__decision-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="case-lowfodmap__decision-title">Адаптация интерфейса</h4>
                <p className="case-lowfodmap__decision-description">
                  Один компонент трансформируется под каждую фазу, избавляя от когнитивной нагрузки и создавая ощущение персонального помощника.
                </p>
              </div>
              
              <div className="case-lowfodmap__decision-card">
                <div className="case-lowfodmap__decision-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h4 className="case-lowfodmap__decision-title">Автоматизация рутины</h4>
                <p className="case-lowfodmap__decision-description">
                  Система сама считает дни и переключает фазы, освобождая пользователя от механических действий.
                </p>
              </div>
              
              <div className="case-lowfodmap__decision-card">
                <div className="case-lowfodmap__decision-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="case-lowfodmap__decision-title">Визуальная обратная связь</h4>
                <p className="case-lowfodmap__decision-description">
                  Прогресс-бары, цветовое кодирование и иконки дают мгновенное понимание текущего статуса без необходимости читать текст.
                </p>
              </div>
              
              <div className="case-lowfodmap__decision-card">
                <div className="case-lowfodmap__decision-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h4 className="case-lowfodmap__decision-title">Персонализация</h4>
                <p className="case-lowfodmap__decision-description">
                  В финальной фазе интерфейс показывает только релевантные ограничения, создавая индивидуальный план питания.
                </p>
              </div>
            </div>
          </div>

          {/* Onboarding Section */}
          <div className="case-lowfodmap__onboarding-section">
            <h3 className="case-lowfodmap__complexity-subheader">Onboarding экраны</h3>
            <div className="case-lowfodmap__onboarding-description">
              <p>
                Первое впечатление пользователя формируется на этапе онбординга. Здесь важно было не только объяснить суть диеты, но и показать, как приложение поможет пройти весь путь от элиминации до персонализации.
              </p>
            </div>
            
            {/* Onboarding Screenshots Carousel */}
            <div className="case-lowfodmap__onboarding-carousel-container">
              <div className="case-lowfodmap__onboarding-carousel">
                <div className="case-lowfodmap__onboarding-track">
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_1.svg" alt="Онбоардинг экран 1" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_2.svg" alt="Онбоардинг экран 2" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_3.svg" alt="Онбоардинг экран 3" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_learn_1.svg" alt="Обучающий экран 1" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_learn_2.svg" alt="Обучающий экран 2" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_learn_3.svg" alt="Обучающий экран 3" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_learn_4.svg" alt="Обучающий экран 4" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_learn_5.svg" alt="Обучающий экран 5" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_learn_6.svg" alt="Обучающий экран 6" />
                  </div>
                  {/* Duplicate slides for seamless loop */}
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_1.svg" alt="Онбоардинг экран 1" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_2.svg" alt="Онбоардинг экран 2" />
                  </div>
                  <div className="case-lowfodmap__onboarding-slide">
                    <img src="/src/assets/case-images/onboarding-svg/Onboarding_3.svg" alt="Онбоардинг экран 3" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Screens Section */}
          <div className="case-lowfodmap__main-screens-section">
            <h3 className="case-lowfodmap__complexity-subheader">Основные экраны</h3>
            <div className="case-lowfodmap__main-screens-description">
              <p>
                После завершения онбординга пользователь попадает на основные экраны приложения, где сосредоточен весь функционал для эффективного отслеживания диеты.
              </p>
            </div>
            
            {/* Main Screens Flip Component */}
            <div className="case-lowfodmap__main-screens-flip-container">
              <div className="case-lowfodmap__main-screens-flip">
                <div className="case-lowfodmap__main-screens-track" ref={trackRef}>
                  {/* Screen 1 */}
                  <div className="case-lowfodmap__main-screens-slide">
                    <h4 className="case-lowfodmap__main-screens-subheader">Дневник</h4>
                    <div className="case-lowfodmap__main-screens-content">
                      <div className="case-lowfodmap__main-screens-layout">
                        <div 
                          className="case-lowfodmap__main-screens-image"
                          onClick={() => openPhase2Fullscreen("/src/assets/case-images/first-case/diary-screens/first.png")}
                          style={{ cursor: 'pointer' }}
                        >
                          <img 
                            src="/src/assets/case-images/first-case/diary-screens/first.png" 
                            alt="Экран дневника приложения" 
                            className="case-lowfodmap__main-screens-screenshot"
                          />
                        </div>
                        <div className="case-lowfodmap__main-screens-text">
                          <p>
                            Главным экраном является <b>"Дневник"</b>, в котором пользователь может отслеживать свою диету и вести записи о приемах пищи.
                            Также здесь можно посмотреть основную информацию о текущем этапе диеты 
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Screen 2 */}
                  <div className="case-lowfodmap__main-screens-slide">
                    <h4 className="case-lowfodmap__main-screens-subheader">Продукты</h4>
                    <div className="case-lowfodmap__main-screens-content">
                      <div className="case-lowfodmap__main-screens-layout">
                        <div 
                          className="case-lowfodmap__main-screens-image"
                          onClick={() => openPhase2Fullscreen("/src/assets/case-images/first-case/diary-screens/second.png")}
                          style={{ cursor: 'pointer' }}
                        >
                          <img 
                            src="/src/assets/case-images/first-case/diary-screens/second.png" 
                            alt="Экран добавления продуктов" 
                            className="case-lowfodmap__main-screens-screenshot"
                          />
                        </div>
                        <div className="case-lowfodmap__main-screens-text">
                          <p>
                            В разделе <b>"Продукты"</b> можно смотреть уровень FODMAP в различных продуктах и блюдах по категориям.
                            Пользователь может добавлять свои продукты, если они еще не включены в приложение.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Screen 3 */}
                  <div className="case-lowfodmap__main-screens-slide">
                    <h4 className="case-lowfodmap__main-screens-subheader">Информация</h4>
                    <div className="case-lowfodmap__main-screens-content">
                      <div className="case-lowfodmap__main-screens-layout">
                        <div 
                          className="case-lowfodmap__main-screens-image"
                          onClick={() => openPhase2Fullscreen("/src/assets/case-images/first-case/diary-screens/third.png")}
                          style={{ cursor: 'pointer' }}
                        >
                          <img 
                            src="/src/assets/case-images/first-case/diary-screens/third.png" 
                            alt="Экран аналитики и информации" 
                            className="case-lowfodmap__main-screens-screenshot"
                          />
                        </div>
                        <div className="case-lowfodmap__main-screens-text">
                          <p>
                            Подробности о диете low-FODMAP доступны в разделе <b>"Информация"</b>.
                            Тут можно посмотреть информацию о всех этапах диеты и различные нюансы её соблюдения

                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Screen 4 - New Screen */}
                  <div className="case-lowfodmap__main-screens-slide">
                    <h4 className="case-lowfodmap__main-screens-subheader">Настройки</h4>
                    <div className="case-lowfodmap__main-screens-content">
                      <div className="case-lowfodmap__main-screens-layout">
                        <div 
                          className="case-lowfodmap__main-screens-image"
                          onClick={() => openPhase2Fullscreen("/src/assets/case-images/first-case/diary-screens/fourth.png")}
                          style={{ cursor: 'pointer' }}
                        >
                          <img 
                            src="/src/assets/case-images/first-case/diary-screens/fourth.png" 
                            alt="Экран настроек приложения" 
                            className="case-lowfodmap__main-screens-screenshot"
                          />
                        </div>
                        <div className="case-lowfodmap__main-screens-text">
                          <p>
                            В последнем разделе можно настроить приложение под себя.
                            Можно изменить свои <b>настройки</b> аллергии, настроить уведомления и скачать дневник.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              
              {/* Navigation dots with arrows */}
              <div className="case-lowfodmap__main-screens-dots">
                <div 
                  className="case-lowfodmap__main-screens-arrow case-lowfodmap__main-screens-arrow--left"
                  onClick={() => setCurrentScreen(currentScreen === 0 ? 3 : currentScreen - 1)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                {[0, 1, 2, 3].map((index) => (
                  <div 
                    key={index}
                    className={`case-lowfodmap__main-screens-dot ${currentScreen === index ? 'case-lowfodmap__main-screens-dot--active' : ''}`}
                    onClick={() => setCurrentScreen(index)}
                  ></div>
                ))}
                <div 
                  className="case-lowfodmap__main-screens-arrow case-lowfodmap__main-screens-arrow--right"
                  onClick={() => setCurrentScreen(currentScreen === 3 ? 0 : currentScreen + 1)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Phase Tracking Component Showcase */}
          <div className="case-lowfodmap__interface-showcase">
            <h3 className="case-lowfodmap__complexity-subheader">Компонент отслеживания фаз</h3>
            <div className="case-lowfodmap__phase-demos">
              
              {/* Phase 1 Demo - Real Interface */}
              <div className="case-lowfodmap__phase-demo">
                <div className="case-lowfodmap__phase-demo-header">
                  <h4 className="case-lowfodmap__phase-demo-title">Фаза 1: Исключение</h4>
                </div>
                <p className="case-lowfodmap__phase-demo-description">
                Чтобы помочь пользователям в первой фазе, я добавил интерактивный компонент отслеживания. Он автоматически считывает данные из дневника питания и визуализирует прогресс, что позволяет пользователю видеть свой путь к успеху. Эту, казалось бы, простую, но очень полезную функцию я не встречал ни у одного из конкурентов.
                  </p>
                <div className="case-lowfodmap__real-interface-container">
                  
                  <div className="case-lowfodmap__real-screenshot">
                    <img 
                      src="/src/assets/case-images/first-case/phone-phase1.png" 
                      alt="Скриншот интерфейса первой фазы" 
                      className="case-lowfodmap__phase-screenshot"
                    />
                  </div>
                  <div className="case-lowfodmap__real-interface">
                    <RivePhaseTracker />
                  </div>
                </div>
                
              </div>

              {/* Phase 2 Demo */}
              <div className="case-lowfodmap__phase-demo">
                <div className="case-lowfodmap__phase-demo-header">
                  <h4 className="case-lowfodmap__phase-demo-title">Фаза 2: Реинтродукция</h4>
                </div>
                <p className="case-lowfodmap__phase-demo-description">
                  Во второй фазе компонент трансформируется в трекер групп FODMAP, показывая прогресс тестирования каждой группы углеводов с индивидуальными счётчиками дней.
                </p>
                {/* Phase 2 Screenshots */}
                <div className="case-lowfodmap__phase-screenshots">
                  <div className="case-lowfodmap__screenshot-container" onClick={() => openPhase2Fullscreen("/src/assets/case-images/second-phase-svg/first.svg")} style={{ cursor: 'pointer'}}>
                    <img
                      src="/src/assets/case-images/second-phase-svg/first.svg"
                      alt="Скриншот интерфейса второй фазы - первый этап"
                      className="case-lowfodmap__phase-screenshot2"
                    />
                  </div>
                  <div className="case-lowfodmap__arrow-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="case-lowfodmap__screenshot-container" onClick={() => openPhase2Fullscreen("/src/assets/case-images/second-phase-svg/second.svg")} style={{ cursor: 'pointer'}}>
                    <img
                      src="/src/assets/case-images/second-phase-svg/second.svg"
                      alt="Скриншот интерфейса второй фазы - второй этап"
                      className="case-lowfodmap__phase-screenshot2"
                    />
                  </div>
                  <div className="case-lowfodmap__arrow-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="case-lowfodmap__screenshot-container" onClick={() => openPhase2Fullscreen("/src/assets/case-images/second-phase-svg/third.svg")} style={{ cursor: 'pointer'}}>
                    <img
                      src="/src/assets/case-images/second-phase-svg/third.svg"
                      alt="Скриншот интерфейса второй фазы - третий этап"
                      className="case-lowfodmap__phase-screenshot2"
                    />
                  </div>
                </div>
              </div>

              {/* Phase 3 Demo */}
              <div className="case-lowfodmap__phase-demo">
                <div className="case-lowfodmap__phase-demo-header">
                  <h4 className="case-lowfodmap__phase-demo-title">Фаза 3: Персонализация</h4>
                </div>
                <p className="case-lowfodmap__phase-demo-description">
                  В третьей фазе компонент показывает группы FODMAP, которые вызывают симптомы у конкретного пользователя. Это помогает пользователю понять, какие группы FODMAP он должен избегать, чтобы быть более здоровым. В базе продуктов автоматически применяется фильтр.
{/* Phase 3 Screenshots */}
                <div className="case-lowfodmap__phase-screenshots">
                  <div className="case-lowfodmap__screenshot-container" onClick={() => openPhase2Fullscreen("/src/assets/case-images/third-phase-svg/first.svg")} style={{ cursor: 'pointer'}}>
                    <img
                      src="/src/assets/case-images/third-phase-svg/first.svg"
                      alt="Скриншот интерфейса третьей фазы - первый этап"
                      className="case-lowfodmap__phase-screenshot2"
                    />
                  </div>
                  <div className="case-lowfodmap__arrow-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="case-lowfodmap__screenshot-container" onClick={() => openPhase2Fullscreen("/src/assets/case-images/third-phase-svg/second.svg")} style={{ cursor: 'pointer'}}>
                    <img
                      src="/src/assets/case-images/third-phase-svg/second.svg"
                      alt="Скриншот интерфейса третьей фазы - второй этап"
                      className="case-lowfodmap__phase-screenshot2"
                    />
                  </div>
                </div>
                </p>
              </div>
            </div>
          </div>

          {/* Telegram Bot Button */}
          <div className="case-lowfodmap__telegram-button-container">
            <p className="case-lowfodmap__telegram-description">
              Полный интерфейс был реализован в виде Telegram Mini App. 
              Функционал, представленный выше, можно посмотреть по ссылке.
            </p>
            <button 
              className="case-lowfodmap__telegram-button"
              onClick={() => window.open('https://t.me/fodmap_tracker_bot', '_blank')}
            >
              Открыть Telegram бот
            </button>
          </div>
        </section>

        {/* Testing and Results Section */}
        <section id="testing" className="case-lowfodmap__testing-section">
          <h2 className="case-lowfodmap__problem-header">Тестирование и результаты</h2>
          <h3 className="case-lowfodmap__complexity-subheader">Немного о тестировании</h3>
          <p className="case-lowfodmap__testing-description">
            Для проверки прототипа собрал небольшую, но релевантную группу участников:
            людей, которые пробовали соблюдать <b>low‑FODMAP</b> диету и пользовались существующими приложениями, но сталкивались с трудностями.
            Я составил тестирование в <b>Pathway</b> с интерактивным прототипом и коротким опросником, чтобы понять, насколько продукт помогает справляться с реальными сценариями.
          </p>

          {/* Before/After Section */}
          <h3 className="case-lowfodmap__complexity-subheader">Что было и что стало</h3>
          
          {/* Modified Flip Component with unique class names - 4 features */}
          <div className="case-lowfodmap__testing-flip-container">
            <div className="case-lowfodmap__testing-flip">
              <div className="case-lowfodmap__testing-track" ref={trackRef}>
                
                {/* Feature 1 */}
                <div className="case-lowfodmap__testing-slide">
                  <h4 className="case-lowfodmap__testing-subheader">Уникальная функция 1</h4>
                  <div className="case-lowfodmap__testing-content">
                    <div className="case-lowfodmap__testing-single-layout">
                      <div className="case-lowfodmap__testing-image-container">
                        <div className="case-lowfodmap__testing-interface-image">
                          <img
                            src="/placeholder-interface-1.png"
                            alt="Placeholder interface feature 1"
                            className="case-lowfodmap__testing-interface-screenshot"
                          />
                        </div>
                      </div>
                      <div className="case-lowfodmap__testing-test-description">
                        <div className="case-lowfodmap__testing-label-label">
                          <div className="case-lowfodmap__testing-label case-lowfodmap__testing-label--before">До</div>
                          <p>
                            Пользователи вручную отслеживали этапы диеты и часто путались
                          </p>
                        </div>
                        <div className="case-lowfodmap__testing-label-label">
                          <div className="case-lowfodmap__testing-label case-lowfodmap__testing-label--after">После</div>
                          <p>
                            Снял рутинную нагрузку и убрал риск ошибки
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feature 2 */}
                <div className="case-lowfodmap__testing-slide">
                  <h4 className="case-lowfodmap__testing-subheader">Уникальная функция 2</h4>
                  <div className="case-lowfodmap__testing-content">
                    <div className="case-lowfodmap__testing-single-layout">
                      <div className="case-lowfodmap__testing-image-container">
                        <div className="case-lowfodmap__testing-label case-lowfodmap__testing-label--before">До</div>
                        <div className="case-lowfodmap__testing-label case-lowfodmap__testing-label--after">После</div>
                        <div className="case-lowfodmap__testing-interface-image">
                          <img
                            src="/placeholder-interface-2.png"
                            alt="Placeholder interface feature 2"
                            className="case-lowfodmap__testing-interface-screenshot"
                          />
                        </div>
                      </div>
                      <div className="case-lowfodmap__testing-test-description">
                        <p>
                          Первый абзац описания уникальной функции 2. Здесь будет описание того, как эта функция работает и какую пользу она приносит пользователю.
                        </p>
                        <p>
                          Второй абзац описания уникальной функции 2. Здесь будет дополнительная информация о том, как эта функция помогает пользователю и какие преимущества она предоставляет.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feature 3 */}
                <div className="case-lowfodmap__testing-slide">
                  <h4 className="case-lowfodmap__testing-subheader">Уникальная функция 3</h4>
                  <div className="case-lowfodmap__testing-content">
                    <div className="case-lowfodmap__testing-single-layout">
                      <div className="case-lowfodmap__testing-image-container">
                        <div className="case-lowfodmap__testing-label case-lowfodmap__testing-label--before">До</div>
                        <div className="case-lowfodmap__testing-label case-lowfodmap__testing-label--after">После</div>
                        <div className="case-lowfodmap__testing-interface-image">
                          <img
                            src="/placeholder-interface-3.png"
                            alt="Placeholder interface feature 3"
                            className="case-lowfodmap__testing-interface-screenshot"
                          />
                        </div>
                      </div>
                      <div className="case-lowfodmap__testing-test-description">
                        <p>
                          Первый абзац описания уникальной функции 3. Здесь будет описание того, как эта функция работает и какую пользу она приносит пользователю.
                        </p>
                        <p>
                          Второй абзац описания уникальной функции 3. Здесь будет дополнительная информация о том, как эта функция помогает пользователю и какие преимущества она предоставляет.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Feature 4 */}
                <div className="case-lowfodmap__testing-slide">
                  <h4 className="case-lowfodmap__testing-subheader">Уникальная функция 4</h4>
                  <div className="case-lowfodmap__testing-content">
                    <div className="case-lowfodmap__testing-single-layout">
                      <div className="case-lowfodmap__testing-image-container">
                        <div className="case-lowfodmap__testing-label case-lowfodmap__testing-label--before">До</div>
                        <div className="case-lowfodmap__testing-label case-lowfodmap__testing-label--after">После</div>
                        <div className="case-lowfodmap__testing-interface-image">
                          <img
                            src="/placeholder-interface-4.png"
                            alt="Placeholder interface feature 4"
                            className="case-lowfodmap__testing-interface-screenshot"
                          />
                        </div>
                      </div>
                      <div className="case-lowfodmap__testing-test-description">
                        <p>
                          Первый абзац описания уникальной функции 4. Здесь будет описание того, как эта функция работает и какую пользу она приносит пользователю.
                        </p>
                        <p>
                          Второй абзац описания уникальной функции 4. Здесь будет дополнительная информация о том, как эта функция помогает пользователю и какие преимущества она предоставляет.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Navigation dots with arrows for 4 pages */}
            <div className="case-lowfodmap__testing-dots">
              <div
                className="case-lowfodmap__testing-arrow case-lowfodmap__testing-arrow--left"
                onClick={() => setCurrentScreen(currentScreen === 0 ? 3 : currentScreen - 1)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`case-lowfodmap__testing-dot ${currentScreen === index ? 'case-lowfodmap__testing-dot--active' : ''}`}
                  onClick={() => setCurrentScreen(index)}
                ></div>
              ))}
              <div
                className="case-lowfodmap__testing-arrow case-lowfodmap__testing-arrow--right"
                onClick={() => setCurrentScreen(currentScreen === 3 ? 0 : currentScreen + 1)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="case-lowfodmap__fullscreen-overlay" onClick={closeFullscreen}>
          <div className="case-lowfodmap__fullscreen-modal" onClick={(e) => e.stopPropagation()}>
            <div className="case-lowfodmap__fullscreen-header">
              <h3>Схема процесса соблюдения low-FODMAP диеты</h3>
              <div className="case-lowfodmap__zoom-controls">
                <button 
                  className="case-lowfodmap__zoom-button" 
                  onClick={zoomOut}
                  aria-label="Уменьшить"
                  disabled={zoomLevel <= 0.5}
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
                      style={{ width: `${((zoomLevel - 0.5) / 2.5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <button 
                  className="case-lowfodmap__zoom-button" 
                  onClick={zoomIn}
                  aria-label="Увеличить"
                  disabled={zoomLevel >= 3}
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
              </div>
              <button className="case-lowfodmap__fullscreen-close" onClick={closeFullscreen} aria-label="Закрыть">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div 
              className={`case-lowfodmap__fullscreen-content ${isDragging ? 'case-lowfodmap__fullscreen-content--dragging' : ''}`}
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
                src="/src/assets/case-images/first-case/diagram.svg" 
                alt="Схема процесса соблюдения low-FODMAP диеты" 
                className="case-lowfodmap__fullscreen-diagram"
                style={{ 
                  transform: `scale(${zoomLevel}) translate(${currentPosition.x/zoomLevel}px, ${currentPosition.y/zoomLevel}px)`,
                  transformOrigin: 'center center' 
                }}
                draggable={false} // Prevent SVG dragging
                onDragStart={(e) => e.preventDefault()} // Extra prevention for dragging
              />
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Modal for Phase 2 Screenshots */}
      {isPhase2Fullscreen && (
        <div className="case-lowfodmap__fullscreen-overlay case-lowfodmap__fullscreen-overlay--phase2" onClick={closePhase2Fullscreen}>
          <div className="case-lowfodmap__fullscreen-modal" onClick={(e) => e.stopPropagation()}>
            <div className="case-lowfodmap__fullscreen-header">
              <h3>Скриншот интерфейса</h3>
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
              </div>
              <button className="case-lowfodmap__fullscreen-close" onClick={closePhase2Fullscreen} aria-label="Закрыть">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div 
              className={`case-lowfodmap__fullscreen-content--phase2 ${isPhase2Fullscreen ? 'case-lowfodmap__fullscreen-content--phase2' : ''} ${isDragging ? 'case-lowfodmap__fullscreen-content--dragging' : ''}`}
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
                alt="Скриншот интерфейса второй фазы" 
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
