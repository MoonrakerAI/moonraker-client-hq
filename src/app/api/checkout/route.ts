import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getInvoice } from "@/lib/invoices";

export async function POST(req: Request) {
    try {
        const { priceId, mode, customerEmail, paymentMethod, invoiceId } = await req.json();

        let lineItems: any[] = [];
        let metadata: any = { payment_method: paymentMethod };
        let baseAmount = 0;

        // 1. Handle Invoice-based checkout
        if (invoiceId) {
            const invoice = await getInvoice(invoiceId);
            if (!invoice) {
                return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
            }

            baseAmount = invoice.totalAmount;
            metadata.invoiceId = invoiceId;

            lineItems = invoice.items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        description: item.description,
                    },
                    unit_amount: item.amount,
                    recurring: item.recurring ? { interval: "month" } : undefined,
                },
                quantity: 1,
            }));
        }
        // 2. Fallback to legacy static pricing (optional, keeping for compatibility during pivot)
        else {
            baseAmount = mode === "payment" ? 500000 : 150000;
            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: mode === "payment" ? "Foundational SEO (3-Month Investment)" : "Ongoing Growth Strategy",
                    },
                    unit_amount: baseAmount,
                    recurring: mode === "subscription" ? { interval: "month" } : undefined,
                },
                quantity: 1,
            });
        }

        // 3. Add 3.5% convenience fee for Credit Card
        if (paymentMethod === "card") {
            const feeAmount = Math.round(baseAmount * 0.035);
            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Credit Card Processing Fee (3.5%)",
                    },
                    unit_amount: feeAmount,
                    recurring: mode === "subscription" ? { interval: "month" } : undefined,
                },
                quantity: 1,
            });
            metadata.fee_applied = "true";
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: [paymentMethod], // "card" or "us_bank_account"
            line_items: lineItems,
            mode: mode || (invoiceId ? "payment" : "subscription"),
            payment_method_options: paymentMethod === "us_bank_account" ? {
                us_bank_account: {
                    verification_method: "instant",
                },
            } : undefined,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?session_id={CHECKOUT_SESSION_ID}${invoiceId ? `&invoiceId=${invoiceId}` : ''}`,
            cancel_url: invoiceId
                ? `${process.env.NEXT_PUBLIC_APP_URL}/invoice/${invoiceId}`
                : `${process.env.NEXT_PUBLIC_APP_URL}/`,
            customer_email: customerEmail,
            metadata: metadata
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error("Stripe Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
