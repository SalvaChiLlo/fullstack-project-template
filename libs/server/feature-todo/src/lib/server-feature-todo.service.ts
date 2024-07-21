import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntitySchema } from '@salvachll/server/data-access-todo';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from '@salvachll/shared/domain';
import { Repository } from 'typeorm';
import * as _ from 'lodash'
export class DbException {
  readonly _tag = "DbException"
  constructor(readonly message: any) { }
}

@Injectable()
export class ServerFeatureTodoService {

  constructor(
    @InjectRepository(ToDoEntitySchema)
    private todoRepository: Repository<TodoDto>
  ) { }

  getAll(auth: string): Promise<TodoDto[]> {
    return this.todoRepository.find()
  }

  async getOne(id: string, auth: string): Promise<TodoDto> {
    const todo = await this.todoRepository.findOneBy({ id })
    if (!todo) throw new NotFoundException(`Todo '${id}' not found.`)
    return todo
  }

  create(todo: CreateTodoDto, auth: string): Promise<TodoDto> {
    return this.todoRepository.save({ ...todo, user: auth })
  }

  async update(id: string, data: UpdateTodoDto, auth: string): Promise<TodoDto> {
    const todo = await this.getOne(id, auth)

    return this.todoRepository.save(_.merge(todo, data))
  }

  async delete(id: string, auth: string): Promise<void> {
    await this.todoRepository.delete({ id })
  }
}
