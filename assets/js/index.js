import navMenu from "./navmenu";
import perform from "./perform";

const init = () => {
    navMenu();
    perform(window.location.pathname.split('/').join(''));
};

init();

