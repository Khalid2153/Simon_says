const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const button_start = document.getElementById("button_start");
const LAST_LEVEL = 10;

class Game {
    constructor() {
        this.init();
        setTimeout(this.nextLvl, 500);
    }
    init() {
        this.togglebutton_start();
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
    togglebutton_start() {
        const status = button_start.classList.contains("hide");
        if (status) {
            button_start.classList.remove("hide");
        } else {
            button_start.classList.add("hide");
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
        this.colors[numberColor].classList.add("light");
        setTimeout(() => this.turnOffColor(numberColor), 350);
    }
    turnOffColor(numberColor) {
        this.colors[numberColor].classList.remove("light");
    }
    lightSequence() {
        for (let i = 0; i < this.level; i++) {
            setTimeout(() => this.lightColor(this.sequence[i]), 1000 * i);
        }
    }
    addClickEvent() {
        for (let i = 0; i < 4; i++) {
            this.colors[i].addEventListener("click", this.chooseColor);
        }
    }
    deleteClickEvent() {
        for (let i = 0; i < 4; i++) {
            this.colors[i].removeEventListener("click", this.chooseColor);
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
        swal("Simon says", "You are the best!", "success").then(this.init);
    }
    lose() {
        swal("Simon says", "Ups, try again! ", "error").then(() => {
            this.deleteClickEvent();
            this.init();
        });
    }
}

function beginGame() {
    window.game = new Game();
}