function Parent() {
    this.parentElm;
    const _this = this;

    this.creatParent = function (color, Id, containerID) {
        _this.parentId = Id;
        _this.parentElm = document.createElement('div');
        _this.parentElm.classList.add('dragerContainer');
        _this.parentElm.style.backgroundColor = color;
        const root = document.getElementById(containerID);
        _this.parentElm.id = 'dragableParent' + Id;
        root.appendChild(_this.parentElm)
    }

    this.appendChild = function (childObj) {
        let rect = _this.parentElm.getBoundingClientRect();
        // console.log(rect)
        childObj.setBoundries(rect.left, rect.right, rect.top, rect.bottom);
        childObj.changePos(rect.left, rect.top)
        // console.log(`left : ${rect.left} top: ${rect.top}`)
        _this.parentElm.appendChild(childObj.childElm);
    }

    return _this;
}

function ChildObj() {
    const _this = this;
    this.isPointerInElm = false;
    this.x = 0;
    this.y = 0;
    _this.parentLeft = null;
    _this.parentRight = null;
    _this.parentTop = null;
    _this.parentBottom = null;
    this.creatChildElm = function (height, width, color, Id) {
        _this.childElm = document.createElement('div');
        _this.childElm.style.backgroundColor = color;
        _this.childElm.style.height = `${height}px`;
        _this.childElm.style.width = `${width}px`;
        // _this.childElm.style.top = '0px';
        // _this.childElm.style.left = '0px';
        _this.childElm.classList.add('someSt');
        _this.childElm.id = "dragableChildElm" + Id;
        initializeEvents()
    }

    this.setBoundries = function (left, right, top, bottom) {
        _this.parentLeft = left;
        _this.parentRight = right;
        _this.parentTop = top;
        _this.parentBottom = bottom;
    }


    this.changePos = function (x, y) {

        console.log(` changing x: ${x}, y : ${y}`)
        _this.childElm.style.left = x;
        _this.childElm.style.top = y;
    }

    function moveHandler(e) {
        if (!_this.isPointerInElm || (_this.parentLeft == null) || (_this.parentRight == null) || (_this.parentTop == null) || (_this.parentBottom == null)) return;
        let x = e.clientX;
        let y = e.clientY;
        console.log( `x : ${x}, y : ${y}`)
        let rect = _this.childElm.getBoundingClientRect();
        // const minX = _this.parentLeft + (rect.width / 2);
        // const maxX = _this.parentRight - (rect.width / 2);
        // const minY = _this.parentTop + (rect.height / 2);
        // const maxY = _this.parentBottom - (rect.height / 2);
        // const valx = Math.min(Math.max(minX, x), maxX);
        // const valy = Math.min(Math.max(minY, y), maxY);
        // let left = (valx - (_this.parentLeft + rect.width / 2)) + "px";
        // let top = (valy - (_this.parentTop + rect.height / 2)) + "px";
        // _this.changePos(left +  _this.parentLeft , top +  _this.parentTop);
        _this.changePos( x ,  y);
    }

    function initializeEvents() {
        _this.childElm.addEventListener('pointerdown', downhandler);
        document.addEventListener('pointerup', uphandler);
        document.addEventListener('pointermove', moveHandler);
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

// let elm = ChildObj();

let pare = new Parent();
let pare2 = new Parent();
pare.creatParent('blue', '1', 'Container');
pare2.creatParent('black', '2', 'Container');
let child1 = new ChildObj();
let child2 = new ChildObj();

child1.creatChildElm(50, 50, 'red', 1);
child2.creatChildElm(50, 50, 'white', 2);

pare.appendChild(child1)
// pare.appendChild( child2 )

pare2.appendChild(child2)



