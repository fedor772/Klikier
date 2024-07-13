import requests
from tkinter import *
from tkinter import ttk
from tkinter.messagebox import showinfo
import os

server = os.environ['Url']

def check():
    res.config(text="Сервер работает исправно" if requests.get(server).status_code == 200 else "Ошибка получения данных")

def checkuid():
    showinfo(title="Информация", message=requests.get(f"{server}/getinfo?uid={path.get()}").text)

def addpromo():
    showinfo(title="Информация", message=requests.post(f"{server}/addpromo", data='{"code": "'+paths.get()+'", "uid": 0}', headers = {"Content-Type": "application/json"}).text)

def delpromo():
    showinfo(title="Информация", message=requests.post(f"{server}/promo", data='{"code": "'+paths.get()+'", "uid": 1}', headers = {"Content-Type": "application/json"}).text)

root = Tk()
root.title("Панель администрации Rcoin")
root.geometry("450x300")

label = ttk.Label(text="Введите uid для проверки данных")
label.grid(row=0, column=0, columnspan=1, ipadx=0, ipady=0, padx=8, pady=2)
path = ttk.Entry()
path.grid(row=1, column=0, columnspan=1, ipadx=0, ipady=0, padx=8, pady=0)
gocheck = ttk.Button(text="Проверить данные", command=checkuid)
gocheck.grid(row=2, column=0, columnspan=1, ipadx=0, ipady=0, padx=8, pady=0)
ress = ttk.Label(text="")
ress.grid(row=3, column=0, columnspan=1, ipadx=0, ipady=0, padx=8, pady=2)
res = ttk.Label(text="Работа сервера не проверена")
res.grid(row=0, column=1, columnspan=1, ipadx=0, ipady=0, padx=8, pady=2)
gocheck = ttk.Button(text="Проверить работу сервера", command=check)
gocheck.grid(row=1, column=1, columnspan=1, ipadx=0, ipady=0, padx=8, pady=0)
resd = ttk.Label(text="Добавить промокод")
resd.grid(row=5, column=0, columnspan=1, ipadx=0, ipady=0, padx=8, pady=2)
paths = ttk.Entry()
paths.grid(row=6, column=0, columnspan=1, ipadx=0, ipady=0, padx=8, pady=0)
gochecks = ttk.Button(text="Добавить промокод", command=addpromo)
gochecks.grid(row=7, column=0, columnspan=1, ipadx=0, ipady=0, padx=8, pady=0)
gocheckss = ttk.Button(text="Удалить промокод", command=delpromo)
gocheckss.grid(row=8, column=0, columnspan=1, ipadx=0, ipady=0, padx=8, pady=0)

root.mainloop()