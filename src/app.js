const menuBox = document.querySelector('#menu-box');
const menuList = document.querySelector("#menu-list");
const membersList = document.querySelector("#members-list");

const members = [1,2,3,4,5,6,7]
const brainStorms = ["A", "B", "C", "D", "E", "F"];

for (const item of brainStorms) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<p>${item}</p>`;
  menuList.appendChild(listItem);
}

for (const member of members) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<img src="https://mdbcdn.b-cdn.net/img/new/avatars/${1}.webp" alt="" >`
  membersList.appendChild(listItem);
}

const toggleVisibility = (e) => {
  console.log(e.target)
  e.target.classList.toggle("hidden");
}

menuBox.addEventListener("mouseenter", toggleVisibility)
