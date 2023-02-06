"use strict";

const appData = {
  contentConteiner: document.getElementById("content"),
  title: "",
  screens: [],
  screeType: "",
  screenPrice: 0,
  adaptive: true,
  rollback: 7,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesType: "",
  services: {},
  isStr: function (str) {
    do {
      str;
    } while (appData.isNumber(str));
  },
  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        "Калькулятор верстки"
      );
    } while (!isNaN(appData.title));

    for (let i = 0; i < 2; i++) {
      let name = "";
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!isNaN(name));

      let price = 0;
      do {
        price = prompt("Сколько будет стоить данная работа", 15000);
      } while (!appData.isNumber(price));
      appData.screens.push({
        id: i,
        name: name,
        price: appData.isNumber(price),
      });
    }

    for (let i = 0; i < 2; i++) {
      let name = "";
      do {
        name = prompt(
          "Какой дополнительный тип услуги нужен?",
          "К примеру: логотип, анимация"
        );
      } while (!isNaN(name));
      let servicePrice = 0;
      do {
        servicePrice = prompt(
          "Сколько вы готовы заплатить за это",
          "от 3000 до 10000"
        );
      } while (!appData.isNumber(servicePrice));
      appData.servicesType += name + ", ";
      appData.services[name] = appData.isNumber(servicePrice);
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    if (appData.adaptive === true) {
      appData.adaptive = "Нужен";
    } else {
      appData.adaptive = "Не нужен";
    }
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screeType += screen.name + ", ";
      appData.screenPrice += appData.isNumber(screen.price);
    }
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
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

  getFullPrice: function () {
    appData.fullPrice =
      appData.isNumber(appData.screenPrice) + appData.allServicePrices;
  },

  getTitle: function () {
    appData.title =
      appData.title.trim(" ")[0].toUpperCase() +
      appData.title.trim(" ").substr(1).toLowerCase();
  },

  getServiPercenctPrices: function () {
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getTitle();
    appData.getFullPrice();
    appData.getServiPercenctPrices();
    appData.contentConteiner.insertAdjacentHTML(
      "beforeend",
      `
<p>Ваша скидка:   ${appData.getRollbackMessage(appData.fullPrice)}</p>
<p>Название вашего проекта: «${appData.title}» </p>
<p>Разрабатываемый тип экранов:  ${appData.screeType}</p>
<p>Стоимость верстки экранов:   ${appData.screenPrice}   рублей <br>
<p>Нужен ли адаптив:  ${appData.adaptive} </p>
<ul>
<li>Дополнительные услуги: ${appData.servicesType} </li>
<li>Стоимость дополнительных  услуг: ${appData.allServicePrices} </li>
</ul>
<p>Общая стоимость разработки вашего проекта: ${appData.fullPrice}</p>
<p> Стоимость разработки сайта ${appData.servicePercentPrice}</p>
<p>Откат посреднику:   ${appData.fullPrice - appData.servicePercentPrice}</p>
`
    );
    appData.logger();
  },
  logger: function () {
    for (let key in appData) {
      console.log(key);
    }
  },
};

appData.start();
