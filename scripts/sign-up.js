const form = document.querySelector("form");
const email = form.querySelector("#email");
const password = form.querySelector("#pwd");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = email.value;
  const passwordValue = password.value;

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwdRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&><])(?=.{8,})/;

  if (!emailValue || !passwordValue) {
    alert("Email dan password tidak boleh kosong");
    return;
  }

  if (!emailRe.test(emailValue)) {
    alert("Email tidak valid");
    return;
  }

  if (!pwdRe.test(passwordValue)) {
    alert(
      "Password harus mengandung huruf besar, huruf kecil, simbol, dan minimal 8 karakter"
    );
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ email: emailValue, password: passwordValue });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Register berhasil, silakan login");
  window.location.href = "../index.html";
});

//
