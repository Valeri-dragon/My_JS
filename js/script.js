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

let mainContolsElements = document.querySelectorAll(".main-controls__item");
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

  addTitle: function () {
    document.title = title.textContent;
  },
  showResult: function () {
    totalInput.value = this.screenPrice;
    totalCount.value = this.screenCount;
    totalCountOther.value = this.totalServicesPrice;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  deleteResult: function () {
    this.screenPrice = 0;
    this.screens = [];
    this.screenCount = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.totalServicesPrice = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    totalInput.value = this.screenPrice;
    totalCount.value = this.screenCount;
    totalCountOther.value = this.totalServicesPrice;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((itemScreen, index) => {
      const select = itemScreen.querySelector("select");
      const input = itemScreen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      if (
        (selectName == "Тип экранов" && +input.value >= 0) ||
        input.value === "Количество экранов"
      ) {
        input.value = "";
        init.apply(appData);
      } else {
        this.screens.push({
          id: index,
          name: selectName,
          count: +input.value,
          price: +select.value * +input.value,
        });
      }
    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item, index) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const inputText = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesPercent[label.textContent] = +inputText.value;
      }
    });
    otherItemsNumber.forEach((item, index) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const inputText = item.querySelector("input[type=text]");
      if (check.checked) {
        this.servicesNumber[label.textContent] = +inputText.value;
      }
    });
  },
  addScreenBlock: function () {
    let clonScreen = screens[0].cloneNode(true);
    clonScreen.querySelector("input[type=text]").value = "";
    screens[screens.length - 1].after(clonScreen);
  },

  addPrices: function () {
    this.rollback = +inputRange.value;
    for (let screen of this.screens) {
      this.screenType += screen.name + ", ";
      this.screenCount += screen.count;
      this.screenPrice += screen.price;
    }
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.totalServicesPrice =
      this.servicePricesNumber + this.servicePricesPercent;
    this.fullPrice = +this.screenPrice + this.totalServicesPrice;
    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);
  },
  rollbackValue: function (event) {
    inputRangeValue.textContent = `${event.target.value}%`;
  },
  blocking: function () {
    mainContolsElements = document.querySelectorAll(".main-controls__item");
    mainContolsElements.forEach((item) => {
      let select = item.querySelectorAll("select");
      select.forEach((el) => {
        el.disabled = true;
      });
      let input = item.querySelector("input");
      input.disabled = true;
      plusBtn.disabled = true;
    });
    startBtn.style.display = "none";
    resetBtn.style.display = "flex";
  },
  unblocking: function () {
    mainContolsElements = document.querySelectorAll(".main-controls__item");
    mainContolsElements.forEach((item) => {
      let input = item.querySelector("input");
      if (input.checked) {
        input.checked = !input.checked;
      } else {
        input.value = "";
      }
      inputRange.value = 0;
      inputRangeValue.textContent = `${inputRange.value}%`;
      input.disabled = false;
      plusBtn.disabled = false;
    });
    screens = document.querySelectorAll(".screen");
    screens.forEach((el, index) => {
      if (el.hasAttribute("id") || index == 0) {
        el.querySelector("select").disabled = false;
      } else {
        el.remove();
      }
      el.innerHTML += "";
      el.value = "";
    });
    startBtn.style.display = "flex";
    resetBtn.style.display = "none";
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.blocking();
  },
  reset: function () {
    this.unblocking();
    this.deleteResult();
    //this.logger();
  },
  logger: function () {
    for (let key in this) {
      console.log(this[key]);
    }
  },
};
const init = function () {
  this.addTitle();
  startBtn.addEventListener("click", () => {
    this.start();
  });
  resetBtn.addEventListener("click", () => {
    this.reset();
  });
  plusBtn.addEventListener("click", this.addScreenBlock);
  inputRange.addEventListener("input", (event) => {
    this.rollbackValue(event);
  });
};
init.call(appData);
