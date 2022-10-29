"use strict";

// modalWindow

const button = document.querySelectorAll('button'),
  modal = document.querySelector('.modal');

function openModal() {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  clearInterval(modalTimerId);

  window.removeEventListener('scroll', showModalByScroll);
};

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';

};

button.forEach(i => {
  if (i.hasAttribute('data-modal')) {
    i.addEventListener('click', (e) => {
      e.preventDefault();

      openModal();
    });
  }
});

modal.addEventListener('click', e => {
  if (e.target.classList.contains('modal') || e.target.hasAttribute('data-close')) {
    closeModal();
  }
});

document.addEventListener('keydown', e => {
  if (e.code === 'Escape' && modal.style.display === 'block') {
    closeModal();
  }
});

const modalTimerId = setTimeout(openModal, 30000);

function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    openModal();
    window.removeEventListener('scroll', showModalByScroll);
  };
};

window.addEventListener('scroll', showModalByScroll);