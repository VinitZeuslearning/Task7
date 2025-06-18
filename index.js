const themes = [
    {
        '--root-color': '#121212',
        '--drager-container-color': '#1E1E2F',
        '--drager-border-color': '#2C2C3A',
        '--element-color': '#1E1E2F',
        '--element-border': '#64FFDA',
        '--themebar-color': '#1E1E2F',
        '--theme-element0-color': '#64FFDA'
    },
    {
        '--root-color': '#F0F4F8',
        '--drager-container-color': '#FFFFFF',
        '--drager-border-color': '#DDE4E9',
        '--element-color': '#E0F7FA',
        '--element-border': '#26C6DA',
        '--themebar-color': '#FFFFFF',
        '--theme-element1-color': '#26C6DA'
    },
    {
        '--root-color': 'linear-gradient(135deg, #FF6A00, #EE0979)',
        '--drager-container-color': 'linear-gradient(135deg, #F2709C, #FF9472)',
        '--drager-border-color': '#FF4E50',
        '--element-color': '#FFD3A5',
        '--element-border': '#FF6B6B',
        '--themebar-color': 'linear-gradient(135deg, #F2709C, #FF9472)',
        '--theme-element2-color': '#FF6B6B'
    },
    {
        '--root-color': '#0F0F1C',
        '--drager-container-color': 'linear-gradient(135deg, #2F0035, #360940)',
        '--drager-border-color': '#8C00FF',
        '--element-color': '#360940',
        '--element-border': '#FF00A6',
        '--themebar-color': 'linear-gradient(135deg, #2F0035, #360940)',
        '--theme-element3-color': '#FF00A6'
    },
    {
        '--root-color': '#E0F7FA',
        '--drager-container-color': 'linear-gradient(135deg, #00C9FF, #92FE9D)',
        '--drager-border-color': '#00BFA5',
        '--element-color': '#C8F7DC',
        '--element-border': '#00C9FF',
        '--themebar-color': 'linear-gradient(135deg, #00C9FF, #92FE9D)',
        '--theme-element4-color': '#00C9FF'
    },
    {
        '--root-color': '#FFF8E1',
        '--drager-container-color': 'linear-gradient(135deg, #FFD3A5, #FD6585)',
        '--drager-border-color': '#FF8A65',
        '--element-color': '#FFE0B2',
        '--element-border': '#FD6585',
        '--themebar-color': 'linear-gradient(135deg, #FFD3A5, #FD6585)',
        '--theme-element5-color': '#FD6585'
    },
    {
        '--root-color': '#FFF8E1',
        '--drager-container-color': 'linear-gradient(135deg, #FFD3A5, #FD6585)',
        '--drager-border-color': '#FF8A65',
        '--element-color': '#FFDAB9',
        '--element-border': '#FD6585',
        '--themebar-color': 'linear-gradient(135deg, #FFD3A5, #FD6585)',
        '--theme-element6-color': '#FD6585'
    },
    {
        '--root-color': '#E3F2FD',
        '--drager-container-color': 'linear-gradient(135deg, #2196F3, #21CBF3)',
        '--drager-border-color': '#1E88E5',
        '--element-color': '#BBDEFB',
        '--element-border': '#2196F3',
        '--themebar-color': 'linear-gradient(135deg, #2196F3, #21CBF3)',
        '--theme-element7-color': '#21CBF3'
    },
    {
        '--root-color': '#FAFAFA',
        '--drager-container-color': 'linear-gradient(135deg, #BDBDBD, #E0E0E0)',
        '--drager-border-color': '#757575',
        '--element-color': '#EEEEEE',
        '--element-border': '#9E9E9E',
        '--themebar-color': 'linear-gradient(135deg, #BDBDBD, #E0E0E0)',
        '--theme-element8-color': '#9E9E9E'
    }
];



function applyTheme(theme) {
    for (const key in theme) {
        document.documentElement.style.setProperty(key, theme[key]);
    }
}

function changeThemeHandler(e) {
    let themnumber = e.target.dataset.themeIndex;
    console.log(`themnumber : ${themnumber}`)
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

applyTheme(themes[2]);
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
        console.log(`resize ,  left: ${rect.left}, top : ${rect.top}, height : ${rect.height}, width: ${rect.width} Id: ${_this.parentId}`);
        _this.childsElms.forEach((childObj) => {
            childObj.setBoundries(rect.left, rect.right, rect.top, rect.bottom, rect.height, rect.width);
            // console.log('bounder set ');
            console.log(`parentTop: ${rect.top}, parentLeft: ${rect.left}, Id: ${_this.parentId}`);
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
        ChildObj.id++;
        initializeEvents()
    }
    this.creatChildElm();
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


    this.changePosRelative = function () {
        console.log("called")
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
        console.log(` minx: ${minX}, maxx: ${maxX}, miny: ${minY}, maxy: ${maxY}, valx: ${valx}, valy: ${valy}, left: ${left}, top: ${top}`);
        // _this.changePos( x ,  y);
    }

    function initializeEvents() {
        _this.childElm.addEventListener('pointerdown', downhandler);
        document.addEventListener('pointerup', uphandler);
        document.addEventListener('pointermove', moveHandler);
    }

    function moveHandler(e) {
        if (!_this.isPointerInElm) {
            return;
        }
        _this.x = e.clientX - _this.parentLeft;
        _this.y = e.clientY - _this.parentTop;
        _this.changePosRelative();
    }


    function downhandler() {
        console.log("down")
        _this.isPointerInElm = true;
    }

    function uphandler() {
        console.log("up")
        if (!_this.isPointerInElm) return;
        _this.isPointerInElm = false;
    }
    return _this
}

ChildObj.id = 0;
// let elm = ChildObj();

let pare = new Parent();
let pare2 = new Parent();
let pare3 = new Parent();
let pare4 = new Parent();
let pare5 = new Parent();
let pare6 = new Parent();

// pare.creatParent();
// pare2.creatParent();
// pare3.creatParent();

let child1 = new ChildObj();
let child2 = new ChildObj();
let child3 = new ChildObj();
let child4 = new ChildObj();
let child5 = new ChildObj();
let child6 = new ChildObj();
let child7 = new ChildObj();
let child8 = new ChildObj();
let child9 = new ChildObj();

pare.appendChild(child1)
// pare.appendChild( child2 )

pare2.appendChild(child2)
pare3.appendChild(child3)
pare3.appendChild(child4)
pare3.appendChild(child4)
pare3.appendChild(child4)
pare3.appendChild(child5)
pare3.appendChild(child6)
pare4.appendChild(child7)
pare5.appendChild(child8)
pare6.appendChild(child9)



