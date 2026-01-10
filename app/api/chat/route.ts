import { NextRequest, NextResponse } from 'next/server'
import { groq, DEFAULT_MODEL } from '@/lib/groq/client'
import { getSystemPrompt, getSliderResponsePrompt } from '@/lib/groq/prompts'
import { Language, ToneType, IdolType, IdolStatus } from '@/types'

interface ChatRequestBody {
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
  language: Language
  tone: ToneType
  idols: Array<{ id: IdolType; status: IdolStatus; interactionCount: number }>
  currentDiscussion?: IdolType
  sliderLevel?: 1 | 2 | 3 | 4 | 5
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json()
    const { messages, language, tone, idols, currentDiscussion, sliderLevel } = body

    // Validações básicas
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Mensagens inválidas' },
        { status: 400 }
      )
    }

    // Gerar system prompt baseado no contexto
    const systemPrompt = getSystemPrompt({
      language,
      tone,
      idols,
      currentDiscussion
    })

    // Se houver slider level, adicionar instrução específica
    let finalSystemPrompt = systemPrompt
    if (sliderLevel) {
      const sliderInstruction = getSliderResponsePrompt(sliderLevel, language)
      finalSystemPrompt = `${systemPrompt}\n\n${sliderInstruction}`
    }

    // Chamar Groq API
    const completion = await groq.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: finalSystemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 0.9
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('Resposta vazia da IA')
    }

    return NextResponse.json({
      response,
      model: DEFAULT_MODEL
    })

  } catch (error: any) {
    console.error('Erro na API /chat:', error)

    // Tratamento de erros específicos
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'API Key inválida' },
        { status: 401 }
      )
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Limite de requisições excedido' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao processar mensagem', details: error.message },
      { status: 500 }
    )
  }
}
