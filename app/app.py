from flask import Flask, render_template, request
from cnn import predict
import cv2
import re
import base64
import numpy as np

app = Flask(__name__)

@app.route('/', methods=['GET'])
def get():
    return render_template('index.html', ans=None)

@app.route('/', methods=['POST'])
def post():
    ans = get_answer(request)
    return render_template('index.html', ans=ans)

def get_answer(req):
    img_str = re.search(r'base64,(.*)', req.form['img']).group(1)
    nparr = np.fromstring(base64.b64decode(img_str), np.uint8)
    img_src = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img_negaposi = 255 - img_src
    img_gray = cv2.cvtColor(img_negaposi, cv2.COLOR_BGR2GRAY)
    img_resize = cv2.resize(img_gray,(28,28))
    ans = predict.result(img_resize)
    return ans

if __name__ == "__main__":
    app.run(port=7777)