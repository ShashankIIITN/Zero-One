import io
import random
import string
import warnings
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import nltk
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app, support_credentials=True)

with open('./temp.txt', 'r', encoding='utf8', errors='ignore') as fin:
    raw = fin.read().lower()

# Tokenization
sent_tokens = nltk.sent_tokenize(raw)
word_tokens = nltk.word_tokenize(raw)

# Preprocessing
lemmer = WordNetLemmatizer()

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

def response(user_response):
    robo_response = ''
    sent_tokens.append(user_response)
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sent_tokens)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx = vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if req_tfidf == 0:
        robo_response = "I am sorry! I don't understand you"
    else:
        robo_response = sent_tokens[idx]
    return robo_response

@app.route('/chat', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_response = data.get('query', '')
    user_response = user_response.lower()
    response_text = response(user_response)
    return jsonify({'response': response_text})



if __name__ == '__main__':
    app.run(debug=True, port=6000)