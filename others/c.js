let array = [];
const maxValue = 9;
const arraySize = 10;

function generateRandomArray() {
    array = Array.from({length: arraySize}, () => Math.floor(Math.random() * (maxValue + 1)));
    updateArrayVisualization();
    updateMessageBox('Random array generated');
}

function updateArrayVisualization() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach(num => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(num / maxValue) * 180 + 20}px`;
        bar.textContent = num;
        container.appendChild(bar);
    });
}

function updateCountVisualization(count) {
    const container = document.getElementById('count-container');
    container.innerHTML = '';
    count.forEach((num, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(num / arraySize) * 180 + 20}px`;
        bar.textContent = num;
        bar.style.backgroundColor = '#e74c3c';
        container.appendChild(bar);
    });
}

function updateMessageBox(message) {
    document.getElementById('message-box').textContent = message;
}

async function countingSort() {
    updateMessageBox('Starting Counting Sort...');

    // Create count array
    const count = new Array(maxValue + 1).fill(0);
    for (let num of array) {
        count[num]++;
    }
    await sleep(1000);
    updateCountVisualization(count);
    updateMessageBox('Counting occurrences...');

    // Calculate cumulative count
    for (let i = 1; i <= maxValue; i++) {
        count[i] += count[i - 1];
    }
    await sleep(1000);
    updateCountVisualization(count);
    updateMessageBox('Calculating cumulative count...');

    // Build the output array
    const output = new Array(arraySize);
    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
        await sleep(500);
        updateArrayVisualization();
        updateCountVisualization(count);
    }

    array = output;
    updateArrayVisualization();
    updateMessageBox('Sorting completed!');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startSort() {
    countingSort();
}

generateRandomArray();