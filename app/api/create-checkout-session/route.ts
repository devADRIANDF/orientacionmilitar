import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Usar placeholder en build time, real key en runtime
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build'

const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-09-30.clover',
})

export async function POST(req: NextRequest) {
  try {
    // Verificar que la clave de Stripe esté configurada en producción
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe no está configurado. Contacta al administrador.' },
        { status: 500 }
      )
    }

    const { origin } = new URL(req.url)

    // Crear Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Asesoría Militar Personalizada',
              description: 'Sesión de 60 minutos con experto militar para elegir tu destino ideal',
              images: [`${origin}/images/asesoria-og.jpg`],
            },
            unit_amount: 7500, // 75€ en centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/reservar?canceled=true`,
      metadata: {
        service: 'asesoria_militar',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error al crear la sesión de pago' },
      { status: 500 }
    )
  }
}
