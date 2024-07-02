from telebot import TeleBot, types
import threading

bot = TeleBot(open("key.config", "r").read())

@bot.message_handler(commands=['start'])
def url(message):
    markup = types.InlineKeyboardMarkup()
    btn1 = types.InlineKeyboardButton(text='Начать игру', url='https://t.me/RRcoinnot_bot/Startgame')
    btn2 = types.InlineKeyboardButton(text='Написать в техподдержку', url='https://t.me/TpodderRcoin_bot')
    markup.add(btn1)
    markup.add(btn2)
    bot.send_message(message.from_user.id, "Добро пожаловать в наш кликер! Нажмите кнопку ниже, чтобы найти игру", reply_markup=markup)

def start():
    bot.polling(none_stop=True, interval=0)

if __name__ == '__main__':
    bot_thread = threading.Thread(target=start)
    bot_thread.start()