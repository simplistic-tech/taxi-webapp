// import { Stripe } from "@stripe/stripe-js";
import { NextResponse } from "next/server"
// require 'stripe';
// @ts-ignore
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    typescript:true,
    apiVersion:"2023-08-16"
})
export async function POST(request:any){
        const data:any= await request.json();
        const amount= data.amount;

        try{
                const paymentIntent = await Stripe.paymentIntents.create({
                    amount:Number(amount),
                    currency : 'USD'
                })
                return NextResponse.json(paymentIntent.client_secret,{status:200})
        }
        catch(error:any){
            return new NextResponse(error, {
                status: 400,
            });
        }


}