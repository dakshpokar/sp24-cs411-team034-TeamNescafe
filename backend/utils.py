import json
import os

def load_backend_config():
    try:
        with open('./backend/configs/config.json') as f:
            return json.load(f)
    except Exception as e:
        print("Error Loading Configuration File:", e)
        return None