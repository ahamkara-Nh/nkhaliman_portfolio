import './styles.css';
import { NavLink, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import CaseLowFodmap from './pages/CaseLowFodmap';
import CaseTBanks from './pages/CaseTBanks';
import CaseRiverTaxi from './pages/CaseRiverTaxi';
import CaseWorkshop from './pages/CaseWorkshop';

const AboutSection = () => (
  <section id="about" className="about">
    <div className="about-card">
      <h2 className="about-title">Обо мне</h2>
      <p className="about-text">
        Привет! Я Никита, UX/UI дизайнер. Выпускник магистратуры ВШЭ по UX-аналитике и проектированию информационных систем.
        Моё портфолио – это результат учебных проектов, выполненных под руководством профессионалов из индустрии.
        Готов применить свои знания на практике!
      </p>
    </div>
  </section>
);


function HardSoftSkillsSection() {
  // simple toggle between hard and soft skills by clicking headers
  const toggle = (type: 'hard' | 'soft') => {
    const hard = document.getElementById('hard-skills');
    const soft = document.getElementById('soft-skills');
    const hardBtn = document.getElementById('hs-tab-hard');
    const softBtn = document.getElementById('hs-tab-soft');
    if (!hard || !soft || !hardBtn || !softBtn) return;

    if (type === 'hard') {
      hard.setAttribute('data-active', 'true');
      soft.setAttribute('data-active', 'false');
      hardBtn.setAttribute('aria-pressed', 'true');
      softBtn.setAttribute('aria-pressed', 'false');
      hardBtn.classList.add('is-active');
      softBtn.classList.remove('is-active');
    } else {
      hard.setAttribute('data-active', 'false');
      soft.setAttribute('data-active', 'true');
      hardBtn.setAttribute('aria-pressed', 'false');
      softBtn.setAttribute('aria-pressed', 'true');
      softBtn.classList.add('is-active');
      hardBtn.classList.remove('is-active');
    }
  };

  // ensure default is hard-skills active
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const hard = document.getElementById('hard-skills');
      const soft = document.getElementById('soft-skills');
      const hardBtn = document.getElementById('hs-tab-hard');
      const softBtn = document.getElementById('hs-tab-soft');
      if (
        hard && soft && hardBtn && softBtn &&
        !hard.hasAttribute('data-active') && !soft.hasAttribute('data-active')
      ) {
        // default to HARD active
        hard.setAttribute('data-active', 'true');
        soft.setAttribute('data-active', 'false');
        hardBtn.setAttribute('aria-pressed', 'true');
        softBtn.setAttribute('aria-pressed', 'false');
        hardBtn.classList.add('is-active');
        softBtn.classList.remove('is-active');
      }
    }, 0);
  }

  return (
    <section id="hard-soft" className="hard-soft">
      <div className="hs-header" role="tablist" aria-label="Hard and soft skills">
        <button
          id="hs-tab-hard"
          className="hs-tab"
          type="button"
          role="tab"
          aria-selected="true"
          aria-controls="hard-skills"
          aria-pressed="true"
          onClick={() => toggle('hard')}
        >
          Хард-скилы
        </button>
        <button
          id="hs-tab-soft"
          className="hs-tab"
          type="button"
          role="tab"
          aria-selected="false"
          aria-controls="soft-skills"
          aria-pressed="false"
          onClick={() => toggle('soft')}
        >
          Софт-скилы
        </button>
      </div>

      {/* Hard skills list (placeholder bullets) */}
      <div id="hard-skills" className="hs-panel" data-active="true" aria-labelledby="hard-soft">
        <ul className="hs-list">
          <li>Figma: Auto Layout, Variants, Components</li>
          <li>Вайрфреймы и интерактивное прототипирование</li>
          <li>Создание дизайн-систем и UI-китов</li>
          <li>User Flow, CJM, Информационная архитектура</li>
          <li>Юзабилити-тесты и пользовательские интервью</li>
          <li>Основы UX-аналитики</li>
          <li>Адаптивный и мобильный дизайн</li>
          <li>Типографика, цвет, визуальная иерархия</li>
          <li>Базовый HTML/CSS/JS</li>
        </ul>
      </div>

      {/* Soft skills list (placeholder bullets) */}
      <div id="soft-skills" className="hs-panel" aria-labelledby="hard-soft">
        <ul className="hs-list">
          <li>Коммуникация с командой и заказчиком</li>
          <li>Эмпатия к пользователю</li>
          <li>Работа с обратной связью, итеративный подход</li>
          <li>Продуктовое мышление</li>
          <li>Управление временем и приоритезация задач</li>
          <li>Презентация идей и сторителлинг</li>
          <li>Коллаборация в кросс-функциональной команде</li>
          <li>Гибкость и обучаемость</li>
        </ul>
      </div>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  const isCasePage = location.pathname === '/portfolio/fodmap' || location.pathname === '/portfolio/tbanks' || location.pathname === '/portfolio/river-taxi' || location.pathname === '/portfolio/workshop';

  return (
    <div className="page">
      <header className="topbar">
        <nav className="nav">
          <NavLink
            to="/about"
            className={({ isActive }: { isActive: boolean }) => `nav-btn${isActive ? ' is-active' : ''}`}
            aria-current="page"
          >
            Обо мне
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }: { isActive: boolean }) => {
              // Deselect the Portfolio button when on the case page
              const active = isActive && !isCasePage;
              return `nav-btn${active ? ' is-active' : ''}`;
            }}
            aria-current="page"
          >
            Портфолио
          </NavLink>
          {/* Show the third button only on the case page */}
          {location.pathname === '/portfolio/fodmap' && (
            <NavLink
              to="/portfolio/fodmap"
              className={({ isActive }: { isActive: boolean }) => `nav-btn${isActive ? ' is-active' : ''}`}
              aria-current="page"
            >
              Трекер low-FODMAP
            </NavLink>
          )}
          {location.pathname === '/portfolio/tbanks' && (
            <NavLink
              to="/portfolio/tbanks"
              className={({ isActive }: { isActive: boolean }) => `nav-btn${isActive ? ' is-active' : ''}`}
              aria-current="page"
            >
              Т-Банк "Город"
            </NavLink>
          )}
           {location.pathname === '/portfolio/river-taxi' && (
             <NavLink
               to="/portfolio/river-taxi"
               className={({ isActive }: { isActive: boolean }) => `nav-btn${isActive ? ' is-active' : ''}`}
               aria-current="page"
             >
               Шеринг-такси
             </NavLink>
           )}
           {location.pathname === '/portfolio/workshop' && (
             <NavLink
               to="/portfolio/workshop"
               className={({ isActive }: { isActive: boolean }) => `nav-btn${isActive ? ' is-active' : ''}`}
               aria-current="page"
             >
               Workshop: проблема концентрации внимания
             </NavLink>
           )}
        </nav>
      </header>

      <main className="hero">

        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route
            path="/about"
            element={
              <>
                <h1 className="name">Халиман Никита</h1>
                <p className="role">UX/UI-дизайнер</p>
                <div className="contacts">
                  <button
                    className="contact-btn"
                    type="button"
                    aria-label="Copy email"
                    onClick={() => {
                      navigator.clipboard.writeText('khaliman.nikita@yandex.ru');
                      const toast = document.createElement('div');
                      toast.className = 'toast';
                      toast.textContent = 'Email скопирован';
                      document.body.appendChild(toast);
                      requestAnimationFrame(() => toast.classList.add('show'));
                      setTimeout(() => {
                        toast.classList.remove('show');
                        setTimeout(() => toast.remove(), 200);
                      }, 1500);
                    }}
                  >
                    <img className="icon" src="/src/assets/icons/email.svg" alt="" aria-hidden="true" />
                    <span>khaliman.nikita@yandex.ru</span>
                  </button>

                  <a
                    className="contact-btn"
                    href="https://t.me/ahamkara_nh"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Telegram"
                  >
                    <img className="icon" src="/src/assets/icons/telegram.svg" alt="" aria-hidden="true" />
                    <span>@ahamkara_nh</span>
                  </a>
                </div>
                <AboutSection />

                <section id="skills" className="skills">
                  <h2 className="section-title">Навыки</h2>
                  <ul className="skills-grid">
                    {/* NOTE: Replace each src with your icon file and keep the same path.
                Suggested icon paths (add your SVG/PNG files later):
                - /src/assets/icons/skills/figma.svg
                - /src/assets/icons/skills/photoshop.svg
                - /src/assets/icons/skills/miro.svg
                - /src/assets/icons/skills/rive.svg
                - /src/assets/icons/skills/html.svg
                - /src/assets/icons/skills/css.svg
                - /src/assets/icons/skills/js.svg
                - /src/assets/icons/skills/english.svg
            */}
                    <li className="skill-card">
                      <img className="skill-icon" src="/src/assets/icons/skills/figma.svg" alt="" aria-hidden="true" />
                      <span className="skill-name">Figma</span>
                    </li>
                    <li className="skill-card">
                      <img className="skill-icon" src="/src/assets/icons/skills/photoshop.svg" alt="" aria-hidden="true" />
                      <span className="skill-name">Photoshop</span>
                    </li>
                    <li className="skill-card">
                      <img className="skill-icon" src="/src/assets/icons/skills/miro.svg" alt="" aria-hidden="true" />
                      <span className="skill-name">Miro</span>
                    </li>
                    <li className="skill-card">
                      <img className="skill-icon" src="/src/assets/icons/skills/rive.svg" alt="" aria-hidden="true" />
                      <span className="skill-name">Rive</span>
                    </li>
                    <li className="skill-card">
                      <img className="skill-icon" src="/src/assets/icons/skills/html.svg" alt="" aria-hidden="true" />
                      <span className="skill-name">HTML/CSS</span>
                    </li>
                    
                    <li className="skill-card">
                      <img className="skill-icon" src="/src/assets/icons/skills/ux-research.svg" alt="" aria-hidden="true" />
                      <span className="skill-name">UX Research</span>
                    </li>
                    <li className="skill-card">
                      <img className="skill-icon" src="/src/assets/icons/skills/ai-tools.svg" alt="" aria-hidden="true" />
                      <span className="skill-name">AI-инструменты</span>
                    </li>
                    <li className="skill-card">
                      <img className="skill-icon" src="/src/assets/icons/skills/english.svg" alt="" aria-hidden="true" />
                      <span className="skill-name">Английский B2</span>
                    </li>
                  </ul>
                </section>


                <section id="experience" className="experience">
                  <h2 className="section-title">Опыт</h2>
                  <ul className="exp-list">
                    <li className="exp-item">
                      <details className="exp-details">
                        <summary className="exp-summary">
                          <div className="exp-title">Продуктовый дизайнер — Дипломный проект</div>
                          <div className="exp-meta">сентябрь 2024 — май 2025 / 9 месяцев</div>
                        </summary>
                        <div className="exp-content">
                          <ul>
                            <li>Провел глубокий UX-анализ, включая конкурентное исследование и экспертные интервью, для выявления и формализации пользовательских требований.</li>
                            <li>Спроектировал и разработал интерактивный прототип мобильного приложения в Figma, обеспечив его интуитивность и удобство.</li>
                            <li>Разработал системную архитектуру и логику API, заложив основу для создания функционального прототипа.</li>
                            <li>Организовал и провел юзабилити-тестирование прототипа, используя количественные и качественные метрики для оценки его эффективности.</li>
                            <li>Полностью спланировал и управлял всеми этапами проекта — от исследования до разработки функционального прототипа и оценки результатов.</li>
                          </ul>
                        </div>
                      </details>
                    </li>

                    <li className="exp-item">
                      <details className="exp-details">
                        <summary className="exp-summary">
                          <div className="exp-title">UI/UX дизайнер — Учебный проект с компанией «ТеДо» (Технологии Доверия) </div>
                          <div className="exp-meta">апрель 2024 — июнь 2024 / 3 месяца</div>
                        </summary>
                        <div className="exp-content">
                          <ul>
                            <li>Проанализировал пользовательский опыт и определил ключевые проблемы текущего интерфейса раздела "Город"</li>
                            <li>Спроектировал и визуализировал концепцию нового решения в виде макетов экранов приложения</li>
                            <li>Разработал дизайн и структуру итоговой proposal-презентации, превратив аналитические, технические и бизнес-идеи команды в понятный и убедительный визуальный сторителлинг для "заказчика".</li>
                            <li>Участвовал в разработке дорожной карты проекта, включая декомпозицию на этапы, оценку сроков и определение состава команды</li>
                            <li>Работал в команде вместе с аналитиками и специалистами по технической части, обеспечивая соответствие дизайн-решений общим целям и техническим возможностям проекта</li>
                          </ul>
                        </div>
                      </details>
                    </li>

                    <li className="exp-item">
                      <details className="exp-details">
                        <summary className="exp-summary">
                          <div className="exp-title">UI/UX дизайнер — Учебный проект с компанией «Центр гос. экспертизы»</div>
                          <div className="exp-meta">январь 2024 — март 2024 / 3 месяца</div>
                        </summary>
                        <div className="exp-content">
                          <ul>
                            <li>Цели и основные задачи проекта. Placeholder.</li>
                            <li>Ваши конкретные активности: дизайн-исследования, UI, прототипы. Placeholder.</li>
                            <li>Итоговые артефакты/результаты и эффект. Placeholder.</li>
                          </ul>
                        </div>
                      </details>
                    </li>
                  </ul>
                </section>


                <section id="education" className="education">
                  <h2 className="section-title">Образование</h2>
                  <ul className="edu-list">
                    <li className="edu-item">
                      <div className="edu-card">
                        <div className="edu-header">
                          <span className="edu-place">ВШЭ</span>
                          <span className="edu-time">2023–2025</span>
                        </div>
                        <div className="edu-meta">Магистратура</div>
                        <div className="edu-desc">UX-аналитика и проектирование информационных систем</div>
                      </div>
                    </li>

                    <li className="edu-item">
                      <div className="edu-card">
                        <div className="edu-header">
                          <span className="edu-place">Google UX Design</span>
                          <span className="edu-time">2023</span>
                        </div>
                        <div className="edu-meta">Coursera</div>
                        <div className="edu-desc">Онлайн курс по UX дизайну от Google на платформе Coursera</div>
                      </div>
                    </li>

                    <li className="edu-item">
                      <div className="edu-card">
                        <div className="edu-header">
                          <span className="edu-place">СПБГУТ</span>
                          <span className="edu-time">2019–2023</span>
                        </div>
                        <div className="edu-meta">Бакалавриат</div>
                        <div className="edu-desc">Инфокоммуникационные технологии и системы связи</div>
                      </div>
                    </li>
                  </ul>
                </section>

                <HardSoftSkillsSection />
              </>
            }
          />
          <Route
            path="/portfolio"
            element={
              <>
                {/* Contacts section reused, as requested */}
                <h1 className="name">Халиман Никита</h1>
                <p className="role">UX/UI-дизайнер</p>
                <div className="contacts">
                  <button
                    className="contact-btn"
                    type="button"
                    aria-label="Copy email"
                    onClick={() => {
                      navigator.clipboard.writeText('khaliman.nikita@yandex.ru');
                      const toast = document.createElement('div');
                      toast.className = 'toast';
                      toast.textContent = 'Email скопирован';
                      document.body.appendChild(toast);
                      requestAnimationFrame(() => toast.classList.add('show'));
                      setTimeout(() => {
                        toast.classList.remove('show');
                        setTimeout(() => toast.remove(), 200);
                      }, 1500);
                    }}
                  >
                    <img className="icon" src="/src/assets/icons/email.svg" alt="" aria-hidden="true" />
                    <span>khaliman.nikita@yandex.ru</span>
                  </button>

                  <a
                    className="contact-btn"
                    href="https://t.me/ahamkara_nh"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Telegram"
                  >
                    <img className="icon" src="/src/assets/icons/telegram.svg" alt="" aria-hidden="true" />
                    <span>@ahamkara_nh</span>
                  </a>
                </div>

                <section id="portfolio" className="portfolio">

                  <ul className="portfolio-grid">
                    <li className="case-card">
                      <a className="case-link" href="/portfolio/fodmap" aria-label="Открыть кейс: Трекер low-FODMAP">
                        <img
                          className="case-image"
                          src="/src/assets/case-images/first.png"
                          alt="Превью проекта: Трекер low-FODMAP"
                          aria-hidden="true"
                        />
                        <div className="case-body">
                          <h3 className="case-title">Трекер low-FODMAP диеты, Telegram Mini-App</h3>
                          <div className="case-origin">Дипломный проект ВШЭ</div>
                        </div>
                      </a>
                    </li>

                    <li className="case-card">
                      <a className="case-link" href="/portfolio/tbanks" aria-label="Открыть кейс: Концепт рекомендательной системы в Т-Банк Город">
                        <img
                          className="case-image"
                          src="src\assets\case-images\second-case\bank.png"
                          alt="Превью проекта: Концепт рекомендательной системы в Т-Банк Город"
                          aria-hidden="true"
                        />
                        <div className="case-body">
                          <h3 className="case-title">Концепт рекомендательной системы в Т-Банк "Город"</h3>
                          <div className="case-origin">Учебный проект с компанией "ТеДо" (Технологии Доверия)</div>
                        </div>
                      </a>
                    </li>

                    <li className="case-card">
                      <a className="case-link" href="/portfolio/river-taxi" aria-label="Открыть кейс: Сервис заказов речного шеринг-такси">
                        <img
                          className="case-image"
                          src="/src/assets/case-images/third-case/Cover.png"
                          alt="Превью проекта: Сервис заказов речного шеринг-такси"
                          aria-hidden="true"
                        />
                        <div className="case-body">
                          <h3 className="case-title">Сервис заказов речного шеринг-такси</h3>
                          <div className="case-origin">Хакатон HACK&CHANGE</div>
                        </div>
                      </a>
                    </li>

                     <li className="case-card">
                       <a className="case-link" href="/portfolio/workshop" aria-label="Открыть кейс: Workshop: проблема концентрации внимания">
                         <img
                           className="case-image"
                           src="https://placehold.co/600x400/png"
                           alt="Превью проекта: Workshop: проблема концентрации внимания"
                           aria-hidden="true"
                         />
                         <div className="case-body">
                           <h3 className="case-title">Workshop: проблема концентрации внимания</h3>
                           <div className="case-origin">Учебный проект ВШЭ</div>
                         </div>
                       </a>
                     </li>
                  </ul>
                </section>
              </>
            }
          />
          <Route
            path="/portfolio/fodmap"
            element={
              <>
                {/* Keep only the two existing buttons at the top (from header). No hero section here. */}
                <CaseLowFodmap />
              </>
            }
          />
          <Route
            path="/portfolio/tbanks"
            element={
              <>
                {/* Keep only the two existing buttons at the top (from header). No hero section here. */}
                <CaseTBanks />
              </>
            }
          />
           <Route
             path="/portfolio/river-taxi"
             element={
               <>
                 {/* Keep only the two existing buttons at the top (from header). No hero section here. */}
                 <CaseRiverTaxi/>
               </>
             }
           />
           <Route
             path="/portfolio/workshop"
             element={
               <>
                 {/* Keep only the two existing buttons at the top (from header). No hero section here. */}
                 <CaseWorkshop />
               </>
             }
           />
        </Routes>

      </main>
    </div>
  );
}
