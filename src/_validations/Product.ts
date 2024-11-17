import { date, z } from "zod"
import {} from "@prisma/client"

const ProductFormDataValidator = z.object({
    id: z.string({invalid_type_error: "Name must be string!"
    }).uuid({ message: "Invalid UUID" }).optional(),
    name: z.string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be string!"
    }).trim(),
    description: z.string({
        invalid_type_error: "Description must be string!"
    }).trim().optional().transform(value => value == undefined ? null : value),
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
    image: z.any().optional().transform(value => value == undefined ? null : value),
    technicalDetails: z.any(),
    quantityInStock: z.number({
        required_error: "Quantity in stock is required!",
        invalid_type_error: "Quantity in stock must be a number!",
    }).nonnegative({
        message: "Quantity in stock must be not negative!"
    }),
})

type ProductFormDataType = z.infer<typeof ProductFormDataValidator>

const ProductToSaveValidator = z.object({
    name: z.string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be string!"
    }).trim(),
    description: z.string({
        invalid_type_error: "Description must be string!"
    }).trim().optional().transform(value => value == undefined ? null : value),
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
    quantityInStock: z.number({
        required_error: "Quantity in stock is required!",
        invalid_type_error: "Quantity in stock must be a number!",
    }).nonnegative({
        message: "Quantity in stock must be not negative!"
    }),
    
    technicalDetails:z.any(),
    photoUrl: z.string().nullable(),
    trackUrl: z.string().nullable(),
    code: z.string({
        required_error: "Code is required!",
        invalid_type_error: "code must be string!"
    }).trim(),
    createdAt: z.date(),
    updatedAt: z.date(),
    companyId: z.string(),
    transactionId: z.null(), 
    virtualStockId: z.null()
})

type ProductToSaveType = z.infer<typeof ProductToSaveValidator>

export { ProductFormDataValidator, ProductFormDataType, ProductToSaveValidator, ProductToSaveType}