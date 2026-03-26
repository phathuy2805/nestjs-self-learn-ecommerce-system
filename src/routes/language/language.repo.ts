import { CreateLanguageBodyType, LanguageType } from 'src/routes/language/language.model'
import { PrismaService } from 'src/shared/services/prisma.service'

export class LanguageRepository {
  constructor(private prismaService: PrismaService) {}
  findAll(): Promise<LanguageType[]> {
    return this.prismaService.language.findMany({
      where: {
        deletedAt: null,
      },
    }) as any
  }

  findById(id: string): Promise<LanguageType | null> {
    return this.prismaService.language.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    }) as any
  }

  create({ createdById, data }: { createdById: number; data: CreateLanguageBodyType }): Promise<LanguageType> {
    return this.prismaService.language.create({
      data: {
        ...data,
        createdById,
      },
    }) as any
  }
}
