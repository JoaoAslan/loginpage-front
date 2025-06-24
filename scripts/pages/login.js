import { loginErrorUI, resetErrors, showElement, showError } from "../services/uiService.js"
import { getInputsData, serverInformation } from "../services/validationService.js";

const boxes = Array.from(document.querySelectorAll('.input-box'));
const inputs = boxes.map((box) => box.querySelector('input'));

const login_btn = document.querySelector('.btn-submit.login');

// MAIN FUNCTION
resetErrors()
inputs.forEach((input) => {
    input.addEventListener('focus', () => focusEvent(input));
    input.addEventListener('focusout', () => focusoutEvent(input));
});
login_btn.addEventListener('click', () => loginUser());

function focusEvent(input) {
    showElement(input, 'focus');
}

function focusoutEvent(input) {
    resetErrors();
    const userData = getInputsData(inputs);
    showElement(input, 'focus', false);

    const loginError = loginErrorUI(userData);
    login_btn.disabled = !loginError;
}

async function loginUser() {
    const userData = getInputsData(inputs);
    const response = await serverInformation(userData);

    const status = Object.values(response).every((data) => data === true);
    console.log(status)
    if (status) {
        console.log("User logged in:");
        console.log(userData);
    } else {
        showError('login');
        login_btn.disabled = !status;
    }
}