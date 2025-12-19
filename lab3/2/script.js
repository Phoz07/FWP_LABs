const numbersImages ={
    0: 'assets/0.png',
    1: 'assets/1.png',
    2: 'assets/2.png',
    3: 'assets/3.png',
    4: 'assets/4.png',
    5: 'assets/5.png',
    6: 'assets/6.png',
    7: 'assets/7.png',
    8: 'assets/8.png',
    9: 'assets/9.png'
}

const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const num3 = document.getElementById('num3');
const num4 = document.getElementById('num4');
const num5 = document.getElementById('num5');
const num6 = document.getElementById('num6');

const btn = document.getElementById('generate-button');

const randomNumber = Math.floor(Math.random() * 10000);

const numberString = String(randomNumber).padStart(4, '0');

const container = document.getElementById('number-container');

btn.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const numberString = String(randomNumber).padStart(6, '0');

    num1.src = numbersImages[numberString[0]];
    num2.src = numbersImages[numberString[1]];
    num3.src = numbersImages[numberString[2]];
    num4.src = numbersImages[numberString[3]];
    num5.src = numbersImages[numberString[4]];
    num6.src = numbersImages[numberString[5]];
});