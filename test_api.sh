curl -X POST http://localhost:3000/api/invoices   -H "Content-Type: application/json"   -d '{
    "clientName": "Test User",
    "clientEmail": "test@example.com",
    "clientCompany": "Test Clinic",
    "items": [],
    "totalAmount": 0
  }'
