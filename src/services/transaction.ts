import { Transaction } from "@prisma/client"
import { TransactionRepository } from "../repositories/transaction.js"
import { TransactionObjectValidator, TransactionObjectType, TransactionObjectReceivedType } from "../_validations/Transaction.js"

type TransactionReceivedDTO = Omit<Transaction, 'id'>

abstract class TransactionService {
  static repository = TransactionRepository

  constructor() { }

  static async create(transaction: TransactionObjectReceivedType) {
    const formattedTransaction: TransactionObjectReceivedType = {
      ...transaction,
      createdAt: new Date(),
      fileUrl: null,
      productsIds: transaction.products.map(order => {return order.product.id}),
      orders: JSON.stringify(transaction.orders)
    }

    const {products, ...cleanFormattedTransaction} = formattedTransaction

    return await this.repository.create(cleanFormattedTransaction, products) 
  }

  static getAll(companyId: string) {
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
    const result = this.repository.getById(
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

  static async update(id: string, newData: TransactionObjectReceivedType) {
    return null
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

export { TransactionService }