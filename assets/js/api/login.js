import {postData} from "../functions";

const error = document.querySelector('.error');
let labelStatement = document.getElementById('labelStatement');
let loginStatement = 'signin';

export default function login() {
    let submitButton = document.querySelector('.form .button');
    let infoButton = document.querySelector('.info');

    infoButton.addEventListener('click', () => {
        if (loginStatement === "signin") {
            loginStatement = "signup";
            submitButton.innerText = "Sign up";
            labelStatement.innerText = "Sign up";
            infoButton.innerText = 'Login in at existed account?';
        } else if (loginStatement === "signup") {
            loginStatement = "signin";
            submitButton.innerText = "Sign in";
            labelStatement.innerText = "Sign in";
            infoButton.innerText = 'Create an account?';
        }
    });

    submitButton.addEventListener('click', () => {
        let data = {
            login: "", password: "",
        };

        data.login = document.getElementById('login').value;
        data.password = document.getElementById('password').value;

        if (loginStatement === 'signin') {
            postData('/users/getuser', data).then(r => r.json()).then(r => {
                if (r.length !== 0) {
                    return r;
                } else {
                    throw 'Account can not be found!'
                }
            }).then(r => {
                console.log(r);
            }).catch(ex => {
                error.style.display = "flex";
                error.querySelector('p').innerText = ex
            })
        } else if (loginStatement === 'signup') {
            postData('/users/reguser', data).then(r => {
                if (r.status === 200) {
                    console.log("done");
                } else if (r.status === 400) {
                    throw 'Account can not be created!';
                }
            }).catch(ex => {
                error.style.display = "flex";
                error.querySelector('p').innerText = ex;
            });
        }
    });
}