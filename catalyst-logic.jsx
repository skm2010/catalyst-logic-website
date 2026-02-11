import { useState, useEffect, useRef } from "react";

// ─── Styles ────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --ink: #0b1520;
  --navy: #0f2039;
  --slate: #1c3454;
  --steel: #3a5a80;
  --mid: #5a7da6;
  --light: #8aacc8;
  --sky: #b8d4e8;
  --mist: #e8eff5;
  --wash: #f4f7fa;
  --white: #ffffff;
  --amber: #c8854a;
  --amber-light: #daa06d;
  --amber-subtle: rgba(200, 133, 74, 0.08);
  --gray-50: #f8f9fb;
  --gray-100: #edf0f4;
  --gray-200: #d8dde6;
  --gray-400: #8e99a8;
  --gray-500: #6b7685;
  --gray-700: #374151;
  --gray-900: #111827;

  --heading: 'Libre Baskerville', Georgia, 'Times New Roman', serif;
  --body: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  --max-w: 1140px;
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--body);
  color: var(--gray-700);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
  line-height: 1.7;
  font-size: 16px;
}

::selection {
  background: var(--amber-subtle);
  color: var(--ink);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes lineGrow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.65s var(--ease), transform 0.65s var(--ease);
}
.reveal.vis {
  opacity: 1;
  transform: none;
}

/* ── Nav ── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: all 0.35s var(--ease);
}
.nav.solid {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--gray-100);
}
.nav-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
  cursor: pointer;
}
.nav-brand img {
  height: 44px;
  width: auto;
}
.nav-wordmark {
  font-family: var(--body);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--ink);
  letter-spacing: -0.01em;
  line-height: 1.15;
}
.nav-wordmark span {
  display: block;
  font-weight: 400;
  font-size: 0.68rem;
  color: var(--gray-500);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 1px;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 2.2rem;
  list-style: none;
}
.nav-links a {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--gray-500);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.25s;
  letter-spacing: 0.01em;
}
.nav-links a:hover,
.nav-links a.on { color: var(--ink); }
.nav-links .cta-link {
  color: var(--amber);
  font-weight: 600;
}
.nav-links .cta-link:hover { color: var(--amber-light); }

/* Transparent nav on dark hero */
.nav:not(.solid) .nav-wordmark { color: var(--white); }
.nav:not(.solid) .nav-wordmark span { color: var(--sky); }
.nav:not(.solid) .nav-links a { color: var(--gray-200); }
.nav:not(.solid) .nav-links a:hover,
.nav:not(.solid) .nav-links a.on { color: var(--white); }
.nav:not(.solid) .nav-links .cta-link { color: var(--amber-light); }
.nav:not(.solid) .nav-links .cta-link:hover { color: var(--amber); }
.nav:not(.solid) .mobile-toggle span { background: var(--white); }

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  flex-direction: column;
  gap: 5px;
}
.mobile-toggle span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--ink);
  border-radius: 1px;
}

@media (max-width: 768px) {
  .mobile-toggle { display: flex; }
  .nav-links {
    position: fixed;
    top: 68px; left: 0; right: 0;
    background: var(--white);
    flex-direction: column;
    padding: 2rem;
    gap: 1.4rem;
    border-bottom: 1px solid var(--gray-100);
    transform: translateY(-110%);
    transition: transform 0.35s var(--ease);
  }
  .nav-links.open { transform: translateY(0); }
}

/* ── Hero ── */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: var(--ink);
}
.hero-texture {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 25% 60%, rgba(58, 90, 128, 0.25) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 30%, rgba(200, 133, 74, 0.08) 0%, transparent 45%);
}
.hero-grain {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px;
}
.hero-rule {
  position: absolute;
  left: 10%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(138,172,200,0.12) 30%, rgba(138,172,200,0.12) 70%, transparent);
}
.hero-inner {
  position: relative;
  z-index: 2;
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 10rem 2rem 6rem;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 5rem;
  align-items: center;
}
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; gap: 3rem; padding-top: 8rem; }
}
.hero-eyebrow {
  font-family: var(--body);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--amber);
  margin-bottom: 1.5rem;
  animation: fadeUp 0.7s var(--ease) both;
}
.hero h1 {
  font-family: var(--heading);
  font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  font-weight: 400;
  color: var(--white);
  line-height: 1.22;
  margin-bottom: 1.8rem;
  animation: fadeUp 0.7s var(--ease) 0.08s both;
}
.hero h1 em {
  font-style: italic;
  color: var(--sky);
}
.hero-body {
  font-size: 1.05rem;
  color: var(--gray-400);
  max-width: 540px;
  line-height: 1.75;
  margin-bottom: 2.5rem;
  animation: fadeUp 0.7s var(--ease) 0.16s both;
}
.hero-actions {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  animation: fadeUp 0.7s var(--ease) 0.24s both;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 30px;
  border-radius: 6px;
  font-family: var(--body);
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.3s var(--ease);
  letter-spacing: 0.01em;
}
.btn-amber {
  background: var(--amber);
  color: var(--white);
}
.btn-amber:hover {
  background: var(--amber-light);
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(200, 133, 74, 0.3);
}
.btn-ghost {
  background: transparent;
  color: var(--gray-400);
  border: 1px solid rgba(255,255,255,0.15);
}
.btn-ghost:hover {
  border-color: rgba(255,255,255,0.3);
  color: var(--white);
}
.btn-dark {
  background: var(--ink);
  color: var(--white);
}
.btn-dark:hover {
  background: var(--navy);
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(11, 21, 32, 0.3);
}

