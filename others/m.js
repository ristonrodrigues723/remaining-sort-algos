let array = [];
let arrayDisplay = document.getElementById('array');
let stepsDisplay = document.getElementById('steps');
let sortingProcess = null;
let sortingStep = 0;

function generateArray() {
    const size = parseInt(document.getElementById('arraySize').value);
    array = Array.from({length: size}, () => Math.floor(Math.random() * 100) + 1);
    updateArrayDisplay();
    addStep("Generated new array: " + array.join(', '));
    document.getElementById('stepButton').disabled = true;
    sortingStep = 0;
}

function updateArrayDisplay() {
    arrayDisplay.innerHTML = '';
    array.forEach((value, index) => {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.textContent = value;
        element.id = `element-${index}`;
        arrayDisplay.appendChild(element);
    });
}

function addStep(step) {
    const stepElement = document.createElement('p');
    stepElement.textContent = step;
    stepsDisplay.appendChild(stepElement);
    stepsDisplay.scrollTop = stepsDisplay.scrollHeight;
}

async function startSort() {
    stepsDisplay.innerHTML = '';
    sortingProcess = mergeSort(0, array.length - 1);
    document.getElementById('stepButton').disabled = false;
    await stepSort();
}

async function stepSort() {
    if (sortingProcess) {
        const result = await sortingProcess.next();
        if (result.done) {
            addStep("Sorting completed!");
            document.getElementById('stepButton').disabled = true;
            sortingProcess = null;
        }
    }
}

async function* mergeSort(left, right) {
    if (left >= right) {
        return;
    }
    const mid = Math.floor((left + right) / 2);
    yield* mergeSort(left, mid);
    yield* mergeSort(mid + 1, right);
    yield* merge(left, mid, right);
}

async function* merge(left, mid, right) {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        highlightElements([left + i, mid + 1 + j]);
        await new Promise(resolve => setTimeout(resolve, 500));

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        updateElement(k, array[k]);
        k++;
        yield;
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        updateElement(k, array[k]);
        i++;
        k++;
        yield;
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        updateElement(k, array[k]);
        j++;
        k++;
        yield;
    }

    for (let index = left; index <= right; index++) {
        document.getElementById(`element-${index}`).classList.add('sorted');
    }

    addStep(`Merged: ${array.slice(left, right + 1).join(', ')}`);
}

function highlightElements(indices) {
    document.querySelectorAll('.array-element').forEach(el => el.classList.remove('highlight'));
    indices.forEach(index => {
        document.getElementById(`element-${index}`).classList.add('highlight');
    });
}

function updateElement(index, value) {
    const element = document.getElementById(`element-${index}`);
    element.textContent = value;
    element.classList.add('highlight');
    setTimeout(() => element.classList.remove('highlight'), 300);
}

generateArray();