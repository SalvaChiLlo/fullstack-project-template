import { Logger, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerFeatureTodoModule } from '@salvachll/server/feature-todo';
import { ServerFeatureUserModule } from '@salvachll/server/feature-user';
import { APP_FILTER } from '@nestjs/core';
import { FiberFailureExceptionFilter } from './exceptionFilter';
import { ConfigModule, ConfigService } from '@nestjs/config'

import { BadServerConfig, Config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { SchemaValidatorPipe } from './pipes/schema-validator.pipe';
import * as S from "@effect/schema/Schema"
import { Either } from 'effect';
import { ArrayFormatter } from '@effect/schema';
import { ServerUtilsModule } from '@salvachll/server/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const validationPipe = S.validateEither(Config, { errors: "all" })(config)

        if (Either.isLeft(validationPipe)) {
          const error = ArrayFormatter.formatErrorSync(validationPipe.left)
          console.error("Decoding failed:")
          console.error(error)
          throw new BadServerConfig(error)
        }
        Logger.log("The server has been started with the following configuration: ", validationPipe.right)
        return validationPipe.right;
      }
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: config.get('DATABASE_TYPE'),
        database: config.get('DATABASE_PATH'),
        synchronize: true,
        logging: true,
        autoLoadEntities: true
      } as any),
      inject: [ConfigService],
    }),
    ServerFeatureTodoModule,
    ServerFeatureUserModule,
    ServerUtilsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: FiberFailureExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: SchemaValidatorPipe
    }
  ],
})
export class AppModule { }
