import './styles.css';
const modal = document.querySelector('#contactModal');
const open = () => {
  modal?.classList.add('show');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const close = () => {
  modal?.classList.remove('show');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
document
  .querySelectorAll('.open-contact')
  .forEach(button => button.addEventListener('click', open));
document.querySelector('.close')?.addEventListener('click', close);
modal?.addEventListener('click', event => {
  if (event.target === modal) close();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') close();
});
document.querySelector('#contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.target);
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
  window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
});
