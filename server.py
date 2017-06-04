from tornado.ncss import Server, ncssbook_log
from tornado import web
import os
from template_engine.parser import render

def index_handler(request):
    request.write(render('index.html', {}))

server = Server(port=3000)
server.register(r'/', index_handler)

server.run()
