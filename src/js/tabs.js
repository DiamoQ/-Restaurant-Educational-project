"use strict";

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




