import { z } from "zod"

const TransactionObjectValidator = z.object({
    id: z.string({invalid_type_error: "Name must be string!"
    }).uuid({ message: "Invalid UUID" }).optional(),
    type: z.string({
        required_error: "Type is required!",
        invalid_type_error: "Type must be string!"
    }).trim(),
    total: z.number({
        required_error: "Total is required!",
        invalid_type_error: "Total must be number!"
    }).min(0, {
        message: "Total minimum value is 0!"
    }),
    paymentMethod: z.string({
        required_error: "Payment method is required!",
        invalid_type_error: "Payment method must be string!"
    }).min(2, {message: "Must be 2 or more characters long"}),
    clientName: z.string({
        required_error: "Client name is required!",
        invalid_type_error: "Client name must be string!"
    }),
    clientEmail: z.string({
        required_error: "Client email is required!",
        invalid_type_error: "Client email must be string!"
    }).email({message: "Invalid email address!"}),
    fileUrl: z.string({
        invalid_type_error: "FileUrl must be string!"
    }).url({
        message: "Invalid url!"
    }).optional(),
    createdAt: z.date(),
    companyId: z.string(),
})

const TransactionObjectReceivedValidator = z.object({
    id: z.string({invalid_type_error: "Name must be string!"
    }).uuid({ message: "Invalid UUID" }).optional(),
    type: z.string({
        required_error: "Type is required!",
        invalid_type_error: "Type must be string!"
    }).trim(),
    total: z.number({
        required_error: "Total is required!",
        invalid_type_error: "Total must be number!"
    }).min(0, {
        message: "Total minimum value is 0!"
    }),
    paymentMethod: z.string({
        required_error: "Payment method is required!",
        invalid_type_error: "Payment method must be string!"
    }).min(2, {message: "Must be 2 or more characters long"}),
    clientName: z.string({
        required_error: "Client name is required!",
        invalid_type_error: "Client name must be string!"
    }),
    clientEmail: z.string({
        required_error: "Client email is required!",
        invalid_type_error: "Client email must be string!"
    }).email({message: "Invalid email address!"}),
    fileUrl: z.string({
        invalid_type_error: "FileUrl must be string!"
    }).url({
        message: "Invalid url!"
    }).nullable(),
    createdAt: z.date(),
    companyId: z.string(),
    products: z.array(z.any()),
    productsIds: z.array(z.string())
})

type TransactionObjectType = z.infer<typeof TransactionObjectValidator>
type TransactionObjectReceivedType = z.infer<typeof TransactionObjectReceivedValidator>


export { TransactionObjectValidator, TransactionObjectType, TransactionObjectReceivedType }