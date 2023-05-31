import { db } from "./firebase-config.js";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  orderBy,
  Timestamp,
  onSnapshot,
  query,
  where,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
const sideBar = document.querySelector(".sidebar");
const sendMsgButton = document.querySelector(".send-icon");
const messageInput = document.querySelector("#msg-input");
const msgPage = document.querySelector(".msg-page");
const chatsList = document.querySelector("#chats-list");
const newChatLink = document.querySelector("#new-chat-link");
const newGroupLink = document.querySelector("#new-group-link");
const inviteButton = document.querySelector("#invite-button");
const newChatInput = document.querySelector("#new-chat-input");
const newChatInputBox = document.querySelector("#new-chat-input-box");
const menuInputButton = document.querySelector("#menu-input-button");
const usersHeader = document.querySelector(".container1");
const container = document.querySelector(".container");
const loader = document.createElement("div");
loader.classList.add("loader");

const usersRef = collection(db, "users");
const chatsRef = collection(db, "chats");
const msgRef = collection(db, "messages");
// let currentChatUsers = [];

export let chatsSnapshot;
let currentChat;
export let currentUser;
if (localStorage.getItem("uid"))
  await setCurrentUser(localStorage.getItem("uid"));
console.log(currentUser);

export async function setCurrentUser() {
  try {
    const uid = localStorage.getItem("uid");
    const userInfo = await getDoc(doc(db, "users", uid));
    const user = userInfo.data();
    getChats(user.email);
    user.uid = uid;
    currentUser = user;
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
      img: `https://mdbcdn.b-cdn.net/img/new/avatars/${Math.round(
        Math.random() * 10
      )}.webp`,
    });
  } catch (err) {
    console.log(err);
  }
}

async function getUsers(field, operator, value) {
  const users = [];
  const q = query(usersRef, where(field, operator, value));
  const querySnapshot = await getDocs(q);
  await querySnapshot.forEach((user) => {
    users.push(user.data());
  });
  return users;
}

function handleMenuButton(input, callback) {
  newChatInput.value = "";
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
      console.log("handleMenuButton-default");
  }
}

async function startNewChat(email) {
  console.log(email);
  try {
    const otherUser = await getUsers("email", "==", email);
    const chat = {
      name: "",
      isGroup: false,
      usersEmails: [currentUser.email, otherUser[0].email],
      users: [currentUser, otherUser[0]],
      lastMessage: {
        chatId: null,
        time: null,
        text: null,
        userEmail: null,
        userName: null,
      },
    };
    await addDoc(collection(db, "chats"), chat);
  } catch (err) {
    console.log(err);
  }
}

async function startNewGroup(name) {
  try {
    const chat = {
      name: name.trim(),
      isGroup: true,
      usersEmails: [currentUser.email],
      users: [currentUser],
      lastMessage: {
        chatId: null,
        time: null,
        text: null,
        userEmail: null,
        userName: null,
      },
    };
    await addDoc(collection(db, "chats"), chat);
  } catch (err) {
    console.log(err);
  }
}

async function inviteToGroup(email) {
  const invitedUser = await getUsers("email", "==", email);
  await updateDoc(doc(db, "chats", currentChat.id), {
    users: arrayUnion(invitedUser[0]),
    usersEmails: arrayUnion(invitedUser[0].email),
  });
  currentChat.users.push(invitedUser[0]);
  loadChatUsers(currentChat.users);
}

async function prepareAndRenderChat(chat) {
  console.log(chat.isGroup);
  if (chat.isGroup) {
    chat.img = "../src/images/groups_FILL0_wght400_GRAD0_opsz48.svg";
  } else {
    //chat.name != "" means its a group
    const otherUser = chat.users.filter(
      (user) => user.email !== currentUser.email
    );
    // const otherUser = await getUsers("email", "==", otherUserEmail[0]);
    chat.name = otherUser[0].fullName;
    chat.img = otherUser[0].img;
  }
  renderChat(chat);
}

export async function getChats(userEmail) {
  chatsList.appendChild(loader);
  if (chatsSnapshot) chatsSnapshot(); //detaches last snapshot
  const q = query(
    chatsRef,
    where("usersEmails", "array-contains", userEmail),
    orderBy("lastMessage.time", "asc")
  );
  chatsList.removeChild(loader);
  chatsSnapshot = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      const chat = change.doc.data();
      chat.id = change.doc.id;
      if (change.type === "added") {
        prepareAndRenderChat(chat);
      }
      if (change.type === "modified") {
        const element = document.querySelector(`#CUID${chat.id}`);
        loadChatUsers(chat.users);
        chatsList.removeChild(element);
        prepareAndRenderChat(chat);
      }
      if (change.type === "removed") {
        const element = document.querySelector(`#CUID${chat.id}`);
        loadChatUsers(chat.users);
        chatsList.removeChild(element);
      }
    });
  });
}
async function loadChatUsers(chatUsers) {
  if (currentChat.isGroup) {
    inviteButton.classList.remove("hidden");
  } else {
    inviteButton.classList.add("hidden");
  }
  usersHeader.innerHTML = "";
  chatUsers.forEach((user) => {
    const groupMember = document.createElement("img");
    groupMember.src = user.img;
    groupMember.classNames = "msgimg";
    usersHeader.appendChild(groupMember);
  });
}

async function sendMsg() {
  const date = new Date();
  const time = Timestamp.fromDate(date);
  const message = {
    chatId: currentChat.id,
    time: time,
    text: messageInput.value,
    userEmail: currentUser.email,
    userName: currentUser.fullName,
    userImgUrl: currentUser.img,
  };
  messageInput.value = "";
  const chatRef = await doc(db, "chats", currentChat.id);
  await setDoc(doc(collection(db, "messages")), message);
  await updateDoc(chatRef, { lastMessage: message });
  setTimeout(() => generateRandomReplay(), 2000);
}

