import { db } from "./firebase-config.js";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  Timestamp,
  onSnapshot,
  query,
  where,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const sendMsgButton = document.querySelector(".send-icon");
const messageInput = document.querySelector("#msg-input");
const msgPage = document.querySelector(".msg-page");
const chatsBar = document.querySelector("#chats-bar");
const newChatBox = document.querySelector("#new-chat-input-box");
const newChatLink = document.querySelector("#new-chat-link");
const newGroupLink = document.querySelector("#new-group-link");
const inviteLink = document.querySelector("#invite-link");
const newChatInput = document.querySelector("#new-chat-input");
const newChatButton = document.querySelector("#new-chat-button");

const usersRef = collection(db, "users");
const chatsRef = collection(db, "chats");
const msgRef = collection(db, "messages");
export let chatsSnapshot;
let currentChatId;
let currentUser = localStorage.getItem("uid")
  ? await setCurrentUser(localStorage.getItem("uid"))
  : undefined;
console.log(currentUser);

export async function setCurrentUser(uid) {
  try {
    const userInfo = await getDoc(doc(db, "users", uid));
    const user = userInfo.data();
    getChats(user.email);
    user.uid = uid;
    user.img = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp";
    return user;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export async function createUser(name, email, uid) {
  try {
    await setDoc(doc(db, "users", uid), {
      fullName: name,
      email: email,
      chats: [],
    });
  } catch (err) {
    console.log(err);
  }
}

function handleMenuButton(input, callback) {
  switch (callback) {
    case "startNewChat":
      startNewChat(input);
      break;
    case "startNewGroup":
      startNewGroup(input);
      break;
    case "inviteToGroup":
      inviteToGroup(input);
      break;
    default:
      console.log(callback);
  }
}

async function startNewChat(email) {
  //ADD EMAIL ALREADY IN CHATS LIST CHECK
  try {
    const chat = { name: "", users: [currentUser.email, email] };
    const docRef = await addDoc(collection(db, "chats"), chat);
  } catch (err) {
    console.log(err);
  }
}

async function startNewGroup(name) {
  try {
    const chat = { name: name, users: [currentUser.email] };
    const docRef = await addDoc(collection(db, "chats"), chat);
  } catch (err) {
    console.log(err);
  }
}

async function inviteToGroup(email) {
  // const userInfo = await query(usersRef, where("email", "==", email));
  //ADD USER NOT FOUND CHECK
  await updateDoc(doc(db, "chats", currentChatId), {
    users: arrayUnion(email),
  });
}

async function getChats(currentUserEmail) {
  if (chatsSnapshot) chatsSnapshot(); //detaches last snapshot
  const q = query(chatsRef, where("users", "array-contains", currentUserEmail));
  chatsSnapshot = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New Chat: ", change.doc.data());
        const chatBox = document.createElement("a");
        const chat = change.doc.data();
        if (chat.name === "") {
          chat.name = chat.users.filter((chat) => chat !== currentUser.email);
        }
        chatBox.innerText = chat.name;
        chatBox.addEventListener("click", () => {
          getMessages(change.doc.id);
          setCurrentChat(change.doc.id);
        });
        chatsBar.appendChild(chatBox);
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
      }
    });
  });
}

function setCurrentChat(chatId) {
  currentChatId = chatId;
}

async function sendMsg() {
  const time = new Date().toDateString();
  const message = {
    chatId: currentChatId,
    time: time,
    text: messageInput.value,
    userEmail: currentUser.email,
    userName: currentUser.fullName,
  };
  await setDoc(doc(collection(db, "messages")), message);
}

function renderMessage(message) {
  if (message.userEmail === currentUser.email) {
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
      ${message.text}
      </p>
      <span class="time">${message.time}</span>
      </div>
      </div>`;
    msgPage.appendChild(msg);
  }
  msgPage.scrollTo(0, msgPage.scrollHeight);
}

export let messagesSnapshot;
async function getMessages(chatId) {
  if (messagesSnapshot) messagesSnapshot();
  msgPage.innerHTML = "";
  try {
    const q = query(msgRef, where("chatId", "==", chatId));
    messagesSnapshot = onSnapshot(q, (snapshot) => {
      snapshot.forEach((message) => console.log(message));
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New Message: ", change.doc.data());
          renderMessage(change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

sendMsgButton.addEventListener("click", sendMsg);

newChatLink.addEventListener("click", () => {
  newChatInput.setAttribute("type", "email");
  newChatInput.setAttribute("name", "startNewChat");
  newChatInput.setAttribute("placeholder", "Enter Someone's Email");
  newChatInput.focus();
});

newGroupLink.addEventListener("click", () => {
  newChatInput.setAttribute("type", "text");
  newChatInput.setAttribute("name", "startNewGroup");
  newChatInput.setAttribute("placeholder", "Enter Group's Name");
  newChatInput.focus();
});

inviteLink.addEventListener("click", () => {
  newChatInput.setAttribute("type", "email");
  newChatInput.setAttribute("name", "inviteToGroup");
  newChatInput.setAttribute("placeholder", "Invite Someone");
  newChatInput.focus();
});

newChatButton.addEventListener("click", () => {
  handleMenuButton(newChatInput.value, newChatInput.name);
});
