![Calculus Image Generator](/startup.png)

A Next.js application that visualizes mathematical expressions using calculus principles.

## Key Features
- **Expression Processing**: Analyzes expressions via Gemini API, extracting derivatives, integrals, and critical points.
- **Interactive Visualization**: Renders functions with gradients, highlights critical points, and adapts to screen size.
- **Mathematical Analysis**: Displays expressions, domain/range, and critical points in a tabbed layout.
- **Theme Support**: Dark/light modes with optimized colors and a toggle.
- **User Interface**: Modern, responsive design with example functions.

## How to Use
1. Input a function (e.g., `sin(x) + x^2`).
2. Click "Generate" to see visualization and analysis.
3. Explore tabs for details.

## Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/bniladridas/calculus_image_generator.git
   ```
2. Enter directory:
   ```bash
   cd calculus-image-generator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Software
- **Local Development**:
   ```bash
   npm run dev
   ```
- **Global Startup**:
   1. Make script executable:
      ```bash
      chmod +x startup.sh
      ```
   2. Create symbolic link:
      ```bash
      sudo ln -s /path/to/project/startup.sh /usr/local/bin/calculus-image-generator
      ```
   3. Run globally:
      ```bash
      calculus-image-generator
      ```

## Access
Visit `http://localhost:3000` once running.

## Troubleshooting
If `calculus-image-generator` fails, verify the symbolic link and command.

## License
MIT License - see [LICENSE](LICENSE) for details.