async function generateRandomReplay() {
  const otherUsers = currentChat.users.filter(
    (user) => user.email !== currentUser.email
  );
  const randomIndex = Math.floor(Math.random() * otherUsers.length);
  const randomUser = otherUsers[randomIndex > 0 ? randomIndex : 0];
  const usersInfoList = await getUsers("email", "==", randomUser.email);
  const otherUser = usersInfoList[0];
  const messageTextData = await fetch(
    "https://official-joke-api.appspot.com/random_joke"
  );
  const messageText = await messageTextData.json();
  const date = new Date();
  const time = Timestamp.fromDate(date);
  const message = {
    chatId: currentChat.id,
    time: "",
    text: "",
    userEmail: otherUser.email,
    userName: otherUser.fullName,
    userImgUrl: otherUser.img,
  };
  message.time = time;
  message.text = messageText.setup;
  const chatRef = await doc(db, "chats", currentChat.id);
  await setDoc(doc(collection(db, "messages")), message);
  await updateDoc(chatRef, { lastMessage: message });
  setTimeout(async () => {
    const date = new Date();
    const time = Timestamp.fromDate(date);
    message.time = time;
    message.text = messageText.punchline;
    await setDoc(doc(collection(db, "messages")), message);
    await updateDoc(chatRef, { lastMessage: message });
  }, 5000);
  clearTimeout();
}

function renderMessage(message) {
  //outgoing messages
  if (message.userEmail === currentUser.email) {
    const msg = document.createElement("div");
    msg.className = "outgoing-chats";
    msg.setAttribute("id", message.id);
    msg.innerHTML = `<div class="outgoing-chats-img">
          <img src=${message.userImgUrl} />
          </div>
          <div class="outgoing-msg">
          <div class="outgoing-chats-msg">
          <p class="multi-msg">
          ${message.text}
          </p>
          <span class="time">${new Date(message.time.toDate())}</span>
          </div>
          </div>`;
    msgPage.appendChild(msg);
  } else {
    //received messages
    const msg = document.createElement("div");
    msg.className = "received-chats";
    msg.setAttribute("id", message.id);
    msg.innerHTML = `<div class="received-chats-img">
    <img src="${message.userImgUrl}" />
    </div>
      <div class="received-msg">
      <div class="received-msg-inbox">
      <p class="single-msg">
      ${message.text}
      </p>
      <span class="time">${new Date(message.time.toDate())}</span>
      </div>
      </div>`;
    msgPage.appendChild(msg);
  }
  msgPage.scrollTo(0, msgPage.scrollHeight);
}

function renderChat(chat) {
  const time = chat.lastMessage.time
    ? chat.lastMessage.time.toDate().toDateString()
    : "";
  const chatBox = document.createElement("div");
  chatBox.className = "menu-chat-box";
  chatBox.setAttribute("id", `CUID${chat.id}`);
  chatBox.innerHTML = `  <div class="menu-chat-box-img">
  <img src="${chat.img}" >
</div>
<div>
  <div>
    <span class="menu-chat-box-title">${chat.name}</span>
    <span class="menu-chat-box-time">${time}</span>
  </div>
  <p class="menu-chat-box-msg">${
    chat.lastMessage.text ? chat.lastMessage.text : "No messages yet"
  }</p>
</div>`;
  chatBox.addEventListener("click", () => {
    currentChat = chat;
    loadChatUsers(chat.users);
    msgPage.innerHTML = "";
    getMessages(chat);
    container.classList.remove("hidden");
  });
  chatsList.appendChild(chatBox);
}

export let messagesSnapshot;

async function getMessages(chat) {
  if (messagesSnapshot) messagesSnapshot();
  msgPage.appendChild(loader);
  try {
    const q = query(
      msgRef,
      where("chatId", "==", chat.id),
      orderBy("time", "asc")
    );
    msgPage.removeChild(loader);
    messagesSnapshot = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const message = change.doc.data();
        message.id = change.doc.id;
        renderMessage(message);
        if (change.type === "added") {
          //
        }
        if (change.type === "modified") {
          const element = document.querySelector(`#${message.id}`);
          msgPage.removeChild(element);
          renderMessage(message);
        }
        if (change.type === "removed") {
          msgPage.removeChild(element);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

function setMenuInput(type, name, placeholder){
  newChatInput.setAttribute("type", type);
  newChatInput.setAttribute("name", name);
  newChatInput.setAttribute("placeholder", placeholder);
  newChatInputBox.classList.toggle("hidden", false);
  newChatInput.focus();
}

sideBar.addEventListener("mouseout", () => {
  sideBar.classList.remove("open-sidebar");
});

sendMsgButton.addEventListener("click", sendMsg);

messageInput.addEventListener("keyup", (e) => e.key === "Enter" && sendMsg());

newChatLink.addEventListener("click", () => {
  setMenuInput("email", "startNewChat", "Enter Someone's Email")
});

newGroupLink.addEventListener("click", () => {
  setMenuInput("text", "startNewGroup", "Enter Group's Name")
});

inviteButton.addEventListener("click", () => {
  setMenuInput("email", "inviteToGroup", "Invite with Email")
  sideBar.classList.add("open-sidebar");

});

menuInputButton.addEventListener("click", () => {
  handleMenuButton(newChatInput.value, newChatInput.name);
});

newChatInput.addEventListener(
  "keyup",
  (e) =>
    e.key === "Enter" && handleMenuButton(newChatInput.value, newChatInput.name)
);
