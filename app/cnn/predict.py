import numpy as np
from keras.models import load_model
from keras import backend as K
import os

def result(x):
    K.clear_session()
    model = load_model(os.path.abspath(os.path.dirname(__file__)) + '/model.h5')
    x = np.expand_dims(x, axis=0)
    x = x.reshape(x.shape[0],28,28,1)
    r = np.argmax(model.predict(x))
    return r
