import { eq } from 'drizzle-orm'
import { wutheringWavesPulls } from '../../db/schema'
import { mergePlayerBanners } from '../../utils/pulls'
import { BasePullService, type PullRequest, type PullResponse } from './base'

export class WutheringWavesPullService extends BasePullService {
  async processGlobalPull(request: PullRequest): Promise<PullResponse> {
    // Check if player data already exists
    const existingRecord = await this.db
      .select()
      .from(wutheringWavesPulls)
      .where(eq(wutheringWavesPulls.player_id, request.player_id))
      .get()

    const newData = {
      ...request.banners
    }

    if (existingRecord) {
      // Merge new banners with existing stored banners
      const { id, player_id, server_id, created_at, updated_at, ...oldData } = existingRecord
      const mergedBanners = mergePlayerBanners(oldData, newData as any)

      const result = await this.db
        .update(wutheringWavesPulls)
        .set({
          ...mergedBanners,
          // Update server if provided, else keep existing
          server_id: request.server_id ?? (existingRecord).server_id,
          updated_at: new Date(),
        })
        .where(eq(wutheringWavesPulls.player_id, request.player_id))
        .returning()

      return {
        success: true,
        data: {
          message: 'Wuthering Waves pull data updated',
          playerId: request.player_id,
          action: 'updated',
          record: result[0],
        },
      }
    } else {
      // Insert new record
      const result = await this.db
        .insert(wutheringWavesPulls)
        .values({
          id: crypto.randomUUID(),
          player_id: request.player_id,
          server_id: request.server_id,
          ...newData,
          created_at: new Date(),
          updated_at: null,
        })
        .returning()

      return {
        success: true,
        data: {
          message: 'Wuthering Waves pull data created',
          playerId: request.player_id,
          action: 'created',
          record: result[0],
        },
      }
    }
  }
}
