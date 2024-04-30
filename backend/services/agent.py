from flask import Blueprint, jsonify, request
from utils import *
from db import connection, connect_to_database, run_query, run_update_query

agent_service = Blueprint('agent_service', __name__, url_prefix='/agent')

@agent_service.route('/get_unit_from_id', methods=['GET'])
def get_unit_from_id():
    try:
        unit_id = request.args.get('unit_id')
        query = f"SELECT * FROM unit u NATURAL JOIN property p where u.unit_id = {unit_id};"
        conn = connect_to_database()
        if conn:
            try:
                rows = run_query(conn, query)

                query2 = (f"select * from unitphoto where unit_id = {unit_id};")
                rows2 = run_query(conn, query2)

                results = []
                for row in rows:
                    results.append({
                        'unit_id': row[1],
                        'apartment_no': row[2],
                        'bedrooms': row[3],
                        'bathrooms': row[4],
                        'price': row[5],
                        'availability': row[6],
                        'area': row[7],
                        'property_name': row[8],
                        'photos': [row2[1] for row2 in rows2]
                    })
                return jsonify(results[0])
            finally:
                conn.close()
        else:
            return jsonify({'error': 'Failed to establish database connection.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@agent_service.route('/get_applications_for_unit', methods=['GET'])
def get_applications_for_unit():
    try:
        unit_id = request.args['unit_id']
        query = f"SELECT * FROM applications natural join user natural join unit where unit_id = {unit_id};"
        conn = connect_to_database()
        if conn:
            try:
                rows = run_query(conn, query)

                results = []
                for row in rows:
                    results.append({
                        'user_id': row[1],
                        'Name': row[7] + " " + row[8],
                        'email_id': row[4],
                        'unit_id': row[0],
                        'status': row[3]
                    })
                return jsonify(results)
            finally:
                conn.close()
        else:
            return jsonify({'error': 'Failed to establish database connection.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@agent_service.route('/update_application', methods=['POST'])
def update_application():
    try:
        token = request.headers['Authorization']
        agent_id = get_user_id(connection, token)
        user_id = request.json.get('user_id')
        unit_id = request.json.get('unit_id')
        status = request.json.get('status')
        success = True

        conn = connect_to_database()
        if conn:
            try:
                if check_agent_role(conn, agent_id):
                    if status == "approved":
                        query1 = (f"UPDATE applications set status='{status}' where user_id = {user_id} and unit_id = {unit_id}; ")
                        query2 = (f"UPDATE unit set availability=0 where unit_id={unit_id};")
                        if not run_update_query(conn, query1):
                            success = False
                            return jsonify({'success': success}), 409
                        if not run_update_query(conn, query2):
                            success = False
                            return jsonify({'success': success}), 409
                    elif status == "rejected":
                        query1 = (f"UPDATE applications set status='{status}' where user_id = {user_id} and unit_id = {unit_id};")
                        query2 = (f"UPDATE unit set availability=1 where unit_id={unit_id};")
                        if not run_update_query(conn, query1):
                            success = False
                            return jsonify({'success': success}), 409
                        if not run_update_query(conn, query2):
                            success = False
                            return jsonify({'success': success}), 409
                else:
                    success = False
                    return jsonify({'success': success}), 409

                results = {'success': success}
                return jsonify(results)
            finally:
                conn.close()
        else:
            return jsonify({'error': 'Failed to establish database connection.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@agent_service.route('/get_unit_app_count', methods=['GET'])
def get_unit_app_count():
    try:
        headers = request.headers
        token = headers['Authorization']
        user_id = get_user_id(connection, token)
        if not check_agent_role(connection, user_id):
            return jsonify({'error': "User is not an Agent"}), 403

        conn = connect_to_database()
        if conn:
            try:
                query = (f"select company_id from agentcompanyrelationship where user_id={user_id}")
                company_id = run_query(conn, query)[0][0]

                query = (f"SELECT u.unit_id, p.property_id, u.apartment_no, "
                         f"p.name, "
                         f"COUNT(*) as app_count "
                         f"FROM unit u "
                         f"JOIN property p ON p.property_id = u.property_id "
                         f"JOIN applications app ON app.unit_id = u.unit_id "
                         f"WHERE p.company_id = {company_id} "
                         f"GROUP BY u.unit_id order by app_count desc;")
                rows = run_query(conn, query)

                results = []
                for row in rows:
                    results.append({
                        'unit_id': row[0],
                        'property_id': row[1],
                        'apartment_num': row[2],
                        'property_name': row[3],
                        'num_applications': row[4]
                    })
                return jsonify(results)
            finally:
                conn.close()
        else:
            return jsonify({'error': 'Failed to establish database connection.'}), 500
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@agent_service.route('/get_units_for_agent', methods=['GET'])
def get_units_for_agent():
    try:
        headers = request.headers
        token = headers['Authorization']
        user_id = get_user_id(connection, token)
        if not check_agent_role(connection, user_id):
            return jsonify({'success': False, 'error': "User is not an Agent"}), 409

        conn = connect_to_database()
        if conn:
            try:
                query = (
                    f"SELECT u.unit_id, "
                    f"u.apartment_no, "
                    f"u.bedrooms, "
                    f"u.bathrooms, "
                    f"u.price, "
                    f"u.availability, "
                    f"u.area, "
                    f"p.name, "
                    f"p.pincode, "
                    f"p.company_id "
                    f"FROM unit u "
                    f"JOIN property p ON p.property_id = u.property_id "
                    f"JOIN agentcompanyrelationship acr ON acr.company_id = p.company_id "
                    f"WHERE acr.user_id = {user_id};"
                )
                rows = run_query(conn, query)

                results = []
                for row in rows:
                    results.append({
                        'unit_id': row[0],
                        'apartment_no': row[1],
                        'bedrooms': row[2],
                        'bathrooms': row[3],
                        'price': row[4],
                        'availability': row[5],
                        'area': row[6],
                        'property_name': row[7],
                        'pincode': row[8],
                        'company_id': row[9],
                    })
                return jsonify({"data": results})
            finally:
                conn.close()
        else:
            return jsonify({'error': 'Failed to establish database connection.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500