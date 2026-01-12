'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SessionState, Language, ToneType, Idol, ChatMessage, ViewMode, IdolType } from '@/types'
import { IDOL_NAMES, IDOL_DESCRIPTIONS, IDOL_ICONS } from '@/lib/constants/idols'

const TONE_STORAGE_KEY = 'idols-drill-tone'

interface SessionContextType {
  // Estado
  state: SessionState

  // Actions - Idioma e Tom
  setLanguage: (lang: Language) => void
  setTone: (tone: ToneType) => void

  // Actions - Chat
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  clearChat: () => void

  // Actions - Ídolos
  updateIdol: (idolId: IdolType, updates: Partial<Idol>) => void
  eliminateIdol: (idolId: IdolType, resistanceLevel: 1 | 2 | 3 | 4 | 5) => void
  setCurrentIdolDiscussion: (idolId: IdolType | undefined) => void

  // Actions - View
  setViewMode: (mode: ViewMode) => void

  // Actions - Slider
  setAwaitingSlider: (awaiting: boolean) => void

  // Actions - Sessão
  resetSession: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

function createInitialIdols(language: Language): Idol[] {
  const idolTypes: IdolType[] = ['money', 'power', 'pleasure', 'fame']

  return idolTypes.map(id => ({
    id,
    name: IDOL_NAMES[id][language],
    nameTranslated: IDOL_NAMES[id],
    description: IDOL_DESCRIPTIONS[id][language],
    descriptionTranslated: IDOL_DESCRIPTIONS[id],
    status: 'active' as const,
    interactionCount: 0
  }))
}

function getInitialTone(): ToneType {
  if (typeof window === 'undefined') return 'neutral'
  const saved = localStorage.getItem(TONE_STORAGE_KEY)
  return (saved as ToneType) || 'neutral'
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>({
    language: 'pt-BR',
    tone: 'neutral',
    idols: [],
    chatHistory: [],
    viewMode: 'conversation',
    isAwaitingSlider: false,
    sessionStartedAt: new Date()
  })

  // Inicializar tom do localStorage
  useEffect(() => {
    const savedTone = getInitialTone()
    setState(prev => ({
      ...prev,
      tone: savedTone,
      idols: createInitialIdols(prev.language)
    }))
  }, [])

  const setLanguage = (lang: Language) => {
    setState(prev => ({
      ...prev,
      language: lang,
      idols: createInitialIdols(lang)
    }))
  }

  const setTone = (tone: ToneType) => {
    setState(prev => ({ ...prev, tone }))
    if (typeof window !== 'undefined') {
      localStorage.setItem(TONE_STORAGE_KEY, tone)
    }
  }

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    }

    setState(prev => {
      // Incrementar contador de interação se houver ídolo em discussão
      let updatedIdols = prev.idols
      if (message.role === 'user' && prev.currentIdolDiscussion) {
        updatedIdols = prev.idols.map(idol =>
          idol.id === prev.currentIdolDiscussion
            ? { ...idol, interactionCount: idol.interactionCount + 1 }
            : idol
        )
      }

      return {
        ...prev,
        chatHistory: [...prev.chatHistory, newMessage],
        idols: updatedIdols
      }
    })
  }

  const clearChat = () => {
    setState(prev => ({
      ...prev,
      chatHistory: []
    }))
  }

  const updateIdol = (idolId: IdolType, updates: Partial<Idol>) => {
    setState(prev => ({
      ...prev,
      idols: prev.idols.map(idol =>
        idol.id === idolId ? { ...idol, ...updates } : idol
      )
    }))
  }

  const eliminateIdol = (idolId: IdolType, resistanceLevel: 1 | 2 | 3 | 4 | 5) => {
    setState(prev => ({
      ...prev,
      idols: prev.idols.map(idol =>
        idol.id === idolId
          ? {
              ...idol,
              status: 'eliminated' as const,
              eliminatedAt: new Date(),
              resistanceLevel
            }
          : idol
      ),
      currentIdolDiscussion: undefined,
      isAwaitingSlider: false
    }))
  }

  const setCurrentIdolDiscussion = (idolId: IdolType | undefined) => {
    setState(prev => ({ ...prev, currentIdolDiscussion: idolId }))
  }

  const setViewMode = (mode: ViewMode) => {
    setState(prev => ({ ...prev, viewMode: mode }))
  }

  const setAwaitingSlider = (awaiting: boolean) => {
    setState(prev => ({ ...prev, isAwaitingSlider: awaiting }))
  }

  const resetSession = () => {
    setState(prev => ({
      language: prev.language,
      tone: prev.tone, // Mantém tom (persiste)
      idols: createInitialIdols(prev.language),
      chatHistory: [],
      viewMode: 'conversation',
      isAwaitingSlider: false,
      sessionStartedAt: new Date()
    }))
  }

  return (
    <SessionContext.Provider
      value={{
        state,
        setLanguage,
        setTone,
        addMessage,
        clearChat,
        updateIdol,
        eliminateIdol,
        setCurrentIdolDiscussion,
        setViewMode,
        setAwaitingSlider,
        resetSession
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within SessionProvider')
  }
  return context
}
