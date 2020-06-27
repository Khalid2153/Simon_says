const lightBlue = document.getElementById('lightBlue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnStart = document.getElementById('btn-start')
const LAST_LEVEL = 10

class Game {
    constructor() {
        this.init()
        setTimeout(this.nextLvl, 500)
    }
    init() {
        this.toggleBtnStart()
        this.level = 1
        this.colors = {
            0: lightBlue,
            1: violet,
            2: orange,
            3: green,
        }
        this.colorsCode = {
            lightBlue: 0,
            violet: 1,
            orange: 2,
            green: 3,
        }

        this.chooseColor = this.chooseColor.bind(this)
        this.nextLvl = this.nextLvl.bind(this)
        this.init = this.init.bind(this)
        this.startSequence()
    }
    toggleBtnStart() {
        const status = btnStart.classList.contains('hide')
        if (status) {
            btnStart.classList.remove('hide')
        } else {
            btnStart.classList.add('hide')
        }
    }
    startSequence() {
        this.sequence = new Array(LAST_LEVEL)
            .fill(0)
            .map((n) => Math.floor(Math.random() * 4))
    }
    nextLvl() {
        this.sublvl = 0
        this.lightSequence()
        this.addClickEvent()
    }
    lightColor(numberColor) {
        this.colors[numberColor].classList.add('light')
        setTimeout(() => this.turnOffColor(numberColor), 350)
    }
    turnOffColor(numberColor) {
        this.colors[numberColor].classList.remove('light')
    }
    lightSequence() {
        for (let i = 0; i < this.level; i++) {
            setTimeout(
                () => this.lightColor(this.sequence[i]),
                1000 * i
            )
        }
    }
    addClickEvent() {
        for (let i = 0; i < 4; i++) {
            this.colors[i].addEventListener(
                'click',
                this.chooseColor
            )
        }
    }
    deleteClickEvent() {
        for (let i = 0; i < 4; i++) {
            this.colors[i].removeEventListener(
                'click',
                this.chooseColor
            )
        }
    }
    chooseColor(evt) {
        // In this context, "this" represent the class that
        // causes the event to fire. So, in order to don't lose
        // reference to the class game, we have to use "bind(this)".
        // console.log(this)

        const color = evt.target.dataset.color
        const colorCode = this.colorsCode[color]
        this.lightColor(colorCode)
        if (colorCode === this.sequence[this.sublvl]) {
            this.sublvl++
            if (this.sublvl === this.level) {
                this.level++
                this.deleteClickEvent()
                if (this.level === LAST_LEVEL + 1) {
                    this.win()
                } else {
                    setTimeout(this.nextLvl, 1000)
                }
            }
        } else {
            this.lose()
        }
    }
    win() {
        swal('Simon says', 'You win!', 'success').then(this.init)
    }
    lose() {
        swal('Simon says', 'You lose!', 'error').then(() => {
            this.deleteClickEvent()
            this.init()
        })
    }
}

function beginGame() {
    window.game = new Game()
}