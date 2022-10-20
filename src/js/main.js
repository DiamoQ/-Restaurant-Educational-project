'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // Tabs

  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');


  function hideTabContent() {
    tabsContent.forEach(element => {
      element.style.display = 'none';
    });

    tabs.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    });
  };

  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent();
  console.log(tabsParent);

  tabsParent.addEventListener('click', (ev) => {
    let target = ev.target;
    if (target && target.matches('.tabheader__item')) {
      tabs.forEach((elem, i) => {
        if (elem == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    };
  });

  // Timer

  const deadline = '2022-11-17';

  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    };
  };

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      };

    };
  };

  setClock('.timer', deadline);

  // Modal

  const button = document.querySelectorAll('button'),
    modal = document.querySelector('.modal');

  function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    clearInterval(modalTimerId)
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


  // Menu blocks

  const menuBlock = document.querySelector('.menu__field .container')

  class CreateMenuCard {
    constructor(picture = 'Здесь должна быть фотография', title, text, price, parent, ...classes) {
      this.picture = picture;
      this.title = title;
      this.text = text;
      this.price = price;
      this.classes = classes;
      this.transfer = 55;
      this.parent = document.querySelector(parent);
      this.changeToRubles();
    }

    changeToRubles() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      };

      element.innerHTML = `   <img src=${this.picture} alt="">
                              <h3 class="menu__item-subtitle">${this.title}</h3>
                              <div class="menu__item-descr">${this.text}</div>
                              <div class="menu__item-divider"></div>
                              <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> руб/день </div>
                              </div>`;
      this.parent.append(element);

    }
  };

  new CreateMenuCard(
    'img/tabs/vegy.jpg',
    'Меню “Фитнес”',
    'Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    10,
    '.menu .container',
  ).render();
  new CreateMenuCard(
    'img/tabs/elite.jpg',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20,
    '.menu .container',
    'menu__item',
  ).render();
  new CreateMenuCard(
    'img/tabs/post.jpg',
    'Меню “Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    15,
    '.menu .container',
    'menu__item',
  ).render();
}); 
