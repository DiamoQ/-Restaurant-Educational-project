function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }

  // window.removeEventListener('scroll', showModalByScroll);
};

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.style.display = 'none';
  document.body.style.overflow = '';

};

function modalWindow(triggerSelector, modalSelector, modalTimerId) {

  // modalWindow

  const button = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

  button.forEach(i => {
    i.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modalSelector, modalTimerId);
    });
  });

  modal.addEventListener('click', e => {
    if (e.target.classList.contains('modal') || e.target.hasAttribute('data-close')) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.style.display === 'block') {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    };
  };

  window.addEventListener('scroll', showModalByScroll);
};

export default modalWindow;
export { closeModal };
export { openModal };
