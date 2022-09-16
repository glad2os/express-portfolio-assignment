import slider from "./slider";

const navMenu = Array.from(document.querySelectorAll('header>.button>p'));
if (document.querySelector('body').classList.contains("home")) {
    let currentNav = navMenu.find(el => el.innerText = "Home page");
    if (currentNav){
        currentNav.parentNode.classList.add("active");
        slider();
    }

}