/* Hero right: leadership card */
.hero-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 2.2rem;
  backdrop-filter: blur(8px);
  animation: fadeIn 0.9s var(--ease) 0.4s both;
}
.hero-card-label {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--gray-400);
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.leader-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--slate), var(--steel));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--heading);
  font-size: 1rem;
  color: var(--white);
  flex-shrink: 0;
  overflow: hidden;
}
.leader-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.leader-name {
  font-family: var(--heading);
  font-size: 1.35rem;
  color: var(--white);
  margin-bottom: 0.2rem;
}
.leader-title {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--amber);
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
}
.leader-bio {
  font-size: 0.84rem;
  color: var(--gray-400);
  line-height: 1.65;
  margin-bottom: 1.4rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.leader-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}
.leader-stat-num {
  display: block;
  font-family: var(--heading);
  font-size: 1.15rem;
  color: var(--white);
  line-height: 1;
  margin-bottom: 0.25rem;
}
.leader-stat-label {
  font-size: 0.7rem;
  color: var(--gray-400);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ── Section system ── */
.section { padding: 5.5rem 2rem; }
.section-dark { background: var(--ink); }
.section-wash { background: var(--wash); }
.container { max-width: var(--max-w); margin: 0 auto; }

.label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--amber);
  margin-bottom: 0.9rem;
}
.section-dark .label { color: var(--amber-light); }

.heading {
  font-family: var(--heading);
  font-size: clamp(1.7rem, 3.2vw, 2.3rem);
  font-weight: 400;
  color: var(--ink);
  line-height: 1.3;
  margin-bottom: 0.8rem;
}
.section-dark .heading { color: var(--white); }

.subheading {
  font-size: 1rem;
  color: var(--gray-500);
  max-width: 560px;
  line-height: 1.7;
}
.section-dark .subheading { color: var(--gray-400); }

/* ── Practices / Services ── */
.practices-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--gray-200);
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 3rem;
}
@media (max-width: 700px) {
  .practices-grid { grid-template-columns: 1fr; }
}
.practice {
  background: var(--white);
  padding: 2.2rem 2rem;
  transition: background 0.3s;
  cursor: default;
}
.practice:hover { background: var(--gray-50); }
.practice-num {
  font-family: var(--heading);
  font-size: 0.82rem;
  color: var(--amber);
  margin-bottom: 0.9rem;
  font-style: italic;
}
.practice h3 {
  font-family: var(--heading);
  font-size: 1.08rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 0.6rem;
  line-height: 1.35;
}
.practice p {
  font-size: 0.88rem;
  color: var(--gray-500);
  line-height: 1.65;
}

/* ── Clients / Logos ── */
.logos-bar {
  padding: 3.5rem 2rem;
  border-top: 1px solid var(--gray-100);
  border-bottom: 1px solid var(--gray-100);
}
.logos-bar-label {
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--gray-400);
  margin-bottom: 1.8rem;
}
.logos-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
  flex-wrap: wrap;
  max-width: var(--max-w);
  margin: 0 auto;
}
.logo-text {
  font-family: var(--body);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--gray-200);
  letter-spacing: 0.03em;
  user-select: none;
  transition: color 0.3s;
}
.logo-text:hover { color: var(--gray-400); }

/* ── Two-column layout ── */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}
@media (max-width: 800px) {
  .two-col { grid-template-columns: 1fr; gap: 2.5rem; }
}

/* ── Experience timeline ── */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.timeline-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1.5rem;
  padding: 1.3rem 0;
  border-bottom: 1px solid var(--gray-100);
}
.timeline-item:last-child { border-bottom: none; }
@media (max-width: 600px) {
  .timeline-item { grid-template-columns: 1fr; gap: 0.3rem; }
}
.timeline-co {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.01em;
  padding-top: 2px;
}
.timeline-role {
  font-size: 0.88rem;
  color: var(--gray-700);
  line-height: 1.55;
}
.timeline-role strong {
  color: var(--ink);
  font-weight: 600;
}

/* ── Process ── */
.process-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 3rem;
  position: relative;
}
@media (max-width: 700px) {
  .process-steps { grid-template-columns: 1fr 1fr; }
}
.step {
  padding: 2rem 1.8rem;
  border-right: 1px solid rgba(255,255,255,0.2);
  position: relative;
}
.step:last-child { border-right: none; }
@media (max-width: 700px) {
  .step { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.2); }
}
.step-num {
  font-family: var(--heading);
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1;
  margin-bottom: 1rem;
}
.step h3 {
  font-family: var(--body);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.5rem;
}
.step p {
  font-size: 0.84rem;
  color: var(--gray-400);
  line-height: 1.6;
}

