import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntitySchema } from '@salvachll/server/data-access-todo';
import { CreateUserDto, UserDto, UpdateUserDto, TodoDto } from '@salvachll/shared/domain';
import { Repository } from 'typeorm';
import * as _ from 'lodash'

@Injectable()
export class ServerFeatureUserService {

  constructor(
    @InjectRepository(UserEntitySchema)
    private userRepository: Repository<UserDto>
  ) { }

  getAll(auth: string): Promise<UserDto[]> {
    return this.userRepository.find()
  }

  async getOne(id: string, auth: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException(`user '${id}' not found.`)
    return user
  }

  async create(user: CreateUserDto, auth: string): Promise<UserDto> {
    try {
      await this.getOne(auth, auth)
    } catch (e) {
      return this.userRepository.save({ ...user, id: auth })
    }
    throw new ConflictException(`User ${auth} already exists`)
  }

  async update(id: string, data: UpdateUserDto, auth: string): Promise<UserDto> {
    const user = await this.getOne(id, auth)

    return this.userRepository.save(_.merge(user, data))
  }

  async delete(id: string, auth: string): Promise<void> {
    await this.userRepository.delete({ id })
  }
}
