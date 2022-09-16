import slider from "./slider";

export default function navMenu() {
    const navMenuElements = Array.from(document.querySelectorAll('header>.button>p'));

    navMenuElements.forEach(el => {
        let redirectPath = el.innerText.split(" ")[0].toLowerCase();
        if (redirectPath === "home") redirectPath = "/";

        el.parentNode.onclick = () => window.location.href = redirectPath;
    });

    if (document.querySelector('body').classList.contains("home")) {
        let currentNav = navMenuElements.find(el => el.innerText = "Home page");
        if (currentNav) {
            currentNav.parentNode.classList.add("active");
            slider();
        }
    }
}