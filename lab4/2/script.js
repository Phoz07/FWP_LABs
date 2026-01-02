const firstNameContainer = document.getElementById('firstNameContainer');
const lastNameContainer = document.getElementById('lastNameContainer');
const countrySelectContainer = document.getElementById('countrySelectContainer');
const changeButtonContainer = document.getElementById('changeButtonContainer');

let isThai = true;

const translations = {
    thai: {
        firstName: 'ชื่อ:',
        lastName: 'นามสกุล:',
        country: 'ประเทศ:',
        button: 'เปลี่ยนเป็นภาษาอังกฤษ',
        countries: ['เลือกประเทศ', 'ประเทศไทย', 'สหรัฐอเมริกา', 'ญี่ปุ่น', 'เกาหลีใต้', 'จีน']
    },
    english: {
        firstName: 'First Name:',
        lastName: 'Last Name:',
        country: 'Country:',
        button: 'Change to Thai',
        countries: ['Select Country', 'Thailand', 'United States', 'Japan', 'South Korea', 'China']
    }
};

const firstNameLabel = document.createElement('label');
const firstNameInput = document.createElement('input');
firstNameInput.type = 'text';
firstNameLabel.id = 'firstName';
firstNameContainer.appendChild(firstNameLabel);
firstNameContainer.appendChild(firstNameInput);

const lastNameLabel = document.createElement('label');
const lastNameInput = document.createElement('input');
lastNameInput.type = 'text';
lastNameLabel.id = 'lastName';
lastNameContainer.appendChild(lastNameLabel);
lastNameContainer.appendChild(lastNameInput);

const countryLabel = document.createElement('label');
const countrySelect = document.createElement('select');
countryLabel.id = 'countryLabel';
countrySelect.id = 'countrySelect';
countrySelectContainer.appendChild(countryLabel);
countrySelectContainer.appendChild(countrySelect);

const changeButton = document.createElement('button');
changeButton.id = 'changeButton';
changeButtonContainer.appendChild(changeButton);

function updateLanguage() {
    const lang = isThai ? translations.thai : translations.english;

    while (firstNameLabel.firstChild) {
        firstNameLabel.removeChild(firstNameLabel.firstChild);
    }
    const firstNameText = document.createTextNode(lang.firstName);
    firstNameLabel.appendChild(firstNameText);

    while (lastNameLabel.firstChild) {
        lastNameLabel.removeChild(lastNameLabel.firstChild);
    }
    const lastNameText = document.createTextNode(lang.lastName);
    lastNameLabel.appendChild(lastNameText);

    while (countryLabel.firstChild) {
        countryLabel.removeChild(countryLabel.firstChild);
    }
    const countryText = document.createTextNode(lang.country);
    countryLabel.appendChild(countryText);

    while (changeButton.firstChild) {
        changeButton.removeChild(changeButton.firstChild);
    }
    const buttonText = document.createTextNode(lang.button);
    changeButton.appendChild(buttonText);

    while (countrySelect.firstChild) {
        countrySelect.removeChild(countrySelect.firstChild);
    }
    lang.countries.forEach((country) => {
        const option = document.createElement('option');
        const optionText = document.createTextNode(country);
        option.appendChild(optionText);
        countrySelect.appendChild(option);
    });
}

changeButton.addEventListener('click', () => {
    isThai = !isThai;
    updateLanguage();
});

updateLanguage();
