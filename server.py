from tornado.ncss import Server, ncssbook_log
from tornado import web
import os
from template_engine.parser import render
import ajax

def index_handler(request):
    request.write(render('index.html', {}))

server = Server(port=3000)
server.register(r'/', index_handler)
server.register(r'/ajax/save_file', ajax.save_file_handler)

server.run()
