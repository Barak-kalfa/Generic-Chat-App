// import { messages } from "./mock/mock.js";
import { db } from "./firebase-config.js";
import {
  getDocs,
  collection,
  doc,
  setDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const sendMsgButton = document.querySelector(".send-icon");
const messageInput = document.querySelector("#msg-input");
const currentUser = {
  name: "Barak Kalfa",
  img: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
};
const msgPage = document.querySelector(".msg-page");

const USER_UID = "Stvgx7ExJ299YBHNdsV9";

function sendMsg() {
  const msg = document.createElement("div");
  msg.className = "outgoing-chats";
  msg.innerHTML = `<div class="outgoing-chats-img">
  <img src=${currentUser.img} />
  </div>
  <div class="outgoing-msg">
  <div class="outgoing-chats-msg">
  <p class="multi-msg">
  ${messageInput.value}
  </p>
  <span class="time">${new Date().toDateString()}</span>
  </div>
  </div>`;
  msgPage.appendChild(msg);
  msg.scrollIntoView();
}

async function getChats() {
  const chatsRef = collection(db, "chat");
  const q = query(chatsRef, where("users", "array-contains", "Stvgx7ExJ299YBHNdsV9"));
  const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

}

getChats();

function getMsg() {
  const messages = [];
  for (const message of messages) {
    if (message.user === currentUser.name) {
      const msg = document.createElement("div");
      msg.className = "outgoing-chats";
      msg.innerHTML = `<div class="outgoing-chats-img">
      <img src=${currentUser.img} />
    </div>
    <div class="outgoing-msg">
      <div class="outgoing-chats-msg">
        <p class="multi-msg">
      ${message.msg}
        </p>
        <span class="time">${message.time}</span>
      </div>
    </div>`;
      msgPage.appendChild(msg);
    } else {
      const msg = document.createElement("div");
      msg.className = "received-chats";
      msg.innerHTML = `<div class="received-chats-img">
      <img src="https://mdbcdn.b-cdn.net/img/new/avatars/3.webp" />
    </div>
    <div class="received-msg">
      <div class="received-msg-inbox">
        <p class="single-msg">
        ${message.msg}
        </p>
        <span class="time">${message.time}</span>
      </div>
    </div>`;
      msgPage.appendChild(msg);
    }
    msgPage.scrollTo(0, msgPage.scrollHeight);
  }
}

getMsg();
sendMsgButton.addEventListener("click", sendMsg);
