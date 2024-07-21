import { Module } from '@nestjs/common';
import { ServerFeatureUserController } from './server-feature-user.controller';
import { ServerFeatureUserService } from './server-feature-user.service';
import { ServerDataAccessTodoModule } from '@salvachll/server/data-access-todo';
import { ServerUtilsModule } from '@salvachll/server/utils';

@Module({
  controllers: [ServerFeatureUserController],
  providers: [ServerFeatureUserService],
  imports: [ServerDataAccessTodoModule, ServerUtilsModule],
  exports: [ServerFeatureUserService],
})
export class ServerFeatureUserModule { }
