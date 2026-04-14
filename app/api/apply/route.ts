import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    
    const applicationData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      position: formData.get('position'),
      location: formData.get('location'),
      linkedIn: formData.get('linkedIn'),
      portfolio: formData.get('portfolio'),
      experience: formData.get('experience'),
      availability: formData.get('availability'),
      coverLetter: formData.get('coverLetter'),
      resume: formData.get('resume'),
    }

    // Create email content
    const emailContent = `
New Job Application Received

PERSONAL INFORMATION:
Name: ${applicationData.firstName} ${applicationData.lastName}
Email: ${applicationData.email}
Phone: ${applicationData.phone}

POSITION DETAILS:
Position: ${applicationData.position}
Location Preference: ${applicationData.location}
Years of Experience: ${applicationData.experience}
Availability: ${applicationData.availability}

PROFESSIONAL LINKS:
LinkedIn: ${applicationData.linkedIn || 'Not provided'}
Portfolio: ${applicationData.portfolio || 'Not provided'}

COVER LETTER:
${applicationData.coverLetter}

RESUME:
File attached: ${applicationData.resume ? (applicationData.resume as File).name : 'No file uploaded'}
    `

    // Here you would integrate with an email service like:
    // - SendGrid
    // - Resend
    // - Nodemailer
    // - AWS SES
    
    // For now, we'll log it and return success
    console.log('Application received:', emailContent)
    
    // Example with a mailto link (opens user's email client)
    // In production, you'd use a proper email service
    const mailtoLink = `mailto:owusuasiedumichael9@gmail.com?subject=Job Application - ${applicationData.position}&body=${encodeURIComponent(emailContent)}`
    
    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      mailtoLink 
    })
  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
