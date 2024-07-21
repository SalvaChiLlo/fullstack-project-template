import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ServerFeatureTodoService } from './server-feature-todo.service';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from '@salvachll/shared/domain';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { RequireAuth } from '@salvachll/server/utils';

@Controller('todos')
@ApiTags("Todos")
export class ServerFeatureTodoController {
  constructor(private serverFeatureTodoService: ServerFeatureTodoService) { }

  @Get('')
  @ApiOkResponse({
    type: Array<TodoDto>
  })
  @UseGuards(RequireAuth)
  async getAll(@Headers("authorization") auth: string): Promise<TodoDto[]> {
    return await this.serverFeatureTodoService.getAll(auth)
  }

  @Get(':id')
  @ApiOkResponse({
    type: TodoDto
  })
  @UseGuards(RequireAuth)
  async getOne(@Param('id') id: string, @Headers("authorization") auth: string): Promise<TodoDto> {
    return await this.serverFeatureTodoService.getOne(id, auth);
  }

  @Post('')
  @ApiOkResponse({
    type: TodoDto
  })
  @UseGuards(RequireAuth)
  async create(@Body() data: CreateTodoDto, @Headers("authorization") auth: string): Promise<TodoDto> {
    return await this.serverFeatureTodoService.create(data, auth)
  }

  @Patch(':id')
  @ApiOkResponse({
    type: TodoDto
  })
  @UseGuards(RequireAuth)
  async update(@Param('id') id: string, @Body() data: UpdateTodoDto, @Headers("authorization") auth: string): Promise<TodoDto> {
    return await this.serverFeatureTodoService.update(id, data, auth)
  }

  @Delete(':id')
  @ApiOkResponse({})
  @UseGuards(RequireAuth)
  async deleteById(@Param('id') id: string, @Headers("authorization") auth: string): Promise<void> {
    return await this.serverFeatureTodoService.delete(id, auth);
  }
}
