from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

sentiment_analyzer = pipeline('sentiment-analysis')

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data['text']
    result = sentiment_analyzer(text)[0]
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))

