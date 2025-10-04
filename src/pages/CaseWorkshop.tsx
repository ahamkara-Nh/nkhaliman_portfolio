import './case-workshop.css';
import { useState, useRef, useEffect } from 'react';

export default function CaseWorkshop() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPhase2Fullscreen, setIsPhase2Fullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState('');
  const [zoomLevel, setZoomLevel] = useState(0.25);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [currentScreen, setCurrentScreen] = useState(0);
  const [mainScreensCurrentScreen, setMainScreensCurrentScreen] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);
  const touchStartDistance = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const mainScreensTrackRef = useRef<HTMLDivElement>(null);

  // Add your state and functions here based on the template

  return (
    <div className="case-page case-workshop" role="main" aria-label="Case: Workshop">
      <section className="case-content" aria-label="Storyline content">
        <header className="case-workshop__header">
          <h1 className="case-workshop__title">Workshop: проблема концентрации внимания</h1>
          <p className="case-workshop__subtitle">Учебный проект ВШЭ</p>
        </header>
        <div className="case-workshop__description">
          <p>
            Учебный проект, выполненный в рамках магистерской программы. Целью исследования было глубже понять, как люди справляются с проблемами концентрации внимания при выполнении рабочих и учебных задач, чтобы определить возможные решения для повышения их продуктивности.
          </p>
        </div>
        
        <div className="case-workshop__content-row">
          <div className="case-workshop__table-of-contents">
            <h2 className="case-workshop__section-title">Содержание</h2>
            <ul className="case-workshop__toc-list">
              <li className="case-workshop__toc-item">
                <a href="#problem" className="case-workshop__toc-link">1. Проблема</a>
              </li>
              <li className="case-workshop__toc-item">
                <a href="#research" className="case-workshop__toc-link">2. Исследование</a>
              </li>
              <li className="case-workshop__toc-item">
                <a href="#design" className="case-workshop__toc-link">3. Дизайн и функционал</a>
              </li>
              <li className="case-workshop__toc-item">
                <a href="#testing" className="case-workshop__toc-link">4. Тестирование и результаты</a>
              </li>
              <li className="case-workshop__toc-item">
                <a href="#conclusion" className="case-workshop__toc-link">5. Выводы и ограничения</a>
              </li>
            </ul>
          </div>
          
          <div className="case-workshop__key-results">
            <h2 className="case-workshop__section-title">Мой вклад в групповой проект</h2>
            <div className="case-workshop__results-grid">
              {/* Add your key results here */}
            </div>
          </div>
        </div>

        {/* Add your sections here: problem, research, design, testing, conclusion */}

        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div className="case-workshop__fullscreen-overlay" onClick={() => setIsFullscreen(false)}>
            <div className="case-workshop__fullscreen-modal" onClick={(e) => e.stopPropagation()}>
              {/* Add fullscreen content here */}
            </div>
          </div>
        )}

        {/* Fullscreen Modal for Phase 2 Screenshots */}
        {isPhase2Fullscreen && (
          <div className="case-workshop__fullscreen-overlay case-workshop__fullscreen-overlay--phase2" onClick={() => setIsPhase2Fullscreen(false)}>
            <div className="case-workshop__fullscreen-modal" onClick={(e) => e.stopPropagation()}>
              {/* Add fullscreen content here */}
            </div>
          </div>
        )}
        
        {/* Back to Top Button */}
        <button 
          className={`case-workshop__back-to-top ${showBackToTop ? 'show' : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Наверх"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </section>
    </div>
  );
}