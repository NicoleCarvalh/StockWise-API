import {Company, PrismaClient} from "@prisma/client"

type CreateCompanyDTO = Omit<Company, 'id'>

abstract class CompanyRepository {
  static prismaClient = new PrismaClient().company

  constructor() {}

  static create(company: CreateCompanyDTO) {
    return CompanyRepository.prismaClient.create({data: company})
  }

  getAll() {
    return CompanyRepository.prismaClient.findMany()
  }

}

export { CompanyRepository }