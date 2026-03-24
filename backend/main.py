from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import sys
import os
import asyncio
import random
from datetime import datetime

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from routes import leads, email, scoring
from db import leads_db

app = FastAPI(title="AI SDR + B2B Lead Finder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads.router, prefix="/api", tags=["leads"])
app.include_router(email.router, prefix="/api", tags=["email"])
app.include_router(scoring.router, prefix="/api", tags=["scoring"])

@app.get("/")
async def root():
    return {
        "message": "AI SDR + B2B Lead Finder API is running",
        "endpoints": [
            "/api/search-leads",
            "/api/leads",
            "/api/generate-email",
            "/api/send-email",
            "/api/lead-score/{id}",
            "/api/analytics",
            "/api/export-leads"
        ]
    }

async def periodic_lead_fetcher():
    while True:
        await asyncio.sleep(300)
        print(f"[{datetime.now()}] Running background lead enrichment...")
        if leads_db:
            lead = random.choice(leads_db)
            print(f"Updating lead: {lead.get("name")}")

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(periodic_lead_fetcher())

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)