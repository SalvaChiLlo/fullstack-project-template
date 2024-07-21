import { Module } from '@nestjs/common';
import { ToDoEntitySchema } from './schemas/to-do.entity-schema';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntitySchema } from './schemas/user.entity-schema';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoEntitySchema, UserEntitySchema])],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }
