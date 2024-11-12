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
    if response.status_code != 200:
        return {"error": "Login failed: Incorrect credentials"}, 401
    return response.json()

def register_user(name, email, password):
    try:
        try:
            auth.get_user_by_email(email)
            return {"success": False, "error": "Registration failed: Email already in use"}, 409
        except auth.UserNotFoundError:
            pass  # If user doesn't exist, proceed to create a new one

        # Create the user
        user = auth.create_user(
            display_name=name,
            email=email,
            password=password
        )
        return {"success": True, "message": f"User {user.uid} created successfully!", "uid": user.uid}, 201

    except FirebaseError as e:
        return {"success": False, "error": f"Registration failed: {str(e)}"}, 500


def login_user(email,password):
    try:
        user = auth.get_user_by_email(email)
        id_token_result = get_id_token(email, password)

        print("ID Token result:", id_token_result)

        if 'idToken' in id_token_result:
            return {"success": True,
            "user": {
                "uid": user.uid,
                "displayName": user.display_name,
                "email": user.email,
                "idToken": id_token_result['idToken']
            }}, 200
        else:
            return {"success": False, "error": "Login failed: Incorrect password"}, 401

    except UserNotFoundError:
        return {"success": False, "error": "Login failed: User not found"}, 404
    except Exception as e:
        return {"success": False, "error": str(e)}, 401

if __name__ == "__main__":
    print('Welcome')