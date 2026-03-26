import { Injectable } from '@nestjs/common'
import { LanguageAlreadyExistsException } from 'src/routes/language/language.error'
import { CreateLanguageBodyType } from 'src/routes/language/language.model'
import { LanguageRepository } from 'src/routes/language/language.repo'
import { NotFoundRecordException } from 'src/shared/error'
import { isUniqueConstraintPrismaError } from 'src/shared/helper'

@Injectable()
export class LanguageService {
  constructor(private languageRepo: LanguageRepository) {}
  async findAll() {
    const data = await this.languageRepo.findAll()
    return {
      data,
      totalItems: data.length,
    }
  }

  async findById(id: string) {
    const language = await this.languageRepo.findById(id)
    if (!language) {
      throw NotFoundRecordException
    }
    return language
  }

  async create({ data, createdById }: { data: CreateLanguageBodyType; createdById: number }) {
    try {
      return this.languageRepo.create({
        createdById,
        data,
      })
    } catch (error) {
      if (isUniqueConstraintPrismaError(error)) {
        throw LanguageAlreadyExistsException
      }
      throw error
    }
  }
}
