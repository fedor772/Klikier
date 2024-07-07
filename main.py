import json
from flask import Flask, request
from flask_cors import CORS
from replit import db
import os
import threading

app = Flask(__name__)
CORS(app)

@app.route('/addinfo', methods=['POST'])
def addinfo():
    try:
        data = request.get_json()
        uid = str(data.get('uid'))
        count = str(data.get('count'))
        strong = str(data.get('strong'))
        youname = str(data.get('youname'))
        db[uid] = '{"uid": ' + str(uid) + ', "count": ' + str(
            count) + ', "strong": ' + str(strong) + ', "youname": ' + str(
                youname) + '}'
        print("Информация добавлена:", db[uid])
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
        with open("data.json", 'w') as f:
            json.dump(towrite, f)
        print("Новый uid зарегестрирован:", uid)
        return "Успешно"
    except ValueError:
        return "Ошибка: не тот тип данных"


@app.route('/')
def index():
    try:
        with open("data.json", "r") as rf:
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
        if apply_promo(code):
            return "Промокод успешно применён"
        else:
            return "Промокод не найден"
    except Exception as e:
        print(f"Ошибка применения промокода: {str(e)}")
        return "Ошибка применения промокода", 500

@app.route('/addpromo', methods=['POST'])
def addpromo():
    try:
        data = request.get_json()
        code = data.get('code')
        db[code] = code
        print("Промокод добавлен:", code)
        return "Успешно"
    except Exception as e:
        print(f"Ошибка при добавлении промокода: {str(e)}")
        return "Ошибка: возникла проблема с добавлением промокода", 500

def run_bot():
    os.system("python bot.py")

if __name__ == '__main__':
    bot_thread = threading.Thread(target=run_bot)
    bot_thread.start()
    app.run(debug=True)
