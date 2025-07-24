document.addEventListener("DOMContentLoaded", () => {
  const auth = document.querySelector(".auth");

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const isLoggedIn = users.length > 0;

  if (isLoggedIn) {
    auth.innerHTML = `
      <div class="user-box">
        <img src="/assets/img/ava.svg" alt="User" class="user-avatar" />
        <div class="menu-logout">
          <button class="btn-logout">Keluar</button>
        </div>
      </div>
    `;

    const avatar = auth.querySelector(".user-avatar");
    const menu = auth.querySelector(".menu-logout");

    avatar.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    auth.querySelector(".btn-logout").addEventListener("click", () => {
      localStorage.removeItem("users");
      alert("Logout berhasil");
      location.reload();
    });

    document.addEventListener("click", (e) => {
      if (!auth.contains(e.target)) {
        menu.classList.remove("show");
      }
    });
  } else {
    auth.innerHTML = `
      <button class="sign-in" onclick="location='/pages/sign-in.html'">Sign In</button>
      <button class="sign-up" onclick="location='/pages/sign-up.html'">Sign Up</button>
    `;
  }
});

//
