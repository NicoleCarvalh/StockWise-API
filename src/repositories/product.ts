import {Product, PrismaClient} from "@prisma/client"
import { InputJsonValue } from "@prisma/client/runtime/library"

type ProductDTO = Omit<Product, 'id'> & { technicalDetails: InputJsonValue }
type ProductUpdateDTO = Omit<Product, 'id' | 'companyId'> & { technicalDetails: InputJsonValue }

abstract class ProductRepository {
  static prismaClient = new PrismaClient().product

  constructor() {}

  static create(product: ProductDTO) {
    return ProductRepository.prismaClient.create({data: product})
  }

  static getAll() {
    return ProductRepository.prismaClient.findMany()
  }

  static getByCode(code: string) {
    return ProductRepository.prismaClient.findFirst({where: {code}})
  }

  static getById(id: string) {
    return ProductRepository.prismaClient.findUnique({where: {
      id
    }})
  }

  static update(id: string, newData: ProductUpdateDTO) {
    return ProductRepository.prismaClient.update({where: {
      id
    }, data: newData})
  }

  static delete(id: string) {
    return ProductRepository.prismaClient.delete({where: {id}})
  }
}

export { ProductRepository }