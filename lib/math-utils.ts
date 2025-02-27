import * as math from 'mathjs';

// Evaluate a mathematical expression at a specific x value
export function evaluateExpression(expression: string, x: number): number {
  try {
    return math.evaluate(expression, { x });
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return 0;
  }
}

// Generate points for plotting a function
export function generatePoints(expression: string, xMin: number, xMax: number, steps: number) {
  const points = [];
  const stepSize = (xMax - xMin) / steps;
  
  for (let i = 0; i <= steps; i++) {
    const x = xMin + i * stepSize;
    try {
      const y = evaluateExpression(expression, x);
      if (!isNaN(y) && isFinite(y)) {
        points.push({ x, y });
      }
    } catch (e) {
      // Skip points that can't be evaluated
    }
  }
  
  return points;
}

// Generate a color based on the derivative value
export function getColorFromDerivative(derivativeValue: number, colorScheme: 'light' | 'dark') {
  // Normalize the derivative value to a range between 0 and 1
  const normalizedValue = Math.min(Math.max(Math.tanh(derivativeValue / 5), -1), 1) * 0.5 + 0.5;
  
  if (colorScheme === 'light') {
    // Light mode color scheme (blues to reds)
    const r = Math.round(normalizedValue * 255);
    const g = Math.round((1 - Math.abs(normalizedValue - 0.5) * 2) * 200);
    const b = Math.round((1 - normalizedValue) * 255);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Dark mode color scheme (cyans to magentas)
    const r = Math.round(normalizedValue * 200 + 55);
    const g = Math.round((1 - normalizedValue) * 200 + 55);
    const b = Math.round(200 + normalizedValue * 55);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

// Generate a gradient for the plot background
export function generateGradient(criticalPoints: any[], width: number, height: number, colorScheme: 'light' | 'dark') {
  if (!criticalPoints || criticalPoints.length === 0) {
    return colorScheme === 'light' ? 'linear-gradient(to right, #f0f9ff, #e6f7ff)' : 'linear-gradient(to right, #0f172a, #1e293b)';
  }
  
  // Sort critical points by x value
  const sortedPoints = [...criticalPoints].sort((a, b) => a.x - b.x);
  
  // Generate gradient stops based on critical points
  const stops = sortedPoints.map((point, index) => {
    const position = (point.x - sortedPoints[0].x) / (sortedPoints[sortedPoints.length - 1].x - sortedPoints[0].x) * 100;
    const color = point.type === 'maximum' 
      ? (colorScheme === 'light' ? '#ef4444' : '#f87171') 
      : point.type === 'minimum' 
        ? (colorScheme === 'light' ? '#3b82f6' : '#60a5fa')
        : (colorScheme === 'light' ? '#10b981' : '#34d399');
    return `${color} ${position}%`;
  });
  
  return `linear-gradient(to right, ${stops.join(', ')})`;
}