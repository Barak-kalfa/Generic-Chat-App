import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { auth, googleProvider } from "./firebase-config.js";
import { createUser, chatsSnapshot, messagesSnapshot, setCurrentUser, getChats, currentUser } from "./app.js";

const backdrop = document.getElementById("backdrop");
const modal = document.getElementById("modal");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const modalButton = document.getElementById("modal-button");
const formType = document.querySelector("h1");
const changeFormLink = document.querySelector("a");
const googleButton = document.querySelector("#google-button");
const logOutButton = document.querySelector("#log-out-button");
const msgPage = document.querySelector(".msg-page");

async function handleModalClick() {
  try {
    let userCredentials;
    if (formType.innerText === "Sign Up") {
      userCredentials = await createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );
      const user = userCredentials.user;
      createUser(nameInput.value, user.email, user.uid);
      localStorage.setItem("uid", user.uid);
      setCurrentUser(user.uid)
      toggleModal();
    } else if (formType.innerText === "Login") {
      userCredentials = await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );
      const user = userCredentials.user;
      localStorage.setItem("uid", user.uid);
      setCurrentUser(user.uid)
      getChats(user.email)
      toggleModal();
    }
  } catch (err) {
    console.log(err.code, err.message);
  }
}

async function signInWithGoogle() {
  try {
    const userCredentials = await signInWithPopup(auth, googleProvider);
    user = userCredentials.user;
    localStorage.setItem("uid", user.uid);
    toggleModal();
  } catch (err) {
    console.log(err.code, err.message);
  }
}

async function logOut() {
  try {
    await signOut(auth);
    chatsSnapshot && chatsSnapshot();
    messagesSnapshot && messagesSnapshot();
    localStorage.removeItem("uid");
    location.reload()
    toggleModal();
  } catch (err) {
    console.log(err.code, err.message);
  }
}

logOutButton.addEventListener("click", logOut);
googleButton.addEventListener("click", signInWithGoogle);
modalButton.addEventListener("click", handleModalClick);

const toggleModal = () => {
  backdrop.classList.toggle("visible");
  modal.classList.toggle("visible");
};

const handleChangeForm = () => {
  const nameInput = document.getElementById("name-input-box");
  if (formType.innerText === "Sign Up") {
    formType.innerText = "Login";
    modalButton.innerText = "Login";
    changeFormLink.innerText = "Sign Up";
    nameInput.classList.toggle("hidden");
  } else {
    formType.innerText = "Sign Up";
    modalButton.innerText = "Sign Up";
    changeFormLink.innerText = "Login";
    nameInput.classList.toggle("hidden");
  }
};

changeFormLink.addEventListener("click", handleChangeForm);

if (!localStorage.getItem("uid")) toggleModal();
