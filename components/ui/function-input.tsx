"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

interface FunctionInputProps {
  onSubmit: (expression: string) => void
  isLoading: boolean
}

export function FunctionInput({ onSubmit, isLoading }: FunctionInputProps) {
  const [expression, setExpression] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (expression.trim()) {
      onSubmit(expression)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <div className="flex-1">
          <Input
            placeholder="Enter a mathematical expression (e.g., sin(x) + x^2)"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" disabled={isLoading || !expression.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Try functions like <code>sin(x)</code>, <code>x^2</code>, <code>e^x</code>, or combinations
      </p>
    </form>
  )
}