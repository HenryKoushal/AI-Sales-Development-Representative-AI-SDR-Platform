import random

class EmailGenerator:
    async def generate(self, request):
        lead_name = getattr(request, 'lead_name', 'there')
        company = getattr(request, 'company', 'your company')
        role = getattr(request, 'role', 'leader')
        offering = getattr(request, 'offering', 'our solutions')
        website = getattr(request, 'website', '')
        
        # Simulate fetching and summarizing website content
        summary = f'Your work at {company} caught our eye, particularly how you manage your {role} responsibilities and drive growth.'
        if website:
            summary += f' After reviewing {website}, I was impressed by your company's recent innovative approaches.'
            
        templates = [
            f'Subject: Transforming {company}'s Outreach with AI

Hi {lead_name},

I was recently researching {company} and noticed the impressive work you're doing as {role}. {summary}

We've helped companies in your space achieve 3x more engagement using {offering}. I'd love to share how this could work for you.

Would you have 10 minutes next Tuesday?

Best,
AI SDR Team',
            f'Subject: Quick question about {company}'s strategy

Hi {lead_name},

I came across {company} while looking into leaders in your industry. As {role}, I thought you'd be interested in how {offering} is helping peers streamline their workflow.

{summary}

Are you open to a brief conversation about this?

Regards,
AI SDR Team'
        ]
        
        return random.choice(templates)

    async def send(self, recipient_email, subject, body):
        # Simulate SMTP sending
        print(f'Sending email to {recipient_email} with subject: {subject}')
        return True

email_generator = EmailGenerator()