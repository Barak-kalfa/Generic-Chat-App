// import { messages } from "./mock/mock.js";
import { db } from "./firebase-config.js";
import {
  getDocs,
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import { auth } from "./firebase-config.js";
import { currentUser } from "./auth.js";


const sendMsgButton = document.querySelector(".send-icon");
const messageInput = document.querySelector("#msg-input");
const msgPage = document.querySelector(".msg-page");
const chatsBar = document.querySelector("#chats-bar");
const newChatLink = document.querySelector("#new-chat-link");
const newChatBox = document.querySelector("#new-chat-input-box");
const newChatInput = document.querySelector("#new-chat-input");
const messages = [];


newChatLink.addEventListener('click', ()=>{
  newChatBox.classList.toggle('hidden');
})
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

export async function getChats(userId) {
  const chatsRef = collection(db, "chat");
  const q = query(chatsRef, where("users", "array-contains", userId));
  const userChats = await onSnapshot(q, (chats) => {
    chats.forEach((chat) => {
      const chatBox = document.createElement("a");
      chatBox.innerText = chat.id;
      chatBox.addEventListener("click", () => {
        getMsg(chat.id);
      });
      chatsBar.appendChild(chatBox);
    });
  });
}

async function getMsg(chatId) {
  try {
    const msgRef = collection(db, "message");
    const q = query(msgRef, where("chatId", "==", chatId));
    const chatMessages = await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((message) => {
        messages.push(message.data());
      });
    });
    console.log(messages);
  } catch (err) {
    console.log(err);
  }

  for (const message of messages) {
    if (message.userId === currentUser.uid) {
      const msg = document.createElement("div");
      msg.className = "outgoing-chats";
      msg.innerHTML = `<div class="outgoing-chats-img">
      <img src=${currentUser.img} />
    </div>
    <div class="outgoing-msg">
      <div class="outgoing-chats-msg">
        <p class="multi-msg">
      ${message.text}
        </p>
        <span class="time">${message.date}</span>
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
        ${message.text}
        </p>
        <span class="time">${message.date}</span>
      </div>
    </div>`;
      msgPage.appendChild(msg);
    }
    msgPage.scrollTo(0, msgPage.scrollHeight);
  }
}

getChats(localStorage.getItem("uid"));
sendMsgButton.addEventListener("click", sendMsg);
