alert("RULES \nFollow the color pattern to win.")
const green = document.getElementById(`green`);
const red = document.getElementById(`red`);
const yellow = document.getElementById(`yellow`);
const blue = document.getElementById(`blue`);
const buttonStart = document.getElementById(`buttonStart`);
const LAST_LEVEL = 7;
const list = document.getElementById('orderedList');
var level = document.getElementById("level")

class Game {
    constructor() {
        this.init();
        setTimeout(this.nextLvl, 500);
    }
    init() {
        this.togglebuttonStart();
        this.level = 1;
        this.colors = {
            0: green,
            1: red,
            2: yellow,
            3: blue,
        };
        this.colorsCode = {
            green: 0,
            red: 1,
            yellow: 2,
            blue: 3,
        };
        this.chooseColor = this.chooseColor.bind(this);
        this.nextLvl = this.nextLvl.bind(this);
        this.init = this.init.bind(this);
        this.startSequence();
    }
    togglebuttonStart() {
        const status = buttonStart.classList.contains(`hide`);
        if (status) {
            buttonStart.classList.remove(`hide`);
        } else {
            buttonStart.classList.add(`hide`);
        }
    }
    startSequence() {
        this.sequence = new Array(LAST_LEVEL)
            .fill(0)
            .map((n) => Math.floor(Math.random() * 4));
    }
    nextLvl() {
        this.sublvl = 0;
        this.lightSequence();
        this.addClickEvent();
    }
    lightColor(numberColor) {
        this.colors[numberColor].classList.add(`light`);
        setTimeout(() => this.turnOffColor(numberColor), 350);
    }
    turnOffColor(numberColor) {
        this.colors[numberColor].classList.remove(`light`);
    }
    lightSequence() {
        for (let i = 0; i < this.level; i++) {
            setTimeout(() => this.lightColor(this.sequence[i]), 1000 * i);
        }
    }
    addClickEvent() {
        for (let i = 0; i < 4; i++) {
            this.colors[i].addEventListener(`click`, this.chooseColor);
        }
    }
    deleteClickEvent() {
        for (let i = 0; i < 4; i++) {
            this.colors[i].removeEventListener(`click`, this.chooseColor);
        }
    }
    chooseColor(evt) {
        const color = evt.target.dataset.color;
        const colorCode = this.colorsCode[color];
        this.lightColor(colorCode);
        if (colorCode === this.sequence[this.sublvl]) {
            this.sublvl++;
            if (this.sublvl === this.level) {
                this.level++;
                level.innerHTML=`Nivel : ${this.level}`;
                this.deleteClickEvent();
                if (this.level === LAST_LEVEL + 1) {
                    this.win();
                } else {
                    setTimeout(this.nextLvl, 1000);
                }
            }
        } else {
            this.lose();
        }
    }
    win() {
        swal(`Simon says`, `You are the best!`, `success`).then(()=>{
            this.init();
            list.innerHTML+=`<li>You won uwu</li>`;
            level.innerHTML=`Nivel : 1`;
        });     
    }
    lose() {
        swal(`Simon says`, `Ups, try again!`, `error`).then(() => {
            this.deleteClickEvent();
            this.init();
            list.innerHTML+=`<li>You lost uu</li>`;
            level.innerHTML=`Nivel : 1`;
        });
    }
}

function beginGame() {
    window.game = new Game();
}