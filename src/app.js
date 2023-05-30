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
const newChatButton = document.querySelector("#new-chat-button");
const usersHeader = document.querySelector(".container1");
const container = document.querySelector(".container");
const loader = document.createElement("div");
loader.classList.add("loader");

const usersRef = collection(db, "users");
const chatsRef = collection(db, "chats");
const msgRef = collection(db, "messages");
let currentChatUsers = [];

export let chatsSnapshot;
let currentChatId;
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
      img: `https://mdbcdn.b-cdn.net/img/new/avatars/${Math.round(Math.random() * 10)}.webp`,
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
    users.push(user);
  });
  return users;
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
      console.log("handleMenuButton-default");
  }
}

async function startNewChat(email) {
  //ADD EMAIL ALREADY IN CHATS LIST CHECK
  try {
    const chat = {
      name: "",
      users: [currentUser.email, email],
      lastMessage: {
        chatId: null,
        time: null,
        text: null,
        userEmail: null,
        userName: null,
      },
    };
    const docRef = await addDoc(collection(db, "chats"), chat);
    // await updateDoc(doc(db, "users", currentUser.uid), {
    //   chats: arrayUnion(docRef.uid),
    // });
  } catch (err) {
    console.log(err);
  }
}

async function startNewGroup(name) {
  try {
    const chat = {
      name: name,
      users: [currentUser.email],
      lastMessage: {
        chatId: null,
        time: null,
        text: null,
        userEmail: null,
        userName: null,
      },
    };
    const docRef = await addDoc(collection(db, "chats"), chat);
    
  } catch (err) {
    console.log(err);
  }
}

async function inviteToGroup(email) {
  //ADD USER NOT FOUND CHECK
  await updateDoc(doc(db, "chats", currentChatId), {
    users: arrayUnion(email),
  });
}

async function prepareAndRenderChat(chat) {
  if (chat.name === "") {
    //chat.name != "" means its a group
    const otherUserEmail = chat.users.filter(
      (user) => user !== currentUser.email
    );
    const otherUser = await getUsers("email", "==", otherUserEmail[0]);
    chat.name = otherUser[0].data().fullName;
    chat.img = otherUser[0].data().img;
  } else{
    chat.img = "../src/images/groups_FILL0_wght400_GRAD0_opsz48.svg"
  }
  renderChat(chat);
}

export async function getChats(userEmail) {
  chatsList.appendChild(loader);
  if (chatsSnapshot) chatsSnapshot(); //detaches last snapshot
  const q = query(
    chatsRef,
    where("users", "array-contains", userEmail),
    orderBy("lastMessage.time", "asc")
  );
  chatsList.removeChild(loader);
  chatsSnapshot = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      const chat = change.doc.data();
      chat.id = change.doc.id;
      if (change.type === "added") {
        console.log("New Chat: ", change.doc.data());
        prepareAndRenderChat(chat);
      }
      if (change.type === "modified") {
        console.log("Modified chat: ", change.doc.data());
        const element = document.querySelector(`#${chat.id}`);
        loadChatUsers(chat.id);
        chatsList.removeChild(element);
        prepareAndRenderChat(chat);
      }
      if (change.type === "removed") {
        console.log("Removed chat: ", change.doc.data());
        const element = document.querySelector(`#${chat.id}`);
        loadChatUsers(chat.id);
        chatsList.removeChild(element);
      }
    });
  });
}

async function loadChatUsers(chatId) {
  usersHeader.innerHTML = "";
  const chat = await getDoc(doc(db, "chats", chatId));
  if(chat.data().name !== "") {
    inviteButton.classList.remove("hidden");
  } else {
    inviteButton.classList.add("hidden");
  }
  const q = query(usersRef, where("email", "in", chat.data().users));
  const membersSnapshot = await getDocs(q);
  membersSnapshot.forEach((doc) => {
    const groupMember = document.createElement("img");
    groupMember.src = doc.data().img;
    groupMember.classNames = "msgimg";
    usersHeader.appendChild(groupMember);
  });
}

async function sendMsg() {
  const date = new Date();
  const time = Timestamp.fromDate(date);
  const message = {
    chatId: currentChatId,
    time: time,
    text: messageInput.value,
    userEmail: currentUser.email,
    userName: currentUser.fullName,
    userImgUrl: currentUser.img,
  };
  messageInput.value = "";
  const chatRef = await doc(db, "chats", currentChatId);
  await setDoc(doc(collection(db, "messages")), message);
  await updateDoc(chatRef, { lastMessage: message });
  setTimeout(() => generateRandomReplay(), 2000);
}

async function generateRandomReplay(){
  const otherUsersEmails = currentChatUsers.filter(user => user !== currentUser.email);
  const randomIndex = Math.floor(Math.random() * otherUsersEmails.length);
  const randomUserEmail = otherUsersEmails[randomIndex];
  const usersInfoList = await getUsers("email", "==", randomUserEmail);
  const otherUser = usersInfoList[0].data();
  const messageTextData = await fetch("https://official-joke-api.appspot.com/random_joke");
  const messageText = await messageTextData.json();
  let date = new Date();
  let time = Timestamp.fromDate(date);
  const message = {
    chatId: currentChatId,
    time: "",
    text: "",
    userEmail: otherUser.email,
    userName: otherUser.fullName,
    userImgUrl: otherUser.img,
  };
  message.time = time;
  message.text = messageText.setup;
  const chatRef = await doc(db, "chats", currentChatId);
  await setDoc(doc(collection(db, "messages")), message);
  await updateDoc(chatRef, { lastMessage: message });
  setTimeout(async () => {
     date = new Date();
     time = Timestamp.fromDate(date);
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
  chatBox.setAttribute("id", chat.id);
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
    currentChatId = chat.id;
    currentChatUsers = chat.users
    loadChatUsers(chat.id);
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

sideBar.addEventListener("mouseout", ()=>{
  sideBar.classList.remove("open-sidebar");
})

sendMsgButton.addEventListener("click", sendMsg);
messageInput.addEventListener("keyup", (e) => e.key === "Enter" && sendMsg());

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

inviteButton.addEventListener("click", () => {
  newChatInput.setAttribute("type", "email");
  newChatInput.setAttribute("name", "inviteToGroup");
  newChatInput.setAttribute("placeholder", "Invite with Email");
  newChatInput.focus();
  sideBar.classList.add("open-sidebar");
});

newChatButton.addEventListener("click", () => {
  handleMenuButton(newChatInput.value, newChatInput.name);
});
