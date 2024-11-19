import { z } from "zod"

const VirtualStockObjectValidator = z.object({
    id: z.string({invalid_type_error: "Name must be string!"
    }).uuid({ message: "Invalid UUID" }).optional(),
    name: z.string({
        required_error: "name is required!",
        invalid_type_error: "name must be string!"
    }).trim(),
    description: z.string({
        required_error: "Description is required!",
        invalid_type_error: "Description must be string!"
    }),
    place: z.string({
        required_error: "Place is required!",
        invalid_type_error: "Place must be string!"
    }).min(2, {message: "Must be 3 or more characters long"}),
    code: z.string({
        required_error: "Code is required!",
        invalid_type_error: "Code must be string!"
    }),
    categories: z.array(z.string()),
    createdAt: z.date(),
    companyId: z.string(),

    products: z.array(z.any()),
    productsIds: z.array(z.string()).optional()
})

const VirtualStockObjectReceivedValidator = z.object({
    id: z.string().optional(),
    name: z.string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be string!"
    }).trim(),
    description: z.string({
        required_error: "Description is required!",
        invalid_type_error: "Description must be string!"
    }),
    place: z.string({
        required_error: "Place is required!",
        invalid_type_error: "Place must be string!"
    }).min(2, {message: "Must be 3 or more characters long"}),
    code: z.string({
        required_error: "Code is required!",
        invalid_type_error: "Code must be string!"
    }),
    categories: z.array(z.string()),
    createdAt: z.date(),
    companyId: z.string(),
    products: z.array(z.any()),
    productsIds: z.array(z.string())
})

type VirtualStockObjectType = z.infer<typeof VirtualStockObjectValidator>
type VirtualStockObjectReceivedType = z.infer<typeof VirtualStockObjectReceivedValidator>


export { VirtualStockObjectValidator, VirtualStockObjectType, VirtualStockObjectReceivedType }