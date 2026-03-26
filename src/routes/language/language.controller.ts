import { Controller, Get, Param } from '@nestjs/common'
import { ZodResponse } from 'nestjs-zod'
import { GetLanguageDetailResDTO, GetLanguageParamsDTO, GetLanguagesResDTO } from 'src/routes/language/language.dto'
import { LanguageService } from 'src/routes/language/language.service'

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}
  @Get()
  @ZodResponse({
    type: GetLanguagesResDTO,
  })
  findAll() {
    return this.languageService.findAll()
  }

  @Get(':languageId')
  @ZodResponse({
    type: GetLanguageDetailResDTO,
  })
  findById(@Param() params: GetLanguageParamsDTO) {
    return this.languageService.findById(params.languageId)
  }
}
