transcript.addEventListener('click', transcriptButtonOnclick);

function transcriptButtonOnclick() {
    inputText.value = transcriptString(inputText.value);
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