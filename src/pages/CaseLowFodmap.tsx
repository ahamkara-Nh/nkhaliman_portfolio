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

        <div className='case-lowfodmap__connection'>
          {/* THIS IS A DIVIDER. DO NOT TOUCH IT*/}   
        </div>
        
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
          <h2 className="case-lowfodmap__problem-header">Предметная область</h2>
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
        </section>
      </section>
    </div>
  );
}
