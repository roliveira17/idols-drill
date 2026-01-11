import OpenAI from 'openai'

// Lazy initialization - only create client when needed
let openaiInstance: OpenAI | null = null

export function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }
  return openaiInstance
}

export const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-2024-08-06'
