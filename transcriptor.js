document.getElementById('transcript').addEventListener('click', transcriptButtonOnClick);
document.getElementById('inputText').addEventListener('keyup', inputTextOnKeyUp);
document.getElementById('clearHistory').addEventListener('click', clearHistory);
document.getElementById('copyToClipboard').addEventListener('click', copyToClipboard);


function transcriptButtonOnClick() {
    let oldInputText = inputText.value;
    if (oldInputText.trim().length === 0) return;
    let newInputText = transcriptString(inputText.value);
    inputText.value = newInputText;
    let d = new Date();
    let p = document.createElement("p");
    let span = document.createElement("span");
    span.classList.add("time");
    let date = document.createTextNode(d.toLocaleString());
    let text = document.createTextNode(oldInputText + " ==> " + newInputText);
    span.appendChild(date);
    p.appendChild(span);
    p.appendChild(text);
    document.getElementById('history').prepend(p);
}


function inputTextOnKeyUp(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        transcript.click();
    }
}

function transcriptString(str) {
    let eng = "qwertyuiop[]asdfghjkl;\'zxcvbnm,.QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>";
    let ukr = "йцукенгшщзхїфівапролджєячсмитьбюЙЦУКЕНГШЩЗХЇФІВАПРОЛДЖЄЯЧСМИТЬБЮ";
    if (determineCharset(str, eng) > determineCharset(str, ukr)){
        return transcriptUsingCharset(str, eng, ukr);
    } else {
        return transcriptUsingCharset(str, ukr, eng);
    }
    
}

function transcriptUsingCharset(str, fromCharset, toCharset) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let j = fromCharset.indexOf(str[i]);
        if (j >= 0) {
            result += toCharset[j];
        } else {
            result += str[i];
        }

    }
    return result;
}

function determineCharset(str, charset) {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
        let j = charset.indexOf(str[i]);
        if (j >= 0){
            result ++;
        }
    }
    return result;
}

function clearHistory() {
    document.getElementById('history').innerHTML = "";
}

function copyToClipboard() {
    navigator.clipboard.writeText(inputText.value);
}