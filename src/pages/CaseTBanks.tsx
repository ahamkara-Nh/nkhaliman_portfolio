import styles from './case-tbanks.module.css';

export default function CaseTBanks() {
  return (
    <div className={`${styles['case-page']} ${styles['case-tbanks']}`} role="main" aria-label="Case: T-Bank Recommendation System">
      <section className={styles['case-content']} aria-label="Storyline content">
        <header className={styles['case-tbanks__header']}>
          <h1 className={styles['case-tbanks__title']}>Концепт рекомендательной системы в Т-Банк "Город"</h1>
          <p className={styles['case-tbanks__subtitle']}>Учебный проект с компанией "ТеДо" (Технологии Доверия)</p>
        </header>
        <div className={styles['case-tbanks__description']}>
          <p>
            От безликой ленты к персональному гиду: как мы планировали внедрение новой рекомендательной системы и увеличить конверсию в 1.5 раза для сервиса "Город" в Т-Банке
            Разработка концепции рекомендательной системы на основе байесовских сетей — от исследования пользователей до дорожной карты внедрения.
          </p>
        </div>

        <div className={styles['case-tbanks__content-row']}>
          <div className={styles['case-tbanks__table-of-contents']}>
            <h2 className={styles['case-tbanks__section-title']}>Содержание</h2>
            <ul className={styles['case-tbanks__toc-list']}>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#problem" className={styles['case-tbanks__toc-link']}>1. Проблематика сервиса "Город"</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#research" className={styles['case-tbanks__toc-link']}>2. Исследование и анализ данных</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#concept" className={styles['case-tbanks__toc-link']}>3. Концепция рекомендательной системы</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#implementation" className={styles['case-tbanks__toc-link']}>4. Техническая реализация</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#roadmap" className={styles['case-tbanks__toc-link']}>5. Дорожная карта внедрения</a>
              </li>
            </ul>
          </div>

          <div className={styles['case-tbanks__key-results']}>
            <h2 className={styles['case-tbanks__section-title']}>Ключевые результаты</h2>
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
      </section>
    </div>
  );
}
