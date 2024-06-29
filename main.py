import json
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    try:
        with open("data.json", "r") as rf:
            jsonfile = json.loads(rf.read())
            uid = jsonfile["uid"]
    except FileNotFoundError:
        print("Ошибка: файл не найден")
        uid = None
    return str(uid)

@app.route('/setuid/<int:uid>', methods=['GET'])
def setuid(uid):
    try:
        towrite = {"uid": uid}
        with open("data.json", 'w') as f:
            json.dump(towrite, f)
        return "Успешно"
    except ValueError:
        return "Ошибка: не тот тип данных"

if __name__ == '__main__':
    app.run(debug=True)