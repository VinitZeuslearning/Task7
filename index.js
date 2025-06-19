const themes = [
    // First one - kept as is
    {
        '--root-color': '#121212',
        '--drager-container-color': '#1E1E2F',
        '--drager-border-color': '#2C2C3A',
        '--element-color': '#1E1E2F',
        '--element-border': '#64FFDA',
        '--themebar-color': '#1E1E2F',
        '--theme-element0-color': '#64FFDA'
    },
    // Replaced with teal-green shade
    {
        '--root-color': '#F0F4F8',
        '--drager-container-color': '#FFFFFF',
        '--drager-border-color': '#DDE4E9',
        '--element-color': '#E0F2F1',
        '--element-border': '#26A69A',
        '--themebar-color': '#FFFFFF',
        '--theme-element1-color': '#26A69A'
    },
    // Replaced pink-orange with sunset amber
    {
        '--root-color': 'linear-gradient(135deg, #FFB74D, #FFA726)',
        '--drager-container-color': 'linear-gradient(135deg, #FFE082, #FFCA28)',
        '--drager-border-color': '#FF9800',
        '--element-color': '#FFE0B2',
        '--element-border': '#FB8C00',
        '--themebar-color': 'linear-gradient(135deg, #FFE082, #FFCA28)',
        '--theme-element2-color': '#FB8C00'
    },
    // Replaced purple-pink with deep indigo gradient
    {
        '--root-color': '#0F0F1C',
        '--drager-container-color': 'linear-gradient(135deg, #1A237E, #283593)',
        '--drager-border-color': '#5C6BC0',
        '--element-color': '#303F9F',
        '--element-border': '#7986CB',
        '--themebar-color': 'linear-gradient(135deg, #1A237E, #283593)',
        '--theme-element3-color': '#7986CB'
    },
    // Replaced teal-green gradient with lime-cyan
    {
        '--root-color': '#E0F7FA',
        '--drager-container-color': 'linear-gradient(135deg, #C6FF00, #00E676)',
        '--drager-border-color': '#00C853',
        '--element-color': '#CCFF90',
        '--element-border': '#69F0AE',
        '--themebar-color': 'linear-gradient(135deg, #C6FF00, #00E676)',
        '--theme-element4-color': '#00E676'
    },
    // Replaced orange-pink with amber-yellow
    {
        '--root-color': '#FFF8E1',
        '--drager-container-color': 'linear-gradient(135deg, #FFE57F, #FFD54F)',
        '--drager-border-color': '#FFCA28',
        '--element-color': '#FFF59D',
        '--element-border': '#FFC107',
        '--themebar-color': 'linear-gradient(135deg, #FFE57F, #FFD54F)',
        '--theme-element5-color': '#FFC107'
    },
    // Same as above for consistency
    {
        '--root-color': '#FFF8E1',
        '--drager-container-color': 'linear-gradient(135deg, #FFE57F, #FFD54F)',
        '--drager-border-color': '#FFCA28',
        '--element-color': '#FFF59D',
        '--element-border': '#FFC107',
        '--themebar-color': 'linear-gradient(135deg, #FFE57F, #FFD54F)',
        '--theme-element6-color': '#FFC107'
    },
    // Blue one — kept as is
    {
        '--root-color': '#E3F2FD',
        '--drager-container-color': 'linear-gradient(135deg, #2196F3, #21CBF3)',
        '--drager-border-color': '#1E88E5',
        '--element-color': '#BBDEFB',
        '--element-border': '#2196F3',
        '--themebar-color': 'linear-gradient(135deg, #2196F3, #21CBF3)',
        '--theme-element7-color': '#21CBF3'
    },
    // Neutral grey theme replacement
    {
        '--root-color': '#FAFAFA',
        '--drager-container-color': 'linear-gradient(135deg, #90A4AE, #CFD8DC)',
        '--drager-border-color': '#78909C',
        '--element-color': '#ECEFF1',
        '--element-border': '#B0BEC5',
        '--themebar-color': 'linear-gradient(135deg, #90A4AE, #CFD8DC)',
        '--theme-element8-color': '#B0BEC5'
    }
];




function applyTheme(theme) {
    for (const key in theme) {
        document.documentElement.style.setProperty(key, theme[key]);
    }
}

function changeThemeHandler(e) {
    let themnumber = e.target.dataset.themeIndex;
    // console.log(`themnumber : ${themnumber}`)
    applyTheme(themes[themnumber]);
}
function loadTheme() {
    const thembar = document.getElementById('themeBar');
    for (let i = 0; i < themes.length; i++) {
        let elm = document.createElement('div');
        elm.classList.add('theme');
        let themename = "--theme-element" + i + "-color"
        elm.style.background = themes[i][themename];
        elm.dataset.themeIndex = i;
        thembar.appendChild(elm)
    }


    let themeselm = document.getElementsByClassName('theme');
    for (let elm of themeselm) {
        elm.addEventListener('click', changeThemeHandler)
    }
}

applyTheme(themes[0]);
loadTheme()

const themebarelm = document.getElementById('themBar');







