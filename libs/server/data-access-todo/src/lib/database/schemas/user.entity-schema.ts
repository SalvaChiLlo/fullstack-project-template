import { UserDto } from '@salvachll/shared/domain';
import { Column, Entity, EntitySchema, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';
import { ToDoEntitySchema } from './to-do.entity-schema';

@Entity()
export class UserEntitySchema extends UserDto {

  @PrimaryColumn()
  id!: String

  @Column()
  name!: String

  @JoinTable()
  @OneToMany(() => ToDoEntitySchema, todo => todo.user)
  todos!: ToDoEntitySchema[]
}