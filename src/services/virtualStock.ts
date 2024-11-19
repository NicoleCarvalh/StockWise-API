import { VirtualStock } from "@prisma/client"
import { VirtualStockRepository } from "../repositories/virtualStock.ts"
import { VirtualStockObjectValidator, VirtualStockObjectType, VirtualStockObjectReceivedType } from "../_validations/VirtualStock.ts"
import { codeGenerator } from "../_utils/stringGenerator.ts"

type VirtualStockReceivedDTO = Omit<VirtualStock, 'id'>

abstract class VirtualStockService {
  static repository = VirtualStockRepository

  constructor() { }

  static async create(virtualStock: VirtualStockObjectReceivedType) {
    const formattedVirtualStock: VirtualStockObjectReceivedType = {
        ...virtualStock,
        createdAt: new Date(),
        code: codeGenerator(8, null),
        productsIds: virtualStock.products.map(products => products.id)
    }

    const {products, ...cleanFormattedVirtualStock} = formattedVirtualStock

    return await this.repository.create(cleanFormattedVirtualStock, products) 
  }

  static async getAll(companyId: string) {
    const result = this.repository.getAll(companyId).then(data => data).catch(error => error)
    
    if("error" in result) {
      return {
        isError: true, 
        ...result
      }
    }

    return result
  }

  static getById(id: string) {
    // const result = this.repository.getById(
    //   id
    // ).then(data => data).catch(error => error)
    
    // if("error" in result) {
    //   return {
    //     isError: true, 
    //     ...result
    //   }
    // }

    // return result
  }

  static async update(receivedId: string, newData: VirtualStockObjectReceivedType) {
    const productsIds = newData.products.map(prod => {return {id: prod?.id}})

    const {id, ...cleanVirtualStock} = newData

    return await this.repository.update(receivedId, cleanVirtualStock, productsIds)
  }

  static delete(id: string) {
    const result = this.repository.delete(
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

export { VirtualStockService }