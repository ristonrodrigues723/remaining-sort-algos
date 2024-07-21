let array = [8, 3, 2, 5, 1, 7, 6, 4];
let sortingSpeed = 50;
let sortingSteps = [];
let currentStep = -1;
const container = document.getElementById('array-container');

function addElement() {
    const input = document.getElementById('number-input');
    const num = parseInt(input.value.trim());
    if (!isNaN(num) && num >= 0 && num <= 9) {
        array.push(num);
        input.value = '';
        reset();
    }
}

function removeElement() {
    if (array.length > 0) {
        array.pop();
        reset();
    }
}

function generateRandomArray() {
    const size = Math.floor(Math.random() * 10) + 5; // 5 to 14 elements
    array = Array.from({length: size}, () => Math.floor(Math.random() * 10)); // 0 to 9
    reset();
}

function clearArray() {
    array = [];
    reset();
}

function createBars() {
    container.innerHTML = '';
    const maxNum = Math.max(...array, 1);
    array.forEach((num, index) => {
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

async function countingSort() {
    sortingSteps = [array.slice()];
    const max = Math.max(...array);
    const count = new Array(max + 1).fill(0);
    const output = new Array(array.length);

    // Count occurrences
    for (let i = 0; i < array.length; i++) {
        count[array[i]]++;
        sortingSteps.push([...array, ...count]);
        await sleep(2000 - sortingSpeed * 19);
        updateBars([...array, ...count]);
    }

    // Calculate cumulative count
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
        sortingSteps.push([...array, ...count]);
        await sleep(2000 - sortingSpeed * 19);
        updateBars([...array, ...count]);
    }

    // Build output array
    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
        sortingSteps.push([...output, ...count]);
        await sleep(2000 - sortingSpeed * 19);
        updateBars([...output, ...count]);
    }

    // Copy output to original array
    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
    }
    sortingSteps.push([...array]);
    updateBars(array);
}

function updateBars(currentArray) {
    const bars = document.querySelectorAll('.bar');
    const maxNum = Math.max(...currentArray);
    currentArray.forEach((num, index) => {
        if (index < bars.length) {
            bars[index].style.height = `${(num / maxNum) * 280}px`;
            bars[index].textContent = num;
            bars[index].classList.add('highlight');
            setTimeout(() => bars[index].classList.remove('highlight'), 300);
        }
    });
}

function startSort() {
    countingSort();
}

function reset() {
    createBars();
    sortingSteps = [];
    currentStep = -1;
}

document.getElementById('speed-slider').addEventListener('input', function() {
    sortingSpeed = this.value;
});

reset();