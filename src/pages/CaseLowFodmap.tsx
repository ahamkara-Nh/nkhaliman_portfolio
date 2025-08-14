import './case-lowfodmap.css';
import { useState, useRef, useEffect } from 'react';

export default function CaseLowFodmap() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const diagramRef = useRef<HTMLDivElement>(null);
  const touchStartDistance = useRef<number>(0);

  const openFullscreen = () => {
    setIsFullscreen(true);
    setZoomLevel(1); // Reset zoom when opening fullscreen
    setCurrentPosition({ x: 0, y: 0 }); // Reset position when opening fullscreen
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(1); // Reset zoom when closing fullscreen
    setCurrentPosition({ x: 0, y: 0 }); // Reset position when closing fullscreen
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3)); // Max zoom 3x
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5)); // Min zoom 0.5x
  };

  const resetZoom = () => {
    setZoomLevel(1);
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
    if (zoomLevel > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - currentPosition.x, y: e.clientY - currentPosition.y });
      if (diagramRef.current) {
        diagramRef.current.style.cursor = 'grabbing';
      }
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
      diagramRef.current.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
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
    } else if (e.touches.length === 1 && zoomLevel > 1) {
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

  // Update cursor based on zoom level
  useEffect(() => {
    if (diagramRef.current) {
      diagramRef.current.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
    }
  }, [zoomLevel]);

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
                <a href="#design" className="case-lowfodmap__toc-link">3. Дизайн и итерации: От идей к прототипу</a>
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
              <img
                src="/src/assets/case-images/first-case/problem.png"
                alt="Low-FODMAP диета вызов"
                className="case-lowfodmap__problem-img"
              />
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
    </div>
  );
}