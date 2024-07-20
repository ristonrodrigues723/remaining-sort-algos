let array = [];
let arrayDisplay = document.getElementById('array');
let stepsDisplay = document.getElementById('steps');

function generateArray() {
    array = Array.from({length: 8}, () => Math.floor(Math.random() * 100) + 1);
    updateArrayDisplay();
    addStep("Generated new array: " + array.join(', '));
}

function updateArrayDisplay() {
    arrayDisplay.textContent = array.join(' ');
}

function addStep(step) {
    const stepElement = document.createElement('p');
    stepElement.textContent = step;
    stepsDisplay.appendChild(stepElement);
}

async function startSort() {
    stepsDisplay.innerHTML = '';
    await mergeSort(0, array.length - 1);
    addStep("Sorting completed: " + array.join(', '));
}

async function mergeSort(left, right) {
    if (left >= right) {
        return;
    }
    const mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        k++;
        await sleep(500);
        updateArrayDisplay();
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        i++;
        k++;
        await sleep(500);
        updateArrayDisplay();
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        j++;
        k++;
        await sleep(500);
        updateArrayDisplay();
    }

    addStep(`Merged: ${array.slice(left, right + 1).join(', ')}`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

generateArray();