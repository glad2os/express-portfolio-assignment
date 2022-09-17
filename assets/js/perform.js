import hideHeaderAndFooter from "./services";
import formData from "./formdata";

export default function perform(SITE_NAME) {

    switch (SITE_NAME) {
        case 'services':
            hideHeaderAndFooter();
            break;
        case "contact":
            formData();
            break;
        default:
            break;
    }
}