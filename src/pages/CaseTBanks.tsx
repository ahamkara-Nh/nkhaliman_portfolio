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
            От безликого раздела к персональному гиду: как мы планировали внедрение новой рекомендательной системы, 
            чтобы увеличить конверсию в 1.5 раза для сервиса "Город" в Т-Банке.
            Разработка концепции рекомендательной системы на основе байесовских сетей — 
            от исследования пользователей до дорожной карты внедрения.
          </p>
        </div>

        <div className={styles['case-tbanks__content-row']}>
          <div className={styles['case-tbanks__table-of-contents']}>
            <h2 className={styles['case-tbanks__section-title']}>Содержание</h2>
            <ul className={styles['case-tbanks__toc-list']}>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#about-project" className={styles['case-tbanks__toc-link']}>1. О проекте</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#placeholder" className={styles['case-tbanks__toc-link']}>Coming soon ...</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#placeholder" className={styles['case-tbanks__toc-link']}>Coming soon ...</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#placeholder" className={styles['case-tbanks__toc-link']}>Coming soon ...</a>
              </li>
              <li className={styles['case-tbanks__toc-item']}>
                <a href="#placeholder" className={styles['case-tbanks__toc-link']}>Coming soon ...</a>
              </li>
            </ul>
          </div>

          <div className={styles['case-tbanks__key-results']}>
            <h2 className={styles['case-tbanks__section-title']}>Мой вклад в групповой проект</h2>
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

        {/* About Project Section */}
        <section id="about-project" className={styles['case-tbanks__about-section']}>
          <h2 className={styles['case-tbanks__about-header']}>О проекте</h2>
          <div className={styles['case-tbanks__about-content']}>
            <div className={styles['case-tbanks__about-text']}>
              <p>
                <strong>Цель проекта</strong> заключалась в том, чтобы превратить сложную технологию — байесовские сети — в понятный и полезный для пользователя продукт. По сути, нам дали алгоритм и попросили «упаковать» его так, чтобы он выглядел как современная рекомендательная система для платформ по продаже билетов.
              </p>
              <p>
                В качестве платформы нами был выбран "<strong>Т.Банк Город</strong>". Мы прорабатывали бизнес-модель и интерфейс, который показывает путь пользователя от первого интереса до покупки билета, помогая ему открывать новые форматы досуга — от музеев и ресторанов до уникальных активностей.
              </p>
              <p>
                <strong>Роль и команда:</strong> Я выступал в роли UX/UI Designer в команде из 4 человек: аналитика, менеджера и исследователя. Мы работали вместе как кросс-функциональная команда, где каждый отвечал за свою экспертизу.
              </p>
              <p>
                <strong>Длительность</strong>: 3 месяца
              </p>
            </div>
            <div className={styles['case-tbanks__about-image']}>
              <img
                src="/src/assets/case-images/second-case/phone_mockup.png"
                alt="Phone mockup showing T-Bank City interface"
                className={styles['case-tbanks__mockup-image']}
              />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
