from flask import Blueprint, jsonify, request
from utils import *
import hashlib
from db import connect_to_database, connection

auth_service = Blueprint('auth_service', __name__, url_prefix='/auth')

def authenticate_user(email, password):
    try:
        query = f"SELECT password_hash FROM user WHERE email_id = '{email}';"
        result = run_query(connection, query)
        if result:
            db_password = result[0][0]
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

@auth_service.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = sanitize_input(data.get('email'))
        password = sanitize_input(data.get('password'))

        if not email or not password:
            return jsonify({'error': 'Username and password are required'}), 400

        if authenticate_user(email, password):
            query = f"SELECT user_id, email_id, role_type, first_name, last_name, phone_number, gender, date_of_birth FROM user WHERE email_id = '{email}';"
            row = run_query(connection, query)[0]
            results = {'user_id': row[0],
                        'email_id': row[1],
                        'role_type': row[2],
                        'first_name': row[3],
                        'last_name': row[4],
                        'phone_number': row[5],
                        'gender': row[6],
                        'date_of_birth': row[7]
                    }
            token = generate_token()
            insert_token(connection, row[0], token)
            return jsonify({'success': True, 'message': 'Login successful', 'token':token, 'user':results})
        else:
            return jsonify({'success': False, 'error': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_service.route('/sign_up', methods=['POST'])
def sign_up():
    try:
        data = request.json
        email_id = data['email_id']
        password_hash = hashlib.md5(data['password'].encode()).hexdigest()
        role_type = 'Customer'
        first_name = data['first_name']
        last_name = data['last_name']
        phone_number = data['phone_number']
        gender = data['gender']
        dob = data['date_of_birth']

        #checking if email is not present already
        if verify_unique_email(connection, email_id):
            query = (f"insert into user (email_id, password_hash, role_type, first_name, last_name, phone_number, gender, date_of_birth) "
                    f"VALUES ('{email_id}', '{password_hash}', '{role_type}', '{first_name}', '{last_name}', '{phone_number}', '{gender}', '{dob}');")
            if not run_update_query(connection, query):
                return jsonify({'success': False, 'message': "Failed to sign up"}), 409
            query = (f"select user_id from user where email_id = '{email_id}';")
            user_id = run_query(connection, query)[0][0]
            query = (f"INSERT INTO userdetails (user_id, pref_id, value) "
                        f"VALUES ({user_id}, 1, '{gender}');")
            if not run_update_query(connection, query):
                return jsonify({'success': False, 'message': "Failed to sign up"}), 409
        else:
            return jsonify({'success': False, 'message': "Email Id is already in use!"}), 409
        query = f"SELECT user_id, email_id, role_type, first_name, last_name, phone_number, gender, date_of_birth FROM user WHERE email_id = '{email_id}';"
        row = run_query(connection, query)[0]
        results = {'user_id': row[0],
                    'email_id': row[1],
                    'role_type': row[2],
                    'first_name': row[3],
                    'last_name': row[4],
                    'phone_number': row[5],
                    'gender': row[6],
                    'date_of_birth': row[7]
                }
        token = generate_token()
        insert_token(connection, row[0], token)
        return jsonify({'success': True, 'message': 'Sign Up Successful', 'token':token, 'user':results})

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@auth_service.route('/signout', methods=['POST'])
def signout():
    try:
        conn = connect_to_database()
        if conn:
            try:
                data = request.json
                token = data['token']
                query = (f"delete from tokens where token = '{token}'")
                if not run_update_query(conn, query):
                    return jsonify({'success': False, 'message': "Failed to sign out"}), 409

                results = {'success': True, 'message':'Signed Out Successful'}
                return jsonify(results)
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500