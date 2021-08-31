import {
  Controller,
  Inject,
  Get,
  HttpException
} from '@nestjs/common'
import {
  CRON_DEBUG
} from './cron.constant'
import {
  DebugData
} from './cron.interface'

interface StatResponse {
  cron_time: string,
  name: string,
  bind_to: string,
  description: string,
  is_locking: boolean,
  is_run_on_init: boolean,
  last_execute_at: any,
  last_execute_in: any
  next_execute_at: any
  current_overlap: number
  max_overlap: number
}

@Controller()
export class CronController {
  constructor(
    @Inject(CRON_DEBUG) private readonly debugData: DebugData[]
  ) { }

  @Get('/cron_stats.json')
  public getCronStats(): { cron_stats: Array<StatResponse> } {
    try {
      const cronStats = this.debugData?.map(cron => {
        const lastExecuteIn = cron.getLastExecuteIn()
        const parsedLastExecuteIn = lastExecuteIn
          ? `${lastExecuteIn / 1000} sec`
          : null

        return {
          cron_time: cron.cronTime,
          name: cron.name,
          bind_to: cron.bindTo,
          description: cron.description,
          is_locking: !cron.checkIsRunning(),
          is_run_on_init: cron.isRunOnInit,
          last_execute_at: cron.getLastExecuteAt() ?? null,
          last_execute_in: parsedLastExecuteIn,
          next_execute_at: cron.getNextExecuteAt(),
          current_overlap: cron.getCurrentOverlap(),
          max_overlap: cron.maxOverlap
        }
      })

      return {
        cron_stats: cronStats
      }
    } catch (err) {
      throw new HttpException('', 500)
    }
  }
}
