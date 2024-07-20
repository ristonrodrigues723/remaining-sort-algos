let array = [];
const arrayContainer = document.getElementById('array-container');

function generateArray() {
    array = [];
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function displayArray() {
    arrayContainer.innerHTML = '';
    const maxValue = Math.max(...array);
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(value / maxValue) * 280}px`;
        arrayContainer.appendChild(bar);
    });
}

async function startSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = '#e74c3c';
        
        await new Promise(resolve => setTimeout(resolve, 100));

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = bars[j].style.height;
            bars[j].style.backgroundColor = '#e74c3c';
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            bars[j].style.backgroundColor = '#3498db';
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${(key / Math.max(...array)) * 280}px`;
        bars[i].style.backgroundColor = '#3498db';
    }
}

generateArray();