import { passwordRulesUI, registerErrorsUI, resetErrors, showElement, showError } from "../services/uiService.js";
import { getInputsData, serverInformation } from "../services/validationService.js";

const inputBoxes = Array.from(document.querySelectorAll('.input-box'));
const inputs = inputBoxes.map((box) => box.querySelector('input'));

const boxRules = document.querySelector('.password-rules');
const rules = Array.from(boxRules.querySelectorAll('.rule'));
const rulesObj = rules.reduce((acc, rule, index) => {
    const ruleId = rule.getAttribute('id');
    acc[ruleId] = rules[index];
    return acc;
}, {})

const register_btn = document.querySelector('.btn-submit.register');

// MAIN FUNCTION
resetErrors()
inputs.forEach((input) => {
    input.addEventListener('focus', () => focusEvent(input));
    input.addEventListener('focusout', () => focusoutEvent(input));
});
register_btn.addEventListener('click', () => registerUser());


function focusEvent(input) {
    const name = input.getAttribute('name');
    showElement(input, 'focus');
    if (name === 'password') {
        showElement(boxRules);
        input.addEventListener('keyup', () => passwordEvent(input));
    }
}

function passwordEvent(input) {
    passwordRulesUI(input.value, rulesObj)
}

function focusoutEvent(input) {
    resetErrors();
    const userData = getInputsData(inputs);
    showElement(input, 'focus', false);
    showElement(boxRules, 'show', false);
    const registerErrors = registerErrorsUI(userData, input.getAttribute('name'));
    register_btn.disabled = !registerErrors;
}

async function registerUser() {
    const userData = getInputsData(inputs);
    const response = await serverInformation(userData);

    const status = Object.values(response).every((data) => data === true);

    if (status) {
        showError('email');
        register_btn.disabled = status;
    } else {
        console.log("User created:"); // POST
        console.log(userData);
    }
}
