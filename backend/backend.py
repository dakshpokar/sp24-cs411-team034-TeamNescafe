from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
import hashlib

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    'host': '34.134.253.158',
    'user': 'root',
    'password': 'team034',
    'database': 'dbpt1'
    }

def connect_to_database():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except mysql.connector.Error as err:
        print("Error: ", err)
        return None


def authenticate_user(username, password):
    try:
        connection = connect_to_database()
        if connection:
            cursor = connection.cursor()
            query = "SELECT password FROM users WHERE username = %s"
            cursor.execute(query, (username,))
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            if result:
                db_password = result[0]
                if len(db_password) == 32:
                    hashed_password = hashlib.md5(password.encode()).hexdigest()
                    return hashed_password == db_password
                else:
                    return password == db_password[::-1]
            else:
                return False
        else:
            return False
    except Exception as e:
        print("Error:", e)
        return False

def sanitize_input(data):
    if data:
        return data.strip()
    return None

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = sanitize_input(data.get('username'))
        password = sanitize_input(data.get('password'))

        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        if authenticate_user(username, password):
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            return jsonify({'success': False, 'error': 'Invalid username or password'}), 401
    except Exception as e:

        return jsonify({'error': str(e)}), 500
    
@app.route('/api/read_gcp_sql_data', methods=['GET'])
def read_gcp_sql_data():
    try:
        connection = connect_to_database()

        if connection:
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM company")
            rows = cursor.fetchall()

            cursor.close()
            connection.close()

            results = []
            for row in rows:
                results.append({
                    'name': row[1],
                    'phone_number': row[2]
                })

            return jsonify(results)
        else:
            return jsonify({'error': 'Failed to connect to the database'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
