from django.shortcuts import render

def home(req):
    return render(req, 'home.html')

def simple_addition(req):
    data = {
        'problem': {
            'operands': [12, 27]
        }
    }
    return render(req, 'simple-addition.html', data)