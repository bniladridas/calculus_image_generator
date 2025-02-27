"use client"

import { useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { FunctionInput } from '@/components/ui/function-input'
import { FunctionPlot } from '@/components/ui/function-plot'
import { FunctionDetails } from '@/components/ui/function-details'
import { processMathExpression } from '@/lib/gemini'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FunctionSquare, Instagram, Sigma, Braces } from 'lucide-react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (expression: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const data = await processMathExpression(expression)
      if (data) {
        setResult(data)
      } else {
        setError("Failed to process the mathematical expression. Please try a different one.")
      }
    } catch (err) {
      setError("An error occurred while processing your request.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <FunctionSquare className="h-6 w-6" />
            <h1 className="text-lg font-semibold">Calculus Image Generator</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="container px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-6">
          <section className="space-y-4">
            <div className="grid gap-1">
              <h2 className="text-2xl font-bold tracking-tight">Mathematical Art Generator</h2>
              <p className="text-muted-foreground">
                Create beautiful visualizations based on calculus expressions
              </p>
            </div>
            
            <FunctionInput onSubmit={handleSubmit} isLoading={isLoading} />
            
            {error && (
              <div className="rounded-md bg-destructive/10 p-4 text-destructive">
                {error}
              </div>
            )}
          </section>
          
          {result && (
            <section className="space-y-6">
              <Separator />
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Visualization</h3>
                  <FunctionPlot 
                    expression={result.parsed}
                    derivative={result.derivative}
                    criticalPoints={result.criticalPoints}
                    domain={result.domain}
                    range={result.range}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Analysis</h3>
                  <FunctionDetails 
                    parsed={result.parsed}
                    derivative={result.derivative}
                    integral={result.integral}
                    domain={result.domain}
                    range={result.range}
                    criticalPoints={result.criticalPoints}
                  />
                </div>
              </div>
              
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calculus-Based Image Generation</CardTitle>
                      <CardDescription>
                        How mathematical expressions transform into visual art
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>
                        This application uses calculus principles to transform mathematical expressions into visual representations.
                        The colors and patterns are determined by the derivatives and integrals of your input function.
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <FunctionSquare className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="mt-2 font-medium">Functions</h4>
                          <p className="text-sm text-muted-foreground">
                            Input any valid mathematical function
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Instagram className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="mt-2 font-medium">Calculus</h4>
                          <p className="text-sm text-muted-foreground">
                            Derivatives and integrals shape the visualization
                          </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Braces className="h-6 w-6 text-primary" />
                          </div>
                          <h4 className="mt-2 font-medium">AI Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            Gemini API processes complex expressions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="features" className="space-y-4 pt-4">
                  <ul className="grid gap-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <Sigma className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <strong>Dynamic Computation</strong>
                        <p className="text-sm text-muted-foreground">
                          Real-time calculation of derivatives and integrals
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <Sigma className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <strong>Color Mapping</strong>
                        <p className="text-sm text-muted-foreground">
                          Colors based on rate of change (derivative values)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <Sigma className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <strong>Critical Point Detection</strong>
                        <p className="text-sm text-muted-foreground">
                          Automatic identification of maxima, minima, and inflection points
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <Sigma className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <strong>Dark/Light Mode</strong>
                        <p className="text-sm text-muted-foreground">
                          Different color schemes for light and dark themes
                        </p>
                      </div>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="examples" className="space-y-4 pt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Trigonometric Functions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Try <code className="text-xs">sin(x) + cos(2*x)</code> to see wave interference patterns
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Polynomials</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Try <code className="text-xs">x^3 - 3*x</code> to see cubic function with critical points
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Exponentials</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Try <code className="text-xs">e^(-x^2)</code> to see a Gaussian bell curve
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Composite Functions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Try <code className="text-xs">sin(x^2) * e^(-x/5)</code> for a damped oscillation
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}