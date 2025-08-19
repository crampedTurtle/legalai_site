# Mautic Integration Setup

The assessment feature can optionally integrate with Mautic for lead capture and tracking.

## Environment Variables Required

Add these to your Vercel environment variables:

```bash
# Mautic Configuration
MAUTIC_BASE_URL=https://mautic.sapphirefive.com
MAUTIC_USERNAME=your_mautic_username
MAUTIC_PASSWORD=your_mautic_password

# Form IDs (optional - will use defaults if not set)
MAUTIC_CONTACT_FORM_ID=1
MAUTIC_DEMO_FORM_ID=2
MAUTIC_SUPPORT_FORM_ID=3
MAUTIC_NEWSLETTER_FORM_ID=4
```

## Mautic Setup Steps

1. **Access your Mautic instance** at https://mautic.sapphirefive.com
2. **Create API credentials** in Mautic admin panel
3. **Set up forms** for different submission types
4. **Configure workflows** for lead nurturing
5. **Add environment variables** to Vercel

## What Gets Tracked

### Assessment Submissions:
- **Contact information** (name, email, firm)
- **Assessment score** and completion status
- **Tags** for segmentation and automation
- **UTM parameters** for attribution

### Form Submissions:
- **Contact form** submissions
- **Demo requests** 
- **Support tickets**
- **Newsletter signups**

## Benefits

- **Lead capture** and nurturing
- **Email automation** workflows
- **Analytics** and reporting
- **CRM integration** capabilities
- **Attribution tracking** for marketing campaigns

## Testing

1. **Complete an assessment** on the website
2. **Check Mautic** for new contact creation
3. **Verify tags** and custom fields
4. **Test workflows** and automation

## Troubleshooting

- **Check environment variables** are set correctly
- **Verify API credentials** in Mautic
- **Test API connectivity** from serverless functions
- **Check Mautic logs** for authentication issues 