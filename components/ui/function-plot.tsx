"use client"

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Card } from '@/components/ui/card'
import { generatePoints, getColorFromDerivative, generateGradient } from '@/lib/math-utils'

interface FunctionPlotProps {
  expression: string
  derivative: string
  criticalPoints?: Array<{ x: number; type: string }>
  domain?: [number, number]
  range?: [number, number]
}

export function FunctionPlot({
  expression,
  derivative,
  criticalPoints = [],
  domain = [-10, 10],
  range = [-10, 10]
}: FunctionPlotProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const colorScheme = resolvedTheme === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect()
        setDimensions({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || !expression) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set background
    ctx.fillStyle = colorScheme === 'dark' ? '#1e293b' : '#f8fafc'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = colorScheme === 'dark' ? '#334155' : '#e2e8f0'
    ctx.lineWidth = 1

    // Vertical grid lines
    const xStep = canvas.width / 20
    for (let x = 0; x <= canvas.width; x += xStep) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    // Horizontal grid lines
    const yStep = canvas.height / 20
    for (let y = 0; y <= canvas.height; y += yStep) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw x and y axes
    ctx.strokeStyle = colorScheme === 'dark' ? '#94a3b8' : '#64748b'
    ctx.lineWidth = 2
    
    // x-axis
    const yAxisPos = canvas.height / 2
    ctx.beginPath()
    ctx.moveTo(0, yAxisPos)
    ctx.lineTo(canvas.width, yAxisPos)
    ctx.stroke()
    
    // y-axis
    const xAxisPos = canvas.width / 2
    ctx.beginPath()
    ctx.moveTo(xAxisPos, 0)
    ctx.lineTo(xAxisPos, canvas.height)
    ctx.stroke()

    try {
      // Generate points for the function
      const points = generatePoints(expression, domain[0], domain[1], 200)
      
      // Generate points for the derivative
      const derivativePoints = generatePoints(derivative, domain[0], domain[1], 200)
      
      if (points.length > 0) {
        // Scale points to canvas
        const scaleX = canvas.width / (domain[1] - domain[0])
        const scaleY = canvas.height / (range[1] - range[0])
        
        const scaledPoints = points.map(point => ({
          x: (point.x - domain[0]) * scaleX,
          y: canvas.height - (point.y - range[0]) * scaleY
        }))
        
        // Draw function curve
        ctx.strokeStyle = colorScheme === 'dark' ? '#f8fafc' : '#0f172a'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y)
        
        for (let i = 1; i < scaledPoints.length; i++) {
          ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y)
        }
        
        ctx.stroke()
        
        // Draw colored segments based on derivative
        if (derivativePoints.length > 0) {
          for (let i = 1; i < scaledPoints.length; i++) {
            const x1 = scaledPoints[i-1].x
            const y1 = scaledPoints[i-1].y
            const x2 = scaledPoints[i].x
            const y2 = scaledPoints[i].y
            
            // Get derivative value at this point
            const derivValue = derivativePoints[i-1].y
            
            // Set color based on derivative
            ctx.strokeStyle = getColorFromDerivative(derivValue, colorScheme)
            ctx.lineWidth = 5
            
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
        
        // Draw critical points
        if (criticalPoints && criticalPoints.length > 0) {
          criticalPoints.forEach(point => {
            const x = (point.x - domain[0]) * scaleX
            const y = canvas.height - (points.find(p => Math.abs(p.x - point.x) < 0.1)?.y || 0 - range[0]) * scaleY
            
            // Draw point
            ctx.beginPath()
            ctx.arc(x, y, 8, 0, Math.PI * 2)
            
            if (point.type === 'maximum') {
              ctx.fillStyle = colorScheme === 'dark' ? '#f87171' : '#ef4444'
            } else if (point.type === 'minimum') {
              ctx.fillStyle = colorScheme === 'dark' ? '#60a5fa' : '#3b82f6'
            } else {
              ctx.fillStyle = colorScheme === 'dark' ? '#34d399' : '#10b981'
            }
            
            ctx.fill()
            
            // Draw label
            ctx.fillStyle = colorScheme === 'dark' ? '#f8fafc' : '#0f172a'
            ctx.font = '12px sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(point.type.charAt(0).toUpperCase(), x, y + 4)
          })
        }
      }
    } catch (error) {
      console.error('Error plotting function:', error)
      
      // Draw error message
      ctx.fillStyle = colorScheme === 'dark' ? '#f8fafc' : '#0f172a'
      ctx.font = '16px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('Error plotting function', canvas.width / 2, canvas.height / 2)
    }
  }, [expression, derivative, criticalPoints, domain, range, dimensions, colorScheme])

  return (
    <Card className="overflow-hidden p-1 w-full aspect-[4/3]">
      <div 
        className="w-full h-full relative"
        style={{
          background: generateGradient(criticalPoints, dimensions.width, dimensions.height, colorScheme)
        }}
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
        />
      </div>
    </Card>
  )
}