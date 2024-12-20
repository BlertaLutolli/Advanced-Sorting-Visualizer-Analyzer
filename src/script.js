// Global DOM Elements
const visualization = document.getElementById("visualization");
const playButton = document.getElementById("play");
const resetButton = document.getElementById("reset");
const speedSlider = document.getElementById("speed");
const algorithmTitle = document.getElementById("algorithm-title");
const algorithmDescription = document.getElementById("algorithm-description");
const setArrayButton = document.getElementById("set-array");
const customArrayInput = document.getElementById("custom-array");
const timeComplexities = {
    "quick-sort": { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    "merge-sort": { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "heap-sort": { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "radix-sort": { best: "O(nk)", average: "O(nk)", worst: "O(nk)" },
};

// Global Variables
let array = [];
const barCount = 50;
let isRunning = false; // Control flag
let currentAlgorithm = "quick-sort"; // Default algorithm
let swapCount = 0;
let elapsedTime = 0;

let startTime = 0;
let endTime = 0;

// Algorithms List
const algorithms = {
    "quick-sort": { name: "Quick Sort", description: "Quick Sort partitions the array recursively.", function: quickSort },
    "heap-sort": { name: "Heap Sort", description: "Heap Sort uses a binary heap to sort elements.", function: heapSort },
    "radix-sort": { name: "Radix Sort", description: "Radix Sort sorts elements digit by digit.", function: radixSort },
    "merge-sort": { name: "Merge Sort", description: "Merge Sort divides and merges sorted arrays.", function: mergeSort },
};

// Utility Functions
function wait(speed) {
    return new Promise(resolve => setTimeout(resolve, 500 / speed));
}

// Initialize Array
function initializeArray() {
    isRunning = false; // Stop any running process
    playButton.textContent = "Play"; // Reset Play button
    array = [];
    for (let i = 0; i < barCount; i++) {
        array.push(Math.floor(Math.random() * 100) + 10);
    }
    renderArray();
}

// Render Array to Visualization
function renderArray(highlightIndices = []) {
    visualization.innerHTML = ""; // Clear previous bars
    array.forEach((height, index) => {
        const bar = document.createElement("div");
        bar.style.height = `${height}%`;
        bar.textContent = height; // Display the number at the bottom
        bar.style.backgroundColor = highlightIndices.includes(index) ? "yellow" : "#10d684";
        visualization.appendChild(bar);
    });
}

// Play/Stop Button Logic
// Utility function to check if the array is sorted
function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}

// Play/Stop Button Logic
async function handlePlayStop() {
    if (isRunning) {
        isRunning = false; // Stop execution
        playButton.textContent = "Play";
    } else {
        // Check if the array is already sorted
        if (isSorted(array)) {
            alert("The array is already sorted!");
            swapCount = 0; // Reset swap count to 0
            updateReport(algorithms[currentAlgorithm].name, 0, swapCount);
            return;
        }

        isRunning = true;
        playButton.textContent = "Stop";

        // Reset swap count and time
        swapCount = 0;
        startTime = performance.now();

        await algorithms[currentAlgorithm].function();

        endTime = performance.now();
        elapsedTime = endTime - startTime;

        updateReport(algorithms[currentAlgorithm].name, elapsedTime, swapCount);

        isRunning = false;
        playButton.textContent = "Play";
    }
}

// Ensure swaps are counted correctly
function swap(arr, i, j) {
    if (i !== j) { // Only count swaps if indices are different
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swapCount++; // Increment swap count
    }
}

// Update Report Function
// Update Report Function
function updateReport(algorithmName, elapsedTime, swapCount) {
    console.log(`Updating report for ${algorithmName}`); // Debugging
    console.log(`Time: ${elapsedTime}, Swaps: ${swapCount}`); // Debugging

    const reportSection = document.getElementById("report-section");

    if (!reportSection) {
        console.error("Report section not found in the DOM.");
        return;
    }

    // Clear the previous report
    reportSection.innerHTML = "";

    // Create and append the new report
    const reportEntry = document.createElement("div");
    reportEntry.classList.add("report-entry");
    reportEntry.innerHTML = `
        <h2>Algorithm Report</h2>
        <div><strong>${algorithmName}</strong></div>
        <div>Time Taken: ${elapsedTime.toFixed(2)} ms</div>
        <div>Swap Count: ${swapCount}</div>
    `;

    reportSection.appendChild(reportEntry);
}


// Set Array Button
setArrayButton.addEventListener("click", () => {
    const input = customArrayInput.value.trim(); // Get user input and trim spaces
    if (input === "") {
        alert("Please enter numbers separated by commas (e.g., 10, 20, 30)");
        return;
    }

    const inputArray = input.split(",").map(num => Number(num.trim())).filter(num => !isNaN(num) && num > 0);
    if (inputArray.length < 2) {
        alert("Please enter at least two valid numbers separated by commas.");
        return;
    }

    array = inputArray;
    renderArray();
    isRunning = false; // Stop any ongoing sorting
    playButton.textContent = "Play"; // Reset Play button state
});
// Sorting Algorithms

// Quick Sort
async function quickSort(low = 0, high = array.length - 1) {
    if (!isRunning) return;

    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
    renderArray();
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            if (i !== j) { // Only swap if indices are different
                [array[i], array[j]] = [array[j], array[i]];
                swapCount++;
            }
            renderArray([i, j]); // Visualization
            await wait(speedSlider.value);
        }
    }
    if (i + 1 !== high) { // Swap pivot only if it's not in the correct position
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        swapCount++;
    }
    renderArray([i + 1, high]); // Visualization
    return i + 1;
}


