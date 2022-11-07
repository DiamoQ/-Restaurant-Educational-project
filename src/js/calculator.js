'use strict';
const result = document.querySelector('.calculating__result span');

let sex, height, weight, age, ratio;

if(localStorage.getItem('sex')) {
  sex = localStorage.getItem('sex');
} else {
  sex = 'female';
  localStorage.setItem('sex', 'fm');
};

if(localStorage.getItem('ratio')) {
  ratio = localStorage.getItem('ratio');
} else {
  ratio = 1.375;
  localStorage.setItem('ratio', 1.375);
};

initLocalSettings('#gender div' , 'calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div' , 'calculating__choose-item_active');

function initLocalSettings(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(element => {
    element.classList.remove(activeClass);
    if (element.getAttribute('id') === localStorage.getItem('sex')){
      element.classList.add(activeClass);
    };
    if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
      element.classList.add(activeClass);
    };
  });
};

function calcTotal() {
  if (!sex || !height || !weight || !age || !ratio) {
    result.textContent = '____';
    return;
  };

  if ( sex === 'm') {
    result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
  } else {
    result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
  };

};
calcTotal();

function getStaticInformation(selector, activeClass) {
  const elements = document.querySelectorAll(selector);

  elements.forEach (element => {
    element.addEventListener ('click', e => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
      } else {
        sex = e.target.getAttribute('id');
        localStorage.setItem('sex', e.target.getAttribute('id'));
      }
  
      elements.forEach(elem => {
        elem.classList.remove(activeClass);
      });
  
      e.target.classList.add(activeClass);
  
      calcTotal();
    });
  });
};

getStaticInformation('#gender div' , 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div' , 'calculating__choose-item_active');

function getDynamicInformation(selector) {
  const input = document.querySelector(selector);

  input.addEventListener('input', () => {

    if (input.value.match(/\D/g)) {
      input.style.border = '1px solid red';
    } else if (input.value.match(/\d/g)) {
      input.style.border = '1px solid #54ED39';
    } else {
      input.style.border = 'none';
    };

    switch (input.getAttribute('id')) {
      case 'height': 
            height = +input.value;
            break;
      case 'weight':
            weight = +input.value;
            break;
      case 'age': 
            age = +input.value;
            break;            
    }
    calcTotal();
  });
};

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');

//Самостоятельная работа 

// const genderWrap = document.querySelector('#gender'),
//   chooseWrap = document.querySelector('.calculating__choose_big'),
//   genderItems = document.querySelectorAll('#gender .calculating__choose-item'),
//   activityItems = document.querySelectorAll('.calculating__choose_big .calculating__choose-item'),
//   calculatingResult = document.querySelector('.calculating__result span');
//   fm = document.querySelector('#fm');

// let genderCoef = 0,  


//   activityCoef = 0,
//   result = 1200;


// function activityCoefResult(e) {
//   const low = document.querySelector('#low'),
//     small = document.querySelector('#small'),
//     medium = document.querySelector('#medium');

//   activityCoef = 0;

//   if (e == low) {
//     return activityCoef = activityCoef + 1.2;
//   } else if (e == small) {
//     return activityCoef = activityCoef + 1.375;
//   } else if (e == medium) {
//     return activityCoef = activityCoef + 1.55;
//   } else {
//     return activityCoef = activityCoef + 1.725;
//   }
// };

// function genderCoefResult(e) {

//   genderCoef = 0;

//   if (e == fm) {
//     return genderCoef = genderCoef + 447.6;
//   } else {
//     return genderCoef = genderCoef + 88.36;
//   }
// };

// function resultValue() { 
//   let height = document.querySelector('#height').value,
//     weight = document.querySelector('#weight').value,
//     age = document.querySelector('#age').value;

  
//     result = Math.trunc((genderCoef + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activityCoef);
  
//   console.log(age)
//   calculatingResult.textContent = result;
// }

// function chooseBlock(item, array) {
//   array.forEach(element => {
//     element.classList.remove(('calculating__choose-item_active'));
//   });
//   activityCoefResult(item);
//   genderCoefResult(item);
//   resultValue();
//   item.classList.add('calculating__choose-item_active');
// };

// genderWrap.addEventListener('click', (e) => {
//   if (e.target.classList.contains('calculating__choose-item')) {
//     chooseBlock(e.target, genderItems);
//   };
// });

// chooseWrap.addEventListener('click', (e) => {
//   if (e.target.classList.contains('calculating__choose-item')) {
//     chooseBlock(e.target, activityItems);
//   };
// });
