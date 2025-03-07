# Upnova Assignment Solution

## Overview

This repository contains solutions for two tasks assigned by Upnova. The tasks focus on creating animations and solving performance issues with large lists.

## Tasks

### Task 1: Animation

The goal of this task is to recreate a specific animation using only TypeScript and CSS, without any external libraries, including React. The animation is inspired by a video provided in the assignment.

#### Implementation Details

- The animation is implemented in the `animation` directory.
- The main HTML file is `animation/index.html`.
- The styles are defined within the `<style>` tag in the HTML file.
- The animation logic is handled in `animation/src/script.ts`.
- The project uses Webpack for bundling, with configuration in `animation/webpack.config.js`.
- TypeScript configuration is specified in `animation/tsconfig.json`.

### Task 2: Problem Solving with Performance

This task involves implementing a list that can efficiently render 10,000+ items without lagging the UI. The list should only render items visible in the viewport, using techniques like Intersection Observer or manual scroll tracking.

#### Implementation Details

- The list implementation is located in the `virtualized-rendering` directory.
- The main HTML file is `virtualized-rendering/index.html`.
- Styles are defined in `virtualized-rendering/styles.css`.
- The TypeScript configuration is specified in `virtualized-rendering/tsconfig.json`.

## Setup and Usage

### Prerequisites

- Node.js and npm should be installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies for the animation task:
   ```bash
   cd animation
   npm install
   ```

### Running the Animation Task

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:9000` to view the animation.

### Running the Virtualized List Task

1. Open the `virtualized-rendering/index.html` file in your browser to view the virtualized list implementation.

## Additional Information

- The project uses Prettier for code formatting. Configuration is in `animation/.prettierrc`.
- The `animation/package.json` file contains scripts for development and building the project.

## Author

Created by Eugene Shcherbakov.

## Contact

For any questions or feedback, please contact [career@upnova.io](mailto:career@upnova.io).