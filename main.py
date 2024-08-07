import json
from flask import Flask, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

def load_data(file_name):
    try:
        with open(file_name, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {}
    return data

def save_data(data, file_name):
    with open(file_name, 'w') as file:
        json.dump(data, file, indent=4)

file_name = "/data/database.json" if "AMVERA" in os.environ else "data/database.json"
db = load_data(file_name)

@app.route('/addinfo', methods=['POST'])
def addinfo():
    try:
        data = request.get_json()
        uid = str(data.get('uid'))
        count = str(data.get('count'))
        strong = str(data.get('strong'))
        youname = str(data.get('youname'))
        db[uid] = {"uid": str(uid), "count": str(count), "strong": str(strong), "youname": str(youname)}
        print("Информация добавлена:", db[uid])
        save_data(db, file_name)
        return "Успешно"
    except Exception as e:
        print(f"Ошибка при добавлении информации: {str(e)}")
        return "Ошибка: возникла проблема с добавлением информации", 500


@app.route('/getinfo', methods=['GET'])
def getinfo():
    try:
        uid = request.args.get('uid')
        if uid in db:
            return db[uid]
        else:
            return "Информация не найдена"
    except Exception as e:
        print(f"Ошибка при получении информации: {str(e)}")
        return "Ошибка: возникла проблема с получением информации", 500


@app.route('/setuid/<int:uid>', methods=['POST'])
def setuid(uid):
    try:
        towrite = {"uid": uid}
        with open("/data/data.json" if "AMVERA" in os.environ else "data/data.json", 'w') as f:
            json.dump(towrite, f)
        print("Новый uid зарегестрирован:", uid)
        return "Успешно"
    except ValueError:
        return "Ошибка: не тот тип данных"


@app.route('/')
def index():
    try:
        with open("/data/data.json" if "AMVERA" in os.environ else "data/data.json", "r") as rf:
            jsonfile = json.loads(rf.read())
            uid = jsonfile.get("uid")
    except FileNotFoundError:
        print("Ошибка: файл не найден")
        uid = None
    return str(uid)


def apply_promo(code):
    if code in db:
        print("Промокод успешно применён")
        return True
    else:
        print("Не правильный промокод")
        return False

@app.route('/promo', methods=['POST'])
def promo():
    try:
        data = request.get_json()
        code = data.get('code')
        if code.isdigit():
            return "Промокод не должен состоять из одних чисел", 200
        if apply_promo(code):
            if db[code] == "del":
                return "Промокод был применён до этого", 200
            else:
                before = db[code]
                db[code] = "del"
                save_data(data, file_name)
                return str(before), 200
        else:
            return "Промокод не найден", 200
    except Exception as e:
        print(f"Ошибка применения промокода: {str(e)}")
        return "Ошибка применения промокода", 500

@app.route('/addpromo', methods=['POST'])
def addpromo():
    try:
        data = request.get_json()
        code = data.get('code')
        adduid = data.get('uid')
        if code.isdigit():
            return "Промокод не должен состоять из одних чисел"
        if code in db:
            return "Промокод уже существует"
        db[code] = adduid
        save_data(db, file_name)
        print("Промокод добавлен:", code)
        return "Успешно"
    except Exception as e:
        print(f"Ошибка при добавлении промокода: {str(e)}")
        return "Ошибка: возникла проблема с добавлением промокода", 500

if __name__ == '__main__':
    app.run(debug=True)
