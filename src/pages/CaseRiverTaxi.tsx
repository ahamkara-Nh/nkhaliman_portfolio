import styles from './case-river-taxi.module.css';
import { useState, useRef, useEffect } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

// Rive Animation Component
function RiveAnimation({ src }: { src: string }) {
  const { RiveComponent } = useRive({
    src: src,
    stateMachines: 'State Machine 1',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div className={styles['case-river-taxi__rive-preview']}>
      <RiveComponent />
    </div>
  );
}

export default function CaseRiverTaxi() {
   // Prototype loading state
   const [isPrototypeLoaded, setIsPrototypeLoaded] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   // Lazy loading state for iframe
   const [isPrototypeInView, setIsPrototypeInView] = useState(false);
   const prototypeRef = useRef<HTMLDivElement>(null);

   // Features carousel state
   const [currentFeatureScreen, setCurrentFeatureScreen] = useState(0);
   const featuresTrackRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for lazy loading iframe
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
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (prototypeRef.current) {
      observer.observe(prototypeRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle features carousel navigation
  useEffect(() => {
    if (featuresTrackRef.current) {
      featuresTrackRef.current.style.transform = `translateX(-${currentFeatureScreen * 100}%)`;
    }
  }, [currentFeatureScreen]);

  // Handle keyboard navigation for features carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentFeatureScreen(prev => prev === 0 ? 4 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentFeatureScreen(prev => prev === 4 ? 0 : prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className={`${styles['case-page']} ${styles['case-river-taxi']}`} role="main" aria-label="Case: River Taxi">
      <section className={styles['case-content']} aria-label="Storyline content">
        <header className={styles['case-river-taxi__header']}>
          <h1 className={styles['case-river-taxi__title']}>Сервис заказов речного шеринг-такси</h1>
          <p className={styles['case-river-taxi__subtitle']}>Хакатон HACK&CHANGE</p>
        </header>
        <div className={styles['case-river-taxi__description']}>
          <p>
            В данном проекте я с командой занимался разработкой прототипа сервиса для создания более гибкого решения в противовес существующему речному флоту, 
            работающему по фиксированному расписанию. 
            Продукт призван изменить транспортную экосистему столицы, обеспечивая быстрое и удобное передвижение по воде
          </p>
        </div>

        <div className={styles['case-river-taxi__content-row']}>
          <div className={styles['case-river-taxi__table-of-contents']}>
            <h2 className={styles['case-river-taxi__section-title']}>Содержание</h2>
            <ul className={styles['case-river-taxi__toc-list']}>
              <li className={styles['case-river-taxi__toc-item']}>
                <a href="#placeholder" className={styles['case-river-taxi__toc-link']}>1. placeholder</a>
              </li>
              <li className={styles['case-river-taxi__toc-item']}>
                <a href="#placeholder" className={styles['case-river-taxi__toc-link']}>2. placeholder</a>
              </li>
              <li className={styles['case-river-taxi__toc-item']}>
                <a href="#placeholder" className={styles['case-river-taxi__toc-link']}>3. placeholder</a>
              </li>
            </ul>
          </div>

          <div className={styles['case-river-taxi__key-results']}>
            <h2 className={styles['case-river-taxi__section-title']}>Мой вклад в групповой проект</h2>
            <div className={styles['case-river-taxi__results-grid']}>
              <div className={styles['case-river-taxi__result-card']}>
                <div className={styles['case-river-taxi__result-number']}>Макеты</div>
                <div className={styles['case-river-taxi__result-label']}>приложения</div>
              </div>
              <div className={styles['case-river-taxi__result-card']}>
                <div className={styles['case-river-taxi__result-number']}>Прототип</div>
                <div className={styles['case-river-taxi__result-label']}>интерактивный</div>
              </div>
              <div className={styles['case-river-taxi__result-card']}>
                <div className={styles['case-river-taxi__result-number']}>Rive</div>
                <div className={styles['case-river-taxi__result-label']}>анимации</div>
              </div>
            </div>
          </div>
        </div>

        {/* Context Section */}
        <section id="about-project" className={styles['case-river-taxi__about-section']}>
          <h2 className={styles['case-river-taxi__about-header']}>Контекст задачи</h2>
          <div className={styles['case-river-taxi__about-content']}>
            <div className={styles['case-river-taxi__about-text']}>
              <p>
                <strong>Источник задания:</strong> Хакатон Hack&Change от Правительства Москвы
              </p>
              <p>
                <strong>Команда:</strong> UX/UI дизайнер, фронтенд и бекенд разработчик.
              </p>
            </div>
            <div className={styles['case-river-taxi__about-image']}>
              <img
                src="/src/assets/case-images/third-case/hack_pic.png"
                alt="Hackathon team photo"
                className={styles['case-river-taxi__hack-image']}
              />
            </div>
          </div>
          <p className={styles['case-river-taxi__task-description']}>
            В общем, задача была такая: придумать сервис водного такси для Москвы, но не простой, а с элементами каршеринга. Представьте — вместо того, чтобы ждать по расписанию, люди могут просто вызвать лодку через приложение, а система сама подберёт попутчиков с похожим маршрутом. Нужно было сделать умный алгоритм, который объединяет заказы, чтобы поездки были дешевле, быстрее и чтобы такси не скапливались в одном месте. Плюс создать рабочий прототип приложения, чтобы всё можно было потестировать.
          </p>

          <h3 className={styles['case-river-taxi__problem-goals-header']}>Постановка проблемы и цели</h3>
          <ol className={styles['case-river-taxi__goals-list']}>
            <li className={styles['case-river-taxi__goal-item']}>
              <strong>Проблема (Pain Point):</strong> Необходимость создания более гибкого решения для речного транспорта, чтобы повысить его доступность для пассажиров
            </li>
            <li className={styles['case-river-taxi__goal-item']}>
              <strong>Глобальная цель:</strong> Создание сервиса водного шеринг-такси по запросу, минимизирующего время ожидания на причалах
            </li>
            <li className={styles['case-river-taxi__goal-item']}>
              <strong>Ключевая цель UX/UI:</strong> Создать user-friendly-опыт и разработать веб-интерфейс, обеспечивающий легкий доступ к заказу транспорта, сохраняя привычный комфорт
            </li>
          </ol>
        </section>

        {/* Solution Section */}
        <section id="solution" className={styles['case-river-taxi__solution-section']}>
          <h2 className={styles['case-river-taxi__solution-header']}>Проектирование решения</h2>
          <div className={styles['case-river-taxi__solution-content']}>
            <h3 className={styles['case-river-taxi__first-steps-header']}>Первые шаги</h3>
            <p className={styles['case-river-taxi__solution-text']}>
              <strong>Обязательный функционал:</strong> создание веб-интерфейса для оформления заказа и отслеживания поездки, а также алгоритм шеринга для оптимизации затрат и времени. Для начала нужно определить алгоритм работы нашего сервиса. Вместе с остальными членами команды мы придумали алгоритм работы нашего решения. Он основан на уменьшении цены в зависимости от количества пассажиров (попутчиков)
            </p>

            <h3 className={styles['case-river-taxi__solution-subheader']}>Алгоритм работы сервиса</h3>
            <p className={styles['case-river-taxi__solution-text']}>
              Ниже представлена схема алгоритма работы нашего сервиса водного такси. Он позволяет объединять пассажиров с похожими маршрутами для оптимизации времени и стоимости поездки. 
              Схему можно перетаскивать для просмотра разных частей диаграммы.
            </p>
            
            <div className={styles['case-river-taxi__diagram-container']}>
               <iframe
                 src="/src/components/SimpleMermaidDiagrams.html"
                 className={styles['case-river-taxi__mermaid-iframe']}
                 title="Mermaid Diagrams
                 Comparison"
                 width="100%"
                 height="600"
               />
             </div>

             <h3 className={styles['case-river-taxi__solution-subheader']}>Выбор дизайн-системы</h3>
             <p className={styles['case-river-taxi__solution-text']}>
               В условиях ограниченного времени хакатона, я принял решение использовать готовую дизайн-систему Material Design. Так значительно сократиться время на создание макетов и написание кода фронтенд разработчиком. Для некоторых элементов интерфейса я сделал уникальные компоненты. но в основном использовались готовые компоненты дизайн-системы
             </p>

             <h3 className={styles['case-river-taxi__solution-subheader']}>Изучение существующих решений</h3>
             <p className={styles['case-river-taxi__solution-text']}>
               Я посмотрел существующие приложения такси и как там реализован функционал совместных поездок. Приложения с водным такси было трудно найти, поэтому я рассматривал классическое такси и их способы реализации совместных поездок.
             </p>
             <div className={styles['case-river-taxi__image-container']}>
               <img
                 src="/src/assets/case-images/third-case/taxi_examples.png"
                 alt="Примеры существующих решений такси"
                 className={styles['case-river-taxi__solution-image']}
               />
             </div>

             <h3 className={styles['case-river-taxi__solution-subheader']}>Макеты приложения</h3>
             <div className={styles['case-river-taxi__prototype-content']}>
               <p className={styles['case-river-taxi__prototype-description']}>
                 Здесь можно увидеть прототип приложения с реализованным user flow заказа шеринг тарифа. Figma файл этого прототипа можно открыть по ссылке - <a href="https://www.figma.com/design/5TIYxY4gkkU6U5r8bAhB3M/moscow-river?node-id=52-4&t=1zYUUQN4S2gx80sj-1" target="_blank" rel="noopener noreferrer" className={styles['case-river-taxi__figma-link']}>тут</a>. Далее я опишу основные детали, которые были реализованы для успешного выполнения задачи.
               </p>
               <div ref={prototypeRef} className={styles['case-river-taxi__prototype-container']}>
                 {isMobile && !isPrototypeLoaded ? (
                   <div className={styles['case-river-taxi__mobile-banner']}>
                     <div className={styles['case-river-taxi__mobile-banner-content']}>
                       <div className={styles['case-river-taxi__mobile-banner-text']}>
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
                     className={styles['case-river-taxi__figma-iframe']}
                     src="https://embed.figma.com/proto/5TIYxY4gkkU6U5r8bAhB3M/moscow-river?node-id=54-5588&p=f&scaling=min-zoom&content-scaling=fixed&page-id=52%3A4&starting-point-node-id=54%3A5588&embed-host=share&footer=false&theme=dark"
                     allowFullScreen
                     title="River Taxi Interface Prototype"
                   />
                 ) : (
                   <div className={styles['case-river-taxi__iframe-placeholder']}>
                     <div className={styles['case-river-taxi__iframe-placeholder-content']}>
                       <div className={styles['case-river-taxi__iframe-placeholder-text']}>
                         Интерактивный прототип интерфейса
                       </div>
                       <div className={styles['case-river-taxi__iframe-placeholder-subtext']}>
                         Прокрутите вниз, чтобы загрузить
                       </div>
                     </div>
                   </div>
                 )}
               </div>
             </div>

             <h3 className={styles['case-river-taxi__solution-subheader']}>Основные фичи</h3>
             <div className={styles['case-river-taxi__features-section']}>
               <p className={styles['case-river-taxi__solution-text']}>
                 В приложении реализованы ключевые функции для удобного шеринг-такси на воде. Ниже представлены основные возможности с интерактивными демонстрациями.
               </p>

               {/* Rive Features Carousel */}
               <div className={styles['case-river-taxi__features-carousel-container']}>
                 <div className={styles['case-river-taxi__features-carousel']}>
                   <div className={styles['case-river-taxi__features-track']} ref={featuresTrackRef}>

                     {/* Feature 1 - boats.riv */}
                     <div className={styles['case-river-taxi__features-slide']}>
                       <div className={styles['case-river-taxi__features-content']}>
                         <div className={styles['case-river-taxi__features-animation']}>
                           <RiveAnimation src="/src/assets/case-images/third-case/rive/boats.riv" />
                         </div>
                         <div className={styles['case-river-taxi__features-text']}>
                           <h4 className={styles['case-river-taxi__features-title']}>Интеллектуальное объединение поездок</h4>
                           <p className={styles['case-river-taxi__features-description']}>
                             Система автоматически объединяет пассажиров с похожими маршрутами, оптимизируя загрузку судов и снижая время ожидания на причалах.
                           </p>
                         </div>
                       </div>
                     </div>

                     {/* Feature 2 - boats2.riv */}
                     <div className={styles['case-river-taxi__features-slide']}>
                       <div className={styles['case-river-taxi__features-content']}>
                         <div className={styles['case-river-taxi__features-animation']}>
                           <RiveAnimation src="/src/assets/case-images/third-case/rive/boats2.riv" />
                         </div>
                         <div className={styles['case-river-taxi__features-text']}>
                           <h4 className={styles['case-river-taxi__features-title']}>Динамическое ценообразование</h4>
                           <p className={styles['case-river-taxi__features-description']}>
                             Стоимость поездки автоматически уменьшается при добавлении попутчиков, делая водный транспорт более доступным для всех пассажиров.
                           </p>
                         </div>
                       </div>
                     </div>

                     {/* Feature 3 - boats3.riv */}
                     <div className={styles['case-river-taxi__features-slide']}>
                       <div className={styles['case-river-taxi__features-content']}>
                         <div className={styles['case-river-taxi__features-animation']}>
                           <RiveAnimation src="/src/assets/case-images/third-case/rive/boats3.riv" />
                         </div>
                         <div className={styles['case-river-taxi__features-text']}>
                           <h4 className={styles['case-river-taxi__features-title']}>Оптимизация маршрутов</h4>
                           <p className={styles['case-river-taxi__features-description']}>
                             Умный алгоритм строит оптимальные маршруты с учётом местоположения всех пассажиров, минимизируя общее время в пути.
                           </p>
                         </div>
                       </div>
                     </div>

                     {/* Feature 4 - boats4.riv */}
                     <div className={styles['case-river-taxi__features-slide']}>
                       <div className={styles['case-river-taxi__features-content']}>
                         <div className={styles['case-river-taxi__features-animation']}>
                           <RiveAnimation src="/src/assets/case-images/third-case/rive/boats4.riv" />
                         </div>
                         <div className={styles['case-river-taxi__features-text']}>
                           <h4 className={styles['case-river-taxi__features-title']}>Отслеживание в реальном времени</h4>
                           <p className={styles['case-river-taxi__features-description']}>
                             Пассажиры могут отслеживать местоположение своего судна на карте в режиме реального времени и получать точные прогнозы прибытия.
                           </p>
                         </div>
                       </div>
                     </div>

                     {/* Feature 5 - boats5.riv */}
                     <div className={styles['case-river-taxi__features-slide']}>
                       <div className={styles['case-river-taxi__features-content']}>
                         <div className={styles['case-river-taxi__features-animation']}>
                           <RiveAnimation src="/src/assets/case-images/third-case/rive/boats5.riv" />
                         </div>
                         <div className={styles['case-river-taxi__features-text']}>
                           <h4 className={styles['case-river-taxi__features-title']}>Уведомления и коммуникация</h4>
                           <p className={styles['case-river-taxi__features-description']}>
                             Система push-уведомлений информирует пассажиров о статусе заказа, прибытии судна и важных изменениях маршрута.
                           </p>
                         </div>
                       </div>
                     </div>

                   </div>
                 </div>

                 {/* Navigation dots with arrows */}
                 <div className={styles['case-river-taxi__features-dots']}>
                   <div
                     className={styles['case-river-taxi__features-arrow case-river-taxi__features-arrow--left']}
                     onClick={() => setCurrentFeatureScreen(prev => prev === 0 ? 4 : prev - 1)}
                   >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                   {[0, 1, 2, 3, 4].map((index) => (
                     <div
                       key={index}
                       className={`${styles['case-river-taxi__features-dot']} ${currentFeatureScreen === index ? styles['case-river-taxi__features-dot--active'] : ''}`}
                       onClick={() => setCurrentFeatureScreen(index)}
                     ></div>
                   ))}
                   <div
                     className={styles['case-river-taxi__features-arrow case-river-taxi__features-arrow--right']}
                     onClick={() => setCurrentFeatureScreen(prev => prev === 4 ? 0 : prev + 1)}
                   >
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </section>

      </section>
    </div>
  );
}
