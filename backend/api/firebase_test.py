import unittest
from firebase import register_user, login_user
import time

class TestFirebaseFunctions(unittest.TestCase):
    def test_register_user_success(self):
        name = "John Doe"
        email = f"johndoe{int(time.time())}@example.com"  # Unique email using timestamp
        password = "securePassword123"

        result, status_code = register_user(name, email, password)
        self.assertEqual(status_code, 201)  # Expect 201 Created
        self.assertTrue(result["success"])
        self.assertIn("uid", result)

    def test_register_user_email_already_exists(self):
        name = "Jane Doe"
        email = "johndoe@example.com"
        password = "securePassword123"

        result, status_code = register_user(name, email, password)
        self.assertEqual(status_code, 409)
        self.assertFalse(result["success"])
        self.assertEqual(result["error"], "Registration failed: Email already in use")

    def test_login_user(self):
        email = "johndoe@example.com"  # Use a test email that exists in your Firebase project
        password = "securePassword123"  # The password corresponding to the email

        # Test login user function
        result, status_code = login_user(email, password)

        print("Login Result:", result)
        print("Status Code:", status_code)

if __name__ == "__main__":
    unittest.main()
