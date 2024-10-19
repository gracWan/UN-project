import firebase_admin
from firebase_admin import credentials, firestore, auth
from firebase_admin.auth import UserNotFoundError
from firebase_admin.exceptions import FirebaseError
import requests, os

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def get_id_token(email, password):
    api_key = os.environ.get('FIREBASE_API_KEY')
    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={api_key}"
    data = {
        "email": email,
        "password": password,
        "returnSecureToken": True
    }
    response = requests.post(url, json=data)
    return response.json()

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
        id_token_result = get_id_token(email, password)

        if 'idToken' in id_token_result:
            return {"success": True, "user": user.uid}, 200
        else:
            return {"success": False, "message": "Login failed: Incorrect password"}, 401

    except UserNotFoundError:
        return {"message": "Login failed: User not found"}, 404
    except Exception as e:
        return str(e), 401

if __name__ == "__main__":
    print("Starting")