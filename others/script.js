let array = [170, 45, 75, 90, 802, 24, 2, 66];
let sortingSpeed = 50;
let sortingSteps = [];
let currentStep = -1;
const container = document.getElementById('array-container');
const infoElement = document.getElementById('info');

function setArray() {
    const input = document.getElementById('number-input').value;
    array = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    reset();
}

function createBars() {
    container.innerHTML = '';
    const maxNum = Math.max(...array);
    array.forEach(num => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(num / maxNum) * 280}px`;
        bar.textContent = num;
        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function radixSort() {
    sortingSteps = [array.slice()];
    const max = Math.max(...array);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        await countingSort(exp);
        exp *= 10;
        await sleep(2000 - sortingSpeed * 19);
    }
    infoElement.textContent = "Sorting completed!";
}

async function countingSort(exp) {
    const output = new Array(array.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < array.length; i++) {
        count[Math.floor(array[i] / exp) % 10]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
        count[Math.floor(array[i] / exp) % 10]--;
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
        sortingSteps.push(array.slice());
        await sleep(2000 - sortingSpeed * 19);
        createBars();
    }

    infoElement.textContent = `Sorted by ${exp}'s place`;
}

function startSort() {
    radixSort();
    document.getElementById('step-forward').disabled = false;
    document.getElementById('step-back').disabled = true;
}

function reset() {
    createBars();
    sortingSteps = [];
    currentStep = -1;
    infoElement.textContent = '';
    document.getElementById('step-forward').disabled = false;
    document.getElementById('step-back').disabled = true;
}

function stepForward() {
    if (currentStep < sortingSteps.length - 1) {
        currentStep++;
        array = sortingSteps[currentStep].slice();
        createBars();
        document.getElementById('step-back').disabled = false;
        if (currentStep === sortingSteps.length - 1) {
            document.getElementById('step-forward').disabled = true;
        }
    }
}

function stepBackward() {
    if (currentStep > 0) {
        currentStep--;
        array = sortingSteps[currentStep].slice();
        createBars();
        document.getElementById('step-forward').disabled = false;
        if (currentStep === 0) {
            document.getElementById('step-back').disabled = true;
        }
    }
}

document.getElementById('speed-slider').addEventListener('input', function() {
    sortingSpeed = this.value;
});

reset();