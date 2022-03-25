
import validator from 'validator';

import { notify } from "@kyvg/vue3-notification";

function notifyError(msg) {
    notify({ type: 'error', title: 'Error!', text: msg });
}


function isEmpty(form) {
    return (form.firstname == '' || form.lastname == '' || form.username == '' || form.password == '' || form.email == '')
}

function isEmptyNoEmail(form) {
    return (form.firstname == '' || form.lastname == '')
}

function isEmail(form) {
    return validator.isEmail(form.email)
}

function isNamesValid(form) {
    return (validator.isAlpha(form.firstname) && validator.isAlpha(form.lastname) && validator.isLength(form.firstname, { min: 3, max: 20 }) &&validator.isLength(form.lastname, { min: 3, max: 20 }))
}

function isUsernameValid(form) {
    return (validator.isLength(form.username, { min: 4, max: 20 }) && validator.isAlphanumeric(form.username))
}

function isPasswordValid(form) {
    return validator.isLength(form.password, { min: 8, max: 20 })
}

function isBioValid(form){
    return validator.isLength(form.bio, { min: 8, max: 70} )
}

const validateRegister = (form) => {
    if (isEmpty(form)) {
        notifyError("Please make sure to fill up the forms!");
        return false;
    }

    if (!isNamesValid(form)) {
        notifyError("Please type valid names ( Min: 3 letters, no numbers / spaces ) ");
        return false;
    }

    if (!isUsernameValid(form)) {
        notifyError("Make sure you type a valid username ( Min/max: 4/20 characters, no spaces )");
        return false;
    }

    if (!isPasswordValid(form)) {
        notifyError("Make sure you type a valid password ( Min/max: 8/30 characters)");
        return false;
    }
    if (!isEmail(form)) {
        notifyError("Make sure you typed a valid email");
        return false;
    }

    return true;
}

const validateProfileEdit = (form) => {
    if (isEmptyNoEmail(form)) {
        notifyError("Please make sure to fill up the forms!");
        return false;
    }

    if (!isNamesValid(form)) {
        notifyError("Please type valid names ( Min: 3 letters, no numbers / spaces ) ");
        return false;
    }

    if(!isBioValid(form)){
        notifyError("Make sure the bio is valid ( Min: 8 Max: 70 characters )")
        return false;
    }

    return true;
}



export { validateRegister, validateProfileEdit };