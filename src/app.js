import { db } from "./firebase-config.js";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  Timestamp,
  onSnapshot,
  query,
  where,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

import { auth } from "./firebase-config.js";
import { currentUser } from "./auth.js";

const sendMsgButton = document.querySelector(".send-icon");
const messageInput = document.querySelector("#msg-input");
const msgPage = document.querySelector(".msg-page");
const chatsBar = document.querySelector("#chats-bar");
const newChatBox = document.querySelector("#new-chat-input-box");
const newChatLink = document.querySelector("#new-chat-link");
const newChatInput = document.querySelector("#new-chat-input");
const newChatButton = document.querySelector("#new-chat-button");

const usersRef = collection(db, "user");
const chatsRef = collection(db, "chat");
const msgRef = collection(db, "message");
const messages = [];
let currentChatId;

export async function getUser(userId) {
  const user = await getDoc(doc(db, "user", userId));
  return user.data();
}


async function startNewChat(email) {
  //ADD EMAIL ALREADY IN CHATS LIST CHECK
  try {
    console.log("x");
    const chat = { name: email, users: [currentUser.email, email] };
    const docRef = await addDoc(collection(db, "chat"), chat);
    const chatBox = document.createElement("a");
    chatBox.innerText = email;
    chatsBar.appendChild(chatBox);
  } catch (err) {
    console.log(err);
  }
}

async function sendMsg() {
  const msg = document.createElement("div");
  msg.className = "outgoing-chats";
  msg.innerHTML = `<div class="outgoing-chats-img">
  <img src=${currentUser} />
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
  const message = {
    chatName: currentChatId,
    date: new Date().toString(),
    text: messageInput.value,
    userId: currentUser.uid,
    userName: currentUser.name,
  };
  console.log(message);
  await setDoc(doc(collection(db, "message")), message);
}

export async function getChats(userId) {
  const q = query(chatsRef, where("users", "array-contains", userId));
  const userChats = await onSnapshot(q, (chats) => {
    chats.forEach((chat) => {
      const chatBox = document.createElement("a");
      chatBox.innerText = chat.name;
      chatBox.addEventListener("click", () => {
        getMsg(chat.name);
      });
      chatsBar.appendChild(chatBox);
    });
  });
}

export async function createUser(name, email, uid) {
  try {
    const res = await setDoc(doc(db, "user", uid), {
      name: name,
      email: email,
      requests: [],
    });
  } catch (err) {
    console.log(err);
  }
}

async function getMsg(chatName) {
  currentChatId = chatName;
  try {
    const q = query(msgRef, where("name", "==", chatName));
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
newChatLink.addEventListener("click", () => {
  newChatBox.classList.toggle("hidden");
});
newChatButton.addEventListener("click", () => {
  startNewChat(newChatInput.value);
});
