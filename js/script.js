"use strict";

const title = document.getElementsByTagName("h1")[0];
const plusBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback span.range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const totalInput = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
const mainControlsViews = document.getElementsByClassName(
  "main-controls__views"
)[0];
let screens = document.querySelectorAll(".screen");

const appData = {
  contentConteiner: document.getElementById("content"),
  title: "",
  screens: [],
  screenType: "",
  screenCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  totalServicesPrice: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  init: function () {
    appData.addTitle();
    startBtn.addEventListener("click", appData.start);
    plusBtn.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("input", function (event) {
      appData.rollbackValue(event);
    });
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  showResult: function () {
    totalInput.value = appData.screenPrice;
    totalCount.value = appData.screenCount;
    totalCountOther.value = appData.totalServicesPrice;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },
  addScreens: function () {
    
    screens = document.querySelectorAll(".screen");
    screens.forEach(function (itemScreen, index) {
      appData.screens = [];
      const select = itemScreen.querySelector("select");
      const input = itemScreen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      if (
        (selectName == "Тип экранов" && +input.value >= 0) ||
        input.value === "Количество экранов"
      ) {
        appData.init();
      } else {
        appData.screens.push({
          id: index,
          name: selectName,
          count: +input.value,
          price: +select.value * +input.value,
        });
      }
    });
  },
  addServices: function () {
       otherItemsPercent.forEach(function (item, index) {
          const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const inputText = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +inputText.value;
      }
    });
    otherItemsNumber.forEach(function (item, index) {
           const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const inputText = item.querySelector("input[type=text]");
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +inputText.value;
      }
    });
  },
  addScreenBlock: function () {
        let clonScreen = screens[0].cloneNode(true);
    clonScreen.querySelector("input[type=text]").value = "";
    screens[screens.length - 1].after(clonScreen);
    },

  addPrices: function () {
    
    appData.rollback = +inputRange.value;
    for (let screen of appData.screens) {
      appData.screenType += screen.name + ", ";
      appData.screenCount += screen.count;
      appData.screenPrice += screen.price;
    }
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.totalServicesPrice =
      appData.servicePricesNumber + appData.servicePricesPercent;
    appData.fullPrice = +appData.screenPrice + appData.totalServicesPrice;
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  rollbackValue: function (event) {
    inputRangeValue.textContent = `${event.target.value}%`;
  },

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    //     appData.logger();
  },
  logger: function () {
    for (let key in appData) {
      console.log(key);
    }
  },
};

appData.init();
