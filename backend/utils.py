import json
import secrets
import string

def load_backend_config():
    try:
        with open('./backend/configs/config.json') as f:
            return json.load(f)
    except Exception as e:
        print("Error Loading Configuration File:", e)
        return None
    
def check_agent_role(connection, user_id):
        query = f"SELECT role_type from user where user_id = {user_id};"
        rows = run_query(connection, query)
        print(rows[0])
        if rows[0][0]=="Agent":
            return True
        else:
            return False

def sanitize_input(data):
    if data:
        return data.strip()
    return None

def run_query(connection, query):
    if connection:
        cursor = connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        return rows
    else:
        return False
    
def run_update_query(connection, query):
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute(query)
            connection.commit()
            cursor.close()
            return True
        except Exception as e:
            connection.rollback()
            print(e)
            return False

def get_user_id(connection, token):
    query = f"select user_id from tokens where token={token}"
    rows = run_query(connection, query)
    if rows:
        return rows[0]
    else:
        return None

def generate_token(length=16):
    alphabet = string.ascii_letters + string.digits
    token = ''.join(secrets.choice(alphabet) for _ in range(length))
    return token

def insert_token(connection, user_id, token):
    query = f"insert into tokens(token, user_id) values('{token}', {user_id});"
    run_update_query(connection, query)
    print("Token Submitted")

def verify_unique_email(connection, email_id):
    query = f"SELECT * from user where email_id = '{email_id}';"
    rows = run_query(connection, query)
    if rows:
        return False
    return True