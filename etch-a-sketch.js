let gridContainer = document.querySelector('.grid-container');
let eraseMode = false;
let mouseDown = false;
const INIT_DIM = 16;
let dimension = INIT_DIM;
generateGrid();

document.body.addEventListener('mousedown', (event) => {
    mouseDown = true;
});
document.body.addEventListener('mouseup', (event) => {
    mouseDown = false;
});
let gridSizeButton = document.querySelector('button.size');
let clearButton = document.querySelector('button.clear');
let modeButton = document.querySelector('button.mode');
gridSizeButton.addEventListener('click', () => {
    let dim = null;
    while (true) {
        input = prompt("Enter a new grid size");
        if (!input)
            break;
        dim = parseInt(input);
        if (!dim)
            alert("Enter an integer");
        else if (dim > 100)
            alert("Grid size should not be more than 100");
        else
            break;
    }
    dimension = dim;
    replaceGrid(dim);
});

clearButton.addEventListener('click', () => {
    replaceGrid();
});

modeButton.addEventListener('click', () => {
    if (eraseMode)
        modeButton.textContent = 'Change to erase';
    else
        modeButton.textContent = 'Change to draw';
    eraseMode = !eraseMode;
});

function replaceGrid(dim=dimension) {
    let newGridContainer = document.createElement('div');
    newGridContainer.className = 'grid-container';
    gridContainer.parentNode.replaceChild(newGridContainer, gridContainer);
    gridContainer = newGridContainer;
    generateGrid(dim);
}

function generateGrid(dim=dimension) {
    gridContainer.style.gridTemplateColumns = 'auto '.repeat(dim).trim();
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            let divSquare = document.createElement('div');
            divSquare.className = 'grid-item';
            divSquare.addEventListener('mouseenter', (e) => {
                if (mouseDown) {
                    if (eraseMode)
                        divSquare.classList.remove("pixel-on");
                    else
                        divSquare.classList.add("pixel-on");
                }
            });
            gridContainer.appendChild(divSquare);
        }
    }
}