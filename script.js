"use strict";
function log(x) {
  console.log(x);
}
const books = document.querySelector(".books");
const blockBook = document.querySelectorAll(".book");
const body = document.querySelector('body')
const banner = document.querySelector(".adv");
const list = document.getElementsByTagName("li");

let arrBook = [];
let newBook = [];
let arrBookList = [];
function mySortFunc(itemA, itemB) {
  return itemA.id - itemB.id;
}

  body.style.background = "url(.././image/you-dont-know-js.jpg) no-repeat, top";
 body.style.backgroundSize = "cover"
blockBook.forEach(function (item) {
  arrBook.push(item);
});

arrBook.forEach(function (element, index) {
  index = index + 1;
  let link = element.querySelector("a");
  element.setAttribute("id", Number(link.innerHTML.match(/[0-9]/)));
  element.getAttribute("id");
  newBook.push(element);
});
let id_3 = document.getElementById("3");
let linkId_3 = id_3.querySelector('a')
log(linkId_3);
linkId_3.textContent =  "Книга 3. this и Прототипы Объектов"

newBook.sort(mySortFunc).forEach(function (elem) {
  books.append(elem);
});

list[10].before(list[12]);
list[10].after(list[14]);
list[15].after(list[8]);

list[37].after(list[45]);
list[41].after(list[39]);
list[41].after(list[43]);
list[42].after(list[44]);

list[55].insertAdjacentHTML("afterend", "<li>Глава 8: За пределами ES6</li>");

banner.remove()
