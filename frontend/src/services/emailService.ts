import { emitter } from '@/agentSdk';
import { Lead } from '@/data/mockData';
import api from '@/lib/api';

const SDR_AGENT_ID = "ca817a50-7f80-4daf-befc-5765b05e1e3b";

export const emailService = {
  async generateEmail(lead: Lead): Promise<string> {
    console.log(`Generating email for lead: ${lead.name} from ${lead.company}`);
    
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      console.log('Using mock data for email generation');
      await new Promise(resolve => setTimeout(resolve, 2000));
      const email = `Subject: Personalized Opportunity for ${lead.company}

Hi ${lead.name},

I noticed your work as ${lead.role} at ${lead.company} and was impressed by your industry presence in ${lead.industry}. ${lead.companyDescription ? `I read that ${lead.companyDescription}` : ''}

We specialize in AI-driven lead generation and have helped similar companies scale effectively. Given your location in ${lead.location || 'Global'}, I thought you might be interested in a brief chat.

Would you be open to a brief chat next week to see if there's a fit?

Best regards,
Henry Koushal
Founder @ AI SDR`;

      // Emit email draft requested event
      await emitter.emit({
        agentId: SDR_AGENT_ID,
        event: "email_draft_requested",
        payload: {
          leadId: lead.id,
          leadName: lead.name,
          company: lead.company,
          draft: email
        },
        uid: crypto.randomUUID()
      });

      return email;
    }

    try {
      const response = await api.post('/generate-email', {
        lead_name: lead.name,
        company: lead.company,
        role: lead.role,
        offering: "AI SDR Services",
        website: lead.website
      });
      console.log('Generate email API response:', response.data);
      const email = response.data.email;

      await emitter.emit({
        agentId: SDR_AGENT_ID,
        event: "email_draft_requested",
        payload: {
          leadId: lead.id,
          leadName: lead.name,
          company: lead.company,
          draft: email
        },
        uid: crypto.randomUUID()
      });

      return email;
    } catch (error) {
      console.error('Generate email API error:', error);
      throw error;
    }
  },

  async sendEmail(email: string, subject: string, body: string): Promise<boolean> {
    console.log(`Sending email to: ${email}`);
    if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    }
    try {
      const response = await api.post('/send-email', { email, subject, body });
      return response.status === 200;
    } catch (error) {
      console.error('Send email API error:', error);
      throw error;
    }
  }
};