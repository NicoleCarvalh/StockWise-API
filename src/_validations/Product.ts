import { z } from "zod"

const ProductFormDataValidator = z.object({
    id: z.string({invalid_type_error: "Name must be string!"
    }).uuid({ message: "Invalid UUID" }).optional(),
    name: z.string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be string!"
    }).trim(),
    description: z.string({
        invalid_type_error: "Description must be string!"
    }).trim().optional(),
    qrcode: z.any().optional(),
    category: z.string({
        required_error: "Category is required!",
        invalid_type_error: "Category must be string!"
    }),
    salePrice: z.number({
        required_error: "Sale price is required!",
        invalid_type_error: "Sale price must be a number!",
    }).nonnegative({
        message: "Sale price must be not negative!"
    }),
    purchasePrice: z.number({
        required_error: "Purchase price is required!",
        invalid_type_error: "Purchase price must be a number!",
    }).nonnegative({
        message: "Purchase price must be not negative!"
    }),
    supplier: z.string({
        required_error: "Supplier is required!",
        invalid_type_error: "Supplier must be string!"
    }),
    image: z.any().optional(),
    technicalDetails: z.any().optional(),
    quantityInStock: z.number({
        required_error: "Quantity in stock is required!",
        invalid_type_error: "Quantity in stock must be a number!",
    }).nonnegative({
        message: "Quantity in stock must be not negative!"
    }),
})

type ProductFormDataType = z.infer<typeof ProductFormDataValidator>

export { ProductFormDataValidator, ProductFormDataType}