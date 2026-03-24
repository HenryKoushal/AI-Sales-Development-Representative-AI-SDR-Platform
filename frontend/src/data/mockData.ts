export interface Lead {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  website: string;
  linkedIn: string;
  score: number;
  scoreExplanation?: string;
  industry: string;
  companySize: string;
  companyDescription?: string;
  location?: string;
  status: 'New' | 'In Progress' | 'Converted' | 'Rejected';
  addedAt: string;
}

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@techflow.ai',
    role: 'Head of Engineering',
    company: 'TechFlow AI',
    website: 'https://techflow.ai',
    linkedIn: 'https://linkedin.com/in/sarahchen',
    score: 92,
    scoreExplanation: 'High-level decision maker | Target industry alignment',
    industry: 'Artificial Intelligence',
    companySize: '51-200',
    companyDescription: 'TechFlow AI is a leading provider of AI solutions, helping businesses optimize their operations.',
    location: 'San Francisco, CA',
    status: 'In Progress',
    addedAt: '2024-03-20'
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    email: 'mthorne@cloudscale.io',
    role: 'VP of Product',
    company: 'CloudScale',
    website: 'https://cloudscale.io',
    linkedIn: 'https://linkedin.com/in/marcusthorne',
    score: 88,
    scoreExplanation: 'Key leadership role | Optimal company size',
    industry: 'SaaS',
    companySize: '201-500',
    companyDescription: 'Innovative SaaS startup focusing on disruptive technology and customer success.',
    location: 'New York, NY',
    status: 'New',
    addedAt: '2024-03-21'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    email: 'elena@fintechly.com',
    role: 'CTO',
    company: 'FinTechly',
    website: 'https://fintechly.com',
    linkedIn: 'https://linkedin.com/in/elenarodriguez',
    score: 95,
    scoreExplanation: 'High-level decision maker | Target industry alignment',
    industry: 'FinTech',
    companySize: '11-50',
    companyDescription: 'Innovative FinTech startup focusing on disruptive technology and customer success.',
    location: 'Austin, TX',
    status: 'New',
    addedAt: '2024-03-22'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'dkim@healthnexus.org',
    role: 'Director of IT',
    company: 'HealthNexus',
    website: 'https://healthnexus.org',
    linkedIn: 'https://linkedin.com/in/davidkim',
    score: 74,
    scoreExplanation: 'Key leadership role | Enterprise potential',
    industry: 'Healthcare',
    companySize: '1000+',
    companyDescription: 'Established Healthcare company with a global footprint and over 10 years of experience.',
    location: 'London, UK',
    status: 'Rejected',
    addedAt: '2024-03-18'
  },
  {
    id: '5',
    name: 'Aisha Jallow',
    email: 'aisha@greenops.com',
    role: 'Founder',
    company: 'GreenOps',
    website: 'https://greenops.com',
    linkedIn: 'https://linkedin.com/in/aishajallow',
    score: 81,
    scoreExplanation: 'High-level decision maker',
    industry: 'Sustainability',
    companySize: '1-10',
    companyDescription: 'Innovative Sustainability startup focusing on disruptive technology and customer success.',
    location: 'Berlin, Germany',
    status: 'Converted',
    addedAt: '2024-03-15'
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'j.wilson@dataprism.net',
    role: 'Data Scientist',
    company: 'DataPrism',
    website: 'https://dataprism.net',
    linkedIn: 'https://linkedin.com/in/jameswilson',
    score: 68,
    scoreExplanation: 'Optimal company size',
    industry: 'Data Analytics',
    companySize: '51-200',
    companyDescription: 'A fast-growing Data Analytics player specialize in AI-driven automation and data analytics.',
    location: 'Singapore',
    status: 'New',
    addedAt: '2024-03-23'
  }
];