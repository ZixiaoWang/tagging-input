var input = document.getElementById('tagging');
var container = document.getElementById('taggingContainer');
var list = null;
var pretext = '';
var taggingStart = 0;
var tagging = false;

let createList = () => {
    let ul = document.createElement('ul');
    ul.classList = ['ti-list'];

    let html = '';
    LIST.forEach(item => {
        html += '<li>' + item.name + '</li>';
    });
    ul.id = 'list';
    ul.innerHTML = html;
    ul.addEventListener(
        'click',
        (event) => {
            let li = event.target;
            
            input.innerHTML += '<span class="ti-tag">' + li.innerText + '</span>&nbsp;';
            input.focus();
            window.getSelection().getRangeAt(0).setStartAfter( input.lastChild )

            container.removeChild( list );
            tagging = false;
            list = null;
            container.focus();
        }
    )

    return ul;
} 

let getCaretCoordinates = (event) => {

    let rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    let coord = {
        x: rect.x,
        y: rect.y + 20
    }
    
    return coord;
}

input.addEventListener(
    'keyup',
    (event) => {
        let txt = event.target.innerText;
        let char = txt.charAt( txt.length - 1 );

        if( char === '@' ) {
            if(tagging === false) {
                tagging = true;
                taggingStart = txt.length;
                list = createList();
                list.style.top = getCaretCoordinates(event).y + 'px';
                list.style.left = getCaretCoordinates(event).x + 'px';
                container.appendChild( list );
            } 
        } else if( /\n|\s/.test(char) === true ) {
            tagging = false;
            if(list) {
                container.removeChild( list );
                list = null;
            }
        } else {
            if(tagging === true && list) {
                list.style.top = getCaretCoordinates(event).y + 'px';
                list.style.left = getCaretCoordinates(event).x + 'px';
            }
        }

        pretext = txt;
    }
)