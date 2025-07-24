document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const auth = document.querySelector(".auth");

  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    auth.classList.toggle("active");
  });
});

//
