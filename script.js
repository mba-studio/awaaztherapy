(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  document.querySelectorAll('.faq-list details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      document.querySelectorAll('.faq-list details').forEach(other => {
        if (other !== detail) other.open = false;
      });
    });
  });

  const form = document.getElementById('assessment-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Assessment request - ${data.get('name') || 'New enquiry'}`);
    const body = encodeURIComponent(
`Hello Awaaz Therapy Centre,

I would like to request an initial assessment.

Name: ${data.get('name') || ''}
Phone: ${data.get('phone') || ''}
Age group: ${data.get('ageGroup') || ''}
Main concern: ${data.get('concern') || ''}

Additional information:
${data.get('message') || 'None provided'}

Thank you.`
    );
    window.location.href = `mailto:awaaztherapycentre@gmail.com?subject=${subject}&body=${body}`;
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
