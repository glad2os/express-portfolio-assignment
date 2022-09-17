export default function formData() {
    const form = document.querySelector('.message-form');
    const error = document.querySelector('.error');

    if (!form) return;

    if (error) {
        error.querySelector('.close-btn').onclick = (self) => {
            self.target.parentNode.parentNode.style.display = "none";
        }
    }

    /**
     * please never do that))
     */
    const firstName = document.querySelectorAll("input")[0];
    const lastName = document.querySelectorAll("input")[1];
    const contactNumber = document.querySelectorAll("input")[2];
    const email = document.querySelectorAll("input")[3];
    const message = document.querySelector("textarea");

    const submit = document.querySelector(".message-form .button");

    submit.onclick = () => {
        if (firstName.value.length < 4 || lastName.value.length < 4 || contactNumber.value.length < 4 || email.value.length < 4 || lastName.value.length < 4 || message.value.length < 4) {
            if (error) {
                error.style.display = "flex";
                error.querySelector('p').innerText = "Please field the fields";
            }
        } else {
            error.style.display = "flex";
            error.querySelector('p').innerText = "Done!";
            setTimeout(() => {
                window.location.href = "/";
            }, 900)
        }
    }
}