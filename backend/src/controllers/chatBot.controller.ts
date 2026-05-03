import { Request, Response } from 'express'
import { resolveStudentConciergeQuery, type ConversationMessage } from '../services/chatbot-concierge.service.js'

const MAX_HISTORY_MESSAGES = 6

export const chatAI = async (req: Request, res: Response) => {
  try {
    const query =
      typeof req.body?.query === 'string' ? req.body.query.trim() : ''

    if (!query) {
      return res.json({
        success: false,
        message: 'No query provided',
        errorType: 'empty_query',
      })
    }

    if (query.length > 500) {
      return res.json({
        success: false,
        message: 'Query is too long. Please keep it under 500 characters.',
        errorType: 'query_too_long',
      })
    }

    // Parse and validate conversation history
    let conversationHistory: ConversationMessage[] = []
    if (Array.isArray(req.body?.conversationHistory)) {
      conversationHistory = req.body.conversationHistory
        .filter(
          (msg: any) =>
            typeof msg?.role === 'string' &&
            (msg.role === 'user' || msg.role === 'assistant') &&
            typeof msg?.content === 'string' &&
            msg.content.trim().length > 0
        )
        .map((msg: any) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content.trim().slice(0, 500),
        }))
        .slice(-MAX_HISTORY_MESSAGES)
    }

    const response = await resolveStudentConciergeQuery(query, {
      allowLlm: true,
      conversationHistory,
    })

    return res.json({
      success: true,
      data: response,
    })
  } catch (error: any) {
    console.error('error in AI: ', error)

    // Detect quota exceeded errors
    const errorMessage = error.message || 'Internal server error'
    const isQuotaError =
      errorMessage.includes('429') ||
      errorMessage.includes('quota') ||
      errorMessage.includes('Too Many Requests')

    return res.json({
      success: false,
      message: isQuotaError
        ? 'API limit reached. Please try again in a minute.'
        : errorMessage,
      errorType: isQuotaError ? 'quota_exceeded' : 'general_error',
    })
  }
}
