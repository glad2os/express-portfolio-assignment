import {postData} from "../functions";

export default function fillTable() {

    const table = document.querySelector('table');

    function clearTableAndGetAll() {
        table.innerHTML = `
        <table>
    <tr>
        <th>Name</th>
        <th>Number</th>
        <th>Email</th>
        <th>Settings</th>
    </tr>
    <tr>
        <td class="plus" contenteditable="true"></td>
        <td class="plus" contenteditable="true"></td>
        <td class="plus" contenteditable="true"></td>
        <td class="settings">
            <div id="addContact" class="update unlock">ADD NEW ONE</div>
        </td>
    </tr>
</table>`;
        const addButton = document.getElementById('addContact');
        addButton.onclick = () => {
            const newContactTable = document.querySelectorAll('table tr')[1].children;
            const name = newContactTable[0].innerText;
            const number = newContactTable[0].innerText;
            const email = newContactTable[0].innerText;

            postData('/contacts/add', {
                "name": name, "number": number, "email": email
            }).then(r => r.json()).then(r => {
                if (r.modifiedCount >= 1) {
                    clearTableAndGetAll();
                }
            });
        }


        postData('/contacts/getall', {}).then(r => r.json()).then(r => {
            if (r.length !== 0) {
                let counter = 2;

                r.forEach(item => {
                    let htmlTableRowElement = table.insertRow(counter);

                    let tdName = htmlTableRowElement.insertCell(0);
                    let tdNumber = htmlTableRowElement.insertCell(1);
                    let tdEmail = htmlTableRowElement.insertCell(2);
                    let tdSettings = htmlTableRowElement.insertCell(3);

                    tdName.innerText = item.name;
                    tdName.setAttribute('contenteditable', 'true');

                    tdNumber.innerText = item.number;
                    tdNumber.setAttribute('contenteditable', 'true');

                    tdEmail.innerText = item.email;
                    tdEmail.setAttribute('contenteditable', 'true');

                    tdSettings.classList.add("settings")
                    let updateContact = document.createElement('div');
                    updateContact.classList.add("update", "unlock");
                    updateContact.innerText = "Update";

                    updateContact.onclick = (self) => {
                        if (!self.target.classList.contains("lock")) {
                            const elements = self.target.parentNode.parentNode.querySelectorAll('td');
                            let name = elements[0].innerText;
                            let number = elements[1].innerText;
                            let email = elements[2].innerText;

                            const contactDAO = {
                                "_id": item._id,
                                "name": name,
                                "email": number,
                                "number": email
                            }

                            postData('/contacts/update', contactDAO).then(r => r.json()).then(r => {
                                if (r.modifiedCount >= 1) {
                                    self.target.classList.remove('unlock');
                                    self.target.classList.add('lock');
                                    self.target.innerText = "Updated";
                                } else {
                                    console.log(r);
                                }
                            });
                        }
                    }

                    let removeContact = document.createElement('div');
                    removeContact.classList.add("remove");
                    removeContact.innerText = "Remove";

                    removeContact.onclick = (self) => {

                        postData('/contacts/remove', {
                            "_id": item._id
                        }).then(r => r.json()).then(r => {
                            if (r.modifiedCount >= 1) {
                                const tr = self.target.parentNode.parentNode;
                                tr.remove();
                            } else {
                                console.log(r);
                            }
                        });
                    }

                    tdSettings.insertAdjacentElement('afterbegin', updateContact);
                    tdSettings.insertAdjacentElement('beforeend', removeContact);

                    counter++;
                })
            }
        });
    }

    clearTableAndGetAll();
}