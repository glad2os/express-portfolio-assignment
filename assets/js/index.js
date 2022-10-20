import navMenu from "./navmenu";
import hideHeaderAndFooter from "./services";
import formData from "./formdata";
import login from "./api/login";
import fillTable from './api/business';

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
            break;
        case "business":
            fillTable();
            break;
    }
}

const init = () => {
    navMenu();
    perform(window.location.pathname.split('/').join(''));
};

init();

