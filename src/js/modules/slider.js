function slider( {slidesContainer, slide, nextArrow, prevArrow, totalCounter, currentCounter, slidesWrap, field}) {

const sliderBlock = document.querySelector(slidesContainer),
   // sliderCounter = document.querySelector('.offer__slider-counter'),
  sliderRightCount = document.querySelector(nextArrow),
  sliderLeftCount = document.querySelector(prevArrow),
  current = document.querySelector(currentCounter),
  total = document.querySelector(totalCounter),
  slides = document.querySelectorAll(slide),
  slidesWrapper = document.querySelector(slidesWrap),
  slidesField = document.querySelector(field),
  width = window.getComputedStyle(slidesWrapper).width;
  
let slideIndex = 1;
let offset = 0;

if (slides.length > 10) {
  total.textContent = slides.length;
  current.textContent = slideIndex;
} else {
  total.textContent = `0${slides.length}`;
  current.textContent = `0${slideIndex}`;
}


slidesField.style.width = slides.length * 100 + '%';

slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
  slide.style.width = width;
});

function deleteNotDigits(str) {
  return +str.replace(/\D/g, '');
}

function currentValue() {
  if (slides.length > 10) {
    current.textContent = slideIndex;
  } else {
    current.textContent = `0${slideIndex}`;
  };
};

function dotParameters() {
  dots.forEach(dot => dot.style.opacity = '.5');
  dots[slideIndex - 1].style.opacity = 1;
};

function nextSlide() {
  if(offset == deleteNotDigits(width) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset += deleteNotDigits(width);
  };

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (slideIndex == slides.length) {
    slideIndex = 1;
  } else {
    slideIndex++;
  };

  currentValue();

  dotParameters();
};

function prevSlide() {

  if(offset == 0) {
    offset = deleteNotDigits(width) * (slides.length - 1);
  } else {
    offset -= deleteNotDigits(width);
  };

  slidesField.style.transform = `translateX(-${offset}px)`;

  if (slideIndex == 1) {
    slideIndex = slides.length;
  } else {
    slideIndex--;
  };

  currentValue();

  dotParameters();
};

sliderRightCount.addEventListener('click', e => {
  nextSlide();
});

sliderLeftCount.addEventListener('click', e => {
  prevSlide();
});

sliderBlock.style.position = 'relative';


  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `display: flex; 
                              position: absolute; 
                              right: 0; 
                              left: 0; 
                              bottom: 0; 
                              justify-content: center; 
                              margin-right: 15%;
                              margin-left: 15%; 
                              list-style: none; 
                              z-index: 15;`;
  sliderBlock.append(indicators);


for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('li');
  dot.setAttribute('data-slide-to', i + 1)
  dot.style.cssText = `box-sizing: content-box;
                       flex: 0 1 auto;
                       width: 30px;
                       height: 6px;
                       margin-right: 3px;
                       margin-left: 3px;
                       cursor: pointer;
                       background-color: #fff;
                       background-clip: padding-box;
                       border-top: 10px solid transparent;
                       border-bottom: 10px solid transparent;
                       opacity: .5;
                       transition: opacity .6s ease;
  `;
  if (i == 0) {
    dot.style.opacity = 1;
  }
  indicators.append(dot);
  dots.push(dot);
};

dots.forEach( dot => {
  dot.addEventListener('click', (e) => {
    const slideTo = e.target.getAttribute('data-slide-to');

    slideIndex = slideTo;
    offset = deleteNotDigits(width) * (slideTo - 1);

    slidesField.style.transform = `translateX(-${offset}px)`;

    currentValue();

    dotParameters();
  });
});




//Код из лекции

// let slideIndex = 1;

// showSlides(slideIndex);

// if (slides.length < 10) {
//   total.textContent = `0${slides.length}`;
// } else {
//   total.textContent = slides.length;
// };

// function showSlides(n) {
  
//   if (n > slides.length) {
//     slideIndex = 1;
//   };

//   if (n < 1) {
//     slideIndex = slides.length;
//   };

//   slides.forEach(item => item.style.display = 'none');
//   slides[slideIndex - 1].style.display = 'block';
  
//   if (slides.length < 10) {
//     current.textContent = `0${slideIndex}`;
//   } else {
//     current.textContent = slideIndex;
//   };
// };

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// sliderRightCount.addEventListener('click', e => {
//   plusSlides(+1);
// });

// sliderLeftCount.addEventListener('click', e => {
//   plusSlides(-1);
// })






// Написал сам





// const slidesArray = [];

// function numberOfSlides(array) {
//   array.forEach(element => {
//     element.style.display = 'none';
//     slidesArray.push(element);
//   });
// };

// numberOfSlides(slides);
// slidesArray[0].style.display = 'block';

// function totalNumber() {
//   if (slidesArray.length < 10) {
//     total.textContent = `0${slidesArray.length}`;
//   } else {
//     total.textContent = slidesArray.length;
//   }
// };

// totalNumber();

// function currentNumber(array) {
//   for (let i = 0; i < array.length; i++) {
//     if (slidesArray[i].style.display === 'block' && slidesArray[i] <= 10) {
//       current.textContent = `0${++i}`;
//     } else if (slidesArray[i].style.display === 'block') {
//       current.textContent = `${++i}`;
//     }
//   }
// };

// currentNumber(slidesArray);

// sliderCounter.addEventListener('click', e => {
//   e.preventDefault();
//   if (e.target.contains(sliderRightCount)) {
//     for (let i = 0; i <= slidesArray.length; i++) {
//       if (slidesArray[i].style.display === 'block' && i == slidesArray.length - 1) {
//         slidesArray[i].style.display = 'none';
//         slidesArray[0].style.display = 'block';
//         currentNumber(slidesArray);
//         return;
//       } else if (slidesArray[i].style.display === 'block') {
//         slidesArray[i].style.display = 'none';
//         slidesArray[++i].style.display = 'block';
//         currentNumber(slidesArray);
//         return;
//       };
//     };
//   } else if (e.target.contains(sliderLeftCount)) {
//     for (let i = 0; i < slidesArray.length; i++) {
//       if (slidesArray[i].style.display === 'block' && i == 0) {
//         slidesArray[i].style.display = 'none';
//         slidesArray[slidesArray.length - 1].style.display = 'block';
//         currentNumber(slidesArray);
//         return;
//       } else if (slidesArray[i].style.display === 'block') {
//         slidesArray[i].style.display = 'none';
//         slidesArray[--i].style.display = 'block';
//         currentNumber(slidesArray);
//         return;
//       };
//     };
//   }
// });
};

export default slider;