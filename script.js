const contentConteiner = document.getElementById("content");
const title = "Project lesson02";
const screens = "\"Простые\", \"Сложные\", \"Интерактивные\"";
const screenPrice = 5768;
const rollback = 7;
const fullPrice = 85435;
const adaptive = true;
let screensToLowSplit = screens.toLowerCase().split("\"\", ");
let percentageOfKickback = Math.round(fullPrice *(rollback/100));
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice +" рублей" +'\n' +"Стоимость разработки сайтов " + fullPrice + " рублей");
console.log(screensToLowSplit);
console.log(percentageOfKickback);
contentConteiner.insertAdjacentHTML(
  "beforeend",
  `
<p>${title} type ${typeof title}</p>
<p>${fullPrice} type ${typeof fullPrice}</p>
<p>adaptive ${adaptive} type ${typeof adaptive}</p>
<p>${screens} length ${screens.length}</p>
<p>${
    "Стоимость верстки экранов " +
    screenPrice +
    " рублей"} <br>
    ${
    "Стоимость разработки сайтов " +
    fullPrice +
    " рублей"
  }</p>
<p>${screensToLowSplit}</p>
`
);