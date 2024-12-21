# Advanced-Sorting-Visualizer-Analyzer

## Project Overview

The **Sorting Algorithm Visualizer** is a web-based tool designed to help users understand and visualize the workings of different sorting algorithms. Sorting is a fundamental concept in computer science, and various algorithms have been developed to handle sorting tasks efficiently under different conditions. This project allows users to observe how sorting algorithms such as **Quick Sort**, **Merge Sort**, **Heap Sort**, and **Radix Sort** work in real-time by visualizing the sorting process.

### **Purpose**
Sorting algorithms play a crucial role in many aspects of computing, from organizing data to improving the performance of other algorithms. However, learning how each sorting algorithm works and understanding its efficiency can be challenging for beginners. The Sorting Algorithm Visualizer aims to make these algorithms more approachable by providing a **dynamic and interactive visual experience**. 

By observing the steps of each algorithm in action, users can better grasp concepts such as element swapping, partitioning, merging, and heapifying. Additionally, this tool enables users to compare different sorting algorithms based on their behavior, efficiency, and time complexities.

### **Target Audience**
This project is aimed at **students**, **programming enthusiasts**, and anyone looking to better understand sorting algorithms. Whether you're a beginner just starting with algorithms or an experienced developer, this tool provides a hands-on way to visualize and learn how sorting algorithms function and how their performance compares across different cases.

### **Key Features**
- *Real-time visualization*: watch how different sorting algorithms manipulate data step by step.

https://github.com/user-attachments/assets/efe43a71-1610-4a55-9d3d-9ff58dfb30fa


- *Customizable array input*: input your own array of numbers to see how the algorithm sorts them.![user input](https://github.com/user-attachments/assets/6c4a3338-bdc6-4a53-bdc6-8a6f44b2cb20)

- *Adjustable speed*: control the speed of the visualizations to slow down or speed up the sorting process for better understanding.![speed](https://github.com/user-attachments/assets/680c9efd-9b84-4eae-9e27-6a40895ef9f6)

- *Time complexity information*: view the time complexities of each algorithm in the best, average, and worst-case scenarios.
- *Algorithm comparison*: easily compare the sorting algorithms and their efficiency with different input sizes and values.![algorithm report](https://github.com/user-attachments/assets/50dde727-20b8-4c47-b934-d0a18071e565)

## Setup Instructions

Before getting started, make sure you have the following installed:
- A modern web browser (Chrome, Firefox, Safari, etc.).
- A text editor (VSCode, Sublime Text, etc.) to modify the code (optional).

To set up the project, follow these steps:

Copy code
git clone https://github.com/BlertaLutolli/Advanced-Sorting-Visualizer-Analyzer

2.Open the project folder: navigate to the folder where the project was cloned.
bash
Copy code
cd sorting-algorithm-visualizer

3.Open the project in a browser: open the index.html file in your browser to start using the visualizer.
bash
Copy code
open index.html  # For macOS
start index.html # For Windows
Or, simply drag and drop the index.html file into your browser window.

4.Custom array input: You can enter a custom array by typing comma-separated numbers into the input box and clicking Set Array. The algorithm will then visualize the sorting process for that array.

## How to Use the Visualizer

**Choose an algorithm:** In the sidebar, select one of the algorithms (Quick Sort, Merge Sort, Heap Sort, Radix Sort) by clicking on the respective algorithm name. This will update the main content with the algorithm’s description, time complexities, and visualization.

**Play/Pause:** Click the Play button to start the sorting algorithm. The visualization will show the algorithm in action, with bars representing the array elements. Click Stop to pause the algorithm.

**Reset:** Click the Reset button to reset the array and start over.

**Speed control:** Use the slider to adjust the speed of the sorting process. The higher the value, the faster the sorting will happen.

**Time complexity:** Click on the Time Complexity button to view the best, average, and worst-case time complexities for the selected algorithm.

**Algorithm report:** Once the sorting is completed, the Algorithm Report section will display the time taken to sort the array and the number of swaps performed.
  
## Sorting algorithms explained

## Radix Sort
Radix Sort sorts numbers digit by digit, starting from the least significant digit to the most significant. It uses a stable sub-sorting algorithm (like counting sort) for each digit.

- *Best time complexity: O(nk)
- *Average time complexity: O(nk)
- *Worst time complexity: O(nk)
Where n is the number of elements and k is the range of the digits.

## Quick Sort

Quick Sort is a divide-and-conquer algorithm. It selects a "pivot" element and partitions the array into two sub-arrays:
Elements less than the pivot.
Elements greater than or equal to the pivot.
The algorithm recursively applies the same logic to the sub-arrays, sorting them in the process.

-Key steps in Quick Sort:
Pivot selection: choose an element as the pivot (e.g., the first, last, or a random element).
Partitioning: rearrange the array so that elements smaller than the pivot are to its left, and those greater are to its right.
Recursive sorting: recursively apply Quick Sort to the left and right sub-arrays.

-Complexity of Quick Sort:
Best case time complexity: O(n log n) (Occurs when the pivot divides the array into two equal parts).
Average case time complexity: O(n log n).
Worst case time complexity: O(n^2) (Occurs when the pivot is the smallest or largest element, leading to unbalanced partitions).
Space complexity: O(log n) for recursive stack calls in the best case; O(n) in the worst case.

## Heap Sort
Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure to sort elements.Here's how it works:

-Build a Max-Heap:
arrange the input array into a max-heap, where the largest element is at the root (index 0).

-Swap and heapify:
swap the root (maximum element) with the last element of the heap.
Reduce the heap size (exclude the last element, as it's now in its correct position).
Restore the heap property by re-heapifying the remaining heap (using a process called heapify).

-Repeat:
continue swapping the root with the last element and re-heapifying until the heap size is reduced to 1.
At the end of the process, the array is sorted in ascending order. 
Heap Sort has a time complexity of O(n log n) and is an in-place algorithm, but it is not stable.



