document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const section = document.querySelector('.help'),
        container  = section.querySelector('.container');
  
  const getData = () => {
    return fetch('./js/db.json');
  };

  const parsingResponse = (response) => {
    const data = JSON.parse(response);
    return data;
  };

  const creatingCard = (item, index) => {
    const div = document.createElement('div');
    let columnDivPhoto = 'col-md-8 col-12',
        columnDivBtn = 'col-md-4 col-12';
    div.classList.add('row');
    if (index % 2 !== 0) {
      div.style.flexDirection = 'row-reverse';
      columnDivPhoto = 'col-md-6';
      columnDivBtn = 'col-md-6 col-12';
    }
    div.innerHTML = `
      <div class="${columnDivPhoto}">
          <div class="help__item">
            <img class="help_photo" src="${item.avatar}" alt="${item.name}">
            <div class="help__info">
              <p class="help__name">${item.name} ${item.last_name}</p>
              <p class="help__money d-flex flex-column">
                <span>Внесено пожертвований</span>
                <span>${item.sum1} рублей из</span>
                <span>${item.sum2} рублей </span>
              </p>
              <p><a class="help__link" href="#">История ${item.name}</a></p>
            </div>
          </div>
        </div>
        <div class="${columnDivBtn}">
          <div class="help__btn d-flex flex-column">
            <a class="main__btn" href="#" id="${item.id}">Сделать пожертвование</a>
            <a class="main__btn main__btn-reverse" href="#">Помочь другим способом</a>
            <a class="main__btn main__btn-reverse" href="#">Счет для Юридических лиц</a>
          </div>
        </div>
    `;
    container.append(div);
  };

  const creatingCards = (data) => {
    data.forEach((elem, index) => {
      creatingCard(elem, index);
    });
    return data;
  };

  const creatingPopupBlock = (elem) => {
    const section = document.createElement('section');
    section.classList.add('modal');
    section.style.display = 'flex';
    section.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="modal-window">
            <div class="modal-window__img">
              <img src="${elem.avatar}" alt="Фото - ${elem.name}">
            </div>
            <img class="modal__btn-close" src="img/header/close_btn.svg" alt="Закрыть окно">
            <div class="modal-window__text">
              <h2>${elem.name} ${elem.last_name}</h2>
              <p>
              ${elem.history}
              </p>
              <button class="main__btn-modal">Фото и документы</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    document.body.append(section);
  };

  const addListeners = (data) => {
    container.addEventListener('click', (event) => {
      event.preventDefault();
      let target = event.target;
      if (target.textContent === 'Сделать пожертвование') {
        data.forEach(elem => {
          if (elem.id === target.id) {
            creatingPopupBlock(elem);
          }
        });
      }
    });

  };

  const closingModal = () => {
    document.body.addEventListener('click', (event) => {
      let target = event.target;

      if (target.closest('.modal__btn-close')) {
        const modal = document.querySelector('.modal');
        modal.parentNode.removeChild(modal);
      }
    });
  };

  closingModal();

  getData()
  .then((response) => {
    if (response.status !== 200) {
      throw new Error('Sttus server not 200!');
    } else {
      return response.text();
    }
  })
  .then(parsingResponse)
  .then(creatingCards)
  .then(addListeners)
  .catch(error => console.warn(error));
});