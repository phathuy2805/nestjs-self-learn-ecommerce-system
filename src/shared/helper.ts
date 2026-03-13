import { randomInt } from 'crypto'
import { Prisma } from 'prisma/generated/client'

//Type Predicate
// This is a TypeScript feature that allows you to define a function that narrows down the type of a variable.
// It helps TypeScript understand the type of an object based on certain conditions.
// In this case, the function checks if the error is an instance of PrismaClientKnownRequestError and has a specific error code.
export function isUniqueConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}
export function isNotFoundPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}

export const generateOTP = (): string => {
  return String(randomInt(0, 1000000)).padStart(6, '0')
}
