JWT Authentication is a token-based authentication method. After a user logs in successfully, the server generates a JWT token and sends it to the client. The client stores this token and sends it with every future request to prove its identity.

Flow of JWT Authentication
1. User enters Username & Password
                │
                ▼
2. Server checks Database
                │
                ▼
3. Valid?
      │
 ┌────┴─────┐
 │          │
No          Yes
 │           │
 ▼           ▼
Error    Generate JWT Token
               │
               ▼
      Send Token to Client
               │
               ▼
Client stores token
(localStorage / Cookie)
               │
               ▼
Future Requests
Authorization: Bearer <JWT Token>
               │
               ▼
Server verifies JWT
               │
               ▼
Valid → Access Granted
Invalid → 401 Unauthorized
Example JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6MSwidXNlcm5hbWUiOiJheXVzaCJ9.
Yx3dfPqL4uPj4lKJf...

A JWT has 3 parts:

Header.Payload.Signature