import { ArgumentMetadata, BadRequestException, Injectable, Logger, PipeTransform } from '@nestjs/common';
import * as S from "@effect/schema/Schema"
import { ArrayFormatter } from "@effect/schema"
import { Either } from 'effect';

@Injectable()
export class SchemaValidatorPipe implements PipeTransform {
  transform<T>(value: Record<string, unknown>, metadata: ArgumentMetadata) {
    const schemaClass = metadata.metatype! as unknown as S.Schema<T, T, never>;

    const validationPipe = S.validateEither(schemaClass, { errors: "all" })(value)
    if (Either.isLeft(validationPipe)) {
      const error = ArrayFormatter.formatErrorSync(validationPipe.left)
      Logger.error("Decoding failed:")
      Logger.error(error)
      throw new BadRequestException(error)
    }
    return validationPipe.right;
  }
}
