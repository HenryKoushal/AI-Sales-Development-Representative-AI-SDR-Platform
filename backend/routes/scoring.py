from fastapi import APIRouter, HTTPException
from db import leads_db

router = APIRouter()

@router.get("/lead-score/{id}")
async def get_lead_score(id: str):
    try:
        lead = next((l for l in leads_db if l["id"] == id), None)
        if lead is None:
            raise HTTPException(status_code=404, detail="Lead not found")
        return {"id": id, "score": lead.get("score", 0)}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
