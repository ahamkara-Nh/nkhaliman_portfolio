import styles from './case-river-taxi.module.css';

export default function CaseRiverTaxi() {
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
            <h2 className={styles['case-river-taxi__section-title']}>Мой вклад</h2>
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

        {/* About Project Section */}
        <section id="about-project" className={styles['case-river-taxi__about-section']}>
          <h2 className={styles['case-river-taxi__about-header']}>О проекте</h2>
          <div className={styles['case-river-taxi__about-content']}>
            <div className={styles['case-river-taxi__about-text']}>
              <p>
                <strong>Хакатон HACK&CHANGE</strong> — это интенсивное соревнование, где команды разработчиков, дизайнеров и предпринимателей создают инновационные решения за ограниченное время. Наш проект был посвящен созданию сервиса для речного шеринг-такси.
              </p>
              <p>
                <strong>Команда:</strong> Мы собрали междисциплинарную команду из 5 человек, включая UX/UI дизайнеров, разработчиков и бизнес-аналитика.
              </p>
              <p>
                <strong>Длительность:</strong> 48 часов непрерывной работы
              </p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className={styles['case-river-taxi__solution-section']}>
          <h2 className={styles['case-river-taxi__solution-header']}>Наше решение</h2>
          <div className={styles['case-river-taxi__solution-content']}>
            <p>
              [Подробное описание решения будет добавлено позже. Здесь будет рассказано о ключевых особенностях сервиса, его функциональности и инновационных подходах к организации водного транспорта.]
            </p>
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className={styles['case-river-taxi__results-section']}>
          <h2 className={styles['case-river-taxi__results-header']}>Результаты</h2>
          <div className={styles['case-river-taxi__results-content']}>
            <p>
              [Информация о результатах участия в хакатоне и достигнутых успехах будет добавлена позже.]
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
