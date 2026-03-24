from pydantic import BaseModel

class EmailRequest(BaseModel):
    lead_id: str
    lead_name: str
    company: str
    role: str
    offering: str = "Sales solution"
