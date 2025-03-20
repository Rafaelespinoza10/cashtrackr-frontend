import { z } from 'zod';

export const RegisterSchema = z.object({
    email: z.string()
        .min(1, { message: 'Email es obligatorio' })
        .email({ message: 'Email no válido' })
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'El correo no tiene un formato válido' }),

    name: z.string().min(1, { message: 'Nombre es obligatorio' }),

    password: z.string()
        .min(8, { message: 'El password debe de ser más largo' })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
               { message: 'El password debe contener al menos 6 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial' }),

    password_confirmation: z.string(),
})
.refine((data) => data.password === data.password_confirmation, {
    message: 'Los passwords deben de ser iguales',
    path: ['password_confirmation']
});

export const LoginSchema = z.object({
    email: z.string()
            .min(1, {message: 'El Email es Obligatorio'})
            .email( {message: 'Email no válido'}),
    password: z.string()
            .min(1, {message: 'El Password no puede ir vacio'})
})


export const ForgotPasswordSchema = z.object({
    email: z.string()   
            .min(1, {message: 'El Email es Obligatorio'})
            .email( {message: 'Email no válido'}),
});


export const UpdateAccountUserSchema = z.object({
    email: z.string()
            .min(1, {message: 'El email es obligatorio'})
            .email({message: 'Email no valido'}),
    name: z.string().min(1, {message: 'El nombre es obligatorio'})
});

export const SuccessSchema = z.string().min(1, { message: 'Valor no valido'});
export const ErrorResponseSchema = z.object({
    error:  z.string(),
})

export const TokenSchema = z.string({ message: 'Token no valido' }).length(6, {message: 'Token no valido'}).max(6, {message: 'Token no valido'});

export const DraftBudgetSchema = z.object({
    name: z.string()
            .min(1, {message: 'El Nombre del presupuesto es obligatorio'}),
    amount: z.coerce.
            number({message: 'Cantidad no válida'})
            .min(1, {message: 'Cantidad no válida'}),
})

export const ResetPasswordSchema = z.object({
    password: z.string()
            .min(8, {message: 'El Password debe ser de al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

export const ExpenseBudgetSchema = z.object({
    Id: z.number(),
    Name: z.string(),
    Amount: z.string(),
    budgetId: z.number(),
    CreatedAt: z.string(),
    UpdatedAt: z.string()
})

export const BudgetAPIResponseSchema = z.object({
    Id: z.number(),
    Name: z.string(),
    Amount: z.string(),
    UserId: z.number(),
    CreatedAt: z.string(),
    UpdatedAt: z.string(),
    expenses: z.array(ExpenseBudgetSchema),
});


export const BudgetsApiResponseSchema = z.array(BudgetAPIResponseSchema);

export const DraftExpenseSchema = z.object({
    name: z.string().min(1, {message: 'El nombre es obligatorio'}),
    amount: z.coerce.number().min(1, {message: 'Cantidad no valida'})
});

export const UserSchema = z.object({
    user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email()
      })
})

export const  UpdatePasswordSchema = z.object({
    current_password : z.string().min(1, { message: 'El password no puede ir vacio'}),
    password: z.string().min(8, {message: 'El nuevo password debe de contener al menos 8 caracteres'}),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation ,{
    message: 'Los password no son iguales',
    path: ["password_confirmation"]
});


export const PasswordValidationSchema = z.string().min(1, { message: 'Password no valido'});

export type Budget = z.infer<typeof BudgetAPIResponseSchema>;
export type Expense = z.infer<typeof ExpenseBudgetSchema>;
export type DraftExpense = z.infer<typeof DraftExpenseSchema>;