import {Company, PrismaClient} from "@prisma/client"

type CompanyDTO = Omit<Company, 'id'>

abstract class CompanyRepository {
  static prismaClient = new PrismaClient().company

  constructor() {}

  static create(company: CompanyDTO) {
    return this.prismaClient.create({data: company})
  }

  static getAll() {
    return this.prismaClient.findMany()
  }

  static getByEmailAndPassword(email: string, password: string) {
    return this.prismaClient.findUnique({where: {
      email,
      password
    }})
  }

  static getByEmail(email: string) {
    return this.prismaClient.findUnique({where: {
      email
    }})
  }

  static getById(id: string) {
    return this.prismaClient.findUnique({where: {
      id
    }})
  }

  static update(id: string, newData: CompanyDTO) {
    return this.prismaClient.update({where: {
      id
    }, data: newData})
  }

  static delete(id: string) {
    return this.prismaClient.delete({where: {id}})
  }
}

export { CompanyRepository }