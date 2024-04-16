import json
import os

def load_backend_config():
    try:
        with open('./backend/configs/config.json') as f:
            return json.load(f)
    except Exception as e:
        print("Error Loading Configuration File:", e)
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
    
def get_user_id(connection, token):
    query = f"select user_id from tokens where token={token}"
    rows = run_query(connection, query)
    if rows:
        return rows[0]
    else:
        return None
    