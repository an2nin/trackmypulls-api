import type { Database } from '../../db'
import { BasePullService } from './base'
import { WutheringWavesPullService } from './wuthering-waves'

// Supported games enum
export enum SupportedGame {
  WUTHERING_WAVES = 'wuthering-waves',
  GENSHIN_IMPACT = 'genshin-impact',
}

export class PullServiceFactory {
  static createService(game: string, db: Database): BasePullService {
    switch (game) {
      case SupportedGame.WUTHERING_WAVES:
        return new WutheringWavesPullService(db)

      default:
        throw new Error(`Unsupported game: ${game}`)
    }
  }

  static getSupportedGames(): string[] {
    return Object.values(SupportedGame)
  }

  static isGameSupported(game: string): boolean {
    return Object.values(SupportedGame).includes(game as SupportedGame)
  }
}
