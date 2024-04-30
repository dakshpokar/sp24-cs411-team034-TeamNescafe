from flask import Blueprint, jsonify, request
from utils import *
from db import connection, connect_to_database

analytics_service = Blueprint('analytics_service', __name__, url_prefix='/analytics')


@analytics_service.route('/property_ratings_by_area', methods=['GET'])
def property_ratings_by_area():
    try:
        query_params = request.args
        min_area = query_params['min_area']
        max_area = query_params['max_area']

        conn = connect_to_database()
        if conn:
            try:
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
                         f"HAVING num_reviews >= 2 order by avg_rating desc;")
                rows = run_query(conn, query)

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
            finally:
                conn.close()
        else:
            return jsonify({'error': 'Failed to establish database connection.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@analytics_service.route('/popular_properties', methods=['GET'])
def popular_properties():
    try:
        query_params = request.args
        bathrooms = query_params['bathrooms']
        bedrooms = query_params['bedrooms']

        conn = connect_to_database()
        if conn:
            try:
                query = (f"SELECT q1.property_id, q1.name, q1.num_applications / q2.num_units AS popularity_ratio "
                         f"FROM (SELECT p.property_id, p.name, COUNT(a.unit_id) AS num_applications "
                         f"FROM property p "
                         f"LEFT JOIN unit u ON p.property_id = u.property_id "
                         f"LEFT JOIN applications a ON u.unit_id = a.unit_id "
                         f"WHERE p.property_id IN (SELECT DISTINCT property.property_id "
                         f"FROM property "
                         f"JOIN unit ON property.property_id = unit.property_id "
                         f"WHERE unit.availability = TRUE AND unit.bedrooms >= {bedrooms} AND unit.bathrooms >= {bathrooms}) "
                         f"GROUP BY p.property_id) AS q1 "
                         f"INNER JOIN "
                         f"(SELECT p.property_id, p.name, COUNT(u.unit_id) AS num_units "
                         f"FROM property p "
                         f"LEFT JOIN unit u ON p.property_id = u.property_id "
                         f"WHERE p.property_id IN (SELECT DISTINCT property.property_id "
                         f"FROM property "
                         f"JOIN unit ON property.property_id = unit.property_id "
                         f"WHERE unit.availability = TRUE AND unit.bedrooms >= {bedrooms} AND unit.bathrooms >= {bathrooms}) "
                         f"GROUP BY p.property_id) AS q2 "
                         f"ON q1.property_id = q2.property_id "
                         f"HAVING popularity_ratio > 0 order by popularity_ratio desc;")
                rows = run_query(conn, query)

                results = []
                for row in rows:
                    results.append({
                        'property_id': row[0],
                        'property_name': row[1],
                        'popularity_ratio': row[2]
                    })
                return jsonify(results)
            finally:
                conn.close()
        else:
            return jsonify({'error': 'Failed to establish database connection.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@analytics_service.route('/apps_per_user', methods=['GET'])
def apps_per_user():
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

                query = (f"SELECT email_id,phone_number, count(*) AS Application_Count FROM user u NATURAL JOIN applications "
                        f"where unit_id in (select unit_id from unit natural join property p join company c on p.company_id = c.company_id "
                        f"where c.company_id = {company_id}) group by email_id, phone_number order by Application_Count desc; ")
            
                rows = run_query(conn, query)

                results = []
                for row in rows:
                    results.append({
                        'email_id': row[0],
                        'phone_number': row[1],
                        'Application_Count': row[2]
                    })
                return jsonify(results)
            finally:
                conn.close()
        else:
            return jsonify({'error': 'Failed to establish database connection.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@analytics_service.route('/pincode_analytics', methods=['GET'])
def pincode_analytics():
    try:
        pincodes = ("61820, 61821, 61822, 61823, 61824, 61825, 61826, 61827, 61828, 61829, 61830, 61831, 61832, 61833, 61834, 61835, 61836, 61837, "
                    "61838, 61839, 61840, 61841, 61842, 61843, 61844, 61845, 61846, 61847, 61848, 61849, 61850, 61851, 61852, 61853, 61854, 61855, "
                    "61856, 61857, 61858, 61859, 61860, 61861, 61862, 61863, 61864, 61865, 61866, 61867, 61868, 61869, 61870")


        if request.args['pincodes']:
            pincodes = request.args['pincodes']

        conn = connect_to_database()
        if conn:
            try:
                query = (
                    f"SELECT p.pincode, MIN(u.price) AS Min_Rent, MAX(u.price) AS Max_Rent, "
                    f"ROUND(AVG(u.price)) AS Avg_Rent, MIN(u.area) AS Min_Area, MAX(u.area) AS Max_Area, "
                    f"ROUND(AVG(u.area)) AS Avg_Area "
                    f"FROM property p NATURAL JOIN unit u where p.pincode in ({pincodes}) "
                    f"GROUP BY p.pincode order by p.pincode;"
)
                rows = run_query(conn, query)

                results = []
                for row in rows:
                    results.append({
                        'pincode': row[0],
                        'min_rent': row[1],
                        'max_rent': row[2],
                        'avg_rent':row[3],
                        'min_area': row[4],
                        'max_area': row[5],
                        'avg_area':row[6],
                    })
                return jsonify(results)
            finally:
                conn.close()
        else:
            return jsonify({'error': 'Failed to establish database connection.'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500