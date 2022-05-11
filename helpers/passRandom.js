
const generateRandomInt = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
}

const randomCoding = () => {
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let idvalue = '';
    let n = 4;
    for (let i = 0; i < n; i++) {
        idvalue += arr[Math.floor(Math.random() * 26)];
    }
    return idvalue.charAt(0).toUpperCase() + idvalue.slice(1);
}

const caracterSpecial = () => {
    const arr = ['*', '!', '#', '$', '&', '%', '=', '?', '¿', '¡'];
    let idvalue = '';
    let n = 2;
    for (let i = 0; i < n; i++) {
        idvalue += arr[Math.floor(Math.random() * 10)];
    }
    return idvalue.charAt(0).toUpperCase() + idvalue.slice(1);
}

const passwordRamdonCombinada = () => {
    const str = randomCoding();
    const number = generateRandomInt(10, 99);
    const special = caracterSpecial();
    return str + number + special;
}

module.exports = {
    passwordRamdonCombinada
}