"use strict";

const appData = {
  contentConteiner: document.getElementById("content"),
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 7,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",
  asking: function () {
  appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  appData.screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные"
  );

  appData.screenPrice = prompt("Сколько будет стоить данная работа", 15000);

  do {
    appData.screenPrice = prompt("Сколько будет стоить данная работа", 15000);
  } while (!appData.isNumber(appData.screenPrice));
  appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  if (appData.adaptive === true) {
    appData.adaptive = "Нужен";
  } else {
    appData.adaptive = "Не нужен";
  }
},
getRollbackMessage: function (price) {
  switch (true) {
    case price < 0:
      return "Что то пошло не так";
      break;
    case 0:
    case 15000:
    case 30000:
      return;
      "Для получения скидки в 5% стоимость должна быть свыше 15000, а для скидки в 10% свыше 30000";
      break;
    case price > 30000:
      return "Даем скидку в 10%";
      break;

    case price > 15000 && price != 30000 && price < 30000:
      return "Даем скидку в 5%";
      break;
    case (price != 15000 && price < 15000) || price > 0:
      return "Скидка не предусмотрена";
      break;
  }
},
isNumber: function (num) {
  if (num !== null) {
    let numb = num
      .toString()
      .trim()
      .replaceAll(/["+=-]/g, "");
    let num1 = Number(numb);

    if (num1 > 0) {
      return num1;
    }
  }
},
getAllServicePrices: function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    let servicePrice = 0;
    if (i === 0) {
      appData.service1 = prompt(
        "Нужна ли разработка дизайна логотипа или сайта?",
        "К примеру: нужен логотип"
      );
    } else if (i === 1) {
      appData.service2 = prompt(
        "Нужна ли анимация или встраивание видео?",
        "К примеру: необходимо встроить видео"
      );
    }

    do {
      servicePrice = prompt(
        "Сколько вы готовы заплатить за это",
        "от 3000 до 10000"
      );
    } while (!appData.isNumber(servicePrice));

    sum += +appData.isNumber(servicePrice);
  }

  return sum;
},
 getFullPrice: function(a = 0, b = 0) {
  return a + b;
},

getTitle: function (str) {
  return str.trim(" ")[0].toUpperCase() + str.trim(" ").substr(1).toLowerCase();
},

getServiPercenctPrices: function () {
  return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
},

start: function(){
appData.asking();
appData.allServicePrices = appData.getAllServicePrices();
appData.fullPrice = appData.getFullPrice(
  appData.isNumber(appData.screenPrice),
  appData.allServicePrices
);
appData.servicePercentPrice = appData.getServiPercenctPrices();
appData.contentConteiner.insertAdjacentHTML(
  "beforeend",
  `
<p>Ваша скидка:   ${appData.getRollbackMessage(appData.fullPrice)}</p>
<p>Название вашего проекта: «${appData.getTitle(appData.title)}» </p>
<p>Разрабатываемый тип экранов:  ${appData.screens}</p>
<p>Стоимость верстки экранов:   ${appData.isNumber(
    appData.screenPrice
  )}   рублей <br>
<p>Нужен ли адаптив:  ${appData.adaptive} </p>
<ul>
<li>Дополнительная услуга №1: ${appData.service1} </li>
<li>Дополнительная услуга №2: ${appData.service2} </li>
<li>Стоимость дополнительных  услуг: ${appData.allServicePrices} </li>
</ul>
<p>Общая стоимость разработки вашего проекта: ${appData.fullPrice}</p>
<p> Стоимость разработки сайта ${appData.servicePercentPrice}</p>
<p>Откат посреднику:   ${appData.fullPrice - appData.servicePercentPrice}</p>
`
);
appData.logger()
},
logger: function(){
for(let key in appData){
 console.log(key)
}
},
};

appData.start()

