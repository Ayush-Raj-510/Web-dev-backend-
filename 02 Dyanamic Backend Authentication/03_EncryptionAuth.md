What is Encryption Authentication?

Encryption is the process of converting readable data (plaintext) into an unreadable format (ciphertext) using an encryption key. Unlike hashing, encryption is reversible—the original data can be recovered using a decryption key.

How Encryption Authentication Works
Registration

User enters:

Username: ayush
Password: 123456

Encrypt password:

123456
   │
   ▼
Encryption Algorithm + Secret Key
   │
   ▼
A7F3K9LQX2...

Database:

Username	Encrypted Password
ayush	A7F3K9LQX2...


Login

User enters:

Password: 123456

Server:

Reads encrypted password from the database.
Decrypts it using the secret key.
Compares the decrypted password with the entered password.

If they match → ✅ Login Successful

Flow

Registration

Password
    │
    ▼
Encrypt using Secret Key
    │
    ▼
Store Encrypted Password


Login

Encrypted Password (DB)
        │
        ▼
Decrypt using Secret Key
        │
        ▼
Original Password
        │
        ▼
Compare with User Input