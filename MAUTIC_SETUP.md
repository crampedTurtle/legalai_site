# Mautic Integration Setup Guide

This guide explains how to set up Mautic integration for form submissions on the Sapphire Legal AI website.

## Overview

The website now uses Mautic for lead capture and form submissions, while keeping AWS SES for other email functionality. This provides:

- **Lead tracking and scoring**
- **Automated email campaigns**
- **UTM parameter tracking**
- **Contact segmentation**
- **Form analytics**

## Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Mautic Configuration
MAUTIC_BASE_URL=https://your-mautic-instance.com
MAUTIC_USERNAME=your_mautic_username
MAUTIC_PASSWORD=your_mautic_password

# Mautic Form IDs (create these forms in your Mautic instance)
MAUTIC_CONTACT_FORM_ID=1
MAUTIC_DEMO_FORM_ID=2
MAUTIC_SUPPORT_FORM_ID=3
MAUTIC_NEWSLETTER_FORM_ID=4
```

## Mautic Setup

### 1. Create Forms in Mautic

Create the following forms in your Mautic instance:

#### Contact Form (ID: 1)
- **Fields**: Name, Email, Firm, Message
- **Tags**: contact-form, sapphire-legal-ai
- **Actions**: Send notification email, add to contact list

#### Demo Request Form (ID: 2)
- **Fields**: First Name, Last Name, Email, Firm, Practice Area, Message
- **Tags**: demo-request, sapphire-legal-ai
- **Actions**: Send notification email, add to contact list, trigger demo scheduling workflow

#### Support Ticket Form (ID: 3)
- **Fields**: Name, Email, Subject, Priority, Message
- **Tags**: support-ticket, sapphire-legal-ai
- **Actions**: Send notification email, create support ticket, add to contact list

#### Newsletter Signup Form (ID: 4)
- **Fields**: Email
- **Tags**: newsletter, sapphire-legal-ai
- **Actions**: Add to newsletter list, send welcome email

### 2. Configure Custom Fields

Add these custom fields to your Mautic contacts:

- `practice_area` (text)
- `subject` (text)
- `priority` (text)
- `message` (textarea)

### 3. Set Up Email Templates

Create email templates for:
- **Contact form notifications**
- **Demo request confirmations**
- **Support ticket acknowledgments**
- **Newsletter welcome emails**

### 4. Configure Workflows

Set up automated workflows for:
- **Demo scheduling** (when demo form is submitted)
- **Lead nurturing** (based on form submissions)
- **Support ticket routing** (based on priority)

## API Endpoints

The following API endpoints are available:

### POST `/api/contact`
Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "firm": "Example Law Firm",
  "message": "I'm interested in learning more about your platform."
}
```

### POST `/api/demo`
Handles demo request form submissions.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "firm": "Example Law Firm",
  "practiceArea": "corporate",
  "message": "We're looking to streamline our document review process."
}
```

### POST `/api/support`
Handles support ticket form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Login Issue",
  "priority": "high",
  "message": "I'm unable to log into my account."
}
```

## UTM Parameter Tracking

The system automatically captures UTM parameters from the URL:
- `utm_source`
- `utm_medium`
- `utm_campaign`

These are included in all form submissions for tracking campaign effectiveness.

## Error Handling

The system includes comprehensive error handling:
- **Network errors** are logged and displayed to users
- **Validation errors** are shown inline
- **Mautic API errors** are logged for debugging
- **Fallback mechanisms** ensure forms don't break if Mautic is unavailable

## Testing

### 1. Test Form Submissions
Submit test data through each form to verify:
- Data is properly formatted
- Contacts are created in Mautic
- Tags are applied correctly
- UTM parameters are captured

### 2. Test Error Scenarios
- Submit forms with invalid data
- Test with Mautic unavailable
- Verify error messages are user-friendly

### 3. Test Email Workflows
- Verify notification emails are sent
- Check that contacts are added to correct lists
- Test automated workflows are triggered

## Monitoring

### 1. Mautic Analytics
Monitor in Mautic:
- Form submission rates
- Contact engagement
- Email campaign performance
- Lead scoring effectiveness

### 2. Application Logs
Monitor application logs for:
- API errors
- Authentication issues
- Data formatting problems

### 3. Error Tracking
Set up error tracking to monitor:
- Form submission failures
- Mautic API errors
- User experience issues

## Security Considerations

### 1. API Security
- Mautic credentials are stored securely
- API calls use HTTPS
- Access tokens are managed securely

### 2. Data Privacy
- Form data is transmitted securely
- UTM parameters are handled appropriately
- GDPR compliance is maintained

### 3. Rate Limiting
Consider implementing rate limiting to prevent abuse:
- Limit form submissions per IP
- Implement CAPTCHA for high-volume forms
- Monitor for suspicious activity

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify Mautic credentials
   - Check API permissions
   - Ensure Mautic instance is accessible

2. **Form Submission Failures**
   - Check form IDs in environment variables
   - Verify form fields match Mautic configuration
   - Review API response logs

3. **Data Formatting Issues**
   - Check field mappings in `formatContactData`
   - Verify custom fields exist in Mautic
   - Review data validation rules

### Debug Mode

Enable debug logging by adding to your environment:
```bash
DEBUG_MAUTIC=true
```

This will log detailed API requests and responses for troubleshooting.

## Migration from SES

If migrating from AWS SES form handling:

1. **Update environment variables** with Mautic configuration
2. **Test all forms** to ensure they work with new system
3. **Monitor submissions** to verify data is captured correctly
4. **Update email templates** in Mautic to match previous SES templates
5. **Configure workflows** to replace any SES-based automation

## Support

For issues with the Mautic integration:
1. Check the application logs
2. Verify Mautic configuration
3. Test API endpoints directly
4. Review this documentation
5. Contact the development team

## Future Enhancements

Potential improvements:
- **Real-time form validation** with Mautic
- **Advanced lead scoring** integration
- **Multi-step form workflows**
- **A/B testing** for form optimization
- **Advanced analytics** and reporting 