import './styles.css';

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


export default function App() {
  // Scroll to About by default on first load
  if (typeof window !== 'undefined') {
    const hash = window.location.hash;
    if (!hash) {
      // Set hash to #about to make About the default visible section
      window.location.hash = '#about';
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <nav className="nav">
          <a href="#about" className="nav-btn">Обо мне</a>
          {/* <a href="#portfolio" className="nav-btn">Портфолио</a> */}
        </nav>
      </header>

      <main className="hero">
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
      </main>
    </div>
  );
}
