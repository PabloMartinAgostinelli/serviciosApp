import prisma from './prisma'
import { hash } from 'bcrypt'

export async function createUser(name: string, email: string, password: string) {
  const hashedPassword = await hash(password, 10)
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function getProviders() {
  return prisma.provider.findMany()
}

export async function getCategories() {
  return prisma.category.findMany()
}

