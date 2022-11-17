import {getResource} from '../services/services.js'

function menuBlock() {

// Menu blocks npx json-server db.json

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

// Динамическая верстка
// getResource('http://localhost:3000/menu')
//   .then(data => createCard(data))

// function createCard(data) {
//   data.forEach(({ picture, title, text, price }) => {
//     const elementEx = document.createElement('div');

//     elementEx.classList.add('...');
//     elementEx.innerHTML = `...верстка`;

//     document.querySelector('.menu .container').append(element);
//   })
// };



getResource('http://localhost:3000/menu')
  .then(data => {
    data.forEach(({picture, title, text, price}) => {
      new CreateMenuCard(picture, title, text, price, ".menu .container" ).render();
    });
  });


// new CreateMenuCard(
//   'img/tabs/vegy.jpg',
//   'Меню “Фитнес”',
//   'Меню “Фитнес” - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//   10,
//   '.menu .container',
// ).render();
// new CreateMenuCard(
//   'img/tabs/elite.jpg',
//   'Меню “Премиум”',
//   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//   20,
//   '.menu .container',
//   'menu__item',
// ).render();
// new CreateMenuCard(
//   'img/tabs/post.jpg',
//   'Меню “Постное"',
//   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//   15,
//   '.menu .container',
//   'menu__item',
// ).render();
};

export default menuBlock;
