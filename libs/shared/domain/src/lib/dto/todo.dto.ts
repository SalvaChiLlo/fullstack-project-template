import * as S from '@effect/schema/Schema';
import { UserDto } from './user.dto';

export const TodoDto = S.Struct({
  id: S.String.pipe(
    S.minLength(0),
    S.maxLength(32)
  ),
  title: S.String.pipe(
    S.minLength(0),
    S.maxLength(20)
  ),
  description: S.String.pipe(
    S.minLength(0),
    S.maxLength(100)
  ),
  completed: S.Boolean,
  user: UserDto.fields.id
})
export type TodoDto = S.Schema.Type<typeof TodoDto>


export const CreateTodoDto = TodoDto.pick('title', 'description')
export type CreateTodoDto = S.Schema.Type<typeof CreateTodoDto>

export const UpdateTodoDto = S.partial(TodoDto.pick('title', 'description', 'completed'))
export type UpdateTodoDto = S.Schema.Type<typeof UpdateTodoDto>