/* ── Insights ── */
.insights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
}
@media (max-width: 800px) {
  .insights-grid { grid-template-columns: 1fr; }
}
.insight-card {
  border: 1px solid var(--gray-100);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.35s var(--ease);
  cursor: pointer;
  background: var(--white);
}
.insight-card:hover {
  border-color: var(--gray-200);
  box-shadow: 0 8px 32px rgba(11, 21, 32, 0.06);
  transform: translateY(-3px);
}
.insight-bar {
  height: 4px;
  background: linear-gradient(90deg, var(--slate), var(--steel));
}
.insight-body {
  padding: 1.6rem 1.5rem;
}
.insight-tag {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--amber);
  margin-bottom: 0.7rem;
}
.insight-card h3 {
  font-family: var(--heading);
  font-size: 0.98rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.insight-card p {
  font-size: 0.84rem;
  color: var(--gray-500);
  line-height: 1.6;
}
.insight-date {
  font-size: 0.75rem;
  color: var(--gray-400);
  margin-top: 0.9rem;
}

/* ── Contact ── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 3.5rem;
  margin-top: 3rem;
}
@media (max-width: 800px) {
  .contact-grid { grid-template-columns: 1fr; }
}
.contact-prose h3 {
  font-family: var(--heading);
  font-size: 1.5rem;
  color: var(--ink);
  margin-bottom: 0.8rem;
}
.contact-prose p {
  color: var(--gray-500);
  line-height: 1.75;
  margin-bottom: 1.5rem;
}
.contact-line {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: var(--gray-700);
  margin-bottom: 0.7rem;
}
.contact-line-dot {
  width: 5px; height: 5px;
  background: var(--amber);
  border-radius: 50%;
  flex-shrink: 0;
}
.form-card {
  border: 1px solid var(--gray-100);
  border-radius: 12px;
  padding: 2.2rem;
  background: var(--white);
}
.form-card h3 {
  font-family: var(--heading);
  font-size: 1.15rem;
  color: var(--ink);
  margin-bottom: 0.3rem;
}
.form-card .form-sub {
  font-size: 0.84rem;
  color: var(--gray-400);
  margin-bottom: 1.5rem;
}
.fg { margin-bottom: 1.1rem; }
.fg label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.35rem;
}
.fg input, .fg textarea, .fg select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--gray-200);
  border-radius: 6px;
  font-family: var(--body);
  font-size: 0.88rem;
  color: var(--gray-900);
  background: var(--white);
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}
.fg input:focus, .fg textarea:focus, .fg select:focus {
  border-color: var(--steel);
  box-shadow: 0 0 0 3px rgba(58, 90, 128, 0.08);
}
.fg textarea { resize: vertical; min-height: 110px; }
.fg-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}
@media (max-width: 500px) {
  .fg-row { grid-template-columns: 1fr; }
}
.btn-submit {
  width: 100%;
  padding: 12px;
  background: var(--amber);
  color: var(--white);
  border: none;
  border-radius: 6px;
  font-family: var(--body);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s var(--ease);
}
.btn-submit:hover {
  background: var(--amber-light);
  transform: translateY(-1px);
}

/* ── CTA Strip ── */
.cta-strip {
  background: var(--ink);
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.cta-strip-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(58, 90, 128, 0.2) 0%, transparent 55%),
    radial-gradient(ellipse at 70% 50%, rgba(200, 133, 74, 0.06) 0%, transparent 45%);
}
.cta-strip h2 {
  font-family: var(--heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  color: var(--white);
  position: relative;
  z-index: 1;
  margin-bottom: 0.6rem;
}
.cta-strip p {
  color: var(--gray-400);
  position: relative;
  z-index: 1;
  margin-bottom: 1.8rem;
  font-size: 0.95rem;
}
.cta-strip .btn { position: relative; z-index: 1; }

/* ── Footer ── */
.footer {
  padding: 3.5rem 2rem 2rem;
  border-top: 1px solid var(--gray-100);
}
.footer-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--gray-100);
}
@media (max-width: 700px) {
  .footer-inner { grid-template-columns: 1fr 1fr; }
}
.footer-brand p {
  font-size: 0.84rem;
  color: var(--gray-500);
  line-height: 1.65;
  margin-top: 0.8rem;
  max-width: 280px;
}
.footer h4 {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink);
  margin-bottom: 0.8rem;
}
.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.footer-list a {
  font-size: 0.84rem;
  color: var(--gray-500);
  text-decoration: none;
  transition: color 0.25s;
  cursor: pointer;
}
.footer-list a:hover { color: var(--ink); }
.footer-bottom {
  max-width: var(--max-w);
  margin: 0 auto;
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--gray-400);
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ── Page header ── */
.pg-header {
  padding: 8rem 2rem 3.5rem;
  background: var(--ink);
  position: relative;
  overflow: hidden;
}
.pg-header-texture {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 80%, rgba(58, 90, 128, 0.2) 0%, transparent 55%);
}
.pg-header .container { position: relative; z-index: 1; }
.pg-header h1 {
  font-family: var(--heading);
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 400;
  color: var(--white);
  margin-bottom: 0.8rem;
  animation: fadeUp 0.6s var(--ease) both;
}
.pg-header p {
  font-size: 1rem;
  color: var(--gray-400);
  max-width: 540px;
  animation: fadeUp 0.6s var(--ease) 0.08s both;
}

/* ── Services detail ── */
.svc-block {
  padding: 3rem 0;
  border-bottom: 1px solid var(--gray-100);
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
  align-items: start;
}
.svc-block:last-child { border-bottom: none; }
@media (max-width: 700px) {
  .svc-block { grid-template-columns: 1fr; gap: 1rem; }
}
.svc-num {
  font-family: var(--heading);
  font-style: italic;
  font-size: 0.85rem;
  color: var(--amber);
  margin-bottom: 0.4rem;
}
.svc-block h3 {
  font-family: var(--heading);
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--ink);
}
.svc-body p {
  color: var(--gray-500);
  line-height: 1.75;
  margin-bottom: 1.2rem;
}
.svc-list {
  list-style: none;
  columns: 2;
  column-gap: 1.5rem;
}
@media (max-width: 600px) {
  .svc-list { columns: 1; }
}
.svc-list li {
  font-size: 0.86rem;
  color: var(--gray-700);
  padding: 0.35rem 0;
  break-inside: avoid;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.svc-list li::before {
  content: '';
  width: 4px; height: 4px;
  background: var(--amber);
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 8px;
}

/* ── About competency pills ── */
.comp-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}
.comp-pill {
  padding: 6px 14px;
  border: 1px solid var(--gray-200);
  border-radius: 100px;
  font-size: 0.8rem;
  color: var(--gray-700);
  transition: all 0.25s;
}
.comp-pill:hover {
  border-color: var(--amber);
  background: var(--amber-subtle);
}

/* ── Calendly embed ── */
.calendly-embed {
  border-radius: 10px;
  overflow: hidden;
}

