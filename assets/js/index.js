import navMenu from "./navmenu";
import hideHeaderAndFooter from "./services";
import formData from "./formdata";
import login from "./api/login";

function perform(SITE_NAME) {

    switch (SITE_NAME) {
        case 'services':
            hideHeaderAndFooter();
            break;
        case "contact":
            formData();
            break;
        case "login":
            login();
    }
}

const init = () => {
    navMenu();
    perform(window.location.pathname.split('/').join(''));
};

init();

