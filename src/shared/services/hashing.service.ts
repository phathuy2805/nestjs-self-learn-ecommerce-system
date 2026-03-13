import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

const saltRounds = 10

@Injectable()
export class HashingService {
  hashPassword(value: string): Promise<string> {
    return hash(value, saltRounds)
  }

  comparePassword(typedPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(typedPassword, hashedPassword)
  }
}
