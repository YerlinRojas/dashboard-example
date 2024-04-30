'use server'

import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// todas las actiones son del servidor 
// no se envian al cliente
import {z} from 'zod'

//validacion de datos
const CreateInvoiceFormSchema = z.object({
    id:z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending' ,'paid']),
    date: z.string()
})

// omite
const CreateInvoiceSchema = CreateInvoiceFormSchema.omit({ 
    id:true,
    date: true
 })

 //funcion
export async function createInvoice(formData: FormData) {
    const {customerId, amount,status} = CreateInvoiceSchema.parse({
        customerId: formData.get('customerId'),
        amount : formData.get('amount'),
        status: formData.get('status')
    })

    const amountInCents = amount * 100
    const [date] = new Date().toISOString().split('T')

    //insert!

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
}