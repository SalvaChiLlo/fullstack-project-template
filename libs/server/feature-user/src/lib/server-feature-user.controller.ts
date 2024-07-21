import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Headers } from '@nestjs/common';
import { ServerFeatureUserService } from './server-feature-user.service';
import { CreateUserDto, UserDto, UpdateUserDto } from '@salvachll/shared/domain';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { RequireAuth } from '@salvachll/server/utils';

@Controller('users')
@ApiTags("Users")
export class ServerFeatureUserController {
  constructor(private ServerFeatureUserService: ServerFeatureUserService) { }

  @Get('')
  @ApiOkResponse({
    type: Array<UserDto>
  })
  @UseGuards(RequireAuth)
  async getAll(@Headers("authorization") auth: string): Promise<UserDto[]> {
    return await this.ServerFeatureUserService.getAll(auth)
  }

  @Get(':id')
  @ApiOkResponse({
    type: UserDto
  })
  @UseGuards(RequireAuth)
  async getOne(@Param('id') id: string, @Headers("authorization") auth: string): Promise<UserDto> {
    return await this.ServerFeatureUserService.getOne(id, auth);
  }

  @Post('')
  @ApiOkResponse({
    type: UserDto
  })
  @UseGuards(RequireAuth)
  async create(@Body() data: CreateUserDto, @Headers("authorization") auth: string): Promise<UserDto> {
    return await this.ServerFeatureUserService.create(data, auth)
  }

  @Patch(':id')
  @ApiOkResponse({
    type: UserDto
  })
  @UseGuards(RequireAuth)
  async update(@Param('id') id: string, @Body() data: UpdateUserDto, @Headers("authorization") auth: string): Promise<UserDto> {
    return await this.ServerFeatureUserService.update(id, data, auth)
  }

  @Delete(':id')
  @ApiOkResponse({})
  @UseGuards(RequireAuth)
  async deleteById(@Param('id') id: string, @Headers("authorization") auth: string): Promise<void> {
    return await this.ServerFeatureUserService.delete(id, auth);
  }
}
