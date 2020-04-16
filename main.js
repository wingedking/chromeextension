//const contents = document.getElementById('contents');
//contents.parentNode.removeChild(contents);
//console.log("FOCUS EXTENSION IS WORKING");
const tab = '\  ';

function htmlJSON(obj, nested){
    let html = "";
    if(Array.isArray(obj)){
        html += `${tab.repeat(nested)}<span class="obj-curly">[</span>`
        for(let x = 0; x < obj.length; x++){
            html += '\n' + htmlObj(obj[x], nested + 1);
            if(x !== obj.length - 1) html += '<span class="comma">,</span>'
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
    let html = `${tab.repeat(nested)}<span class="obj-curly">{</span>`;
    const lastKey = keys[keys.length - 1];
    for(const key of keys){
        html += `\n${tab.repeat(nested + 1)}<span class="key-name">"${key}"</span><span class="colon">:</span>`;
        if(Array.isArray(obj[key])){
            html += '\n' + htmlJSON(obj[key], nested + 1);
        } else if(typeof(obj[key]) === 'object'){
            html += '\n' + htmlObj(obj[key], nested + 1);
        }
        else {
            const quoteIfString = typeof(obj[key]) === 'string' ? '"' : ''
            html += `<span class="value">${quoteIfString}${obj[key]}${quoteIfString}</span>`
            if(lastKey !== key){
                html += `<span class="comma">,</span>`;
            }
            else {
                html += '\n';
            }
        }
    }
    html += `${tab.repeat(nested)}<span class="obj-curly">}</span>`
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
        margin: 0px;
    }
    .footer {
        width:100%;
        bottom: 0px;
        position: fixed;
        display:flex;
        justify-content: space-around;
        align-content: flex-end;
        background: #121212;
    }

    label {
        color: yellow;
    }
    `
   const style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = code;
   document.querySelector('head').appendChild(style);
}

window.addEventListener('load', function(){
    const body = document.querySelector('body');
    const classList = body.classList;
    // if(classList[0] === 'vsc-initialized'){
        const firstChild = body.firstChild;
        if(firstChild.tagName === 'PRE'){
            const innerText = firstChild.innerText;
            const obj = JSON.parse(innerText);
            firstChild.innerHTML = "";
            addCSSToPage();
            console.log('huh??');
            firstChild.innerHTML = htmlJSON(obj, 0);
            changeColor(body);
        }
    // }
    
})

{/* <div class=footer>
<label> Background:<input class="backgroundColor" type="color" name="color1" value="#121212"></label>
<label> Curly Brackets:<input class="bracketsColor" type="color" name="color2" value="#03DAC6"></label>
<label> Keys:<input class="keysColor" type="color" name="color3" value="#FFFF00"</label>
<label> Values:<input class="valuesColor" type="color" name="color4" value="#009df9"></label>
<label> Colon: <input class="colonColor" type="color" name="color5" value="#CF6679"></label>
</div> */}

function changeColor(body){

    body.innerHTML += `<div class="footer">
    <label> Background:<input class="backgroundColor" type="color" name="color1" value="#121212"></label>
    <label> Curly Brackets:<input class="bracketsColor" type="color" name="color2" value="#03DAC6"></label>
    <label> Keys:<input class="keysColor" type="color" name="color3" value="#FFFF00"></label>
    <label> Values:<input class="valuesColor" type="color" name="color4" value="#009df9"></label>
    <label> Colon: <input class="colonColor" type="color" name="color5" value="#CF6679"></label>
    </div>`
    
    
    backgroundColor = document.querySelector(".backgroundColor");
    footerColor = document.querySelector(".footer");
    console.log("************ here in changeColor *******************")
    bracketsColor = document.querySelector(".bracketsColor");
    keysColor = document.querySelector(".keysColor");
    valuesColor = document.querySelector(".valuesColor");
    colonColor = document.querySelector(".colonColor");

    backgroundColor.addEventListener("input", function(){
        console.log("background color entered")
        const body = document.querySelector("body");
        console.log("background color", backgroundColor.value);
        body.style.backgroundColor = backgroundColor.value;
        footerColor.style.backgroundColor = backgroundColor.value;
    });
    
    bracketsColor.addEventListener("input", function(){
        console.log("bracketsColor entered");
        document.styleSheets[0].cssRules[0].style.color = bracketsColor.value; // for curly brace
        document.styleSheets[0].cssRules[4].style.color = bracketsColor.value;
    });
    
    keysColor.addEventListener("input", function(){
        console.log(keysColor.value)
        document.styleSheets[0].cssRules[1].style.color = keysColor.value; // for key name
    });
    
    valuesColor.addEventListener("input", function(){
        console.log(valuesColor.value)
        document.styleSheets[0].cssRules[2].style.color = valuesColor.value; // value
    });
    
    colonColor.addEventListener("input", function(){
        console.log(colonColor.value)
        document.styleSheets[0].cssRules[3].style.color = colonColor.value;
    });
}



