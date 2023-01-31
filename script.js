"use strictа";
const contentConteiner = document.getElementById("content");
let title = prompt("Как называется ваш проект?", "Пример: Милые попугаи");
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  '"Простые", "Сложные", "Интерактивные"'
);
let screenPrice = +prompt("Сколько будет стоить данная работа", "Пример: 5768");
const rollback = 7;
let adaptive = confirm("Нужен ли адаптив на сайте?");
if (adaptive === true) {
  adaptive = "Нужен";
} else {
  adaptive = "Не нужен";
}
let service1 = prompt(
  "Нужна ли разработка дизайна логотипа или сайта?",
  "К примеру: нужен логтип"
);

let servicePrice1 = +prompt(
  "Сколько вы готовы заплатить за это",
  "от 500 до 5000"
);
let service2 = prompt(
  "Нужна ли анимация или встраивание видео?",
  "К примеру: необходимо встроить видео"
);
let servicePrice2 = +prompt(
  "Сколько вы готовы заплатить за это",
  "от 3000 до 10000"
);
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
switch (true) {
  case fullPrice < 0:
    console.log("Что то пошло не так");
    break;
  case 0:
  case 15000:
  case 30000:
    console.log(
      "Для получения скидки в 5% стоимость должна быть свыше 15000, а для скидки в 10% свыше 30000"
    );
    break;
  case fullPrice > 30000:
    console.log("Даем скидку в 10%");
    break;

  case fullPrice > 15000 && fullPrice != 30000 && fullPrice < 30000:
    console.log("Даем скидку в 5%");
    break;
  case (fullPrice != 15000 && fullPrice < 15000) || fullPrice > 0:
    console.log("Скидка не предусмотрена");
    break;
}
let servicePercentPrice = Math.ceil((fullPrice * rollback) / 100);

let screensToLowSplit = screens.toLowerCase().split('"", ');

console.log("Откат посреднику:" + +servicePercentPrice);
contentConteiner.insertAdjacentHTML(
  "beforeend",
  `
<p>Название проекта: ${title} </p>
<p>Какой тип экрнов разрабатываем:  ${screensToLowSplit}</p>
<p>"Стоимость верстки экранов " + ${screenPrice} + " рублей" <br>
<p>Нужен ли адаптив:  ${adaptive} </p>
<p>дополнительная услуга №1: ${service1} 
<span>Стоимость дополнительной  услуги №1: ${servicePrice1} </span></p>
<p>дополнительная услуга №2: ${service2} 
<span>Стоимость дополнительной  услуги №1: ${servicePrice2} </span></p>

    ${"Стоимость разработки сайтов " + fullPrice}</p>
    <p>Откат посреднику: ${servicePercentPrice}</p>
`
);
