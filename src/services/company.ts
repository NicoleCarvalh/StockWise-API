import { Company } from "@prisma/client"
import { CompanyRepository } from "../repositories/company.ts"

type CompanyReceivedDTO = Omit<Company, 'id'>

abstract class CompanyService {
  static CompanyRepository = CompanyRepository

  constructor() { }

  static async create(company: CompanyReceivedDTO) {
    const result = await CompanyService.CompanyRepository.create(company).catch(error => error)
    
    if("error" in result) {
      return {isError: true, ...result}
    }

    return result
  }
}

export { CompanyService }