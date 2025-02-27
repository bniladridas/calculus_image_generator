"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface FunctionDetailsProps {
  parsed: string
  derivative: string
  integral: string
  domain?: [number, number]
  range?: [number, number]
  criticalPoints?: Array<{ x: number; type: string }>
}

export function FunctionDetails({
  parsed,
  derivative,
  integral,
  domain = [-10, 10],
  range = [-10, 10],
  criticalPoints = []
}: FunctionDetailsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Function Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Expression</h4>
            <p className="text-sm font-mono bg-muted p-2 rounded-md mt-1 overflow-x-auto">
              f(x) = {parsed}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">Derivative</h4>
            <p className="text-sm font-mono bg-muted p-2 rounded-md mt-1 overflow-x-auto">
              f'(x) = {derivative}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">Integral</h4>
            <p className="text-sm font-mono bg-muted p-2 rounded-md mt-1 overflow-x-auto">
              ∫f(x)dx = {integral} + C
            </p>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium">Domain</h4>
              <p className="text-sm mt-1">
                [{domain[0]}, {domain[1]}]
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Range</h4>
              <p className="text-sm mt-1">
                [{range[0]}, {range[1]}]
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Critical Points</CardTitle>
        </CardHeader>
        <CardContent>
          {criticalPoints && criticalPoints.length > 0 ? (
            <ul className="space-y-2">
              {criticalPoints.map((point, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ 
                      backgroundColor: point.type === 'maximum' 
                        ? 'var(--destructive)' 
                        : point.type === 'minimum' 
                          ? 'hsl(var(--chart-2))' 
                          : 'hsl(var(--chart-4))' 
                    }}
                  />
                  <span className="text-sm">
                    <strong>x = {point.x.toFixed(2)}</strong>: {point.type.charAt(0).toUpperCase() + point.type.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No critical points found in the specified domain.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}