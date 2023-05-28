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
const usersHeader = document.querySelector(".container1");
const container = document.querySelector(".container");
const chatHeader = document.querySelector("#chat-with");

const usersRef = collection(db, "users");
const chatsRef = collection(db, "chats");
const msgRef = collection(db, "messages");

export let chatsSnapshot;
let currentChatId;
export var currentUser;
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
    user.img = user.img;
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
      img: "",
    });
  } catch (err) {
    console.log(err);
  }
}

async function getUsers(field, operator, value) {
  const users = [];
  // field = "email";
  //  operator = "==";
  // value = "b@b.com";
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
  // const userInfo = await query(usersRef, where("email", "==", email));
  //ADD USER NOT FOUND CHECK
  await updateDoc(doc(db, "chats", currentChatId), {
    users: arrayUnion(email),
  });
}

export async function getChats(currentUserEmail) {
  if (chatsSnapshot) chatsSnapshot(); //detaches last snapshot
  const q = query(
    chatsRef,
    where("users", "array-contains", currentUserEmail),
    orderBy("lastMessage.time", "asc")
  );
  chatsSnapshot = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      const chat = change.doc.data();
      chat.id = change.doc.id;
      if (chat.name === "") {
        //chat.name != "" means its a group
        const otherUserEmail = chat.users.filter(
          (user) => user !== currentUser.email
        );
        const otherUser = await getUsers("email", "==", otherUserEmail[0]);
        chat.name = otherUser[0].data().fullName;
        chat.img = otherUser[0].data().img;
      }
      if (change.type === "added") {
        console.log("New Chat: ", change.doc.data());
        renderChat(chat);
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

async function setCurrentChat(chatId) {
  usersHeader.innerHTML = "";
  currentChatId = chatId;
  const chat = await getDoc(doc(db, "chats", chatId));
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
  await setDoc(doc(collection(db, "messages")), message);
  const chatRef = await doc(db, "chats", currentChatId);
  await updateDoc(chatRef, { lastMessage: message });
  messageInput.value = "";
}

function renderMessage(message) {
  //outgoing messages
  if (message.userEmail === currentUser.email) {
    const msg = document.createElement("div");
    msg.className = "outgoing-chats";
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
    setCurrentChat(chat.id);
    msgPage.innerHTML = "";
    getMessages(chat.id);
    container.classList.remove("hidden");
  });
  chatsBar.appendChild(chatBox);
}

export let messagesSnapshot;

async function getMessages(chatId) {
  if (messagesSnapshot) messagesSnapshot();
  msgPage.innerHTML = `<div class="loader"></div>`;
  try {
    const q = query(
      msgRef,
      where("chatId", "==", chatId),
      orderBy("time", "asc")
    );
    messagesSnapshot = onSnapshot(q, (snapshot) => {
      msgPage.innerHTML = "";
      snapshot.docChanges().forEach(async (change) => {
        const message = change.doc.data();
        renderMessage(message);
        if (change.type === "added") {
          console.log("New Message: ", change.doc.data());
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

inviteLink.addEventListener("click", () => {
  newChatInput.setAttribute("type", "email");
  newChatInput.setAttribute("name", "inviteToGroup");
  newChatInput.setAttribute("placeholder", "Invite Someone");
  newChatInput.focus();
});

newChatButton.addEventListener("click", () => {
  handleMenuButton(newChatInput.value, newChatInput.name);
});
