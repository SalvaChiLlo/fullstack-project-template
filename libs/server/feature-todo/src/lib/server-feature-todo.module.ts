import { Module } from '@nestjs/common';
import { ServerFeatureTodoController } from './server-feature-todo.controller';
import { ServerFeatureTodoService } from './server-feature-todo.service';
import { ServerDataAccessTodoModule } from '@salvachll/server/data-access-todo';
import { ServerUtilsModule } from '@salvachll/server/utils';

@Module({
  controllers: [ServerFeatureTodoController],
  providers: [ServerFeatureTodoService],
  imports: [ServerDataAccessTodoModule, ServerUtilsModule],
  exports: [ServerFeatureTodoService],
})
export class ServerFeatureTodoModule { }
