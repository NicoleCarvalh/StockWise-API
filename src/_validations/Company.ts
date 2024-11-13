import { z } from "zod"

const CompanyObjectValidator = z.object({
    id: z.string({invalid_type_error: "Name must be string!"
    }).uuid({ message: "Invalid UUID" }).optional(),
    name: z.string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be string!"
    }).trim(),
    email: z.string({
        required_error: "Email is required!",
        invalid_type_error: "Email must be string!"
    }).email({message: "Invalid email address!"}),
    password: z.string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be string!"
    }).min(8, {message: "Must be 8 or more characters long"}),
    category: z.string({
        invalid_type_error: "Category must be string!"
    }).optional(),
    photoUrl: z.string({
        invalid_type_error: "Category must be string!"
    }).url({
        message: "Invalid url!"
    }).optional()
})

const CompanyUpdateDataValidator = z.object({
    name: z.string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be string!"
    }).trim().optional(),
    email: z.string({
        required_error: "Email is required!",
        invalid_type_error: "Email must be string!"
    }).email({message: "Invalid email address!"}).optional(),
    password: z.string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be string!"
    }).min(8, {message: "Must be 8 or more characters long"}).optional(),
    category: z.string({
        invalid_type_error: "Category must be string!"
    }).optional(),
    photoUrl: z.string({
        invalid_type_error: "Category must be string!"
    }).url({
        message: "Invalid url!"
    }).optional()
})

const CompanyCredentialsValidator = z.object({
    email: z.string({
        required_error: "Email is required!",
        invalid_type_error: "Email must be string!"
    }).email({message: "Invalid email address!"}),
    password: z.string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be string!"
    }).min(8, {message: "Must be 8 or more characters long"}),
})

const CompanyFormDataValidator = z.object({
    name: z.string({
        required_error: "Name is required!",
        invalid_type_error: "Name must be string!"
    }).trim(),
    email: z.string({
        required_error: "Email is required!",
        invalid_type_error: "Email must be string!"
    }).email({message: "Invalid email address!"}),
    password: z.string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be string!"
    }).min(8, {message: "Must be 8 or more characters long"}),
    category: z.string({
        invalid_type_error: "Category must be string!"
    }),
    image: z.any().optional()
})

type CompanyFormDataType = z.infer<typeof CompanyFormDataValidator>

export {CompanyObjectValidator, CompanyUpdateDataValidator, CompanyCredentialsValidator, CompanyFormDataValidator, CompanyFormDataType}