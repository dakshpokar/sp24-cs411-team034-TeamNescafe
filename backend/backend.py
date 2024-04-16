from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS
import hashlib
from utils import load_backend_config


configuration = load_backend_config()
DB_CONFIG = configuration['DB_CONFIG']
PORT = configuration['PORT']
ENV = configuration['ENV']
VERSION = configuration['VERSION']

app = Flask(f"SuiteMate Server v{VERSION}")
CORS(app)

def connect_to_database():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except mysql.connector.Error as err:
        print("Error: ", err)
        return None

connection = connect_to_database()

def run_query(query):
    if connection:
        cursor = connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        return rows
    else:
        return False
        
def authenticate_user(username, password):
    try:
        query = f"SELECT password FROM users WHERE username = {username}"
        result = run_query(query)
        if result:
            db_password = result[0]
            if len(db_password) == 32:
                hashed_password = hashlib.md5(password.encode()).hexdigest()
                return hashed_password == db_password
            else:
                return password == db_password
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
    

@app.route('/api/property_ratings_by_area', methods=['POST'])
def property_ratings_by_area():
    try:
        data = request.json
        min_area = sanitize_input(data.get('min_area'))
        max_area = sanitize_input(data.get('max_area'))

        query = (f"SELECT review.property_id, "
                f"prop.name, "
                f"prop.pincode, "
                f"AVG(review.rating) AS avg_rating, "
                f"COUNT(review.rating) AS num_reviews "
                f"FROM reviews review "
                f"JOIN property prop ON prop.property_id = review.property_id "
                f"WHERE review.property_id IN ( "
                f"SELECT DISTINCT p.property_id "
                f"FROM property p "
                f"JOIN unit u ON p.property_id = u.property_id "
                f"WHERE u.availability = 1 AND u.area >= {min_area} AND u.area <= {max_area} "
                f") "
                f"GROUP BY review.property_id "
                f"HAVING num_reviews >= 2;")
        rows = run_query(query)

        results = []
        for row in rows:
            results.append({
                'property_id': row[0],
                'name': row[1],
                'pincode': row[2],
                'avg_rating': row[3],
                'num_reviews': row[4]
            })

        return jsonify(results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/popular_properties', methods=['POST'])
def popular_properties():
    try:
        data = request.json
        bathrooms = sanitize_input(data.get('bathrooms'))
        bedrooms = sanitize_input(data.get('bedrooms'))

        query = (f"SELECT q1.property_id, q1.num_applications / q2.num_units AS popularity_ratio "
                f"FROM (SELECT p.property_id, COUNT(a.unit_id) AS num_applications "
                f"FROM property p "
                f"LEFT JOIN unit u ON p.property_id = u.property_id "
                f"LEFT JOIN applications a ON u.unit_id = a.unit_id "
                f"WHERE p.property_id IN (SELECT DISTINCT property.property_id "
                f"FROM property "
                f"JOIN unit ON property.property_id = unit.property_id "
                f"WHERE unit.availability = TRUE AND unit.bedrooms > {bedrooms} AND unit.bathrooms > {bathrooms}) "
                f"GROUP BY p.property_id) AS q1 "
                f"INNER JOIN "
                f"(SELECT p.property_id, COUNT(u.unit_id) AS num_units "
                f"FROM property p "
                f"LEFT JOIN unit u ON p.property_id = u.property_id "
                f"WHERE p.property_id IN (SELECT DISTINCT property.property_id "
                f"FROM property "
                f"JOIN unit ON property.property_id = unit.property_id "
                f"WHERE unit.availability = TRUE AND unit.bedrooms > {bedrooms} AND unit.bathrooms > {bathrooms}) "
                f"GROUP BY p.property_id) AS q2 "
                f"ON q1.property_id = q2.property_id "
                f"HAVING popularity_ratio > 0; ")
        rows = run_query(query)

        results = []
        for row in rows:
            results.append({
                'property_id': row[0],
                'popularity_ratio': row[1]
            })
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/apps_per_user', methods=['GET'])
def apps_per_user():
    try:
        query = "SELECT email_id,phone_number, count(*) AS Application_Count FROM user u NATURAL JOIN userdetails ud GROUP BY phone_number,email_id;"
        rows = run_query(query)

        results = []
        for row in rows:
            results.append({
                'email_id': row[0],
                'phone_number': row[1],
                'Application_Count': row[2]
            })
        return jsonify(results)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/min_max_rent', methods=['GET'])
def min_max_rent():
    try:
        query = (f"SELECT p.pincode, "
                f"MIN(u.price) AS Min_Rent, "
                f"MAX(u.price) AS Max_Rent, "
                f"ROUND(AVG(u.price)) AS Avg_Rent, "
                f"MIN(u.area) AS Min_Area, "
                f"MAX(u.area) AS Max_Area, "
                f"ROUND(AVG(u.area)) AS Avg_Area "
                f"FROM property p "
                f"NATURAL JOIN unit u "
                f"GROUP BY p.pincode;")
        rows = run_query(query)

        results = []
        for row in rows:
            results.append({
                    'pincode': row[0],
                    'min_rent': row[1],
                    'max_rent': row[2],
                    'avg_rent': row[3],
                    'min_area': row[4],
                    'max_area': row[5],
                    'avg_area': row[6]
                })
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=(ENV == 'dev'), port=PORT)
