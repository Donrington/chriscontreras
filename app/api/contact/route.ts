import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

/**
 * Contact Form API Route
 *
 * This API route handles form submissions from the contact modal.
 * Currently logs submissions to console. To enable email sending:
 *
 * Option 1 - Resend (Recommended):
 * 1. Install: npm install resend
 * 2. Get API key from https://resend.com
 * 3. Add to .env.local: RESEND_API_KEY=your_key_here
 * 4. Uncomment Resend code below
 *
 * Option 2 - SendGrid:
 * 1. Install: npm install @sendgrid/mail
 * 2. Get API key from https://sendgrid.com
 * 3. Add to .env.local: SENDGRID_API_KEY=your_key_here
 *
 * Option 3 - Nodemailer (SMTP):
 * 1. Install: npm install nodemailer
 * 2. Configure SMTP settings in .env.local
 */

// Email validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Log submission for testing
    console.log("📧 Contact form submission:", {
      to: "Zal423306@gmail.com",
      from: validatedData.email,
      subject: `New Contact Form Submission from ${validatedData.name}`,
      data: validatedData,
    })

    // Send email using Resend
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'Zal423306@gmail.com',
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1C4274; border-bottom: 2px solid #F5E6CC; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #F4F7FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
            <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #1C4274;">Message:</h3>
            <p style="line-height: 1.6;">${validatedData.message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #F5E6CC; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            Sent from Chris Contreras Cleaning website
          </p>
        </div>
      `,
    })

    // ============================================================
    // OPTION 2: SendGrid
    // ============================================================
    /*
    const sgMail = await import('@sendgrid/mail')
    sgMail.default.setApiKey(process.env.SENDGRID_API_KEY!)

    await sgMail.default.send({
      to: 'Zal423306@gmail.com',
      from: 'your-verified-sender@yourdomain.com', // Must be verified in SendGrid
      subject: `New Contact Form Submission from ${validatedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `,
    })
    */

    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.errors[0].message,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit form. Please try again.",
      },
      { status: 500 }
    )
  }
}
