from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase import register_user, login_user

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Server is running!"

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    try:
        if not data or "name" not in data or "email" not in data or "password" not in data:
            return jsonify({"error": "Missing required fields"}), 400

        result, status_code = register_user(data['name'], data['email'], data['password'])
        return jsonify(result), status_code

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json

    if not data or "email" not in data or "password" not in data:
        return jsonify({"error": "Missing required fields"}), 400

    result, status_code = login_user(data['email'], data['password'])
    return jsonify(result), status_code

if __name__ == '__main__':
    app.run(debug=True, port=5000)
