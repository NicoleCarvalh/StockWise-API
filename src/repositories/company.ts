import {Company, PrismaClient} from "@prisma/client"

type CompanyDTO = Omit<Company, 'id'>

abstract class CompanyRepository {
  static prismaClient = new PrismaClient().company

  constructor() {}

  static create(company: CompanyDTO) {
    return CompanyRepository.prismaClient.create({data: company})
  }

  static getAll() {
    return CompanyRepository.prismaClient.findMany()
  }

  static getByEmailAndPassword(email: string, password: string) {
    return CompanyRepository.prismaClient.findUnique({where: {
      email,
      password
    }})
  }

  static getById(id: string) {
    return CompanyRepository.prismaClient.findUnique({where: {
      id
    }})
  }

  static update(id: string, newData: CompanyDTO) {
    return CompanyRepository.prismaClient.update({where: {
      id
    }, data: newData})
  }

  static delete(id: string) {
    return CompanyRepository.prismaClient.delete({where: {id}})
  }
}

export { CompanyRepository }