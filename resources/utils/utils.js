export function isValidLetterString(str) {
    return str.length > 1 && str.match("[a-zA-Z]{2,}");
}

export function isValidEmail(email) {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com*$/;

    return email.match(validRegex);
}