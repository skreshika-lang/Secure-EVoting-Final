# Secure-Intelligent-EVoting - FINAL (No Errors)
1. cd backend
2. npm install
3. mongod (start mongo) OR use Atlas URI in .env
4. node server.js -> Running on http://localhost:5000
5. Open http://localhost:5000/register.html

Flow for Review:
Register -> Admin (admin.html Approve) -> Login -> Face Verify (click video 3 times = blink) -> Vote -> Results -> Verify Chain API

Endpoints:
POST /api/auth/register
POST /api/auth/login
GET /api/admin/pending
PUT /api/admin/approve/:id
POST /api/vote/cast (hash + previousHash blockchain)
GET /api/vote/results
GET /api/vote/verify-chain
