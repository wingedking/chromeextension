//const contents = document.getElementById('contents');
//contents.parentNode.removeChild(contents);
//console.log("FOCUS EXTENSION IS WORKING");
const tab = '\  ';

function htmlJSON(obj, nested){
    let html = "";
    if(Array.isArray(obj)){
        html += `${tab.repeat(nested)}<span class="obj-curly">[</span>\n`
        for(let x = 0; x < obj.length; x++){
            html += htmlObj(obj[x], nested + 1);
            if(x !== obj.length - 1) html += '<span class="comma">,</span>\n'
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
    const lastKey = keys[keys.length - 1];
    for(const key of keys){
        html += `${tab.repeat(nested + 1)}<span class="key-name">"${key}"</span><span class="colon">:</span>`;
        if(Array.isArray(obj[key])){
            html += '\n' + htmlJSON(obj[key], nested + 1);
        } else if(typeof(obj[key]) === 'object'){
            html += '\n' + htmlObj(obj[key], nested + 1);
        }
        else {
            const quoteIfString = typeof(obj[key]) === 'string' ? '"' : ''
            html += `<span class="value">${quoteIfString}${obj[key]}${quoteIfString}</span>`
            if(lastKey !== key) html += `<span class="comma">,</span>\n`;
        }
    }
    html += `\n${tab.repeat(nested)}<span class="obj-curly">}</span>`
    return html;
}

function addCSSToPage(){
    let code = `
    span.obj-curly {
        color: #03DAC6;
    }
    span.key-name {
        color: yellow;
    }
    span.value {
        color: RGB(0, 157, 249);
    }
    span.colon {
        color: #CF6679;
    }
    span.comma {
        color: #03DAC6;
    }
    body {
        background: #121212;
        font-size: 24px;
    }`
   const style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = code;
   document.querySelector('head').appendChild(style);
}
window.addEventListener('load', function(){
    const body = document.querySelector('body');
    const classList = body.classList;
    if(classList[0] === 'vsc-initialized'){
        const firstChild = body.firstChild;
        if(firstChild.tagName === 'PRE'){
            const innerText = firstChild.innerText;
            const obj = JSON.parse(innerText);
            firstChild.innerHTML = "";
            addCSSToPage();
            console.log('huh??');
            firstChild.innerHTML = htmlJSON(obj, 0);
        }
    }
})
