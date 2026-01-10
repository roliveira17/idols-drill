'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { AlertCircle, RotateCcw } from 'lucide-react'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary capturou erro:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
          <Card className="max-w-md w-full shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
              <CardTitle className="text-2xl">Algo deu errado</CardTitle>
              <CardDescription>
                Ocorreu um erro inesperado na aplicação
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs font-mono text-muted-foreground break-words">
                  {this.state.error?.message || 'Erro desconhecido'}
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Button
                onClick={() => window.location.reload()}
                size="lg"
                className="w-full"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Recarregar Página
              </Button>
              <Button
                onClick={() => (window.location.href = '/')}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Voltar ao Início
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
