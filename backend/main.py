from flask import Flask, jsonify, request
from flask_cors import CORS
from utils import *
from services.auth import auth_service
from services.agent import agent_service
from services.analytics import analytics_service
from services.customer import customer_service

configuration = load_backend_config()
PORT = configuration['PORT']
ENV = configuration['ENV']
VERSION = configuration['VERSION']

app = Flask(f"SuiteMate Server v{VERSION}")
CORS(app)

app.register_blueprint(auth_service)
app.register_blueprint(agent_service)
app.register_blueprint(analytics_service)
app.register_blueprint(customer_service)
    

if __name__ == '__main__':
    app.run(debug=(ENV == 'dev'), port=PORT, host="0.0.0.0")
