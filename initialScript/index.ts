import envConfig from 'src/shared/config'
import { RoleName } from 'src/shared/constants/role.constant'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'

const prisma = new PrismaService()
const hashing = new HashingService()

const main = async () => {
  await prisma.$connect()
  const roleCount = await prisma.role.count()
  console.log(roleCount)
  if (roleCount > 0) {
    throw new Error('Roles already exist')
  }
  const roles = await prisma.role.createMany({
    data: [
      { name: RoleName.Admin, description: 'Admin role' },
      { name: RoleName.Client, description: 'Client role' },
      { name: RoleName.Seller, description: 'Seller role' },
    ],
  })
  const adminRole = await prisma.role.findFirstOrThrow({
    where: { name: RoleName.Admin },
  })

  const hashedPassword = await hashing.hashPassword(envConfig.ADMIN_PASSWORD)
  const adminUser = await prisma.user.create({
    data: {
      email: envConfig.ADMIN_EMAIL,
      name: envConfig.ADMIN_NAME,
      password: hashedPassword,
      phoneNumber: envConfig.ADMIN_PHONENUMBER,
      roleId: adminRole.id,
    },
  })
  return {
    createdRoleCount: roles.count,
    adminUser,
  }
}

main()
  .then(async ({ adminUser, createdRoleCount }) => {
    console.log('Tạo mới admin user thành công với thông tin sau: ')
    console.log('Admin user:', adminUser.email)
    console.log('Số lượng role đã tạo:', createdRoleCount)
    await prisma.$disconnect()
  })
  .catch(console.error)
  .catch(async (error) => {
    console.error('Lỗi khi tạo mới admin user: ', error)
    await prisma.$disconnect()
    process.exit(1)
  })
