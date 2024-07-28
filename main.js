class puzzle {
    constructor(width, height, solution) {
        this.width = width
        this.height = height
        this.solution = solution
    }
    beginPuzzle () {
	let xsections = this.width/5
        let sections = (xsections) * (this.height/5)
        addSections (sections, xsections)
        this.orderElements ()
        this.nameElements ()
//        this.showSolution ()
        inGame = true
        for (let i = 0; i < this.solution.length; i++) {
            solution.push(this.solution[i])
            played.push(0)
        }
    }
    orderElements () {
        let xSections = (this.width/5)
        let ySections = (this.height/5)
        for (let j = 0; j < ySections; j++) {
            for (let k = 0; k < 5; k++) {
                for (let l = 0; l < xSections; l++) {
                    for (let i = 0; i < 5; i++) {
                        let cell = (j*xSections*25) + (k*5) + (l*25) + i
                        cellOrder.push(cell)
                    }
                }
            }
        }
        }
    showSolution () {
        let cells = document.querySelectorAll('span')
        for (let i = 0; i < this.solution.length; i++) {
            const element = cells[(cellOrder[i])]
            if (this.solution[i] == 1){
                element.setAttribute('class', 'marked')
            } 
        }   
}
    nameElements () {
        let cells = document.querySelectorAll('span')
            for (let i = 0; i < this.solution.length; i++) {
            const element = cells[(cellOrder[i])]
                element.setAttribute('name', i)
    }   
}   
    row(y) {
        let row = []
        let yoff = y*this.width
        for (let i = 0; i < this.width; i++) {
            row.push(i+yoff)
        }
        return row
    }
    column(x) {
        let col = []
        let xoff = this.width
        for (let i = 0; i < this.height; i++) {
            col.push(x+(xoff*i))
        }
        return col
    }
    hintGen () {
        for (let i = 0; i < this.width; i++) {
            let column = this.column(i)
            let solutionArray = []
            for (let j = 0; j < this.height; j++) {
                solutionArray.push(this.solution[(column[j])])
            }
            addYHint(calculateHint(solutionArray))
        }
        for (let k = 0; k < this.height; k++) {
            let row = this.row(k)
            let solutionArray = []
            for (let l = 0; l < this.width; l++) {
                solutionArray.push(this.solution[(row[l])])
            }
            addXHint(calculateHint(solutionArray))
        }
    }
}

const cellOrder = [];

let inGame = false;

const board = document.getElementById('gameboard');
const solution = [];
const played = [];
let cells = document.querySelectorAll('span')

function getSolution () {
    return solution
}



function mark(cell) {
    const mycell = cells[cellOrder[cell]]
    let mycellstate = mycell.getAttribute('class')
//    console.log(mycellstate)
//    console.log(cell);
    switch (mycellstate) {
        case null:
        case 'unmarked':
            mycell.setAttribute('class', 'marked');
            played[cell] = 1
//            console.log(getSolution());
//            console.log(played);
            checkCompleted()
            break;
        default:
            mycell.setAttribute('class', 'unmarked');
            played[cell] = 0
    };
} 
function flag(cell) {
    const mycell = cells[cellOrder[cell]]
    let mycellstate = mycell.getAttribute('class')
//    console.log(mycellstate)
    switch (mycellstate) {
        case null:
        case 'unmarked':
            mycell.setAttribute('class', 'flagged');
            played[cell] = 0
            break;
        default:
            mycell.setAttribute('class', 'unmarked');
            played[cell] = 0
    };
} 
function pickcell(e) {
    cells = document.querySelectorAll('span')
    const myCell = e.target.getAttribute("name")
    if (myCell >= 0 && myCell < cells.length) {
    mark(myCell)
    }
} 
function flagcell(e) {
    cells = document.querySelectorAll('span')
    const myCell = e.target.getAttribute("name")
    if (myCell >= 0 && myCell < cells.length) {
//    console.log(e)
    flag(myCell)
    }
}

