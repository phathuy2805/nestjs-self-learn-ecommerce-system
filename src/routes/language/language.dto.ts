import { createZodDto } from 'nestjs-zod'
import {
  GetLanguageDetailResSchema,
  GetLanguageParamsSchema,
  GetLanguagesResSchema,
} from 'src/routes/language/language.model'

export class GetLanguagesResDTO extends createZodDto(GetLanguagesResSchema) {}
export class GetLanguageDetailResDTO extends createZodDto(GetLanguageDetailResSchema) {}
export class GetLanguageParamsDTO extends createZodDto(GetLanguageParamsSchema) {}
