import requests

url = 'http://127.0.0.1:5000/chatbot'
data = {'user_input': 'young girl'}
response = requests.post(url, json=data)

print(response.json())