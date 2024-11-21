import {Product, PrismaClient} from "@prisma/client"
import { InputJsonValue } from "@prisma/client/runtime/library"

type ProductDTO = Omit<Product, 'id'> & { technicalDetails: InputJsonValue }
type ProductUpdateDTO = Omit<Product, 'id' | 'companyId'> & { technicalDetails: InputJsonValue }

abstract class ProductRepository {
  // static prismaClient = new PrismaClient().product
  static prismaClient = new PrismaClient()

  constructor() {}

  static create(product: ProductDTO) {
    return ProductRepository.prismaClient.product.create({data: product})
  }

  static getAll(companyId: string) {
    return ProductRepository.prismaClient.product.findMany({where: {
      companyId
    }, include: {
      company: true
    }})
  }

  static getByCode(code: string, companyId: string) {
    return ProductRepository.prismaClient.product.findMany({where: {
      companyId,
      code
    }})
  }

  static getById(id: string) {
    return ProductRepository.prismaClient.product.findUnique({where: {
      id
    }})
  }

  static update(id: string, newData: ProductUpdateDTO) {
    return ProductRepository.prismaClient.product.update({where: {
      id
    }, data: newData})
  }

  static delete(id: string) {
    return ProductRepository.prismaClient.$transaction(async (prisma) => {
      await prisma.transaction.updateMany({
        where: {
          productsIds: {has: id}
        },
        data: {
          productsIds: {set: []}
        }
      })

      return prisma.product.delete({
        where: {id}
      })
    })
  }
}

export { ProductRepository }