export default function hideHeaderAndFooter() {
    let header = document.querySelector('body.services>header');
    let footer = document.querySelector('body.services>footer');
    window.addEventListener('load', () => {

        let hideElems = new Promise((resolve, reject) => {
            setTimeout(() => {
                header.classList.add("hide");
                footer.classList.add("hide");
            }, 250);
            resolve("done");
        }).then((value) => {
            setTimeout(() => {
                header.style.display = "none";
                footer.style.display = "none";
            }, 500);
        });
    });

}