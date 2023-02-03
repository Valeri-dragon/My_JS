"use strict";
const contentConteiner = document.getElementById("content");
let title = prompt("Как называется ваш проект?", "Пример: Милые попугаи");
let screens = prompt("Какие типы экранов нужно разработать?",  '"Простые", "Сложные", "Интерактивные"');
let screenPrice = +prompt("Сколько будет стоить данная работа", "Пример: 5768");
let adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt( "Нужна ли разработка дизайна логотипа или сайта?",  "К примеру: нужен логтип");
const servicePrice1 = +prompt( "Сколько вы готовы заплатить за это",  "от 500 до 5000");
const service2 = prompt( "Нужна ли анимация или встраивание видео?",  "К примеру: необходимо встроить видео");
const servicePrice2 = +prompt(  "Сколько вы готовы заплатить за это",  "от 3000 до 10000");
const rollback = 7;
//const fullPrice = screenPrice + servicePrice1 + servicePrice2;
//let  = Math.ceil(fullPrice -(fullPrice *( rollback / 100)));

let allServicePrices, fullPrice, servicePercentPrice;

const showTypeOf = function(variable){
console.log(variable, typeof variable);
}

const getRollbackMessage = function(price){
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
}

const getAllServicePrices = function (a=0, b=0) {
  return a + b;

}

function getFullPrice(a=0, b=0){
  return a + b;
}

const getTitle = function (str) {
  let strLitle = str.trim(" ").substring(1).toLowerCase();
  let strUp = str.trim(" ").substring(0, 1).toUpperCase();

  return strUp + strLitle;
};
const getServiPercenctPrices = function (a, callback) {
  return a - callback(a, rollback);
};
if (adaptive === true) {
  adaptive = "Нужен";
} else {
  adaptive = "Не нужен";
}

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServiPercenctPrices(
  fullPrice,
  function (fullPrice, rollback) {
   return fullPrice*(rollback/100)
  }
);
showTypeOf(getTitle(title));
showTypeOf(fullPrice);
showTypeOf(adaptive);


contentConteiner.insertAdjacentHTML(
  "beforeend",
  `
<p>Название проекта: ${getTitle(title)} </p>
<p>Какой тип экрнов разрабатываем:  ${screens}</p>
<p>Стоимость верстки экранов   ${screenPrice}   рублей <br>
<p>Нужен ли адаптив:  ${adaptive} </p>
<p>дополнительная услуга №1: ${service1} 
<span>Стоимость дополнительной  услуги №1: ${servicePrice1} </span></p>
<p>дополнительная услуга №2: ${service2} 
<span>Стоимость дополнительной  услуги №1: ${servicePrice2} </span></p>

   <p> Стоимость разработки сайтов ${servicePercentPrice}</p>
    <p>Ваша скидка составит  ${getRollbackMessage(fullPrice)}</p>
    <p>Откат посреднику:   ${fullPrice - servicePercentPrice}</p>
`
);

