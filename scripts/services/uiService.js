import { isValidLogin, isValidRegister, passwordValidation } from "./validationService.js";

export function passwordRulesUI(password, rulesUI) {
    const rules = passwordValidation(password);

    rules.forEach((rule) => {
        const element = rulesUI[rule.key];
        updateRuleStatus(element, rule.check)
    })

    return rules;
}

export function registerErrorsUI(userData, focusout) {
    const registerRules = isValidRegister(userData);

    registerRules.forEach((rule) => {
        if (rule.key === focusout && !rule.check) {
            showError(focusout);
        }
    })

    return registerRules.every((v) => v.check);
}

export function loginErrorUI(userData) {
    const loginRules = isValidLogin(userData);
    return loginRules.every((v) => v.check);
}

export function updateRuleStatus(rule, condition) {
    rule.classList.toggle('complete', condition);
}

export function showError(err) {
    const error = document.querySelector(`.error.${err}`);
    if (error) {
        showElement(error);
    }
}

export function resetErrors() {
    const errors = document.querySelectorAll('.error');
    Array.from(errors).forEach((err) => err.classList.remove('show'))
}

export function showElement(element, className='show', condition=true) {
    element.classList.toggle(className, condition)
}