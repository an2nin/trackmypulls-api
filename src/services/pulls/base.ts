import type { Database } from '../../db';

export interface BannerItem {
  q: number;
  i: string;
  n: string;
  t: string;
  y: string;
}

interface Banner {
  total: number;
  items: BannerItem[];
}

export interface PullRequest {
  player_id: string;
  server_id: string;
  banners: Record<string, Banner>;
}

export interface PullResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export abstract class BasePullService {
  protected db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  abstract processGlobalPull(request: PullRequest): Promise<PullResponse>
}
