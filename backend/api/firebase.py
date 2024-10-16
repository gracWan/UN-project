import firebase_admin
from firebase_admin import credentials, firestore, auth
from firebase_admin.auth import UserNotFoundError
from firebase_admin.exceptions import FirebaseError

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def register_user(email,password):
    try:
        user = auth.create_user(email=email, password=password)
        return f"User {user.uid} created successfully!", 201

    except auth.EmailAlreadyExistsError:
        print('Error: Email already exists', 409)
        return "Registration failed: Email already in use", 409
    except FirebaseError as e:
        print(f'Error: {str(e)}', 500)
        return f"Registration failed: {str(e)}", 500

def login_user(email,password):
    try:
        user = auth.get_user_by_email(email)
        return f"User {user.uid} logged in successfully!"
        #verify_password(password, user)

    except UserNotFoundError:
        return {"message": "Login failed: User not found"}, 404
    except Exception as e:
        return str(e), 401

if __name__ == "__main__":
    print("Starting")