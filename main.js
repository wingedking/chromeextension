//const contents = document.getElementById('contents');
//contents.parentNode.removeChild(contents);
//console.log("FOCUS EXTENSION IS WORKING");
window.addEventListener('load', function(){
    const body = document.querySelector('body')
    const classList = body.classList;
    if(classList[0] === 'vsc-initialized'){
        const firstChild = body.firstChild;
        if(firstChild.tagName === 'PRE'){
            const innerText = firstChild.innerText;
            const obj = JSON.parse(innerText);
            firstChild.remove();
        }
    }
/*
        [
            {
                "message":"g"
                "created_at":"2020-04-15T21:33:21.581Z"
                "created_by":"Tommy"
            }
        ]
*/
    //console.log(body);
    //console.log(body.firstChild());
});
