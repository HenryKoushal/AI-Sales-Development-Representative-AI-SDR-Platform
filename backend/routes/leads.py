import random
import uuid
import csv
import io
from datetime import datetime
from fastapi import APIRouter, HTTPException, Response
from typing import List
from models.lead import Lead
from models.search import SearchQuery
from services.lead_scraper import lead_scraper
from db import leads_db

router = APIRouter()

@router.post('/search-leads', response_model=List[Lead])
async def search_leads(query: SearchQuery):
    try:
        results = await lead_scraper.search(query.query)
        for lead in results:
            if not any(l['id'] == lead['id'] for l in leads_db):
                leads_db.append(lead)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/leads', response_model=List[Lead])
async def get_leads():
    return leads_db

@router.post('/add-lead', response_model=Lead)
async def add_lead(lead: Lead):
    try:
        new_lead_data = lead.dict() if hasattr(lead, 'dict') else lead.model_dump()
        if not new_lead_data.get('id') or new_lead_data.get('id') == '0':
            new_lead_data['id'] = str(uuid.uuid4())
        if any(l['id'] == new_lead_data['id'] for l in leads_db):
            raise HTTPException(status_code=400, detail='Lead with this ID already exists')
        leads_db.append(new_lead_data)
        return new_lead_data
    except HTTPException as he: raise he
    except Exception as e: raise HTTPException(status_code=500, detail=str(e))

@router.delete('/lead/{id}')
async def delete_lead(id: str):
    try:
        lead_index = next((i for i, l in enumerate(leads_db) if l['id'] == id), None)
        if lead_index is None: raise HTTPException(status_code=404, detail='Lead not found')
        leads_db.pop(lead_index)
        return {'message': 'Lead deleted successfully', 'id': id}
    except HTTPException as he: raise he
    except Exception as e: raise HTTPException(status_code=500, detail=str(e))

@router.get('/export-leads')
async def export_leads():
    output = io.StringIO()
    if not leads_db:
        return Response(content='', media_type='text/csv')
    
    keys = leads_db[0].keys()
    writer = csv.DictWriter(output, fieldnames=keys)
    writer.writeheader()
    for lead in leads_db:
        writer.writerow(lead)
    content = output.getvalue()
    return Response(content=content, media_type='text/csv', headers={'Content-Disposition': 'attachment; filename=leads_export.csv'})

@router.get('/analytics')
async def get_analytics():
    total_leads = len(leads_db)
    avg_score = sum(l.get('score', 0) for l in leads_db) / total_leads if total_leads > 0 else 0
    high_potential = len([l for l in leads_db if l.get('score', 0) >= 80])
    
    return {
        'total_leads': total_leads,
        'avg_score': round(avg_score, 1),
        'high_potential': high_potential,
        'emails_sent': random.randint(50, 200),
        'growth_data': [
            {'name': 'Mon', 'leads': random.randint(5, 15), 'emails': random.randint(10, 30)},
            {'name': 'Tue', 'leads': random.randint(5, 15), 'emails': random.randint(10, 30)},
            {'name': 'Wed', 'leads': random.randint(5, 15), 'emails': random.randint(10, 30)},
            {'name': 'Thu', 'leads': random.randint(5, 15), 'emails': random.randint(10, 30)},
            {'name': 'Fri', 'leads': random.randint(5, 15), 'emails': random.randint(10, 30)},
            {'name': 'Sat', 'leads': random.randint(2, 5), 'emails': random.randint(5, 10)},
            {'name': 'Sun', 'leads': random.randint(2, 5), 'emails': random.randint(5, 10)}
        ]
    }