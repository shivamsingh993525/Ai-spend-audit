import { Resend } from 'resend'

const resend = new Resend(
  process.env.RESEND_API_KEY
)

export async function POST(req: Request) {

  try {

    const body = await req.json()

    await resend.emails.send({

      from: 'onboarding@resend.dev',

      to: body.email,

      subject: 'Your AI Audit Report',

      html: `
        <h1>AI Audit Completed 🚀</h1>

        <p>
          Your audit report has been generated successfully.
        </p>

        <p>
          Thank you for using AI Spend Audit.
        </p>
      `,

    })

    return Response.json({
      success: true
    })

  } catch (error) {

    console.log(error)

    return Response.json({
      success: false
    })

  }

}