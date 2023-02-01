"use strict";
const contentConteiner = document.getElementById("content");

let title;
let screens;
let screenPrice;
let adaptive;
const rollback = 7;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function (price) {
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
};

const isNumber = function (num) {
  if (num !== null) {
    let numb = num.toString().trim().replaceAll(/[+=-]/g, "");
    let num1 = Number(numb);

    if (num1 > 0) {
      return num1; 
    }
  }
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

  screenPrice = prompt("Сколько будет стоить данная работа", 15000);

  do {
    screenPrice = prompt("Сколько будет стоить данная работа", 15000);
  } while (!isNumber(screenPrice));
  adaptive = confirm("Нужен ли адаптив на сайте?");
  if (adaptive === true) {
    adaptive = "Нужен";
  } else {
    adaptive = "Не нужен";
  }
};

const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt(
        "Нужна ли разработка дизайна логотипа или сайта?",
        "К примеру: нужен логотип"
      );
    } else if (i === 1) {
      service2 = prompt(
        "Нужна ли анимация или встраивание видео?",
        "К примеру: необходимо встроить видео"
      );
    }
let servicePrice;
    do {
      servicePrice = prompt(
        "Сколько вы готовы заплатить за это",
        "от 3000 до 10000"
      );
    } while (!isNumber(servicePrice));

    sum += +isNumber(servicePrice); 
  }
  
  return sum
};

function getFullPrice(a = 0, b = 0) {
  return a + b;
}

const getTitle = function (str) {
  return str.trim(" ")[0].toUpperCase() + str.trim(" ").substr(1).toLowerCase();
};

const getServiPercenctPrices = function () {
  return fullPrice - fullPrice * (rollback / 100);
};
asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(isNumber(screenPrice), allServicePrices);
servicePercentPrice = getServiPercenctPrices();
showTypeOf(getTitle(title));
showTypeOf(screenPrice);
showTypeOf(adaptive);

contentConteiner.insertAdjacentHTML(
  "beforeend",
  `
<p>Ваша скидка:   ${getRollbackMessage(fullPrice)}</p>
<p>Название вашего проекта: «${getTitle(title)}» </p>
<p>Разрабатываемый тип экранов:  ${screens}</p>
<p>Стоимость верстки экранов:   ${isNumber(screenPrice)}   рублей <br>
<p>Нужен ли адаптив:  ${adaptive} </p>
<ul>
<li>Дополнительная услуга №1: ${service1} </li>
<li>Дополнительная услуга №2: ${service2} </li>
<li>Стоимость дополнительных  услуг: ${allServicePrices} </li>
</ul>
<p>Общая стоимость разработки вашего проекта: ${fullPrice}</p>
<p> Стоимость разработки сайта ${servicePercentPrice}</p>
<p>Откат посреднику:   ${fullPrice - servicePercentPrice}</p>
`
);
