let myWindow = document.querySelector('.window');
let del = document.querySelector('.buttons__butDEL');
let ac = document.querySelector('.buttons__butAC');
let result = document.querySelector('.buttons__EQUAL');
let elements = document.querySelectorAll(`.buttons__number, .buttons__parentLeft,.buttons__parentRight,
.buttons__butDIV, .buttons__MULT, .buttons__PLUS, .buttons__MINUS, .buttons__DOT`);

elements.forEach(key => {
    key.addEventListener('click', function () {
        myWindow.textContent += key.textContent;
    })
});

del.addEventListener('click', function () {
    myWindow.textContent = myWindow.textContent.slice(0, -1)
});

ac.addEventListener('click', function () {
    myWindow.textContent = '';
});

let arr = ['*', '÷', '+', '-'];
result.addEventListener('click', function () {
    let windFirst = myWindow.textContent;
    while (windFirst.match(/\([0-9+*÷.-]+\)/g) != null) {
        let newArr = windFirst.match(/\([0-9+*÷.-]+\)/g);
        for (let i = 0; i < newArr.length; i++) {
            let sum1;
            let trim = newArr[i].slice(1, -1);
            trimNew = trim.split(/[+*÷-]/);
            trimNew1 = trim.split(/\d+\.?\d?/);
            for (let i = 0; i < arr.length; i++) {
                if (trimNew1.indexOf(arr[i]) != -1) {
                    let num = trimNew1.indexOf(arr[i]);
                    let sum = new myCalc();
                    sum1 = sum.operations(trimNew[num - 1], arr[i], trimNew[num]);
                    trimNew1.splice(num, 1);
                    trimNew.splice(num - 1, 2, sum1);
                }
            }
            windFirst = windFirst.replace(newArr[i], sum1)
        }
    }

    let windowres = windFirst.split(/[+*÷-]/);
    let windowres1 = windFirst.split(/\d+\.?\d?/);
    for (let i = 0; i < arr.length; i++) {
        while (windowres1.indexOf(arr[i]) != -1) {
            let num = windowres1.indexOf(arr[i]);
            let sum = new myCalc();
            let sum1 = sum.operations(windowres[num - 1], arr[i], windowres[num]);
            windowres1.splice(num, 1);
            windowres.splice(num - 1, 2, sum1);
        }
    }
    myWindow.textContent = windowres[0];

});

class myCalc {
    operations(param1, operation, param2) {
        switch (operation) {
            case '+':
                return +param1 + +param2;
            case '-':
                return +param1 - +param2;
            case '÷':
                return +param1 / +param2;
            case '*':
                return +param1 * +param2;
            default:
                return NaN;
        }
    }
}