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