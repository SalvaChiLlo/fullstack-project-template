import { TodoDto } from '@salvachll/shared/domain';
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntitySchema } from './user.entity-schema';

@Entity()
export class ToDoEntitySchema extends TodoDto {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: String

  @Column()
  description!: String

  @Column({ default: false })
  completed!: Boolean

  @JoinTable()
  @ManyToOne(() => UserEntitySchema, user => user.todos)
  user!: UserEntitySchema
}