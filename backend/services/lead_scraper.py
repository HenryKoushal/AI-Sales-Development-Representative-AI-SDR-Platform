import uuid
import random
from services.enrichment import enrichment_service
from ml_model.model import lead_scorer

class LeadScraper:
    async def search(self, query: str):
        base_prospects = [
            {"name": "Alice Johnson", "company": f"{query.capitalize()} Solutions"},
            {"name": "Bob Smith", "company": f"{query.capitalize()} Corp"},
            {"name": "Charlie Brown", "company": f"Innovate {query.capitalize()}"}
        ]
        
        results = []
        for p in base_prospects:
            lead = {
                "id": str(uuid.uuid4()),
                "name": p["name"],
                "company": p["company"],
                "email": "",
                "linkedIn": "",
                "role": "",
                "score": 0,
                "website": "",
                "industry": "",
                "companySize": "",
                "status": "New",
                "addedAt": ""
            }
            
            lead = await enrichment_service.enrich(lead)
            lead["score"] = lead_scorer.calculate_score(lead)
            results.append(lead)
            
        return results

lead_scraper = LeadScraper()
