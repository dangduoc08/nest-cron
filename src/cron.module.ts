import {
  DynamicModule
} from '@nestjs/common'
import {
  DebugData
} from './cron.interface'
import {
  CronController
} from './cron.controller'
import {
  CRON_DEBUG
} from './cron.constant'

export class CronModule {
  public static debugData: DebugData[] = []

  public static register(): DynamicModule {
    return {
      module: CronModule,
      controllers: [
        CronController
      ],
      providers: [
        {
          provide: CRON_DEBUG,
          useValue: CronModule.debugData
        }
      ]
    }
  }
}