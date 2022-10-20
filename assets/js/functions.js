async function postData(url = '', data = {}) {
    return await fetch(`/api${url}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
}

const error = document.querySelector('.error');

if (error) {
    error.querySelector('.close-btn').onclick = (self) => {
        self.target.parentNode.parentNode.style.display = "none";
    }
}

export {
    postData
}