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
let comparisonCount = 0; // Track the number of comparisons




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
    isRunning = false; 
    playButton.textContent = "Play"; 

    // Reset all counts and times
    swapCount = 0;
    comparisonCount = 0; 
    elapsedTime = 0; 

    // Reinitialize the array
    array = [];
    for (let i = 0; i < barCount; i++) {
        array.push(Math.floor(Math.random() * 100) + 10);
    }

    // Clear the visualization
    renderArray();
    
    // Update the report with reset values
    updateReport(
        algorithms[currentAlgorithm].name,
        elapsedTime,
        swapCount,
        comparisonCount
    );
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
        // Pause sorting
        isRunning = false;
        playButton.textContent = "Play";

        // Accumulate elapsed time
        endTime = performance.now();
        elapsedTime += endTime - startTime;

    } else {
        // Check if the array is already sorted
        if (isSorted(array)) {
            alert("The array is already sorted!");
            updateReport(
                algorithms[currentAlgorithm].name,
                elapsedTime,
                swapCount,
                comparisonCount
            );
            return; // Prevent sorting from running
        }

        // Start sorting
        isRunning = true;
        playButton.textContent = "Stop";

        // Record start time
        startTime = performance.now();

        // Execute the sorting function
        await algorithms[currentAlgorithm].function();

        if (!isRunning) {
            // Update elapsed time when sorting completes
            endTime = performance.now();
            elapsedTime += endTime - startTime;
        }

        // Update the report after sorting
        updateReport(
            algorithms[currentAlgorithm].name,
            elapsedTime,
            swapCount,
            comparisonCount
        );

        isRunning = false;
        playButton.textContent = "Play";
    }
}


function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}



// Ensure swaps are counted correctly
function swap(arr, i, j) {
    if (i !== j) { // Only count swaps if indices are different
        [arr[i], arr[j]] = [arr[j], arr[i]];
        swapCount++; // Increment swap count
    }
}


