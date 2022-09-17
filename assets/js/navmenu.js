import slider from "./slider";

export default function navMenu() {
    const navMenuElements = Array.from(document.querySelectorAll('header>.button>p'));

    navMenuElements.forEach(el => {
        let redirectPath = el.innerText.split(" ")[0].toLowerCase();

        if (redirectPath === document.querySelector('body').classList[0])
            el.parentNode.classList.add("active");

        if (redirectPath === "home") redirectPath = "/";

        el.parentNode.onclick = () => window.location.href = redirectPath;
    });

    if (document.querySelector('body').classList.contains("home")) {
        slider();
    }
}