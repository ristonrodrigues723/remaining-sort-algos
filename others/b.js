let numbers = [];
const barContainer = document.getElementById('bar-container');
const numberContainer = document.getElementById('number-container');
const numberInput = document.getElementById('numberInput');
const addBtn = document.getElementById('addBtn');
const sortBtn = document.getElementById('sortBtn');
const clearBtn = document.getElementById('clearBtn');
const messageBox = document.getElementById('massage');

addBtn.addEventListener('click', addNumber);
sortBtn.addEventListener('click', startSort);
clearBtn.addEventListener('click', clearNumbers);

function addNumber() {
    const num = parseInt(numberInput.value);
    if (!isNaN(num)) {
        numbers.push(num);
        updateVisualization();
        numberInput.value = '';
    }
}

function updateVisualization() {
    barContainer.innerHTML = '';
    numberContainer.innerHTML = '';
    const maxHeight = 280;
    const maxNum = Math.max(...numbers, 1);
    numbers.forEach(num => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(num / maxNum) * maxHeight}px`;
        barContainer.appendChild(bar);

        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.textContent = num;
        numberContainer.appendChild(numberDiv);
    });
}

async function startSort() {
    sortBtn.disabled = true;
    addBtn.disabled = true;
    clearBtn.disabled = true;

    const bars = document.getElementsByClassName('bar');
    const numberDivs = document.getElementsByClassName('number');

    // Display numbers before sorting
    messageBox.innerHTML = `<p>Numbers before sorting: ${numbers.join(', ')}</p>`;

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length - i - 1; j++) {
            bars[j].style.backgroundColor = '#e74c3c';
            bars[j + 1].style.backgroundColor = '#e74c3c';
            await new Promise(resolve => setTimeout(resolve, 500));

            if (numbers[j] > numbers[j + 1]) {
                [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
                updateVisualization();
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            bars[j].style.backgroundColor = '#3498db';
            bars[j + 1].style.backgroundColor = '#3498db';
        }
        bars[numbers.length - i - 1].style.backgroundColor = '#2ecc71';
        numberDivs[numbers.length - i - 1].style.color = '#2ecc71';
    }

    // Display numbers after sorting
    messageBox.innerHTML += `<p>Numbers after sorting: ${numbers.join(', ')}</p>`;

    sortBtn.disabled = false;
    addBtn.disabled = false;
    clearBtn.disabled = false;
}

function clearNumbers() {
    numbers = [];
    updateVisualization();
    messageBox.innerHTML = '';
}