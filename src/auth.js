import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

const backdrop = document.getElementById("backdrop");
const modal = document.getElementById("modal");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const modalButton = document.getElementById("modal-button");
const currentUser = localStorage.getItem("uid") || null;
const formType = document.querySelector("h1");
const changeFormLink = document.querySelector("a");

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
      const user = userCredentials.user;
      localStorage.setItem("uid", user.uid);
      toggleModal();
    } else if (formType.innerText === "Log In") {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      localStorage.setItem("uid", user.uid);
      toggleModal();
    }
  } catch (err) {
    console.log(err.code, err.message);
  }
};

modalButton.addEventListener("click", handleModalClick);

const toggleModal = () => {
  backdrop.classList.toggle("visible");
  modal.classList.toggle("visible");
};

const handleChangeForm = () => {
  formType.innerText = formType.innerText === "Sign Up" ? "Log In" : "Sign Up";
  changeFormLink.innerText = changeFormLink.innerText === "Sign Up" ? "Log In" : "Sign Up";
};

changeFormLink.addEventListener("click", handleChangeForm);

if (!currentUser) toggleModal();
