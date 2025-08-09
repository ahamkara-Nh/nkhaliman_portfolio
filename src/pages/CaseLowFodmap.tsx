import React from 'react';
import './case-lowfodmap.css';

export default function CaseLowFodmap() {
  // Intentionally minimal: empty long-form page scaffold without hero, keeping only global top buttons from App layout
  return (
    <div className="case-page case-lowfodmap" role="main" aria-label="Case: Low-FODMAP">
      <section className="case-content" aria-label="Storyline content">
        <header className="case-lowfodmap__header">
          <h1 className="case-lowfodmap__title">Трекер low-FODMAP диеты, Telegram Mini-App</h1>
          <p className="case-lowfodmap__subtitle">Дипломный проект ВШЭ</p>
        </header>
      </section>
    </div>
  );
}