const easyDW = "./puzzles/10x5/easy.txt"
const easy10 = "./puzzles/10x10/easy.txt"
const easy5 = "./puzzles/5x5/easy.txt"
const easy15 = "./puzzles/15x15/easy.txt"
const medium15 = "./puzzles/15x15/medium.txt"
let puzzles;


function loadDoc(lvl, puzzl) {
    if (inGame) {
    window.location.reload()
    }
    let level = lvl 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(level, p) {
        if (this.readyState == 4 && this.status == 200) {
            puzzles = JSON.parse(this.responseText)
            start(puzzles[puzzl])
       }
    };
    xhttp.open("GET", level, true);
    xhttp.send();
}


function begin() {
    loadDoc(easy10, "fish")                            
}
function start (mypuzzle) {
    const puz = new puzzle(mypuzzle.w, mypuzzle.h, mypuzzle.solution)
    if (inGame == false) {
        puz.beginPuzzle()
        }
        puz.hintGen()
        handleMouse()
}
function handleMouse () {
    board.addEventListener('mousedown', function (e) {
        if (e.button == 2) {
            flagcell (e);
            board.addEventListener('mouseover', dragMouseFlag)
            window.addEventListener('mouseup', function (event) {
                event.preventDefault()
                board.removeEventListener('mouseover', dragMouseFlag)
            })
        }
        else {
            pickcell (e);
            board.addEventListener('mouseover', dragMousePick)
            window.addEventListener('mouseup', function (event) {
                event.preventDefault()
                board.removeEventListener('mouseover', dragMousePick)
            })
        }
    })
    addEventListener('contextmenu', function (e) { 
        e.preventDefault()
    })
    addEventListener('dragstart', function (e) { 
        e.preventDefault()
    })
}
function dragMousePick (ev) {
    pickcell (ev)
}
function dragMouseFlag (ev) {
    flagcell (ev)
}




function addSections (num, xs) {
    let htmlsection = "<div class=\"board-section\"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>"
    for (let i = 0; i < num; i++) {
        board.insertAdjacentHTML("beforeend", htmlsection)
    }
    board.style.maxWidth = (xs*100) + "px"
}

function calculateHint (solution) {
    let hinttxt = ''
    let sequence = 0
	let checkEmpty = true
    for (let i = 0; i < solution.length; i++) {
        const element = solution[i];
        switch (element) {
            case 0:
                if (sequence != 0) {
					hinttxt += "<p>" + (sequence.toString()) + " </p>"
					sequence = 0
                }
                break;
            case 1:
                sequence += 1
				checkEmpty = false
                break;
            default:
                break;
        }   
        if ((i == solution.length-1) && (sequence != 0)) {
            hinttxt += "<p>" + (sequence.toString()) + " </p>"
			checkEmpty = false
        }
    }
	if (checkEmpty == true) {
		hinttxt += "<p>0  </p>"
	}
    return hinttxt
}
function checkCompleted () {
    for (let i = 0; i < solution.length; i++) {
        if (solution[i] !== played[i]) {
            return
        }
    }
    alert('PARABÉNS')
}

function addYHint (hint) {
    const yhints = document.getElementById('yhints');
    const myhint = document.createElement('div');
    myhint.setAttribute('class', 'columnhint');
    myhint.addEventListener('click', function (e) {
        e.preventDefault()
        grayOutHint (e.target)
    });
    myhint.innerHTML = hint;
    yhints.appendChild(myhint)
}
function addXHint (hint) {
    const xhints = document.getElementById('xhints');
    const myhint = document.createElement('div');
    myhint.setAttribute('class', 'rowhint');
    myhint.addEventListener('click', function (e) {
        e.preventDefault()
        grayOutHint (e.target)
    });
    myhint.innerHTML = hint;
    xhints.appendChild(myhint)
}

window.addEventListener('mousedown', function (e) {
    e.preventDefault()
})

function grayOutHint (pelement) {

    pelement.classList.toggle("grayedhint")
}

