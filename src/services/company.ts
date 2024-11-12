import { Company } from "@prisma/client"
import { CompanyRepository } from "../repositories/company.ts"

type CompanyReceivedDTO = Omit<Company, 'id'>

abstract class CompanyService {
  static repository = CompanyRepository

  constructor() { }

  static async create(company: CompanyReceivedDTO) {
    const result = await CompanyService.repository.create(company).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static getAll() {
    const result = CompanyService.repository.getAll().catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static getByEmailAndPassword(email: string, password: string) {
    const result = CompanyService.repository.getByEmailAndPassword(
      email,
      password
    ).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static getById(id: string) {
    const result = CompanyService.repository.getById(
      id
    ).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static update(id: string, newData: CompanyReceivedDTO) {
    const result = CompanyService.repository.update(id,newData).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static delete(id: string) {
    const result = CompanyService.repository.delete(
      id
    ).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }
}

export { CompanyService }