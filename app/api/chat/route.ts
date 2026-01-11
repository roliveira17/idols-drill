import { NextRequest, NextResponse } from 'next/server'
import { groq, DEFAULT_MODEL as GROQ_MODEL } from '@/lib/groq/client'
import { getOpenAI, OPENAI_MODEL } from '@/lib/openai/client'
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

    let response: string
    let modelUsed: string

    // TENTATIVA 1: OpenAI (Primary)
    try {
      console.log('[AI] Tentando OpenAI...')

      const openai = getOpenAI()
      const completion = await openai.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: finalSystemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9
      })

      response = completion.choices[0]?.message?.content || ''
      modelUsed = `openai:${OPENAI_MODEL}`
      console.log('[AI] ✓ OpenAI respondeu com sucesso')

    } catch (openaiError) {
      // Log do erro OpenAI
      console.error('[AI] ✗ OpenAI falhou:', openaiError)

      // TENTATIVA 2: Groq (Fallback)
      try {
        console.log('[AI] Tentando Groq (fallback)...')

        const completion = await groq.chat.completions.create({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: finalSystemPrompt },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 500,
          top_p: 0.9
        })

        response = completion.choices[0]?.message?.content || ''
        modelUsed = `groq:${GROQ_MODEL} (fallback)`
        console.log('[AI] ✓ Groq respondeu com sucesso (fallback)')

      } catch (groqError) {
        // Ambos falharam
        console.error('[AI] ✗ Groq também falhou:', groqError)

        // Retornar erro apropriado
        const isRateLimitError =
          (openaiError as any)?.status === 429 ||
          (groqError as any)?.status === 429

        if (isRateLimitError) {
          return NextResponse.json(
            { error: 'Rate limit excedido em ambos os provedores. Tente novamente em alguns segundos.' },
            { status: 429 }
          )
        }

        return NextResponse.json(
          { error: 'Erro ao processar mensagem. Ambos os provedores de IA falharam.' },
          { status: 500 }
        )
      }
    }

    if (!response) {
      throw new Error('Resposta vazia da IA')
    }

    return NextResponse.json({
      response,
      model: modelUsed
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
