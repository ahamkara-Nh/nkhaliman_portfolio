import "./case-workshop.css";
import { useState, useRef, useEffect } from "react";

export default function CaseWorkshop() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPhase2Fullscreen, setIsPhase2Fullscreen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState("");
  const [zoomLevel, setZoomLevel] = useState(0.25);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [currentScreen, setCurrentScreen] = useState(0);
  const [mainScreensCurrentScreen, setMainScreensCurrentScreen] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const diagramRef = useRef<HTMLDivElement>(null);
  const touchStartDistance = useRef<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const mainScreensTrackRef = useRef<HTMLDivElement>(null);

  // Handle scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="case-page case-workshop"
      role="main"
      aria-label="Case: Workshop"
    >
      <section className="case-content" aria-label="Storyline content">
        <header className="case-workshop__header">
          <h1 className="case-workshop__title">
            Workshop: проблема концентрации внимания
          </h1>
          <p className="case-workshop__subtitle">Учебный проект ВШЭ</p>
        </header>
        <div className="case-workshop__description">
          <p>
            Учебный проект, выполненный в рамках магистерской программы. Целью
            исследования было глубже понять, как люди справляются с проблемами
            концентрации внимания при выполнении рабочих и учебных задач, чтобы
            определить возможные решения для повышения их продуктивности.
          </p>
        </div>

        <div className="case-workshop__content-row">
          <div className="case-workshop__table-of-contents">
            <h2 className="case-workshop__section-title">Содержание</h2>
            <ul className="case-workshop__toc-list">
              <li className="case-workshop__toc-item">
                <a href="#problem" className="case-workshop__toc-link">
                  1. Проблема
                </a>
              </li>
              <li className="case-workshop__toc-item">
                <a href="#research" className="case-workshop__toc-link">
                  2. Исследование
                </a>
              </li>
              <li className="case-workshop__toc-item">
                <a href="#design" className="case-workshop__toc-link">
                  3. Дизайн и функционал
                </a>
              </li>
              <li className="case-workshop__toc-item">
                <a href="#testing" className="case-workshop__toc-link">
                  4. Тестирование и результаты
                </a>
              </li>
              <li className="case-workshop__toc-item">
                <a href="#conclusion" className="case-workshop__toc-link">
                  5. Выводы и ограничения
                </a>
              </li>
            </ul>
          </div>

          <div className="case-workshop__key-results">
            <h2 className="case-workshop__section-title">
              Мой вклад в групповой проект
            </h2>
            <div className="case-workshop__contributions-list">
              <div className="case-workshop__contribution-item">
                <div className="case-workshop__contribution-header">
                  <strong>Разработка активностей:</strong>
                </div>
                <div className="case-workshop__contribution-text">
                  Участвовал в создании структуры заданий для участников
                  воркшопа на доске в Miro.
                </div>
              </div>
              <div className="case-workshop__contribution-item">
                <div className="case-workshop__contribution-header">
                  <strong>Подготовка презентации:</strong>
                </div>
                <div className="case-workshop__contribution-text">
                  Разработал структуру и дизайн итоговой презентации для защиты
                  проекта.
                </div>
              </div>
              <div className="case-workshop__contribution-item">
                <div className="case-workshop__contribution-header">
                  <strong>Написание отчета:</strong>
                </div>
                <div className="case-workshop__contribution-text">
                  Составил детальный отчет по результатам воркшопа, обобщив
                  полученные данные и сформулировав ключевые выводы.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Section */}
        <section id="problem" className="case-workshop__problem-section">
          <h2 className="case-workshop__problem-header">
            Проблема: Почему мы теряем фокус?
          </h2>
          <div className="case-workshop__problem-content">
            <p>
              В современном мире, переполненном информацией и отвлечениями,
              способность концентрироваться стала ценным ресурсом. Наша учебная
              группа столкнулась с тем, что многим сложно эффективно управлять
              своим вниманием при решении рабочих и учебных задач.
            </p>
            <p>
              Мы решили не гадать, а спросить напрямую у потенциальных
              пользователей. Целью воркшопа было определить возможные решения
              для повышения эффективности управления вниманием.
            </p>
          </div>

          <div className="case-workshop__problem-image">
            <img
              src="/src/assets/case-images/fourth-case/attention.png"
              alt="Проблема концентрации внимания"
              className="case-workshop__problem-image-img"
            />
          </div>
        </section>

        {/* Preparation Section */}
        <section
          id="preparation"
          className="case-workshop__preparation-section"
        >
          <h2 className="case-workshop__preparation-header">
            Подготовка и планирование
          </h2>
          <div className="case-workshop__preparation-content">
            <p>
              Прежде чем начать, мы четко определили для себя фокус исследования
              в соответствии с методологией <strong>101 Design Methods</strong>:
            </p>
            <ul>
              <li>
                <strong>Know Context:</strong> Понять, в каких ситуациях и
                контекстах люди теряют концентрацию.
              </li>
              <li>
                <strong>Frame Insights:</strong> Упорядочить и систематизировать
                полученные данные.
              </li>
              <li>
                <strong>Explore Concepts:</strong> Проводим мозговой штурм
                возможных решений.
              </li>
            </ul>
            <p>
              Мы разработали детальный план на 2 часа, который включал
              знакомство, четыре ключевые активности и перерыв. Критерием для
              участников было наличие реальных проблем с концентрацией, а также
              разнообразие по роду деятельности и полу. В итоге мы собрали
              группу из 6 человек.
            </p>
          </div>

          <div className="case-workshop__preparation-image">
            <img
              src="/src/assets/case-images/fourth-case/101design.png"
              alt="101 Design Methods"
              className="case-workshop__preparation-image-img"
            />
          </div>
        </section>

        {/* Workshop Flow Section */}
        <section
          id="workshop-flow"
          className="case-workshop__workshop-flow-section"
        >
          <h2 className="case-workshop__workshop-flow-header">
            Ход воркшопа: Погружение в проблему
          </h2>
          <div className="case-workshop__workshop-flow-content">
            <p>
              Воркшоп проходил в Яндекс.Телемосте, а все активности мы
              организовали на интерактивной доске Miro.
            </p>
            <p>
              <strong>1. Знакомство и Ice-breaking.</strong> Мы начали с
              неформального знакомства, чтобы создать доверительную атмосферу и
              понять контекст каждого участника.
            </p>
          </div>

          <div className="case-workshop__miro-embed">
            <iframe
              width="768"
              height="496"
              src="https://miro.com/app/live-embed/uXjVJ_Z6fsY=/?focusWidget=3458764582175593084&embedMode=view_only_without_ui&embedId=695162889405"
              frameBorder="0"
              scrolling="no"
              allow="fullscreen; clipboard-read; clipboard-write"
              allowFullScreen
            ></iframe>
          </div>

          <div className="case-workshop__workshop-flow-content">
            <p>
              <strong>2. Задачи-провокаторы.</strong> Участники записывали
              задачи, на которых им сложнее всего сосредоточиться, и отмечали
              свои эмоции. Это помогло выявить контексты: проблемы возникали не
              только со скучными, но и с приятными задачами (чтение, обучение,
              творчество).
            </p>
          </div>

          <div className="case-workshop__miro-embed">
            <iframe
              width="768"
              height="496"
              src="https://miro.com/app/live-embed/uXjVJ_Z6fsY=/?focusWidget=3458764582175593085&embedMode=view_only_without_ui&embedId=695162889405"
              frameBorder="0"
              scrolling="no"
              allow="fullscreen; clipboard-read; clipboard-write"
              allowFullScreen
            ></iframe>
          </div>

          <div className="case-workshop__workshop-flow-content">
            <p>
              <strong>3. Карта отвлекающих факторов.</strong> Ключевая
              активность! Мы попросили участников распределить триггеры по трем
              сферам: Физический мир, Виртуальный мир и Внутреннее состояние.
            </p>
          </div>

          <div className="case-workshop__miro-embed">
            <iframe
              width="768"
              height="496"
              src="https://miro.com/app/live-embed/uXjVJ_Z6fsY=/?focusWidget=3458764582175593089&embedMode=view_only_without_ui&embedId=218164128317"
              frameBorder="0"
              scrolling="no"
              allow="fullscreen; clipboard-read; clipboard-write"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Main Insight Section */}
        <section
          id="main-insight"
          className="case-workshop__main-insight-section"
        >
          <h2 className="case-workshop__main-insight-header">
            Главный инсайт: Враг внутри
          </h2>
          <div className="case-workshop__main-insight-content">
            <p>
              Мы ожидали, что лидером окажется «Виртуальный мир» (соцсети,
              уведомления). Но результат удивил:
            </p>
            <p>
              <strong>
                Большинство отвлекающих факторов оказались в сфере «Внутреннее
                состояние»
              </strong>{" "}
              — тревожность, усталость, стресс, отсутствие мотивации.
            </p>
            <p>Это стало поворотным пунктом нашего исследования.</p>
          </div>
        </section>

        {/* User Solutions Section */}
        <section
          id="user-solutions"
          className="case-workshop__user-solutions-section"
        >
          <h2 className="case-workshop__user-solutions-header">
            Решения пользователей и их ожидания
          </h2>
          <div className="case-workshop__user-solutions-content">
            <p>Далее мы исследовали, как участники борются с проблемой:</p>
            <ul>
              <li>
                <strong>Методы:</strong> Использование таймеров (Pomodoro),
                планирование, приложения-трекеры.
              </li>
              <li>
                <strong>Эффективность:</strong> Ни один метод не был признан
                100% рабочим. Большинство техник боролись с внешними факторами
                (виртуальным и физическим миром), в то время как главная
                проблема — внутреннее состояние — оставалась без внимания.
              </li>
            </ul>
            <p>
              На финальной активности <strong>Crazy 8</strong> мы собрали
              ожидания от гипотетического сервиса для продуктивности:
            </p>
            <ul>
              <li>
                <strong>Единый календарь</strong> и система планирования.
              </li>
              <li>
                <strong>"Экологичные" уведомления</strong> (мнения разделились:
                кому-то нужен навязчивый стиль Duolingo, а кому-то — мягкие
                напоминания).
              </li>
              <li>
                <strong>Советы и лайфхаки</strong> по борьбе с прокрастинацией.
              </li>
              <li>
                <strong>Мотивация через геймификацию,</strong> бонусы и
                статистику.
              </li>
            </ul>
          </div>

          <div className="case-workshop__miro-embed">
            <iframe
              width="768"
              height="496"
              src="https://miro.com/app/live-embed/uXjVJ_Z6fsY=/?focusWidget=3458764582175593088&embedMode=view_only_without_ui&embedId=218164128317"
              frameBorder="0"
              scrolling="no"
              allow="fullscreen; clipboard-read; clipboard-write"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Conclusions Section */}
        <section
          id="conclusions"
          className="case-workshop__conclusions-section"
        >
          <h2 className="case-workshop__conclusions-header">
            Выводы и рефлексия
          </h2>
          <div className="case-workshop__conclusions-content">
            <p>
              <strong>Что мы достигли:</strong>
            </p>
            <ul>
              <li>
                ✔ Выявили неочевидную главную причину потери фокуса —
                внутреннее состояние.
              </li>
              <li>
                ✔ Собрали портрет задач и контекстов, где концентрация падает.
              </li>
              <li>
                ✔ Определили пробел на рынке: недостаток инструментов для
                работы с внутренними триггерами.
              </li>
              <li>
                ✔ Сформировали список ожиданий от сервиса для продуктивности.
              </li>
            </ul>
            <p>
              <strong>Что можно улучшить в следующий раз:</strong>
            </p>
            <ul>
              <li>
                Сделать формат более интерактивным, с большим количеством
                обсуждений.
              </li>
              <li>
                Всегда предоставлять <strong>наглядные примеры</strong>{" "}
                выполнения заданий, так как участники не всегда читают текстовые
                инструкции.
              </li>
              <li>
                Тщательнее тестировать техническую часть (Miro, видеосвязь)
                перед началом.
              </li>
            </ul>
          </div>

          <div className="case-workshop__conclusions-image">
            <img
              src="/src/assets/case-images/fourth-case/screenshot.png"
              alt="Скриншот результатов воркшопа"
              className="case-workshop__conclusions-image-img"
            />
          </div>
        </section>

        {/* Final Section */}
        <section id="final" className="case-workshop__final-section">
          <h2 className="case-workshop__final-header">Итог</h2>
          <div className="case-workshop__final-content">
            <p>
              Этот воркшоп стал для меня ценным опытом в организации
              пользовательских исследований. Я не только прокачал навыки
              фасилитации и работы с группой, но и научился выявлять глубинные,
              неочевидные инсайты. Главный вывод: создавая цифровой продукт,
              важно смотреть не только на внешние раздражители, но и на
              внутренний мир пользователя. Собранные данные стали прочной
              основой для следующего этапа — проектирования сервиса, который
              действительно поможет людям справляться с вызовами цифровой эпохи.
            </p>
          </div>

          <div className="case-workshop__figma-embed">
            <iframe
              style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
              width="100%"
              height="600"
              src="https://embed.figma.com/proto/QnyyiYxhdZdGjSxWqPj6Id/workshop_presentation?node-id=2-2&p=f&scaling=contain&content-scaling=fixed&page-id=0%3A1&embed-host=share&footer=false&theme=dark"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Add your sections here: research, design, testing, conclusion */}

        {/* Fullscreen Modal */}
        {isFullscreen && (
          <div
            className="case-workshop__fullscreen-overlay"
            onClick={() => setIsFullscreen(false)}
          >
            <div
              className="case-workshop__fullscreen-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Add fullscreen content here */}
            </div>
          </div>
        )}

        {/* Fullscreen Modal for Phase 2 Screenshots */}
        {isPhase2Fullscreen && (
          <div
            className="case-workshop__fullscreen-overlay case-workshop__fullscreen-overlay--phase2"
            onClick={() => setIsPhase2Fullscreen(false)}
          >
            <div
              className="case-workshop__fullscreen-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Add fullscreen content here */}
            </div>
          </div>
        )}

        {/* Back to Top Button */}
        <button
          className={`case-workshop__back-to-top ${showBackToTop ? "show" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Наверх"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 19V5M12 5L5 12M12 5L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>
    </div>
  );
}
