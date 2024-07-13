import json
from flask import Flask, request
from flask_cors import CORS
<<<<<<< HEAD
import threading
import time
import os
=======
import os
import threading
>>>>>>> parent of f0fbacb (Подготовка к созданию фонового восстановления силы)

app = Flask(__name__)
CORS(app)

def restore_strength():
    while True:
        for user_id in db:
            user = db[user_id]
            if "strong" in user:
                user["strong"] = int(user["strong"])
                if user["strong"] < user["maxtore"] if "maxtore" in user else 200:
                    user["strong"] += 1
                    print(f"Сила пользователя {user_id} восстановлена: {user['strong']}")
                else:
                    print(f"Сила пользователя {user_id} не инициализирована.")
            else:
                print(f"Сила пользователя {user_id} не найдена.")
        save_data(db, file_name)
        time.sleep(10)

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

<<<<<<< HEAD
file_name = "/data/database.json" if "AMVERA" in os.environ else "data/database.json"
=======
file_name = 'database.json'
>>>>>>> parent of f0fbacb (Подготовка к созданию фонового восстановления силы)
db = load_data(file_name)

@app.route('/addinfo', methods=['POST'])
def addinfo():
    try:
        data = request.get_json()
        uid = str(data.get('uid'))
        count = str(data.get('count'))
        strong = json.loads(getinfo()).get(uid, {}).get('strong', 0)
        youname = str(data.get('youname'))
        maxtore = data.get('maxtore')
        db[uid] = {"uid": str(uid), "count": str(count), "strong": strong, "youname": str(youname), "maxtore": maxtore}
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
<<<<<<< HEAD
        with open("/data/data.json" if "AMVERA" in os.environ else "data/data.json", 'w') as f:
=======
        with open("data.json", 'w') as f:
>>>>>>> parent of f0fbacb (Подготовка к созданию фонового восстановления силы)
            json.dump(towrite, f)
        print("Новый uid зарегестрирован:", uid)
        return "Успешно"
    except ValueError:
        return "Ошибка: не тот тип данных"


@app.route('/')
def index():
    try:
<<<<<<< HEAD
        with open("/data/data.json" if "AMVERA" in os.environ else "data/data.json", "r") as rf:
=======
        with open("data.json", "r") as rf:
>>>>>>> parent of f0fbacb (Подготовка к созданию фонового восстановления силы)
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
        promouid = data.get('uid')
        if code.isdigit():
            return "Промокод не должен состоять из одних чисел"
        if apply_promo(code):
            if db[code] == promouid:
                return "Вы не можете применить свой же промокод"
            elif db[code] == "del":
                return "Промокод был применён до этого"
            else:
                db[code] = "del"
                save_data(db, file_name)
                return "Успешно"
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


def run_bot():
    os.system("python bot.py")

def run_admin():
    os.system("python admin.py")

if __name__ == '__main__':
<<<<<<< HEAD
    restore_strength_thread = threading.Thread(target=restore_strength)
    restore_strength_thread.start()
=======
    bot_thread = threading.Thread(target=run_bot)
    bot_thread.start()
    admin_thread = threading.Thread(target=run_admin)
    admin_thread.start()
>>>>>>> parent of f0fbacb (Подготовка к созданию фонового восстановления силы)
    app.run(debug=True)
