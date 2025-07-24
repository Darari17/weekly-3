const form = document.querySelector("form");
const email = form.querySelector("#email");
const password = form.querySelector("#pwd");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = email.value;
  const passwordValue = password.value;

  if (!emailValue || !passwordValue) {
    alert("Email dan password wajib diisi");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.email === emailValue && user.password === passwordValue
  );

  if (!foundUser) {
    alert("Email atau password salah");
    return;
  }

  alert("Login berhasil");
  window.location.href = "../index.html";
});
