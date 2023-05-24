import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { auth, googleProvider } from "./firebase-config.js";

const backdrop = document.getElementById("backdrop");
const modal = document.getElementById("modal");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const modalButton = document.getElementById("modal-button");
export let currentUser = localStorage.getItem("uid") || null;
const formType = document.querySelector("h1");
const changeFormLink = document.querySelector("a");
const googleButton = document.querySelector("#google-button");
const logOutButton = document.querySelector("#log-out-button");

const handleModalClick = async () => {
  try {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (formType.innerText === "Sign Up") {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      currentUser = userCredentials.user;
      localStorage.setItem("uid", currentUser.uid);
      toggleModal();
    } else if (formType.innerText === "Log In") {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      currentUser = userCredentials.user;
      localStorage.setItem("uid", currentUser.uid);
      toggleModal();
    }
  } catch (err) {
    console.log(err.code, err.message);
  }
};

async function signInWithGoogle() {
  try {
    const userCredentials = await signInWithPopup(auth, googleProvider);
    currentUser = userCredentials.user;
    localStorage.setItem("uid", currentUser.uid);
    toggleModal();
  } catch (err) {
    console.log(err.code, err.message);
  }
}

async function logOut() {
  try {
    await signOut(auth);
    localStorage.removeItem("uid");
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
  formType.innerText = formType.innerText === "Sign Up" ? "Log In" : "Sign Up";
  changeFormLink.innerText =
    changeFormLink.innerText === "Sign Up" ? "Log In" : "Sign Up";
};

changeFormLink.addEventListener("click", handleChangeForm);

if (!currentUser) toggleModal();
