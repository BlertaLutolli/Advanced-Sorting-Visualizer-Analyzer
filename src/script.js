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