/* ── Published work ── */
.pub-section {
  margin-bottom: 3rem;
}
.pub-section:last-child { margin-bottom: 0; }
.pub-section-title {
  font-family: var(--heading);
  font-size: 1.2rem;
  color: var(--ink);
  margin-bottom: 1.2rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--gray-100);
}
.pub-item {
  display: block;
  padding: 1rem 1.2rem;
  border: 1px solid var(--gray-100);
  border-radius: 8px;
  margin-bottom: 0.6rem;
  text-decoration: none;
  transition: all 0.3s var(--ease);
  cursor: pointer;
}
.pub-item:hover {
  border-color: var(--gray-200);
  box-shadow: 0 4px 16px rgba(11, 21, 32, 0.05);
  transform: translateY(-2px);
}
.pub-item-source {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--amber);
  margin-bottom: 0.3rem;
}
.pub-item-title {
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.45;
}
.pub-item-meta {
  font-size: 0.78rem;
  color: var(--gray-400);
  margin-top: 0.25rem;
}
.pub-item-arrow {
  font-size: 0.8rem;
  color: var(--gray-400);
  margin-left: 0.5rem;
  transition: transform 0.2s;
}
.pub-item:hover .pub-item-arrow {
  transform: translateX(3px);
  color: var(--amber);
}
.patent-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 0.6rem 0;
  font-size: 0.88rem;
  color: var(--gray-700);
}
.patent-dot {
  width: 4px;
  height: 4px;
  background: var(--amber);
  border-radius: 50%;
  margin-top: 8px;
  flex-shrink: 0;
}
.patent-badge {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--steel);
  background: var(--gray-100);
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 8px;
}
`;

// ─── Company Logos (SVG as base64) ─────────────────────────────────
const COMPANY_LOGOS = {
  aws: "data:image/png;base64,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",
  google: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgNDAiIGZpbGw9Im5vbmUiPgogIDx0ZXh0IHg9IjYwIiB5PSIyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNDAwIiBmb250LXNpemU9IjIwIiBsZXR0ZXItc3BhY2luZz0iMCI+CiAgICA8dHNwYW4gZmlsbD0iIzQyODVGNCI+RzwvdHNwYW4+PHRzcGFuIGZpbGw9IiNFQTQzMzUiPm88L3RzcGFuPjx0c3BhbiBmaWxsPSIjRkJCQzA1Ij5vPC90c3Bhbj48dHNwYW4gZmlsbD0iIzQyODVGNCI+ZzwvdHNwYW4+PHRzcGFuIGZpbGw9IiMzNEE4NTMiPmw8L3RzcGFuPjx0c3BhbiBmaWxsPSIjRUE0MzM1Ij5lPC90c3Bhbj4KICA8L3RleHQ+Cjwvc3ZnPg==",
  microsoft: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDAgNDAiIGZpbGw9Im5vbmUiPgogIDxyZWN0IHg9IjEwIiB5PSI4IiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNGMjUwMjIiLz4KICA8cmVjdCB4PSIyMiIgeT0iOCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjN0ZCQTAwIi8+CiAgPHJlY3QgeD0iMTAiIHk9IjIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiMwMEE0RUYiLz4KICA8cmVjdCB4PSIyMiIgeT0iMjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI0ZGQjkwMCIvPgogIDx0ZXh0IHg9IjQyIiB5PSIyNCIgZm9udC1mYW1pbHk9IlNlZ29lIFVJLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjYwMCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzczNzM3MyI+TWljcm9zb2Z0PC90ZXh0Pgo8L3N2Zz4=",
  optum: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgNDAiIGZpbGw9Im5vbmUiPgogIDx0ZXh0IHg9IjYwIiB5PSIyNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjIwIiBmaWxsPSIjRTg3NzIyIj5PcHR1bTwvdGV4dD4KPC9zdmc+",
  stanford: "data:image/png;base64,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",
  mckesson: "data:image/png;base64,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",
  epic: "data:image/png;base64,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",
};

// ─── Data ──────────────────────────────────────────────────────────
const practices = [
  {
    num: "01",
    slug: "strategy",
    title: "Strategy & Roadmapping",
    short: "We assess where you are, identify highest-impact opportunities, and deliver a sequenced plan that balances quick wins with long-term capability building.",
    long: "Most transformation efforts stall not because of technology limitations, but because of unclear priorities and misaligned expectations. We work alongside leadership to evaluate organizational readiness, map the opportunity landscape, and build a phased roadmap grounded in your specific business context and constraints.",
    deliverables: [
      "Organizational readiness assessment",
      "Use-case prioritization framework",
      "Technology stack evaluation",
      "Change management planning",
      "Phased implementation roadmap",
      "ROI modeling and business case",
    ],
  },
  {
    num: "02",
    slug: "diligence",
    title: "Technical Diligence",
    short: "Deep technical evaluation of companies, products, and platforms — built for investors and acquirers who need clarity before committing capital.",
    long: "We conduct rigorous technical assessments for venture capital firms, private equity groups, and corporate development teams. Our diligence goes beyond surface-level architecture reviews to evaluate the defensibility, scalability, and real-world performance of technical products — particularly those leveraging retrieval systems, language models, and data-intensive architectures.",
    deliverables: [
      "Architecture and infrastructure review",
      "Model and data pipeline evaluation",
      "Technical team assessment",
      "Scalability and performance analysis",
      "Competitive technical positioning",
      "Risk identification and mitigation",
    ],
  },
  {
    num: "03",
    slug: "retrieval",
    title: "Retrieval & Knowledge Systems",
    short: "Design and build production-grade retrieval systems that turn unstructured enterprise data into reliable, high-accuracy answers.",
    long: "Enterprise search and knowledge retrieval is one of the highest-value, hardest-to-get-right applications of modern language technology. We bring direct experience building retrieval and ranking systems at AWS-scale, including expertise in vector search, hybrid retrieval strategies, and evaluation frameworks that measure what actually matters.",
    deliverables: [
      "Retrieval architecture design",
      "Vector search optimization",
      "Hybrid and graph-based retrieval",
      "Accuracy evaluation frameworks",
      "Enterprise knowledge integration",
      "Performance benchmarking",
    ],
  },
  {
    num: "04",
    slug: "implementation",
    title: "Implementation & Delivery",
    short: "We embed with your team to build, ship, and iterate — from proof-of-concept through production deployment.",
    long: "Strategy without execution is a slide deck. We work hands-on alongside your engineering teams to design architectures, build prototypes, validate approaches, and ship production systems. We also help upskill your teams so the capability stays in-house long after the engagement ends.",
    deliverables: [
      "Proof-of-concept development",
      "Production architecture design",
      "Team mentoring and enablement",
      "Performance and cost optimization",
      "Systems integration",
      "Post-deployment support",
    ],
  },
];

const teamExperience = [
  { co: "AWS", role: "Led accuracy and ranking for Amazon Q Business — enterprise retrieval and relevance systems across the generative AI stack." },
  { co: "Stanford Health Care", role: "Directed a 40+ person analytics and ML team. Built clinical decision-support systems including sepsis prediction models used in patient care." },
  { co: "Zus Health", role: "Built FHIR-based interoperability platform normalizing clinical data across provider networks." },
  { co: "Navigating Cancer", role: "Designed NLP extraction pipelines and analytics platforms serving oncology networks nationally." },
  { co: "Epic / McKesson", role: "Early career foundation in enterprise health IT, clinical workflows, and large-scale data systems." },
];

const publishedWork = {
  blogs: [
    { title: "Bringing Agentic Retrieval Augmented Generation to Amazon Q Business", source: "AWS AI Blog", url: "https://aws.amazon.com/blogs/machine-learning/bringing-agentic-retrieval-augmented-generation-to-amazon-q-business/" },
    { title: "Power Real-Time Vector Search Capabilities with Amazon MemoryDB", source: "AWS Database Blog", url: "https://aws.amazon.com/blogs/database/power-real-time-vector-search-capabilities-with-amazon-memorydb/" },
    { title: "Improve Speed and Reduce Cost for Generative AI Workloads with a Persistent Semantic Cache in Amazon MemoryDB", source: "AWS Database Blog", url: "https://aws.amazon.com/blogs/database/improve-speed-and-reduce-cost-for-generative-ai-workloads-with-a-persistent-semantic-cache-in-amazon-memorydb/" },
    { title: "Build an Ultra-Low Latency Online Feature Store for Real-Time Inferencing Using Amazon ElastiCache", source: "AWS Database Blog", url: "https://aws.amazon.com/blogs/database/build-an-ultra-low-latency-online-feature-store-for-real-time-inferencing-using-amazon-elasticache-for-redis/" },
  ],
  talks: [
    { title: "Optimize agentic AI apps with semantic caching in Amazon ElastiCache", source: "AWS re:Invent 2025", url: "https://www.youtube.com/watch?v=BCr53N1oVX0" },
    { title: "Optimize generative AI applications with Amazon MemoryDB", source: "AWS re:Invent 2024", url: "https://www.youtube.com/watch?v=HxZVDrH7bfU" },
    { title: "Fidelity Investments and real-time vector search for Amazon MemoryDB", source: "AWS re:Invent 2024", url: "https://www.youtube.com/watch?v=2mNXSv7cTLI" },
  ],
  patents: [
    "Long-context retrieval for enterprise AI systems (AWS)",
    "Agentic retrieval-augmented generation for enterprise AI (AWS)",
  ],
};

// ─── INSIGHTS: Add new posts here. Just append to the array. ──────
// Set date to "Coming Soon" for unpublished, or a date string + url for published.
const insights = [
  {
    tag: "Retrieval Systems",
    title: "Why most enterprise retrieval systems underperform — and how to fix them",
    desc: "The gap between demo-quality search and production-grade accuracy is wider than most teams expect.",
    date: "Coming Soon",
    url: null, // Add URL when published
  },
  {
    tag: "Diligence",
    title: "What investors miss in technical diligence of AI-native companies",
    desc: "A framework for evaluating defensibility, data moats, and real vs. perceived technical differentiation.",
    date: "Coming Soon",
    url: null,
  },
  {
    tag: "Strategy",
    title: "The readiness trap: why starting with technology is a mistake",
    desc: "Companies racing to adopt new capabilities often skip the most critical step — knowing which problems are worth solving.",
    date: "Coming Soon",
    url: null,
  },
  // ↓ Add new insights here ↓
  // {
  //   tag: "Category",
  //   title: "Your title here",
  //   desc: "Short description.",
  //   date: "February 2026",
  //   url: "https://your-link.com",
  // },
];

const competencies = [
  "Retrieval-Augmented Generation", "Enterprise Search & Ranking", "Vector Search & Embeddings",
  "Graph-Based Retrieval", "Technical Diligence", "Healthcare Data (FHIR/HL7)",
  "Production ML Systems", "Data Architecture", "Product Strategy", "Technical Leadership",
];

// ─── Hooks ─────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08 }
    );
    if (ref.current) ref.current.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Components ────────────────────────────────────────────────────
function Nav({ page, go }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setSolid(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const nav = (p) => { go(p); setOpen(false); };
  return (
    <nav className={`nav ${solid || page !== "home" ? "solid" : ""}`}>
      <div className="nav-inner">
        <a className="nav-brand" onClick={() => nav("home")}>
          <img src="data:image/png;base64,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" alt="Catalyst Logic AI Advisory" />
          <div className="nav-wordmark">
            Catalyst Logic
            <span>AI Advisory</span>
          </div>
        </a>
        <button className="mobile-toggle" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          <li><a className={page === "home" ? "on" : ""} onClick={() => nav("home")}>Home</a></li>
          <li><a className={page === "practices" ? "on" : ""} onClick={() => nav("practices")}>Practices</a></li>
          <li><a className={page === "about" ? "on" : ""} onClick={() => nav("about")}>About</a></li>
          <li><a className={page === "insights" ? "on" : ""} onClick={() => nav("insights")}>Insights</a></li>
          <li><a className="cta-link" onClick={() => nav("contact")}>Get in Touch</a></li>
        </ul>
      </div>
    </nav>
  );
}

function Hero({ go }) {
  return (
    <section className="hero">
      <div className="hero-texture" />
      <div className="hero-grain" />
      <div className="hero-rule" />
      <div className="hero-inner">
        <div>
          <div className="hero-eyebrow">Strategic Technology Advisory</div>
          <h1>We help companies <em>make better decisions</em> about technology</h1>
          <p className="hero-body">
            Catalyst Logic is a New York-based advisory firm that works with investors and operators to evaluate, build, and scale technical capabilities. We specialize in retrieval systems, data infrastructure, and technical diligence.
          </p>
          <div className="hero-actions">
            <a className="btn btn-amber" onClick={() => { go("contact"); }}>Start a Conversation</a>
            <a className="btn btn-ghost" onClick={() => { go("practices"); }}>Our Practices</a>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-label">Leadership</div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div className="leader-avatar"><img src="data:image/jpeg;base64,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" alt="Sanjit Misra" /></div>
            <div>
              <div className="leader-name">Sanjit Misra</div>
              <div className="leader-title">Founder & Managing Director</div>
            </div>
          </div>
          <p className="leader-bio">Technical product leader at AWS, leading enterprise retrieval and ranking systems. Directed analytics and ML teams at Stanford Health Care. 15+ years building production technology across healthcare, data infrastructure, and enterprise platforms. Duke MBA.</p>
          <div className="leader-stats">
            <div className="leader-stat">
              <span className="leader-stat-num">15+</span>
              <span className="leader-stat-label">Years</span>
            </div>
            <div className="leader-stat">
              <span className="leader-stat-num">40+</span>
              <span className="leader-stat-label">Team Led</span>
            </div>
            <div className="leader-stat">
              <span className="leader-stat-num">AWS</span>
              <span className="leader-stat-label">Enterprise</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogosBar() {
  const companies = [
    { name: "AWS", src: COMPANY_LOGOS.aws, w: 110 },
    { name: "Google", src: COMPANY_LOGOS.google, w: 90 },
    { name: "Microsoft", src: COMPANY_LOGOS.microsoft, w: 120 },
    { name: "Optum", src: COMPANY_LOGOS.optum, w: 90 },
    { name: "Stanford Health Care", src: COMPANY_LOGOS.stanford, w: 120 },
    { name: "McKesson", src: COMPANY_LOGOS.mckesson, w: 110 },
    { name: "Epic", src: COMPANY_LOGOS.epic, w: 70 },
  ];
  return (
    <div className="logos-bar">
      <div className="logos-bar-label">Our team has built and led products at</div>
      <div className="logos-row">
        {companies.map((c) => (
          <img key={c.name} src={c.src} alt={c.name} style={{ height: 32, width: "auto", opacity: 0.55, transition: "opacity 0.3s" }} onMouseOver={e => e.currentTarget.style.opacity = 0.85} onMouseOut={e => e.currentTarget.style.opacity = 0.55} />
        ))}
      </div>
    </div>
  );
}

function PracticesPreview({ go }) {
  const ref = useReveal();
  return (
    <section className="section" ref={ref}>
      <div className="container">
        <div className="reveal">
          <div className="label">What We Do</div>
          <div className="heading">Four practices, one focus: <br />turning complexity into clarity</div>
          <p className="subheading">We help leadership teams navigate high-stakes technical decisions with confidence — whether you're building, buying, or investing.</p>
        </div>
        <div className="practices-grid">
          {practices.map((p, i) => (
            <div key={i} className="practice reveal" style={{ transitionDelay: `${i * 0.06}s` }} onClick={() => { go("practices"); }}>
              <div className="practice-num">{p.num}</div>
              <h3>{p.title}</h3>
              <p>{p.short}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useReveal();
  const steps = [
    { n: "01", t: "Scope", d: "Understand your business context, constraints, and what success looks like." },
    { n: "02", t: "Assess", d: "Evaluate the landscape — technical, organizational, and competitive." },
    { n: "03", t: "Execute", d: "Deliver concrete work product — architecture, code, analysis, or roadmap." },
    { n: "04", t: "Transfer", d: "Build internal capability so results persist after the engagement ends." },
  ];
  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className="reveal" style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div className="label">How We Work</div>
          <div className="heading">Engagement model</div>
        </div>
        <div className="process-steps">
          {steps.map((s, i) => (
            <div key={i} className="step reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="step-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAStrip({ go }) {
  return (
    <div className="cta-strip">
      <div className="cta-strip-bg" />
      <h2>Let's discuss what you're working on</h2>
      <p>We'll start with a conversation to understand your context and see if there's a fit.</p>
      <a className="btn btn-amber" onClick={() => { go("contact"); }}>Get in Touch</a>
    </div>
  );
}

function Footer({ go }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <img src="data:image/png;base64,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" alt="" style={{ height: 34 }} />
            <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--ink)" }}>Catalyst Logic AI</span>
          </div>
          <p>New York-based advisory firm specializing in technical strategy, diligence, and implementation for investors and operators.</p>
        </div>
        <div>
          <h4>Navigate</h4>
          <ul className="footer-list">
            <li><a onClick={() => go("home")}>Home</a></li>
            <li><a onClick={() => go("practices")}>Practices</a></li>
            <li><a onClick={() => go("about")}>About</a></li>
            <li><a onClick={() => go("insights")}>Insights</a></li>
            <li><a onClick={() => go("contact")}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Practices</h4>
          <ul className="footer-list">
            {practices.map((p) => (
              <li key={p.title}><a onClick={() => go("practices", `practice-${p.slug}`)}>{p.title}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul className="footer-list">
            <li><a href="https://www.linkedin.com/in/sanjit-ai/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzBBNjZDMiI+PHBhdGggZD0iTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYTIuMDYyIDIuMDYyIDAgMDEtMi4wNjMtMi4wNjUgMi4wNjQgMi4wNjQgMCAxMTIuMDYzIDIuMDY1em0xLjc4MiAxMy4wMTlIMy41NTVWOWgzLjU2NHYxMS40NTJ6TTIyLjIyNSAwSDEuNzcxQy43OTIgMCAwIC43NzQgMCAxLjcyOXYyMC41NDJDMCAyMy4yMjcuNzkyIDI0IDEuNzcxIDI0aDIwLjQ1MUMyMy4yIDI0IDI0IDIzLjIyNyAyNCAyMi4yNzFWMS43MjlDMjQgLjc3NCAyMy4yIDAgMjIuMjIyIDBoLjAwM3oiLz48L3N2Zz4=" alt="" style={{ width: 14, height: 14 }} />LinkedIn</a></li>
            <li><a>Email</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Catalyst Logic AI Advisory. All rights reserved.</span>
        <span>New York, NY</span>
      </div>
    </footer>
  );
}

// ─── Pages ─────────────────────────────────────────────────────────
function HomePage({ go }) {
  return (
    <>
      <Hero go={go} />
      <LogosBar />
      <PracticesPreview go={go} />
      <ProcessSection />
      <CTAStrip go={go} />
    </>
  );
}

function PracticesPage({ go }) {
  const ref = useReveal();
  return (
    <>
      <div className="pg-header">
        <div className="pg-header-texture" />
        <div className="container">
          <h1>Our Practices</h1>
          <p>We bring deep technical expertise to four interconnected areas — always grounded in business context and measurable outcomes.</p>
        </div>
      </div>
      <section className="section" ref={ref}>
        <div className="container">
          {practices.map((p, i) => (
            <div key={i} id={`practice-${p.slug}`} className="svc-block reveal" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div>
                <div className="svc-num">{p.num}</div>
                <h3>{p.title}</h3>
              </div>
              <div className="svc-body">
                <p>{p.long}</p>
                <ul className="svc-list">
                  {p.deliverables.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTAStrip go={go} />
    </>
  );
}

function AboutPage({ go }) {
  const ref = useReveal();
  const ref2 = useReveal();
  return (
    <>
      <div className="pg-header">
        <div className="pg-header-texture" />
        <div className="container">
          <h1>About the Firm</h1>
          <p>Deep technical experience, applied with the rigor and judgment that high-stakes decisions require.</p>
        </div>
      </div>
      <section className="section" ref={ref}>
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="label">Who We Are</div>
              <div className="heading">Built on experience that matters</div>
              <div style={{ marginTop: "1.2rem" }}>
                <p style={{ color: "var(--gray-500)", lineHeight: 1.78, marginBottom: "1rem" }}>
                  <strong style={{ color: "var(--ink)" }}>Sanjit Misra</strong> started Catalyst Logic because too many companies make expensive technology decisions based on advice from people who've never actually built anything.
                </p>
                <p style={{ color: "var(--gray-500)", lineHeight: 1.78, marginBottom: "1rem" }}>
                  He's led product and engineering teams at AWS, Stanford Health Care, and several high-growth startups — building the same types of systems he now helps clients evaluate and implement. 40+ engineers managed, production systems shipped into environments where getting it wrong isn't an option.
                </p>
                <p style={{ color: "var(--gray-500)", lineHeight: 1.78 }}>
                  We're based in New York and work with two types of clients: investors who need honest technical diligence before writing checks, and companies who want to build the right thing the first time.
                </p>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.1s" }}>
              <div className="label">Background</div>
              <div className="heading">Selected experience</div>
              <div className="timeline" style={{ marginTop: "1.2rem" }}>
                {teamExperience.map((e, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-co">{e.co}</div>
                    <div className="timeline-role">{e.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-wash" ref={ref2}>
        <div className="container">
          <div className="two-col">
            <div className="reveal">
              <div className="label">Education</div>
              <div className="heading">Academic foundation</div>
              <div className="timeline" style={{ marginTop: "1.2rem" }}>
                <div className="timeline-item">
                  <div className="timeline-co">Duke</div>
                  <div className="timeline-role"><strong>MBA</strong> — Fuqua School of Business. Strategy, technology management, and entrepreneurship.</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-co">UNC</div>
                  <div className="timeline-role"><strong>B.S. Chemistry & B.A. Mathematics</strong> — Dual-degree foundation in quantitative reasoning and scientific methodology.</div>
                </div>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: "0.08s" }}>
              <div className="label">Expertise</div>
              <div className="heading">Core competencies</div>
              <div className="comp-list" style={{ marginTop: "1.2rem" }}>
                {competencies.map((c) => <span key={c} className="comp-pill">{c}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTAStrip go={go} />
    </>
  );
}

function InsightsPage({ go }) {
  const ref = useReveal();
  const ref2 = useReveal();
  return (
    <>
      <div className="pg-header">
        <div className="pg-header-texture" />
        <div className="container">
          <h1>Insights</h1>
          <p>Perspectives on technical strategy, diligence, and building systems that hold up under scrutiny.</p>
        </div>
      </div>

      {/* Original insights / blog posts — the main content */}
      <section className="section" ref={ref}>
        <div className="container">
          <div className="insights-grid">
            {insights.map((b, i) => (
              <a key={i} className="insight-card reveal" style={{ transitionDelay: `${i * 0.07}s`, textDecoration: "none" }} href={b.url || undefined} target={b.url ? "_blank" : undefined} rel={b.url ? "noreferrer" : undefined}>
                <div className="insight-bar" />
                <div className="insight-body">
                  <div className="insight-tag">{b.tag}</div>
                  <h3>{b.title}{b.url && <span className="pub-item-arrow">→</span>}</h3>
                  <p>{b.desc}</p>
                  <div className="insight-date">{b.date}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Published work — compact credibility section */}
      <section className="section section-wash" ref={ref2}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: "2rem" }}>
            <div className="label">Published Work</div>
            <div className="heading">Technical publications, patents & talks</div>
            <p className="subheading">Selected work from building enterprise systems at AWS and leading clinical ML at Stanford Health Care.</p>
          </div>
          <div className="two-col reveal" style={{ transitionDelay: "0.08s" }}>
            <div>
              <div className="pub-section">
                <div className="pub-section-title">AWS Technical Blogs</div>
                {publishedWork.blogs.map((b, i) => (
                  <a key={i} className="pub-item" href={b.url} target="_blank" rel="noreferrer">
                    <div className="pub-item-source">{b.source}</div>
                    <div className="pub-item-title">{b.title}<span className="pub-item-arrow">→</span></div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="pub-section">
                <div className="pub-section-title">Conference Talks</div>
                {publishedWork.talks.map((v, i) => (
                  <a key={i} className="pub-item" href={v.url} target="_blank" rel="noreferrer">
                    <div className="pub-item-source">{v.source}</div>
                    <div className="pub-item-title">{v.title}<span className="pub-item-arrow">→</span></div>
                  </a>
                ))}
              </div>
              <div className="pub-section">
                <div className="pub-section-title">Patents</div>
                {publishedWork.patents.map((p, i) => (
                  <div key={i} className="patent-item">
                    <div className="patent-dot" />
                    <span>{p}<span className="patent-badge">Pending</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTAStrip go={go} />
    </>
  );
}

function ContactPage() {
  const ref = useReveal();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);
  return (
    <>
      <div className="pg-header">
        <div className="pg-header-texture" />
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Whether you're evaluating an investment, scoping a build, or exploring what's possible — we'd welcome the conversation.</p>
        </div>
      </div>
      <section className="section" ref={ref}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-prose reveal">
              <h3>Start with a conversation</h3>
              <p>
                Every engagement begins with understanding your context — objectives, constraints, and what a good outcome looks like. Reach out to schedule an introductory call, or send us a message and we'll respond within one business day.
              </p>
              <div className="contact-line"><div className="contact-line-dot" /> New York, NY</div>
              <div className="contact-line"><div className="contact-line-dot" /> sanjit@catalystlogic.ai</div>
              <div className="contact-line"><div className="contact-line-dot" /> <a href="https://www.linkedin.com/in/sanjit-ai/" target="_blank" rel="noreferrer" style={{ color: "var(--gray-700)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzBBNjZDMiI+PHBhdGggZD0iTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYTIuMDYyIDIuMDYyIDAgMDEtMi4wNjMtMi4wNjUgMi4wNjQgMi4wNjQgMCAxMTIuMDYzIDIuMDY1em0xLjc4MiAxMy4wMTlIMy41NTVWOWgzLjU2NHYxMS40NTJ6TTIyLjIyNSAwSDEuNzcxQy43OTIgMCAwIC43NzQgMCAxLjcyOXYyMC41NDJDMCAyMy4yMjcuNzkyIDI0IDEuNzcxIDI0aDIwLjQ1MUMyMy4yIDI0IDI0IDIzLjIyNyAyNCAyMi4yNzFWMS43MjlDMjQgLjc3NCAyMy4yIDAgMjIuMjIyIDBoLjAwM3oiLz48L3N2Zz4=" alt="" style={{ width: 16, height: 16 }} />LinkedIn</a></div>

              <div className="calendly-embed" style={{ marginTop: "2rem" }}>
                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/sanjit-catalystlogic/intro"
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            </div>

            <div className="form-card reveal" style={{ transitionDelay: "0.1s" }}>
              {!sent ? (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <h3>Send a message</h3>
                  <p className="form-sub">We typically respond within 24 hours.</p>
                  <div className="fg-row">
                    <div className="fg">
                      <label>First Name</label>
                      <input type="text" required />
                    </div>
                    <div className="fg">
                      <label>Last Name</label>
                      <input type="text" required />
                    </div>
                  </div>
                  <div className="fg">
                    <label>Email</label>
                    <input type="email" required />
                  </div>
                  <div className="fg">
                    <label>Company</label>
                    <input type="text" />
                  </div>
                  <div className="fg">
                    <label>What best describes your inquiry?</label>
                    <select defaultValue="">
                      <option value="" disabled>Select</option>
                      <option>Technical diligence for an investment</option>
                      <option>Strategy and roadmapping</option>
                      <option>Retrieval / knowledge systems</option>
                      <option>Implementation support</option>
                      <option>Something else</option>
                    </select>
                  </div>
                  <div className="fg">
                    <label>Tell us more</label>
                    <textarea placeholder="What are you working on? What does a good outcome look like?" />
                  </div>
                  <button type="submit" className="btn-submit">Send Message</button>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem", color: "var(--amber)" }}>&#10003;</div>
                  <h3 style={{ fontFamily: "var(--heading)", fontSize: "1.2rem", color: "var(--ink)", marginBottom: "0.4rem" }}>Message received</h3>
                  <p style={{ color: "var(--gray-500)", fontSize: "0.9rem" }}>We'll be in touch within one business day.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── App ───────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const go = (p, scrollTo) => { setPage(p); if (scrollTo) { setTimeout(() => { const el = document.getElementById(scrollTo); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 80); } else { window.scrollTo({ top: 0 }); } };

  return (
    <>
      <style>{css}</style>
      <Nav page={page} go={go} />
      {page === "home" && <HomePage go={go} />}
      {page === "practices" && <PracticesPage go={go} />}
      {page === "about" && <AboutPage go={go} />}
      {page === "insights" && <InsightsPage go={go} />}
      {page === "contact" && <ContactPage />}
      <Footer go={go} />
    </>
  );
}
