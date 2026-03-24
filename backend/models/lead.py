from pydantic import BaseModel
from typing import Optional, List

class Lead(BaseModel):
    id: Optional[str] = None
    name: str
    email: Optional[str] = None
    role: Optional[str] = None
    company: str
    website: Optional[str] = None
    linkedIn: Optional[str] = None
    score: Optional[int] = 0
    scoreExplanation: Optional[str] = None
    industry: Optional[str] = "Unknown"
    companySize: Optional[str] = "Unknown"
    companyDescription: Optional[str] = None
    status: Optional[str] = "New"
    addedAt: Optional[str] = None
    location: Optional[str] = "Global"