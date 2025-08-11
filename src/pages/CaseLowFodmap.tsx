import './case-lowfodmap.css';

export default function CaseLowFodmap() {
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

        {/* Connection sentence 1 */}
        <div className="case-lowfodmap__connection">
          <p className="case-lowfodmap__connection-text">
            Диета эффективна, но довольно сложна для повседневной жизни.
          </p>
        </div>

        {/* Connection sentence 2 */}
        <div className="case-lowfodmap__connection">
          <p className="case-lowfodmap__connection-text">
            Было бы неплохо сделать инструмент, который поможет людям пройти этот непростой путь, но для начала стоит посмотреть существующие решения.
          </p>
        </div>

        {/* Connection sentence 3 */}   
        <div className="case-lowfodmap__connection">
          <p className="case-lowfodmap__connection-text">
            Возможно подходящий инструмент уже существует?
          </p>
        </div>
        <div className="case-lowfodmap__connection"></div>
      </section>
    </div>
  );
}
