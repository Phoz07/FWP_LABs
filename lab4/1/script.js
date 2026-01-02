const numberInput = document.getElementById('numberInput');
const generateBtn = document.getElementById('generateBtn');
const table = document.getElementById('table');

const clearOutput = () => {
    const emptyTxtNode = document.createTextNode('');
    table.replaceChildren(emptyTxtNode);
}

generateBtn.addEventListener('click', () => {

    const num = parseInt(numberInput.value);
    if (isNaN(num) || num < 1 || num > 12) {
        alert('กรุณาใส่เลขจำนวนเต็มระหว่าง 1 ถึง 12');
        return;
    }

    clearOutput();
    const theader = document.createElement('thead');
    const trHead = document.createElement('tr');
    const thIndex1 = document.createElement('th');
    const numberHeader = document.createTextNode('เลขคูณ');
    const thIndex2 = document.createElement('th');
    const resultHeader = document.createTextNode('ผลลัพธ์');
    thIndex2.appendChild(resultHeader);
    thIndex1.appendChild(numberHeader);
    trHead.appendChild(thIndex1);
    trHead.appendChild(thIndex2);
    theader.appendChild(trHead);
    table.appendChild(theader);

    const tbody = document.createElement('tbody');
    for (let i = 1; i <= 12; i++) {
        const trBody = document.createElement('tr');
        const tdIndex1 = document.createElement('td');
        tdIndex1.style.textAlign = 'center';
        const tdIndex2 = document.createElement('td');
        tdIndex2.style.textAlign = 'center';
        const numberData = document.createTextNode(`${num} x ${i}`);
        const resultData = document.createTextNode(num * i);
        tdIndex1.appendChild(numberData);
        tdIndex2.appendChild(resultData);
        trBody.appendChild(tdIndex1);
        trBody.appendChild(tdIndex2);
        tbody.appendChild(trBody);
    }
    table.appendChild(tbody);
})
