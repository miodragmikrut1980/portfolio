import './styles.css';
import {
  createIcons,
  Globe,
  Rocket,
  RefreshCw,
  LayoutDashboard,
  Zap,
  Smartphone,
  ShieldCheck,
  MessageCircle,
  Gauge,
  Handshake,
  ArrowUp,
} from 'lucide';

createIcons({
  icons: {
    Globe,
    Rocket,
    RefreshCw,
    LayoutDashboard,
    Zap,
    Smartphone,
    ShieldCheck,
    MessageCircle,
    Gauge,
    Handshake,
    ArrowUp,
  },
});

/* ---------- contact modal ---------- */
const modal = document.querySelector<HTMLElement>('#contactModal');
const openModal = () => {
  closeMenu();
  modal?.classList.add('show');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal?.querySelector<HTMLInputElement>('input')?.focus();
};
const closeModal = () => {
  modal?.classList.remove('show');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
document
  .querySelectorAll('.open-contact')
  .forEach(button => button.addEventListener('click', openModal));
document.querySelector('.close')?.addEventListener('click', closeModal);
modal?.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});

document.querySelector('#contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.target as HTMLFormElement);
  const subject = encodeURIComponent(
    'Upit za izradu sajta — ' + form.get('business')
  );
  const body = encodeURIComponent(
    'Ime: ' +
      form.get('name') +
      '\nBiznis: ' +
      form.get('business') +
      '\nUsluga: ' +
      form.get('service') +
      '\n\nO projektu:\n' +
      form.get('message')
  );
  const to = (event.target as HTMLFormElement).dataset.to || '';
  window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
});

/* ---------- mobile menu ---------- */
const burger = document.querySelector('.burger');
const closeMenu = () => {
  document.body.classList.remove('menuOpen');
  burger?.setAttribute('aria-expanded', 'false');
};
burger?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menuOpen');
  burger.setAttribute('aria-expanded', String(open));
});
document
  .querySelectorAll('.mobileMenu a')
  .forEach(a => a.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
    closeMenu();
  }
});

/* ---------- sticky nav + back to top ---------- */
const nav = document.querySelector('.nav');
const toTop = document.querySelector('.toTop');
const onScroll = () => {
  const y = window.scrollY;
  nav?.classList.toggle('scrolled', y > 20);
  toTop?.classList.toggle('show', y > 700);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop?.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ---------- active nav link ---------- */
const links = document.querySelectorAll<HTMLAnchorElement>('.nav nav a');
const sections = [...links]
  .map(a => document.querySelector<HTMLElement>(a.getAttribute('href') || ''))
  .filter((s): s is HTMLElement => !!s);
const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a =>
        a.classList.toggle(
          'active',
          a.getAttribute('href') === '#' + e.target.id
        )
      );
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));

/* ---------- reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- count-up numbers ---------- */
const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      const target = Number(el.dataset.count || 0);
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
document
  .querySelectorAll('[data-count]')
  .forEach(el => countObserver.observe(el));

/* ---------- hero headline word animation ---------- */
const h1 = document.querySelector('.hero h1');
if (h1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let i = 0;
  h1.querySelectorAll('.w > span').forEach(span => {
    (span as HTMLElement).style.animationDelay = `${0.08 * i++ + 0.1}s`;
  });
}

/* ---------- hero browser tilt ---------- */
const visual = document.querySelector<HTMLElement>('.heroVisual');
const browser = document.querySelector<HTMLElement>('.browser');
if (visual && browser && matchMedia('(hover: hover)').matches) {
  visual.addEventListener('mousemove', e => {
    const r = visual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    browser.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  });
  visual.addEventListener('mouseleave', () => {
    browser.style.transform = '';
  });
}
