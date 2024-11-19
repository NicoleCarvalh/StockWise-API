import {Transaction, PrismaClient} from "@prisma/client"

type TransactionDTO = Omit<Transaction, 'id'>
type TransactionUpdateDTO = Omit<Transaction, 'id' | 'companyId'>

abstract class TransactionRepository {
  static prismaClient = new PrismaClient().transaction
  static prismaClient_product = new PrismaClient().product

  constructor() {}

  static async create(transaction: TransactionDTO, products: any[]) {
    const productsIds = products.map(order => {return {id: order.product.id}})
    
    const savedTransaction = await TransactionRepository.prismaClient.create({data: {...transaction, products: {
      connect: productsIds
    }}, include: {
      products: true
    }, })

    products.forEach(async (order) => {
      await TransactionRepository.prismaClient_product.update({data: {
        quantityInStock: order.product.quantityInStock - order.quantity,
        updatedAt: new Date()
      }, where: {
        id: order.product.id
      }})
    })

    return savedTransaction
  }

  static getAll(companyId: string) {
    return TransactionRepository.prismaClient.findMany({where: {
      companyId
    }, include: {
      products: true
    }})
  }

  static getById(id: string) {
    return TransactionRepository.prismaClient.findUnique({where: {
      id
    }})
  }

  static update(id: string, newData: TransactionUpdateDTO) {
    return TransactionRepository.prismaClient.update({where: {
      id
    }, data: newData})
  }

  static delete(id: string) {
    return TransactionRepository.prismaClient.delete({where: {id}})
  }
}

export { TransactionRepository }