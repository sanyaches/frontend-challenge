import { type TranscriptionsClientInterface, transcriptionsClient } from '@/services/api/transcriptionsClient'
import type { Transcription } from '@/types/transcription'
import { getRandomNumber } from '@/utils/getRandomNumber'

export enum UpdateField {
  Voice = 'voice',
  Text = 'text',
}

export default class TranscriptionsModel {
  transcriptions: Transcription[]
  apiClient: TranscriptionsClientInterface

  constructor() {
    this.apiClient = transcriptionsClient
    this.transcriptions = []
  }

  async init() {
    const transcriptions = await this.apiClient.load()
    if (transcriptions) {
      this.transcriptions = transcriptions
    }
  }

  upload() {
    this.apiClient.upload(this.transcriptions)
  }

  createTranscription() {
    this.transcriptions.push({
      id: getRandomNumber(13),
      voice: 'New voice',
      text: 'New description text',
    })
  }

  removeTranscriptionById(id: number) {
    this.transcriptions = this.transcriptions.filter(t => t.id !== id)
  }

  updateTranscriptionById(id: number, field: UpdateField, value: string) {
    for (let i = 0; i < this.transcriptions.length; i++) {
      if (this.transcriptions[i].id === id) {
        this.transcriptions[i][field] = value
      }
    }
  }
}
