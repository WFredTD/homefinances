from flask import Flask,render_template, redirect, request, session, url_for
from usuario import Usuario

app = Flask(__name__)

###
app.secret_key = '397035045A861E9377891F0F8842A03C84D428ACCACA863A74E51018A4D484DA'

usuario1 = Usuario('rafael.gimenez@gmail.com', 'JaRafael', 'JavaScript')
usuario2 = Usuario('romulo.silvestre@gmail.com', 'SilverRon', 'Sistema_S')
usuario3 = Usuario('suzane.hospital@gmail.com', 'MarZu', 'Santa_SUS')

usuarios = {usuario1.email : usuario1,
            usuario2.email: usuario2,
            usuario3.email : usuario3}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cadastrarusuario', methods= ['POST', 'GET'])
def cadastrar_usuario():
    return render_template('cadastrarusuario.html')

@app.route('/autenticar', methods=['POST'])
def autenticar():
    if request.form['email'] in usuarios:
        usuario = usuarios [request.form['email']]
        if request.form['senha'] == usuario.password:
            session['nome_logado'] = usuario.nome
        return redirect('relatorios')
    else:
        return redirect ('/')

@app.route('/cadastrartransacao', methods= ['POST', 'GET'])
def cadastrar_transacao():
    if 'nome_logado' in session:
        nome_logado = session.get('nome_logado')
        return render_template ('cadastrartransacao.html', nome_logado = nome_logado)
    else:
        return redirect ('/')

@app.route('/relatorios', methods= ['POST', 'GET'])
def relatorios():
    if 'nome_logado' in session:
        nome_logado = session.get('nome_logado')
        return render_template ('relatorios.html', nome_logado = nome_logado)
    else:
        return redirect ('/')

@app.route('/logout')
def logout():
    session.pop('nome_logado', None)
    return redirect (url_for('index'))


app.run(debug=True)