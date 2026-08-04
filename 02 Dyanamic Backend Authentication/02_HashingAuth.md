Hashing authentication means passwords are never stored in plain text in the database. Instead, they are converted into a fixed-length encrypted-looking value called a hash using a hashing algorithm.

Without Hashing (❌ Unsafe)

User registers:

Username: ayush
Password: 123456

Database:

Username	Password
ayush	    123456

If the database is hacked, the attacker immediately sees the password.

With Hashing (✅ Safe)

User registers:

Password: 123456

Server hashes it:

123456
   ↓
SHA-256 / bcrypt
   ↓
8d969eef6ecad3c29a3a629280e686cf...

Database:

Username	Password (Hash)
ayush	    8d969eef6ecad3c29a3a629280e686cf...

The original password is not stored.