// Update Report Function
function updateReport(algorithmName, elapsedTime, swapCount, comparisonCount) {
    const reportSection = document.getElementById("report-section");

    if (!reportSection) {
        console.error("Report section not found in the DOM.");
        return;
    }

    // Clear previous report content
    reportSection.innerHTML = "";

    // Create and append the updated report
    const reportEntry = document.createElement("div");
    reportEntry.classList.add("report-entry");
    reportEntry.innerHTML = `
        <h2>Algorithm Report</h2>
        <div><strong>${algorithmName}</strong></div>
        <div>Time Taken: ${elapsedTime.toFixed(2)} ms</div>
        <div>Swap Count: ${swapCount}</div>
        <div>Comparison Count: ${comparisonCount}</div>
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
    swapCount = 0;  // Reset swap count
    comparisonCount = 0;  // Reset comparison count
    renderArray();
    isRunning = false; // Stop any ongoing sorting
    playButton.textContent = "Play"; // Reset Play button state
});


// Sorting Algorithms

// Quick Sort
// Quick Sort
async function quickSort(low = 0, high = array.length - 1) {
    if (!isRunning) return;  // Check if stopped
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
    renderArray();  // Ensure rendering
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (!isRunning) return;  // Stop on play/stop
        comparisonCount++;  // Count comparisons

        if (array[j] < pivot) {
            i++;
            if (i !== j) {
                [array[i], array[j]] = [array[j], array[i]];
                swapCount++;
            }
            renderArray([i, j]);  // Highlight current bars
            await wait(speedSlider.value);
        }
    }

    if (i + 1 !== high) {
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        swapCount++;
    }

    renderArray([i + 1, high]);  // Show final pivot position
    await wait(speedSlider.value);  // Wait for animation
    return i + 1;
}



// Heap Sort
async function heapSort() {
    let n = array.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        if (!isRunning) return;

        [array[0], array[i]] = [array[i], array[0]];
        swapCount++; // Increment swap count
        renderArray([0, i]);
        await wait(speedSlider.value);
        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n) {
        comparisonCount++; // Increment comparison count
        if (array[left] > array[largest]) largest = left;
    }
    if (right < n) {
        comparisonCount++; // Increment comparison count
        if (array[right] > array[largest]) largest = right;
    }
    
    if (largest !== i) {
        if (!isRunning) return;

        [array[i], array[largest]] = [array[largest], array[i]];
        swapCount++; // Increment swap count
        renderArray([i, largest]);
        await wait(speedSlider.value);
        await heapify(n, largest);
    }
}

// Merge Sort
async function mergeSort(left = 0, right = array.length - 1) {
    if (!isRunning) return;

    if (left < right) {
        let mid = Math.floor((left + right) / 2);
        await mergeSort(left, mid);
        await mergeSort(mid + 1, right);
        await merge(left, mid, right);
    }
}

async function merge(left, mid, right) {
    let temp = array.slice(left, right + 1);
    let i = 0, j = mid - left + 1, k = left;

    while (i <= mid - left && j < temp.length) {
        comparisonCount++; // Increment comparison count

        if (!isRunning) return;

        if (temp[i] <= temp[j]) {
            array[k++] = temp[i++];
        } else {
            array[k++] = temp[j++];
            swapCount++; // Increment swap count (for merge counts)
        }
        renderArray([k - 1]);
        await wait(speedSlider.value);
    }

    while (i <= mid - left) {
        if (!isRunning) return;

        array[k++] = temp[i++];
        renderArray([k - 1]);
        await wait(speedSlider.value);
    }

    while (j < temp.length) {
        if (!isRunning) return;

        array[k++] = temp[j++];
        renderArray([k - 1]);
        await wait(speedSlider.value);
    }
}


// Radix Sort
// Radix Sort
async function radixSort() {
    let max = Math.max(...array);  // Find maximum value
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        if (!isRunning) return;  // Stop on play/stop
        await countingSort(exp);
    }
    renderArray();  // Final render
}

async function countingSort(exp) {
    let n = array.length;
    let output = new Array(n).fill(0);
    let count = new Array(10).fill(0);

    // Count occurrences
    for (let i = 0; i < n; i++) {
        if (!isRunning) return;  // Stop on play/stop
        let digit = Math.floor(array[i] / exp) % 10;
        count[digit]++;
        comparisonCount++;  // Count comparisons
        renderArray([i]);  // Highlight bar
        await wait(speedSlider.value);  // Animation delay
    }

    // Cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        if (!isRunning) return;  // Stop on play/stop
        let digit = Math.floor(array[i] / exp) % 10;
        output[count[digit] - 1] = array[i];
        count[digit]--;
    }

    // Copy to original array
    for (let i = 0; i < n; i++) {
        if (array[i] !== output[i]) {
            swapCount++;  // Count swaps
        }
        array[i] = output[i];
        renderArray([i]);  // Show updated bar
        await wait(speedSlider.value);  // Animation delay
    }
}

// Algorithm Selection
function setAlgorithm(algorithmKey) {
    isRunning = false; // Stop any running algorithm
    playButton.textContent = "Play"; // Reset button text
    currentAlgorithm = algorithmKey;

    const { name, description } = algorithms[algorithmKey];
    algorithmTitle.textContent = name;
    algorithmDescription.textContent = description;

    // Reset metrics
    swapCount = 0;  
    comparisonCount = 0;  

    // Update time complexity values
    document.getElementById("best-time").textContent = timeComplexities[algorithmKey].best;
    document.getElementById("average-time").textContent = timeComplexities[algorithmKey].average;
    document.getElementById("worst-time").textContent = timeComplexities[algorithmKey].worst;

    // Highlight active algorithm
    document.querySelectorAll(".sidebar ul li").forEach(li => li.classList.remove("active"));
    document.getElementById(algorithmKey).classList.add("active");

    // Clear the report section
    const reportSection = document.getElementById("report-section");
    if (reportSection) {
        reportSection.innerHTML = ""; // Clear the contents
    }

    initializeArray(); // Reinitialize the array
}



// Event Listeners
playButton.addEventListener("click", handlePlayStop);
resetButton.addEventListener("click", initializeArray);
document.getElementById("quick-sort").addEventListener("click", () => setAlgorithm("quick-sort"));
document.getElementById("heap-sort").addEventListener("click", () => setAlgorithm("heap-sort"));
document.getElementById("radix-sort").addEventListener("click", () => setAlgorithm("radix-sort"));
document.getElementById("merge-sort").addEventListener("click", () => setAlgorithm("merge-sort"));

// Initialize
initializeArray();
