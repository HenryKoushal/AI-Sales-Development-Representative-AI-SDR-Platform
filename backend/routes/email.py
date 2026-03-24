from fastapi import APIRouter, HTTPException, Body
from models.email import EmailRequest
from services.email_generator import email_generator

router = APIRouter()

@router.post('/generate-email')
async def generate_email(request: EmailRequest):
    try:
        email_content = await email_generator.generate(request)
        return {'email': email_content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/send-email')
async def send_email(email: str = Body(...), subject: str = Body(...), body: str = Body(...)):
    try:
        success = await email_generator.send(email, subject, body)
        if success:
            return {'message': 'Email sent successfully'}
        else:
            raise Exception('Failed to send email')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))