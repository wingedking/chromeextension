const tab = '\  ';

function htmlJSON(obj, nested){
    let html = "";
    if(Array.isArray(obj)){
        html += `${tab.repeat(nested)}<span class="obj-curly">[</span>\n`
        for(let x = 0; x < obj.length; x++){
            html += htmlObj(obj[x], nested + 1);
        }
        html += `\n${tab.repeat(nested)}<span class="obj-curly">]</span>`
    }
    else {
        html += htmlObj(obj, nested);
    }
    return html;
}

function htmlObj(obj, nested){
    const keys = Object.keys(obj);
    let html = `${tab.repeat(nested)}<span class="obj-curly">{</span>\n`;
    const keysLen = keys.length;
    for(let i = 0; i < keysLen - 1; i++){
        const key = keys[i];
        html += `${tab.repeat(nested + 1)}<span class="key-name">"${key}"</span><span class="colon">:</span>`;
        if(Array.isArray(obj[key])){
            html += '\n' + htmlJSON(obj[key], nested + 1);
        } else if(typeof(obj[key]) === 'object'){
            html += '\n' + htmlObj(obj[key], nested + 1);
        }
        else {
            const quoteIfString = typeof(obj[key]) === 'string' ? '"' : ''
            html += `<span class="value">${quoteIfString}${obj[key]}${quoteIfString}</span>`
            if(i !== keysLen - 2) html += `\n`;
        }
    }
    html += `\n${tab.repeat(nested)}<span class="obj-curly">}</span>\n`
    return html;
}

const obj = {
    "message":"g",
    "created_at":"2020-04-15T21:33:21.581Z",
    "created_by":"Tommy",
    "number":1,
    "boolean":false
}
console.log(htmlJSON(obj));