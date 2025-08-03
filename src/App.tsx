import './styles.css';

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <nav className="nav">
          <a href="#about" className="nav-btn">Обо мне</a>
          <a href="#portfolio" className="nav-btn">Портфолио</a>
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
      </main>
    </div>
  );
}
