let heap = [];
let sortingIndex;
let sorting = false;
let comparisons = 0;
let swaps = 0;

function initializeHeap() {
    const input = document.getElementById('numberInput').value;
    heap = input.split(' ').map(Number).filter(n => !isNaN(n));
    if (heap.length === 0) {
        alert("Please enter valid numbers!");
        return;
    }
    resetStats();
    buildMaxHeap();
    visualizeHeap();
    updateButtons(true, false, true);
    updateExplanation("Max heap built. Ready to sort!");
}

function generateRandomNumbers() {
    const count = 10;
    heap = Array.from({length: count}, () => Math.floor(Math.random() * 100));
    document.getElementById('numberInput').value = heap.join(' ');
    resetStats();
    buildMaxHeap();
    visualizeHeap();
    updateButtons(true, false, true);
    updateExplanation("Random numbers generated and max heap built. Ready to sort!");
}

function buildMaxHeap() {
    for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
        heapify(heap.length, i);
    }
}

function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    comparisons += 2;
    if (left < n && heap[left] > heap[largest]) {
        largest = left;
    }

    if (right < n && heap[right] > heap[largest]) {
        largest = right;
    }

    if (largest !== i) {
        swaps++;
        [heap[i], heap[largest]] = [heap[largest], heap[i]];
        heapify(n, largest);
    }
}

function startSort() {
    sorting = true;
    sortingIndex = heap.length - 1;
    updateButtons(false, true, true);
    step();
}

function step() {
    if (sortingIndex > 0) {
        swaps++;
        [heap[0], heap[sortingIndex]] = [heap[sortingIndex], heap[0]];
        heapify(sortingIndex, 0);
        sortingIndex--;
        visualizeHeap();
        updateExplanation(`Swapped largest element (${heap[sortingIndex + 1]}) with last unsorted element. Heapifying remaining elements.`);
        updateStats();
    } else {
        sorting = false;
        updateButtons(false, false, true);
        updateExplanation("Heap sort completed!");
    }
}

function visualizeHeap() {
    const heapContainer = document.getElementById('heap');
    heapContainer.innerHTML = '';
    heap.forEach((value, index) => {
        const node = document.createElement('div');
        node.className = 'node';
        if (sorting && index > sortingIndex) {
            node.classList.add('sorted');
        }
        if (index === 0 && sorting) {
            node.classList.add('active');
        }
        node.textContent = value;
        heapContainer.appendChild(node);
    });
}

function updateButtons(sortEnabled, stepEnabled, resetEnabled) {
    document.getElementById('sortButton').disabled = !sortEnabled;
    document.getElementById('stepButton').disabled = !stepEnabled;
    document.getElementById('resetButton').disabled = !resetEnabled;
}

function updateExplanation(text) {
    document.getElementById('explanation').textContent = text;
}

function updateStats() {
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;
}

function resetStats() {
    comparisons = 0;
    swaps = 0;
    updateStats();
}

function reset() {
    heap = [];
    sorting = false;
    resetStats();
    document.getElementById('numberInput').value = '';
    document.getElementById('heap').innerHTML = '';
    updateButtons(false, false, false);
    updateExplanation('');
}