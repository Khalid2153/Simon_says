console.log(`hola`)
const green = document.getElementById("green")
const red = document.getElementById("red")
const yellow = document.getElementById("yellow")
const blue = document.getElementById("blue")
const buttonstart = document.getElementById("button_start")
const last_level = 10

class game {
    constructor() {
        debugger
        this.init()
        debugger
        this.startSequence()
        setTimeout(this.next_level, 500)
    }
    
    init() {
        this.togglebutton_start()
        this.level = 1
        this.colors = {
            0: green,
            1: red,
            2: yellow,
            3: blue,
        }
            this.colorsCode = {
            green: 0,
            red: 1,
            yellow: 2,
            blue: 3,
        }
        this.chooseColor = this.chooseColor.bind(this)
        this.nextLvl = this.nextLvl.bind(this)
        this.init = this.init.bind(this)
    }
    togglebutton_start() {
        const status = button_start.classList.contains("hide")
        if (status) {
            button_start.classList.remove("hide")
        } else {
            button_start.classList.add("hide")
        }
    }
    startSequence() {
        debugger
        this.sequence = new Array(last_level)
            .fill(0)
            .map((n) => Math.floor(Math.random() * 4))
    }
    next_level() {
        this.sub_level = 0
        this.lightSequence()
        this.addClickEvent()
    }
    lightColor(numberColor) {
        this.colors[numberColor].classList.add("light")
        setTimeout(() => this.turn_off_color(numberColor), 350)
    }
    turn_off_color(numberColor) {
        this.colors[numberColor].classList.remove("light")
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
        for (let i = 0; i < this.level; i++) {
            this.colors[i].addEventListener(
                "click",
                this.chooseColor
            )
        }
    }
    deleteClickEvent() {
        for (let i = 0; i < 4; i++) {
            this.colors[i].removeEventListener(
                "click",
                this.chooseColor
            )
        }
    }
    chooseColor(evt) {
        const color = evt.target.dataset.color
        const colorCode = this.colorsCode[color]
        this.lightColor(colorCode)
        if (colorCode === this.sequence[this.sub_level]) {
            this.sub_level++
            if (this.sub_level === this.level) {
                this.level++
                this.deleteClickEvent()
                if (this.level === last_level + 1) {
                    this.win()
                } else {
                    setTimeout(this.next_level, 1000)
                }
            }
        } else {
            this.lose()
        }
    }
    win() {
        swal("Simon Says", "You win!", "Success").then(this.init)
    }
    lose() {
        swal("Simon Says", "You lose", "Error").then(() => {
            this.deleteClickEvent()
            this.init()
        })
    }
}

function start_game() {
    window.game = new game()
}