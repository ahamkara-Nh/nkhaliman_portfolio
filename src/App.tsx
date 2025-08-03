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
          <a className="contact-btn" href="mailto:khaliman.nikita@yandex.ru">
            khaliman.nikita@yandex.ru
          </a>
          <a className="contact-btn" href="https://t.me/ahamkara_nh" target="_blank" rel="noreferrer">
            @ahamkara_nh
          </a>
        </div>
      </main>
    </div>
  );
}
