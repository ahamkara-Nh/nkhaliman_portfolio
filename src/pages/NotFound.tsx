import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <p className="not-found__description">
          Похоже, вы заблудились в цифровом пространстве.
          Давайте вернёмся к началу.
        </p>
        <Link to="/about" className="not-found__link">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}