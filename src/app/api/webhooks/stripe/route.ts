import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { updateInvoiceStatus } from "@/lib/invoices";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;

    let event;

    try {
        if (!webhookSecret) {
            throw new Error("Missing STRIPE_WEBHOOK_SECRET");
        }
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as any;
            console.log(`Payment successful for session: ${session.id}`);

            const invoiceId = session.metadata?.invoiceId;
            if (invoiceId) {
                // Mark invoice as paid in Firestore
                await updateInvoiceStatus(invoiceId, "paid", session.id);

                // POTENTIAL: Trigger email with magic link or onboarding start
                // For now, we rely on the client being redirected to /onboarding
                // with the session_id and invoiceId in the URL.
            }
            break;

        case "customer.subscription.deleted":
            const subscription = event.data.object as any;
            console.log(`Subscription deleted: ${subscription.id}`);
            // Handle cancellation logic (e.g. mark campaign as inactive)
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
