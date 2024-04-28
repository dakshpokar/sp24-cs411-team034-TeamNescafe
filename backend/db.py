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