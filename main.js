//const contents = document.getElementById('contents');
//contents.parentNode.removeChild(contents);
//console.log("FOCUS EXTENSION IS WORKING");
const tab = '\  ';
let bagColor =  "#121212"
let curColor = "#03DAC6"
let comColor = "#03DAC6"
let colColor = "#CF6679"
let valColor = "#009df9"
let keyColor = "#FFFF00"
let braColor = "#03DAC6"

//chrome.storage.sync.clear();

function loadChromeState(onComplete){
    chrome.storage.sync.get(['bagColor'], function(result){
        if(Object.keys(result).length === 0){
            chrome.storage.sync.set({'bagColor': "#121212"}, function(){
                chrome.storage.sync.set({'curColor': "#03DAC6"}, function(){
                    chrome.storage.sync.set({'comColor': "#03DAC6"}, function(){
                        chrome.storage.sync.set({'valColor': "#009df9"}, function(){
                            chrome.storage.sync.set({'colColor': "#CF6679"}, function(){
                                chrome.storage.sync.set({'keyColor': "#FFFF00"}, function(){
                                    chrome.storage.sync.set({'braColor': "#03DAC6"}, function(){
                                        onComplete();
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
        else {
            console.log(result.bagColor);
            bagColor = result.bagColor;
            console.log(bagColor);
            chrome.storage.sync.get(['curColor'], function(result){
                curColor = result.curColor;
                chrome.storage.sync.get(['comColor'], function(result){
                    comColor = result.comColor;
                    chrome.storage.sync.get(['valColor'], function(result){
                        valColor = result.valColor;
                        chrome.storage.sync.get(['colColor'], function(result){
                            colColor = result.colColor;
                            chrome.storage.sync.get(['keyColor'], function(result){
                                keyColor = result.keyColor;
                                chrome.storage.sync.get(['braColor'], function(result){
                                    console.log("bra", result)
                                    braColor = result.braColor;
                                    onComplete();
                                })
                            })
                        })
                    })
                })
            })
        }
    })
}

window.addEventListener('load', function(){
    const body = document.querySelector('body');
    const firstChild = body.firstChild;
    if(firstChild.tagName === 'PRE'){
        loadChromeState(() => {
            const innerText = firstChild.innerText;
            const obj = JSON.parse(innerText);
            firstChild.innerHTML = "";
            addCSSToPage();
            console.log('huh??');
            firstChild.innerHTML = htmlJSON(obj, 0);
            changeColor(body);
        })
    }
})

console.log("event loop?", bagColor, "braColor", braColor);

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
        color: ${curColor};
    }
    span.key-name {
        color: ${keyColor};
    }
    span.value {
        color: ${valColor};
    }
    span.colon {
        color: ${colColor};
    }
    span.comma {
        color: ${comColor};
    }
    body {
        background: ${bagColor};
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
        color: yellow;
    }

    `
   const style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = code;
   document.querySelector('head').appendChild(style);
}

function changeColor(body){

    body.innerHTML += `<div class="footer">
    <label> Background:<input class="backgroundColor" type="color" name="color1" value=${bagColor}></label>
    <label> Curly Brackets:<input class="bracketsColor" type="color" name="color2" value=${curColor}></label>
    <label> Keys:<input class="keysColor" type="color" name="color3" value=${keyColor}></label>
    <label> Values:<input class="valuesColor" type="color" name="color4" value=${valColor}></label>
    <label> Colon: <input class="colonColor" type="color" name="color5" value=${colColor}></label>
    </div>`
    
    
    backgroundColor = document.querySelector(".backgroundColor");
    footer = document.querySelector(".footer");
    bracketsColor = document.querySelector(".bracketsColor");
    keysColor = document.querySelector(".keysColor");
    valuesColor = document.querySelector(".valuesColor");
    colonColor = document.querySelector(".colonColor");

    backgroundColor.addEventListener("input", function(){
        const body = document.querySelector("body");
        body.style.backgroundColor = backgroundColor.value;
        footerColor.style.backgroundColor = backgroundColor.value;
        chrome.storage.sync.set({'bagColor': `${backgroundColor.value}`});
    });
    
    bracketsColor.addEventListener("input", function(){
        console.log("bracketsColor entered");
        document.styleSheets[0].cssRules[0].style.color = bracketsColor.value; // for curly brace
        document.styleSheets[0].cssRules[4].style.color = bracketsColor.value;
        chrome.storage.sync.set({'braColor': `${bracketsColor.value}`}); // brackets
        chrome.storage.sync.set({'curColor': `${bracketsColor.value}`}); // curly
        chrome.storage.sync.set({'comColor': `${bracketsColor.value}`}); // comma
    });
    
    keysColor.addEventListener("input", function(){
        document.styleSheets[0].cssRules[1].style.color = keysColor.value; // for key name
        footer.style.color = keysColor.value;
        chrome.storage.sync.set({'keyColor': `${keysColor.value}`});
    });
    
    valuesColor.addEventListener("input", function(){
        document.styleSheets[0].cssRules[2].style.color = valuesColor.value; // value
        chrome.storage.sync.set({'valColor': `${valuesColor.value}`});
    });

    colonColor.addEventListener("input", function(){
        document.styleSheets[0].cssRules[3].style.color = colonColor.value;
        chrome.storage.sync.set({'colColor': `${colonColor.value}`});
    });

}



