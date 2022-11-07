"use strict";

//Form

const forms = document.querySelectorAll('form'),
  parentThnkModal = document.querySelector('.modal__dialog'),
  formModal = document.querySelector('.modal__content');

const message = {
  loading: 'img/loading/spinner.svg',
  success: 'Спасибо! Скоро мы с Вами свяжемся',
  failure: 'Что-то пошло не так...',
};

forms.forEach(item => {
  bindPostData(item);
});

let postData = async (url, data) => {
  const res = await fetch(url, {
    // mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: data,
  });

  return await res.json();
};

function bindPostData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
          display: block;
          margin: 0 auto
          `;
    form.insertAdjacentElement('afterend', statusMessage);

    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    // const object = {};
    // formData.forEach(function(value, key) {
    //   object[key] = value;
    // });

    postData('http://localhost:3000/requests', json)
    .then((() => {
      showThanksModal(message.success, parentThnkModal);
      statusMessage.remove();
    })).catch(() => {
      showThanksModal(message.failure, parentThnkModal);
      statusMessage.remove();
    }).finally(() => {
      form.reset();
    });

    // const request = new XMLHttpRequest();

    // request.open('POST', 'http://php/');
    // // request.setRequestHeader('Content-type', 'multipart/form-data');

    // // const obj = {};
    // // formData.forEach(function(value, key) {
    // //   obj[key] = value;
    // // });
    // // const json = JSON.stringify(obj);
    // const formData = new FormData(form);

    // request.send(formData);

    // request.addEventListener('load', () => {
    //   if (request.status === 200) {
    //     showThanksModal(message.success, parentThnkModal);
    //     form.reset();
    //     statusMessage.remove();
    //   } else {
    //     showThanksModal(message.failure, parentThnkModal);
    //     statusMessage.remove();
    //   }
    // });

  });
};
// const forms = document.querySelectorAll('form');
// const message = {
//     loading: 'Загрузка...',
//     success: 'Спасибо! Скоро мы с вами свяжемся',
//     failure: 'Что-то пошло не так...'
// };

// forms.forEach(item => {
//     postData(item);
// });

// function postData(form) {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();

//         let statusMessage = document.createElement('div');
//         statusMessage.classList.add('status');
//         statusMessage.textContent = message.loading;
//         form.appendChild(statusMessage);

//         const request = new XMLHttpRequest();
//         request.open('POST', 'server.php');
//         request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//         const formData = new FormData(form);

//         const object = {};
//         formData.forEach(function(value, key){
//             object[key] = value;
//         });
//         const json = JSON.stringify(object);

//         request.send(json);

//         request.addEventListener('load', () => {
//             if (request.status === 200) {
//                 console.log(request.response);
//                 statusMessage.textContent = message.success;
//                 form.reset();
//                 setTimeout(() => {
//                     statusMessage.remove();
//                 }, 2000);
//             } else {
//                 statusMessage.textContent = message.failure;
//             }
//         });
//     });
// }

//  ThanksModal

function showThanksModal(message, item) {
  openModal();
  if (modal) {
    formModal.style.display = 'none';
  };

  let thanksModal = document.createElement('div');
  thanksModal.classList.add('modal__content');
  thanksModal.innerHTML = `
                                <div data-close class="modal__close">&times;</div>
                                <div class="modal__title">${message}</div>
                              `;
  item.appendChild(thanksModal);

  setTimeout(() => {
    parentThnkModal.removeChild(thanksModal);
    formModal.style.display = 'block';
    closeModal();
  }, 4000);
};


