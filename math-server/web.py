from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/hello')
def helloIndex():
    from_engine = request.args.get('fromEngine')
    print(from_engine)
    return 'Hello World from Python Flask!'

app.run(host='0.0.0.0', port= 81)
