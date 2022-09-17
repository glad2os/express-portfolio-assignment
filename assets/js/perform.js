import hideHeaderAndFooter from "./services";

export default function perform(SITE_NAME) {

    switch (SITE_NAME) {
        case 'services':
            hideHeaderAndFooter();
            break;
        default:
            break;
    }
}