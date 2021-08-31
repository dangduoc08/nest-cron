import {
  Controller
} from '@nestjs/common'
import {
  CronRun,
  TaskScheduler,
  PullOut,
  CronOption
} from 'nest-cron'

const opts: CronOption = {
  active: true,
  overlap: 2,
  pattern: '*/2 * * * * *',
  runOnInit: false,
  name: 'sample/how_to_use'
}

@Controller()
@TaskScheduler()
export class AppController {
  @CronRun(opts, 'Run cron job 1')
  public async runSample(
    @PullOut() pullOut: Function
  ) {
    console.log('This will print each 2 seconds then 5 senconds')
    setTimeout(pullOut, 5000)
  }
}