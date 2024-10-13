from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../my-static-app/build')
CORS(app)

# Serving React App from Flask
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# API for batch info
@app.route('/api/batch-info', methods=['GET'])
def get_batch_info():
    data = {
        "batch_name": "Data Warehouse Training",
        "start_date": "2024-10-20",
        "timing": "10:00 AM - 1:00 PM",
        "location": "Online"
    }
    return jsonify(data)

# API for running texts
@app.route('/api/running-text', methods=['GET'])
def get_running_text():
    running_text = {
        "message": "Next Batch starts on 20th October 2024! Enroll now to reserve your seat!"
    }
    return jsonify(running_text)

# API for other details like location or feature use
@app.route('/api/other-details', methods=['GET'])
def get_other_details():
    details = {
        "location": "Online Training",
        "map_url": "https://maps.google.com/?q=online",
        "feature": "Interactive live sessions, with placement assistance."
    }
    return jsonify(details)

if __name__ == '__main__':
    app.run(debug=True) 
