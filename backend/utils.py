import json
import secrets
import string
import os

def load_backend_config():
    """This loads backend config
    
    Args:
        No Arguments
    
    Returns:
        dict: backend configuration
        {
            "VERSION": "1.0.0",
            "ENV": "dev",
            "PORT": 3000,
            "DB_CONFIG": {
                "host": "<<ip>>",
                "user": "<<user>>",
                "password": "<<password>",
                "database": "<<database>>"
            }
        }
    """
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        config_path = os.path.join(script_dir, 'configs/config.json')

        with open(config_path) as f:
            return json.load(f)
    except Exception as e:
        print("Error Loading Configuration File:", e)
        return None
    
def check_agent_role(connection, user_id):
    """This function checks if the user is an agent

    Args:
        connection (object): database connection object
        user_id (int): user id
    
    Returns:
        bool: True if user is an agent else False
    """
    query = f"SELECT role_type from user where user_id = {user_id};"
    rows = run_query(connection, query)
    if rows[0][0]=="Agent":
        return True
    else:
        return False

def sanitize_input(data):
    if data:
        return data.strip()
    return None

def run_query(connection, query):
    """This function runs a read type query on the database

    Args:
        connection (object): database connection object
        query (str): query to be executed
    
    Returns:
        list: list of tuples containing the result of the query
    """
    if connection:
        cursor = connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        return rows
    else:
        return False
    
def run_update_query(connection, query):
    """This function runs an update type query on the database

    Args:
        connection (object): database connection object
        query (str): query to be executed
    
    Returns:
        list: list of tuples containing the result of the query
    """
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute(query)
            connection.commit()
            cursor.close()
            return True
        except Exception as e:
            connection.rollback()
            file1 = open('./backend/error.txt', 'w')
            file1.write(str(e))
            print(e)
            return False

def get_user_id(connection, token):
    """This function gets the user id from the token

    Args:
        connection (object): database connection object
        token (str): token
    
    Returns:
        int: user id
    """
    query = f"select user_id from tokens where token='{token}'"
    rows = run_query(connection, query)
    if rows:
        return rows[0][0]
    else:
        return None

def generate_token(length=16):
    """This function generates a random token

    Args:
        length (int): length of the token
    
    Returns:
        str: token
    """
    alphabet = string.ascii_letters + string.digits
    token = ''.join(secrets.choice(alphabet) for _ in range(length))
    return token

def insert_token(connection, user_id, token):
    """This function inserts the token into the database

    Args:
        connection (object): database connection object
        user_id (int): user id
        token (str): token
    
    Returns:
        None
    """
    query = f"insert into tokens(token, user_id) values('{token}', {user_id});"
    run_update_query(connection, query)
    print("Token Submitted")

def verify_unique_email(connection, email_id):
    query = f"SELECT * from user where email_id = '{email_id}';"
    rows = run_query(connection, query)
    if rows:
        return False
    return True

def sanitize_input(data):
    """This function sanitizes the input

    Args:
        data (str): input data
    
    Returns:
        str: sanitized input
    """
    if data:
        return data.strip()
    return None
