'use strict';

import  calculator   from './modules/calculator';
import  form         from './modules/form';
import  menuBlocks   from './modules/menuBlocks';
import  modalWindow  from './modules/modalWindow';
import  slider       from './modules/slider';
import  tabs         from './modules/tabs';
import  timer        from './modules/timer';
import  { openModal }  from './modules/modalWindow';

window.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

  calculator();
  form('form', modalTimerId);
  menuBlocks();
  modalWindow('[data-modal]' , '.modal', modalTimerId);
  slider( {
    slidesContainer: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    slidesWrap: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  timer('.timer', '2022-11-20'); 
});