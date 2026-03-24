import { AgentConfig } from './types';
import { z } from 'zod';

export const AGENT_CONFIGS: AgentConfig[] = [
  {
    "id": "ca817a50-7f80-4daf-befc-5765b05e1e3b",
    "name": "AI Sales Development Representative (SDR)",
    "description": "An intelligent SDR assistant that automates lead prospecting, scoring, and personalized outreach to drive sales efficiency and pipeline growth.",
    "triggerEvents": [
      {
        "name": "lead_search_completed",
        "description": "Triggered when a lead search is finished; the agent automatically analyzes the results to highlight the top 3 highest-potential prospects.",
        "type": "sync",
        "outputSchema": z.object({
          topProspects: z.array(z.any())
        })
      },
      {
        "name": "lead_score_threshold_met",
        "description": "Triggered when a lead's ML score exceeds 85, prompting a proactive notification for immediate outreach.",
        "type": "async"
      },
      {
        "name": "email_draft_requested",
        "description": "Triggered when a user requests an email; the agent reviews enriched data to generate a context-aware outreach draft.",
        "type": "sync",
        "outputSchema": z.object({
          draft: z.string()
        })
      }
    ],
    "config": {
      "appId": "d892fab1-b197-467e-967a-80cf3c3be99a",
      "accountId": "eb566d13-f72a-44b1-8aae-bd7a3e51da6d",
      "widgetKey": "DZjjBH6NA4PPajSF4YesWAOT1ZdZcWMjdrCn0KYT"
    }
  }
];
