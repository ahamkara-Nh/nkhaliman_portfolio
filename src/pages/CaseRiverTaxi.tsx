import styles from './case-river-taxi.module.css';
import MermaidDiagram from '../components/MermaidDiagram';

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
            
            <div className={styles['case-river-taxi__diagram-container']}>
              <h4 className={styles['case-river-taxi__diagram-title']}>Алгоритм работы сервиса</h4>
              <MermaidDiagram
                chart={`flowchart TD
  A[Пассажир A запрашивает водное такси] --> B[Система строит маршрут R_A и рассчитывает индивидуальный тариф]
  B --> C[Поиск потенциальных попутчиков с похожими маршрутами]
  C --> D{Соответствуют ли кандидаты ограничениям по времени и объезду?}
  D -- Yes --> E[Рассчитать дополнительное время, расстояние и балл совпадения]
  D -- No --> F[Пропустить кандидата]
  E --> G[Отправить предложение поездки с ETA и предполагаемой платой]
  G --> H{Принимает ли кандидат?}
  H -- Yes --> I[Заблокировать место и оптимизировать объединенный маршрут]
  H -- No --> J[Продолжить поиск или ехать в одиночку]
  I --> K[Пересчитать общую стоимость и разделить тарифы]
  K --> L[Уведомить всех пассажиров об окончательном ETA и цене]
  L --> M{Появляется новый запрос пассажира?}
  M -- Yes --> N[Проверить влияние объезда на всех пассажиров]
  N --> O{Объезд в пределах разрешенных ограничений?}
  O -- Yes --> P[Добавить пассажира, пересчитать маршрут и тариф]
  O -- No --> Q[Отклонить или запросить согласие пассажира]
  Q --> R[Если согласие дано → Добавить пассажира, иначе отклонить]
  M -- No --> S[Продолжить поездку]`}
                className={styles['case-river-taxi__mermaid-diagram']}
              />
            </div>
          </div>
        </section>

      </section>
    </div>
  );
}
