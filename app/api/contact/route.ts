import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, service, message } = body

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const validatedData = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      service: String(service).trim(),
      message: String(message).trim(),
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'christinacontrerascleaning@gmail.com',
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #2D3436 0%, #1E272E 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #F5E6CC; margin: 0; font-size: 24px; text-align: center;">
              New Contact Form Submission
            </h1>
          </div>

          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #F5E6CC;">
              <h2 style="color: #2D3436; margin: 0 0 10px 0; font-size: 18px;">Contact Information</h2>
              <p style="margin: 5px 0; color: #636e72;">
                <strong style="color: #2D3436;">Name:</strong> ${validatedData.name}
              </p>
              <p style="margin: 5px 0; color: #636e72;">
                <strong style="color: #2D3436;">Email:</strong>
                <a href="mailto:${validatedData.email}" style="color: #F5E6CC; text-decoration: none;">
                  ${validatedData.email}
                </a>
              </p>
              <p style="margin: 5px 0; color: #636e72;">
                <strong style="color: #2D3436;">Phone:</strong>
                <a href="tel:${validatedData.phone}" style="color: #F5E6CC; text-decoration: none;">
                  ${validatedData.phone}
                </a>
              </p>
              <p style="margin: 5px 0; color: #636e72;">
                <strong style="color: #2D3436;">Service:</strong> ${validatedData.service}
              </p>
            </div>

            <div style="margin-top: 20px;">
              <h2 style="color: #2D3436; margin: 0 0 10px 0; font-size: 18px;">Message</h2>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #F5E6CC;">
                <p style="color: #636e72; margin: 0; white-space: pre-wrap; line-height: 1.6;">
                  ${validatedData.message}
                </p>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center;">
              <p style="color: #b2bec3; font-size: 12px; margin: 0;">
                This email was sent from the Christina Contreras Cleaning website contact form
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
