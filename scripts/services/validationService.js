import { serverData } from "../../mock/data.js";

function delay(ms) {
    return new Promise(resolve => setTimeout(() => {
        console.log(`Delay de ${ms}ms`)
        resolve();
    }, ms))
}

export async function serverInformation(data) {
    console.log("Dados enviados: ");
    console.log(data);
    console.log("Aguardando resposta do servidor");
    await delay(Math.random() * 5000);
    const response = serverData;
    return response;
}


export function getInputsData(inputs) {
    const inputData = inputs.reduce((acc, input) => {
            const name = input.getAttribute('name');
            acc[name] = input.value;
            return acc;
        }, {});
    return inputData;
}

export function isValidRegister(userData) {
    const [name, email, password, confirm] = [ userData.name, userData.email, userData.password, userData.confirm ];

    const validations = [
        {key: "all", check: !(!name || !email || !password || !confirm)},
        {key: "password", check: passwordValidation(password).every((v) => v.check)},
        {key: "confirm", check: password === confirm}
    ];

    return validations;
}

export function isValidLogin(userData) {
    const [email, password] = [ userData.email, userData.password];

    const validations = [
        {key: "all", check: !(!email || !password)},
        {key: "password", check: password.length >= 6}
    ]

    return validations;
}

export function passwordValidation(pwd) {
    return [
        { key: "length", check: pwd.length >= 6 },
        { key: "special", check: hasSpecial(pwd) },
        { key: "digit", check: hasDigit(pwd) }
    ];
}

const REGEX_SPECIAL = /\W|_/; 
function hasSpecial(text) {
    return REGEX_SPECIAL.test(text)
}

const REGEX_DIGIT = /\d/;
function hasDigit(text) {
    return REGEX_DIGIT.test(text);
}