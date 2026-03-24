import random

class LeadScorer:
    def calculate_score(self, lead_data):
        base_score = 40
        explanations = []
        
        role = lead_data.get('role', '').lower()
        if any(keyword in role for keyword in ['ceo', 'founder', 'cto', 'owner', 'c-level']):
            base_score += 40
            explanations.append('High-level decision maker')
        elif any(keyword in role for keyword in ['vp', 'director', 'head']):
            base_score += 25
            explanations.append('Key leadership role')
        elif 'manager' in role:
            base_score += 10
            explanations.append('Management level contact')
            
        industry = lead_data.get('industry', '').lower()
        if any(keyword in industry for keyword in ['saas', 'tech', 'ai', 'fintech']):
            base_score += 15
            explanations.append('Target industry alignment')
            
        size = lead_data.get('companySize', '')
        if size in ['51-200', '201-500', '501-1000']:
            base_score += 10
            explanations.append('Optimal company size')
        elif size == '1000+':
            base_score += 5
            explanations.append('Enterprise potential')
            
        score = base_score + random.randint(-5, 5)
        lead_data['score'] = max(0, min(100, score))
        lead_data['scoreExplanation'] = ' | '.join(explanations) if explanations else 'General prospect'
        return lead_data['score']

lead_scorer = LeadScorer()