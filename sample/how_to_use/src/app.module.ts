import {
  Module
} from '@nestjs/common'
import {
  AppController
} from './app.controller'
import {
  CronModule,
} from 'nest-cron'

@Module({
  imports: [
    CronModule.register()
  ],
  controllers: [
    AppController
  ]
})
export class AppModule { }
