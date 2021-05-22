from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
CORS(app)

myclient = pymongo.MongoClient("")
mydb = myclient[""]
mycol = mydb[""]

@app.route("/tarefas_a_fazer", methods=["GET"])
def retornar_a_fazer():
    array = []
    myquery = {"status":"0"}
    for x in mycol.find(myquery,{ "_id": 0}): # _id: 0 ~ Para não retornar na consulta!
        array.append(x)
    return jsonify({'tarefas':array})

@app.route("/tarefas_concluidas", methods=["GET"])
def retornar_concluidas():
    array = []
    myquery = {"status":"1"}
    for x in mycol.find(myquery,{ "_id": 0}):
        array.append(x)
    return jsonify({'tarefas':array})

@app.route("/limpar_bd", methods=["DELETE"])
def limpar():
    mycol.delete_many({})
    return jsonify({"mensagem":"sucesso!"})

@app.route("/adicionar_tarefa", methods=["POST"])
def adicionar():
    nome = request.form["nome"]
    data = request.form["data"] 
    documento = {"status": "0", "nome":f"{nome}", "data":f"{data}"}
    mycol.insert_one(documento)
    return jsonify({"mensagem":"sucesso!"})

@app.route("/remover_tarefa", methods=["DELETE"])
def remover():
    nome = request.form["nome"]
    data = request.form["data"] 
    documento = {"nome":f"{nome}", "data":f"{data}"}
    mycol.delete_one(documento)
    return jsonify({"mensagem":"sucesso!"})

@app.route("/alterar_tarefa", methods=["PATCH"])
def alterar():
    nome = request.form["nome"]
    data = request.form["data"]
    novo_nome = request.form["novo_nome"]
    nova_data = request.form["nova_data"]
    documento = {"status":"0", "nome":f"{nome}", "data":f"{data}"}
    documento_atualizado = { "$set": {"status":"0", "nome":f"{novo_nome}", "data":f"{nova_data}"}}
    mycol.update_one(documento, documento_atualizado)
    return jsonify({"mensagem":"sucesso!"})

@app.route("/concluir_tarefa", methods=["PATCH"])
def concluir():
    nome = request.form["nome"]
    data = request.form["data"]
    documento = {"status":"0", "nome":f"{nome}", "data":f"{data}"}
    documento_atualizado = { "$set": {"status":"1", "nome":f"{nome}", "data":f"{data}"}}
    mycol.update_one(documento, documento_atualizado)
    return jsonify({"mensagem":"sucesso!"})

@app.route("/reciclar_tarefa", methods=["PATCH"])
def recilar():
    nome = request.form["nome"]
    data = request.form["data"]
    documento = {"status":"1", "nome":f"{nome}", "data":f"{data}"}
    documento_atualizado = { "$set": {"status":"0", "nome":f"{nome}", "data":f"{data}"}}
    mycol.update_one(documento, documento_atualizado)
    return jsonify({"mensagem":"sucesso!"})

app.run()
