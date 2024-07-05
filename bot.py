from telebot import TeleBot, types
import threading
import os
import time
from telebot.apihelper import ApiTelegramException
import fcntl

lock_file = "/tmp/my_bot_lock"

bot = TeleBot(os.environ['Telegram'])

@bot.message_handler(commands=['start'])
def url(message):
    markup = types.InlineKeyboardMarkup()
    btn1 = types.InlineKeyboardButton(text='Начать игру', url='https://t.me/RRcoinnot_bot/Startgame')
    btn2 = types.InlineKeyboardButton(text='Написать в техподдержку', url='https://t.me/TpodderRcoin_bot')
    markup.add(btn1)
    markup.add(btn2)
    bot.send_message(message.from_user.id, "Добро пожаловать в наш кликер! Нажмите кнопку ниже, чтобы найти игру", reply_markup=markup)

def start():
    lock_fd = open(lock_file, "w")
    try:
        fcntl.flock(lock_fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        print("Работает другой бот, отключение")
        exit()
    while True:
        try:
            bot.polling(none_stop=True, interval=0)
        except ApiTelegramException as e:
            if e.error_code == 409:
                print("Ошибка 409, продолжаем работу через 5 секунд")
                time.sleep(5)
            else:
                raise e
                    
if __name__ == '__main__':
    bot_thread = threading.Thread(target=start)
    bot_thread.start()