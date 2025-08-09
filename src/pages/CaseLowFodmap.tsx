import React from 'react';
import './case-lowfodmap.css';

export default function CaseLowFodmap() {
  // Intentionally minimal: empty long-form page scaffold without hero, keeping only global top buttons from App layout
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
        </section>

      </section>
    </div>
  );
}
