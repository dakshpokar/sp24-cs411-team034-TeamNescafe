from utils import *
import mysql.connector

def connect_to_database():
    configuration = load_backend_config()
    DB_CONFIG = configuration['DB_CONFIG']  
    try:
        connection = mysql.connector.connect(pool_name = "suitemate_pool", pool_size = 10, pool_reset_session=True, **DB_CONFIG)
        return connection
    except mysql.connector.Error as err:
        print("Error: ", err)
        return None

connection = connect_to_database()

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
        connection.autocommit = False
        
        cursor = connection.cursor()
        try:
            connection.start_transaction('READ COMMITTED')
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