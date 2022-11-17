function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

// Tabs

const tabs = document.querySelectorAll(tabsSelector),
tabsContent = document.querySelectorAll(tabsContentSelector),
tabsParent = document.querySelector(tabsParentSelector);


function hideTabContent() {
tabsContent.forEach(element => {
  element.style.display = 'none';
});

tabs.forEach(tab => {
  tab.classList.remove(activeClass);
});
};

function showTabContent(i = 0) {
tabsContent[i].style.display = "block";
tabs[i].classList.add(activeClass);
};

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (ev) => {
let target = ev.target;
if (target && target.matches(tabsSelector.slice(0))) {
  tabs.forEach((elem, i) => {
    if (elem == target) {
      hideTabContent();
      showTabContent(i);
    }
  });
};
});
};

export default tabs;




