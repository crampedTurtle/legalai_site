# Email Service Setup for Assessment Reports

The AI Readiness Assessment now sends PDF reports via email. You can configure either AWS SES or SendGrid.

## Environment Variables Required

### Option 1: AWS SES (Recommended)
```bash
# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1

# Email Configuration
FROM_EMAIL=info@sapphirefive.com
FROM_NAME=Sapphire Legal AI
REPLY_TO_EMAIL=info@sapphirefive.com
```

### Option 2: SendGrid
```bash
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key

# Email Configuration
FROM_EMAIL=info@sapphirefive.com
FROM_NAME=Sapphire Legal AI
REPLY_TO_EMAIL=info@sapphirefive.com
```

## AWS SES Setup

1. **Create AWS Account** (if you don't have one)
2. **Verify Email Address** in SES Console
3. **Request Production Access** (if in sandbox mode)
4. **Create IAM User** with SES permissions
5. **Get Access Keys** and add to environment variables

### IAM Policy for SES
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

## SendGrid Setup

1. **Create SendGrid Account**
2. **Verify Sender Domain** or email address
3. **Create API Key** with Mail Send permissions
4. **Add API Key** to environment variables

## Email Features

### Assessment Report Email Includes:
- **Professional HTML template** with Sapphire Legal AI branding
- **Overall score visualization** with color-coded indicators
- **Category breakdown** showing performance in each area
- **PDF attachment** with detailed report
- **Call-to-action** to schedule consultation
- **Contact information** for follow-up

### Email Template Features:
- **Responsive design** that works on all devices
- **Branded styling** matching sapphirelegal.ai theme
- **Dynamic content** based on assessment results
- **Professional formatting** with proper typography
- **Clear next steps** and contact information

## Testing

To test email functionality:

1. **Set up environment variables** in your deployment platform
2. **Complete an assessment** on the website
3. **Check email delivery** to the provided address
4. **Verify PDF attachment** is included
5. **Test email template** rendering across different email clients

## Troubleshooting

### Common Issues:
- **Email not sending**: Check environment variables and API keys
- **PDF not attaching**: Verify PDF generation is working
- **Template not rendering**: Test HTML email compatibility
- **SES sandbox limits**: Request production access for higher limits

### Logs to Check:
- **Assessment API logs** for email sending status
- **Email service logs** for delivery confirmation
- **PDF generation logs** for attachment creation

## Security Notes

- **API keys** should be kept secure and not committed to version control
- **Email addresses** are validated before sending
- **PDF content** is generated server-side for security
- **Rate limiting** is implemented to prevent abuse 