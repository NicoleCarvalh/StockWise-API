import {VirtualStock, PrismaClient} from "@prisma/client"

type VirtualStockDTO = Omit<VirtualStock, 'id'>
type VirtualStockUpdateDTO = Omit<VirtualStock, 'id' | 'companyId'>

abstract class VirtualStockRepository {
  static prismaClient = new PrismaClient().virtualStock

  constructor() {}

  static async create(virtualStock: VirtualStockDTO, products: any[]) {
    const productsIds = products.map(product => {return {id: product.id}})
    
    const savedVirtualStock = await VirtualStockRepository.prismaClient.create({data: {...virtualStock, products: {
      connect: productsIds
    }}, include: {
      products: true
    }})

    return savedVirtualStock
  }

  static getAll(companyId: string) {
    return VirtualStockRepository.prismaClient.findMany({where: {
      companyId
    }, include: {
      products: true
    }})
  }

  static getById(id: string) {
    return VirtualStockRepository.prismaClient.findUnique({where: {
      id
    }})
  }

  static async update(id: string, newData: VirtualStockUpdateDTO, productsIds: {id: string}[]) {
    console.log("REPOSITORY")
    console.log(id)
    console.log(newData)
    console.log(productsIds)
    return await VirtualStockRepository.prismaClient.update({where: {
      id
    }, data: {
      ...newData,
      products: {
        connect: productsIds
      }
    }})
  }

  static delete(id: string) {
    return VirtualStockRepository.prismaClient.delete({where: {id}})
  }
}

export { VirtualStockRepository }