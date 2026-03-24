import random
from datetime import date

class EnrichmentService:
    async def enrich(self, lead_data):
        name_parts = lead_data.get("name", "John Doe").lower().split(" ")
        first = name_parts[0]
        last = name_parts[-1] if len(name_parts) > 1 else "prospect"
        company_name = lead_data.get("company", "startup")
        company_domain = company_name.lower().replace(" ", "") + ".com"
        
        industries = ["SaaS", "Technology", "Healthcare", "FinTech", "E-commerce", "AI", "Cybersecurity", "MarTech"]
        roles = ["CEO", "VP Engineering", "Marketing Director", "Product Manager", "CTO", "Head of Sales", "Founder", "Director of Growth"]
        sizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"]
        locations = ["San Francisco, CA", "New York, NY", "Austin, TX", "London, UK", "Remote", "Berlin, Germany", "Singapore"]
        
        industry = lead_data.get("industry") or random.choice(industries)
        role = lead_data.get("role") or random.choice(roles)
        size = lead_data.get("companySize") or random.choice(sizes)
        location = random.choice(locations)
        
        descriptions = [
            f"{company_name} is a leading provider of {industry} solutions, helping businesses optimize their operations.",
            f"Innovative {industry} startup focusing on disruptive technology and customer success.",
            f"Established {industry} company with a global footprint and over 10 years of experience.",
            f"A fast-growing {industry} player specialize in AI-driven automation and data analytics."
        ]
        
        enriched = {
            "email": f"{first}.{last}@{company_domain}",
            "linkedIn": f"https://www.linkedin.com/in/{first}{last}",
            "role": role,
            "website": f"https://www.{company_domain}",
            "industry": industry,
            "companySize": size,
            "companyDescription": random.choice(descriptions),
            "location": location,
            "status": "New",
            "addedAt": date.today().isoformat()
        }
        
        lead_data.update(enriched)
        return lead_data

enrichment_service = EnrichmentService()