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
            От безликой ленты к персональному гиду: как мы планируем увеличить конверсию в 1.5 раза для сервиса "Город" в Т-Банке
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
            <h2 className={styles['case-tbanks__section-title']}>Ожидаемые результаты</h2>
            <div className={styles['case-tbanks__results-grid']}>
              <div className={styles['case-tbanks__result-card']}>
                <div className={styles['case-tbanks__result-number']}>1.5x</div>
                <div className={styles['case-tbanks__result-label']}>рост конверсии</div>
              </div>
              <div className={styles['case-tbanks__result-card']}>
                <div className={styles['case-tbanks__result-number']}>85%</div>
                <div className={styles['case-tbanks__result-label']}>точность рекомендаций</div>
              </div>
              <div className={styles['case-tbanks__result-card']}>
                <div className={styles['case-tbanks__result-number']}>Байесовские сети</div>
                <div className={styles['case-tbanks__result-label']}>технология</div>
              </div>
            </div>
          </div>
        </div>

        <section id="problem" className={styles['case-tbanks__problem-section']}>
          <h2 className={styles['case-tbanks__problem-header']}>Проблематика сервиса "Город"</h2>
          <div className={styles['case-tbanks__problem-content']}>
            <div className={styles['case-tbanks__problem-text']}>
              <p>
                <b>Сервис "Город" Т-Банка</b> — это цифровая платформа для оплаты городских услуг, однако текущая реализация имеет существенные ограничения в персонализации предложения услуг.
              </p>
              <p>
                Пользователи сталкиваются с <b>информационным шумом</b> — им приходится вручную искать нужные услуги среди десятков доступных опций, что значительно снижает удобство использования и конверсию.
              </p>
            </div>
          </div>

          <h3 className={styles['case-tbanks__complexity-subheader']}>Ключевые проблемы текущей реализации</h3>
          <div className={styles['case-tbanks__complexity-cards']}>
            <div className={styles['case-tbanks__complexity-card']}>
              <h4 className={styles['case-tbanks__complexity-card-title']}>Отсутствие персонализации</h4>
              <p className={styles['case-tbanks__complexity-card-text']}>Все пользователи видят одинаковый набор услуг без учёта их индивидуальных потребностей и истории использования.</p>
            </div>
            <div className={styles['case-tbanks__complexity-card']}>
              <h4 className={styles['case-tbanks__complexity-card-title']}>Низкая конверсия</h4>
              <p className={styles['case-tbanks__complexity-card-text']}>Пользователи часто уходят с сервиса, не найдя нужную услугу, что приводит к потере потенциального дохода.</p>
            </div>
            <div className={styles['case-tbanks__complexity-card']}>
              <h4 className={styles['case-tbanks__complexity-card-title']}>Неэффективный поиск</h4>
              <p className={styles['case-tbanks__complexity-card-text']}>Отсутствие умного поиска и рекомендаций заставляет пользователей тратить время на навигацию по сервису.</p>
            </div>
          </div>
        </section>

        <section id="research" className={styles['case-tbanks__research-section']}>
          <h2 className={styles['case-tbanks__problem-header']}>Исследование и анализ данных</h2>
          <div className={styles['case-tbanks__research-description']}>
            <p>
              Для разработки эффективной рекомендательной системы мы провели комплексное исследование, включающее анализ пользовательского поведения, изучение паттернов использования услуг и оценку технических возможностей платформы.
            </p>
          </div>

          <h3 className={styles['case-tbanks__complexity-subheader']}>Анализ пользовательских сегментов</h3>
          <div className={styles['case-tbanks__research-description']}>
            <p>
              На основе данных о транзакциях и поведении пользователей мы выделили ключевые сегменты, каждый из которых имеет специфические потребности в городских услугах.
            </p>
          </div>
        </section>

        <section id="concept" className={styles['case-tbanks__concept-section']}>
          <h2 className={styles['case-tbanks__problem-header']}>Концепция рекомендательной системы</h2>
          <div className={styles['case-tbanks__research-description']}>
            <p>
              <b>Байесовские сети</b> были выбраны как основная технология для реализации рекомендательной системы благодаря их способности эффективно работать с неполными данными и учитывать вероятностные зависимости между различными факторами.
            </p>
          </div>

          <h3 className={styles['case-tbanks__complexity-subheader']}>Архитектура системы</h3>
          <div className={styles['case-tbanks__research-description']}>
            <p>
              Система состоит из нескольких ключевых компонентов: сбор данных о пользователях, построение байесовской сети, механизм рекомендаций и система обратной связи для непрерывного обучения модели.
            </p>
          </div>
        </section>

        <section id="implementation" className={styles['case-tbanks__implementation-section']}>
          <h2 className={styles['case-tbanks__problem-header']}>Техническая реализация</h2>
          <div className={styles['case-tbanks__research-description']}>
            <p>
              Реализация включает разработку алгоритмов машинного обучения, интеграцию с существующими системами Т-Банка и создание пользовательского интерфейса для отображения персонализированных рекомендаций.
            </p>
          </div>
        </section>

        <section id="roadmap" className={styles['case-tbanks__roadmap-section']}>
          <h2 className={styles['case-tbanks__problem-header']}>Дорожная карта внедрения</h2>
          <div className={styles['case-tbanks__research-description']}>
            <p>
              Проект разбит на этапы: от пилотного тестирования с ограниченным набором пользователей до полномасштабного внедрения с непрерывным мониторингом эффективности системы.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
