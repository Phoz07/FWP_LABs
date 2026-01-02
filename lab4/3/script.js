const balance = document.getElementById("balance");

const descriptionInput = document.querySelector('input[placeholder="รายการ"]');
const amountInput = document.querySelector('input[placeholder="จำนวน"]');
const typeInput = document.querySelector('select[name="type"]');
const dateInput = document.querySelector('input[placeholder="mm/dd/yyyy"]');
const addButton = document.getElementById("addButton");

const tBody = document.getElementById("table-body");

let totalBalance = 0;

addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if (description && !isNaN(amount) && date) {
        const newRow = document.createElement("tr");

        const dateCell = document.createElement("td");
        const dateTxtNode = document.createTextNode(date);
        dateCell.appendChild(dateTxtNode);
        newRow.appendChild(dateCell);

        const descriptionCell = document.createElement("td");
        const descriptionTxtNode = document.createTextNode(description);
        descriptionCell.appendChild(descriptionTxtNode);
        newRow.appendChild(descriptionCell);

        if (typeInput.value === "expense") {
            const emptyCell = document.createElement("td");
            const emptyTxtNode = document.createTextNode("0");
            emptyCell.appendChild(emptyTxtNode);
            newRow.appendChild(emptyCell);

            const amountCell = document.createElement("td");
            const amountTxtNode = document.createTextNode(amount);
            amountCell.appendChild(amountTxtNode);
            newRow.appendChild(amountCell);

            totalBalance -= amount;
        } else {
            const amountCell = document.createElement("td");
            const amountTxtNode = document.createTextNode(amount);
            amountCell.appendChild(amountTxtNode);
            newRow.appendChild(amountCell);

            const emptyCell = document.createElement("td");
            const emptyTxtNode = document.createTextNode("0");
            emptyCell.appendChild(emptyTxtNode);
            newRow.appendChild(emptyCell);

            totalBalance += amount;
        }

        tBody.appendChild(newRow);

        let balanceText = document.createTextNode(totalBalance);
        balance.replaceChildren(balanceText);

        descriptionInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
    } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

})