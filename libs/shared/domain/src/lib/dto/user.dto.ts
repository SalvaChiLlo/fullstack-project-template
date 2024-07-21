import * as S from '@effect/schema/Schema';

export const UserDto = S.Struct({
  id: S.String.pipe(
    S.minLength(0),
    S.maxLength(10)
  ),
  name: S.String.pipe(
    S.minLength(0),
    S.maxLength(20)
  )
})
export type UserDto = S.Schema.Type<typeof UserDto>


export const CreateUserDto = UserDto.pick("name")
export type CreateUserDto = S.Schema.Type<typeof CreateUserDto>

export const UpdateUserDto = S.partial(CreateUserDto)
export type UpdateUserDto = S.Schema.Type<typeof UpdateUserDto>
