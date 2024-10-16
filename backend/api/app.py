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
    result = register_user(data['email'], data['password'])
    return jsonify(result)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    result = login_user(data['email'], data['password'])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
