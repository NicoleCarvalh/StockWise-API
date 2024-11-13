import { Company } from "@prisma/client"
import { CompanyRepository } from "../repositories/company.ts"
import { CompanyFormDataType } from "../_validations/Company.ts"
import { getPublicCompanyPhotoUrl, uploadCompanyPhoto } from "../_utils/supabase.ts"

type CompanyReceivedDTO = Omit<Company, 'id'>
type CompanyFormDataReceivedDTO = CompanyFormDataType

abstract class CompanyService {
  static repository = CompanyRepository

  constructor() { }

  static async create(company: CompanyFormDataReceivedDTO) {
    let result: Company;
    const {image, ...companyWithoutImage} = company // remove image key (selecting it and split in a variable) and create separete the other keys on 'companyWithoutImage'
    const companyFomated: CompanyReceivedDTO = {...companyWithoutImage, photoUrl: null}

    const companyFound = await CompanyService.repository.getByEmail(companyFomated.email)
    const companyExists = companyFound != null

    if(companyExists) {
      return {
        isError: true, 
        error: "Company email already exists!"
      } 
    }

    result = await CompanyService.repository.create(companyFomated).then(data => data).catch(error => error)

    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    if(company?.image) {
      const allwedFileExtensions = [".jpg", ".png", ".jpeg"]
      const companyImageExtension = allwedFileExtensions.filter(extension => company?.image?.originalname?.includes(extension))[0]
      
      const companyImageName = result.id.concat(companyImageExtension)

      await uploadCompanyPhoto(companyImageName, company.image).then(data => data).catch(error => console.log(error))

      const companyPublicUrl = getPublicCompanyPhotoUrl(companyImageName)

      const {id, ...newCompanyData} = result
      result = await CompanyService.repository.update(result.id, {...newCompanyData, photoUrl: companyPublicUrl})
    }

    return result
  }

  static getAll() {
    const result = CompanyService.repository.getAll().then(data => data).catch(error => error)
    
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
    ).then(data => data).catch(error => error)
    
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
    ).then(data => data).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static update(id: string, newData: CompanyReceivedDTO) {
    const result = CompanyService.repository.update(id,newData).then(data => data).catch(error => error)
    
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
    ).then(data => data).catch(error => error)
    
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