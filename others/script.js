const array = [170, 45, 75, 90, 802, 24, 2, 66];
const container = document.getElementById('array-container');

function createBars() {
    container.innerHTML = '';
    array.forEach(num => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${num}px`;
        bar.textContent = num;
        container.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function radixSort() {
    const max = Math.max(...array);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        await countingSort(exp);
        exp *= 10;
        await sleep(1000);
    }
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
        await sleep(500);
        createBars();
    }
}

function startSort() {
    radixSort();
}

createBars();