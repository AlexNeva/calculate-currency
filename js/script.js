document.addEventListener('DOMContentLoaded', () => {
  (function currencyCalculator() {
    const currencySelect = document.querySelector('#currency');
    const rubInput = document.querySelector('#sum');
    const outputInput = document.querySelector('#output');
    const form = document.querySelector('#form');

    // Получил курс валют по api и загрузил валюты в select
    const getCurrency = async function () {
      return await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
        .then(res => {
          if (res.ok) {
            res.json()
              .then(res => {
                const resObj = res['Valute']
                console.log(resObj);

                for (let cur in resObj) {
                  if (resObj.hasOwnProperty(cur)) {

                    currencySelect.insertAdjacentHTML('beforeend', `
                      <option value='${resObj[cur]['Value']}'>${cur} - ${resObj[cur]['Name']}</option>
                    `)
                  }
                }

              })
          }
        })
    }

    // функция которая считает сумму 
    const calculateSum = function () {
      if (+currencySelect.value) {
        const currencyVal = +currencySelect.value;
        const rubVal = +rubInput.value.replace(/\s/g, '');
        console.log('dfdf');
        return rubVal / currencyVal;
      } else return 0;

    }

    // записываем сумму в инпут
    const outputSum = function () {
      outputInput.value = calculateSum();
    }

    form.addEventListener('submit', (event) => {
      send(event, 'mail.php');
    })

    function send(event, php) {
      console.log("Отправка запроса");
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      let req = new XMLHttpRequest();
      req.open('POST', php, true);
      req.onload = function () {
        if (req.status >= 200 && req.status < 400) {
          json = JSON.parse(this.response);
          console.log(json);

          // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
          if (json.result == "success") {
            // Если сообщение отправлено
            alert("Сообщение отправлено");
          } else {
            // Если произошла ошибка
            alert("Ошибка. Сообщение не отправлено");
          }
          // Если не удалось связаться с php файлом
        } else { alert("Ошибка сервера. Номер: " + req.status); }
      };

      // Если не удалось отправить запрос. Стоит блок на хостинге
      req.onerror = function () { alert("Ошибка отправки запроса"); };
      req.send(new FormData(event.target));
    }



    // при фокусе запускаю функцию getCurrency
    currencySelect.addEventListener('focus', getCurrency);

    // при выборе валюты выводим сумму в инпут ниже
    currencySelect.addEventListener('change', outputSum);

    rubInput.addEventListener('input', outputSum);

  }())

});