function Parent() {
    this.parentElm;
    const _this = this;
    _this.childsElms = [];
    this.creatParent = function (Id = Parent.id, containerID = "Container") {
        _this.parentId = Id;
        _this.parentElm = document.createElement('div');
        _this.parentElm.classList.add('dragerContainer');
        const root = document.getElementById(containerID);
        _this.parentElm.id = 'dragableParent' + Id;
        root.appendChild(_this.parentElm);
        Parent.id++;
        initializeEvents();
    }
    this.creatParent();
    this.appendChild = function (childObj) {
        _this.parentElm.appendChild(childObj.childElm);
        _this.childsElms.push(childObj);
        setChildsBoundres();
    }

    function setChildsBoundres() {
        let rect = _this.parentElm.getBoundingClientRect();
        // console.log(`resize ,  left: ${rect.x}, top : ${rect.top}, height : ${rect.height}, width: ${rect.width} Id: ${_this.parentId}`);
        _this.childsElms.forEach((childObj) => {
            childObj.setBoundries(rect.left, rect.right, rect.top, rect.bottom, rect.height, rect.width);
            // console.log('bounder set ');
            // console.log(`parentTop: ${rect.top}, parentLeft: ${rect.left}, Id: ${_this.parentId}`);
            childObj.changePosRelative();
        })
    }

    function initializeEvents() {
        window.addEventListener('resize', setChildsBoundres)
    }

    return _this;
}
Parent.id = 0;

function ChildObj() {
    const _this = this;
    this.isPointerInElm = false;
    this.x = 0;
    this.y = 0;
    _this.parentLeft = null;
    _this.parentRight = null;
    _this.parentTop = null;
    _this.parentBottom = null;
    _this.parentHeight = null;
    _this.parentWidth = null;
    this.creatChildElm = function (height = 50, width = 50, Id = ChildObj.id) {
        _this.childElm = document.createElement('div');
        _this.childElm.style.height = `${height}px`;
        _this.childElm.style.width = `${width}px`;
        _this.childElm.style.top = '0px';
        _this.childElm.style.left = '0px';
        _this.childElm.classList.add('someSt');
        _this.childElm.id = "dragableChildElm" + Id;
        _this.childElm.draggable = false;
        ChildObj.id++;
        initializeEvents()
    }
    this.setBoundries = function (left, right, top, bottom, height, width) {
        _this.parentLeft = left;
        _this.parentRight = right;
        _this.parentTop = top;
        _this.parentBottom = bottom;
        _this.parentHeight = height;
        _this.parentWidth = width;
    }
    this.changePos = function (x, y) {
        // console.log(` changing x: ${x}, y : ${y}`)
        _this.childElm.style.left = x + "px";
        _this.childElm.style.top = y + "px";
    }
    this.downhandler = function (e) {
        console.log("down")
        e.preventDefault();
        _this.isPointerInElm = true;
        window.addEventListener('pointerup', _this.uphandler);
        window.addEventListener('pointermove', _this.moveHandler);
    }
    this.uphandler = function (e) {
        console.log("up")
        if (!_this.isPointerInElm) return;
        _this.isPointerInElm = false;
        window.removeEventListener('pointermove', _this.moveHandler);
        window.removeEventListener('pointerup', _this.uphandler);
    }
    this.changePosRelative = function () {
        // console.log("called")
        if ((_this.parentLeft == null) || (_this.parentRight == null) || (_this.parentTop == null) || (_this.parentBottom == null)) return;

        // console.log(`x: ${_this.x}, y: ${_this.y}`)
        let x = _this.x;
        let y = _this.y;


        // console.log( `x : ${x}, y : ${y}`)
        let rect = _this.childElm.getBoundingClientRect();

        const minX = 0 + (rect.width / 2);
        const maxX = _this.parentWidth - (rect.width / 2);
        const minY = 0 + (rect.height / 2);
        const maxY = _this.parentHeight - (rect.height / 2);

        const valx = Math.min(Math.max(minX, x), maxX);
        const valy = Math.min(Math.max(minY, y), maxY);
        _this.x = valx;
        _this.y = valy;
        let left = (valx - (rect.width / 2));
        let top = (valy - (rect.height / 2));
        _this.changePos(left, top);
        // console.log(` minx: ${minX}, maxx: ${maxX}, miny: ${minY}, maxy: ${maxY}, valx: ${valx}, valy: ${valy}, left: ${left}, top: ${top}`);
        // _this.changePos( x ,  y);
    }
    function initializeEvents() {
        _this.childElm.addEventListener('pointerdown', _this.downhandler);
        // document.addEventListener('pointerup', uphandler);
    }

    this.moveHandler = function (e) {
        if (!_this.isPointerInElm) {
            return;
        }
        _this.x = e.clientX - _this.parentLeft;
        _this.y = e.clientY - _this.parentTop;
        // console.log(`raw x and y ${e.clientX} , ${e.clientY}`)
        // console.log(`parentLeft: ${_this.parentLeft}, Top: ${_this.parentTop}`)
        _this.changePosRelative();
    }
    this.creatChildElm();
    return _this
}


function animateRandomMovement() {
    const elements = document.querySelectorAll('.someSt');

    elements.forEach(elm => {
        const parent = elm.parentElement;

        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;
        const elmWidth = elm.offsetWidth;
        const elmHeight = elm.offsetHeight;

        // Random positions within parent bounds
        const maxX = parentWidth - elmWidth;
        const maxY = parentHeight - elmHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        // Apply smooth movement via CSS transition
        elm.style.transition = 'all 0.5s';
        elm.style.left = randomX + 'px';
        elm.style.top = randomY + 'px';
    });
}

// Move randomly every 1.5 seconds
setInterval(animateRandomMovement, 500);


ChildObj.id = 0;

let parentCnt = 6;
let childPerParent = 9;


let parentArr = []
for (let i = 0; i < parentCnt; i++) {
    let parent = new Parent();
    parentArr.push(parent);
}


for (let par of parentArr) {
    for (let i = 0; i < childPerParent; i++) {
        par.appendChild(new ChildObj());
    }
}



