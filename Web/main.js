tarefas_a_fazer = 'http://127.0.0.1:5000/tarefas_a_fazer'
tarefas_concluidas = 'http://127.0.0.1:5000/tarefas_concluidas'
x = 0
y = 0

fetch(tarefas_a_fazer)
.then(function(response){
  return response.json()
})
.then(function(response){
  sucesso_a_fazer(response)
})
.catch(function(){
  console.log('erro!')
})

fetch(tarefas_concluidas)
.then(function(response){
  return response.json()
})
.then(function(response){
  sucesso_concluidas(response)
})
.catch(function(){
  console.log('erro!')
})

function sucesso_a_fazer(response){
  
  largura = response['tarefas'].length
  while (x < largura){
    nome = response['tarefas'][x]['nome']
    data = response['tarefas'][x]['data']

    var nome_p = document.createElement("p")
    nome_p.innerHTML = nome
    nome_p.setAttribute("id", `nome_${x}`)
    nome_p.setAttribute("class", "nome")

    var data_p = document.createElement("p")
    data_p.innerHTML = data
    data_p.setAttribute("id", `data_${x}`)
    data_p.setAttribute("class", "data")

    var botao_concluido = document.createElement("button")
    botao_concluido.innerHTML = "<img src='../Images/Check-mard.png'>"
    botao_concluido.setAttribute("class", "btn")
    botao_concluido.setAttribute("id", `botao_concluido_${x}`)
    botao_concluido.setAttribute("onclick", "concluido(this.id)")

    var botao_excluir = document.createElement("button")
    botao_excluir.innerHTML = "<img src='../Images/Cross.png'>"
    botao_excluir.setAttribute("class", "btn")
    botao_excluir.setAttribute("id", `botao_excluir_${x}`)
    botao_excluir.setAttribute("onclick", "remove(this.id)")

    var input_nome = document.createElement("input")
    input_nome.setAttribute("class", "input_form")
    input_nome.setAttribute("id", `input_nome_${x}`)
    input_nome.placeholder = "Alterar Nome"

    var input_data = document.createElement("input")
    input_data.setAttribute("class", "input_form")
    input_data.setAttribute("id", `input_data_${x}`)
    input_data.placeholder = "Alterar Data"

    var botao_alterar = document.createElement("button")
    botao_alterar.innerHTML = "<img src='../Images/Plug-2.png'>"
    botao_alterar.setAttribute("class", "btn")
    botao_alterar.setAttribute("id", `botao_alterar_${x}`)
    botao_alterar.setAttribute("onclick", "alterar(this.id)")

    var br = document.createElement("br")

    var div = document.createElement("div")
    div.setAttribute("class", "list")
    div.appendChild(nome_p)
    div.appendChild(data_p)
    div.appendChild(botao_concluido)
    div.appendChild(botao_excluir)
    div.appendChild(br)
    div.appendChild(input_nome)
    div.appendChild(input_data)
    div.appendChild(botao_alterar)
    div_a_fazer = document.getElementById("a_fazer")
    div_a_fazer.appendChild(div)
    x = x + 1
  }
}

function concluido(clicked_id){
  var id = clicked_id.replace("botao_concluido_","")
  nome = document.getElementById(`nome_${id}`).innerHTML
  data = document.getElementById(`data_${id}`).innerHTML
  var formData = new FormData()
  formData.append(`nome`, `${nome}`)
  formData.append(`data`, `${data}`)
  fetch("http://127.0.0.1:5000/concluir_tarefa",{
    method: "patch",
    body: formData
  })
  .then(function(response){
    return response.json()
  })
  .then(function(response){
      console.log(response)
      window.location.reload();
  })
  .catch(function(){
      console.log('erro!')
})
}

function reciclar(clicked_id){
  var id = clicked_id.replace("botao_reciclar_","")
  console.log(id)
  nome = document.getElementById(`nome_concluida_${id}`).innerHTML
  data = document.getElementById(`data_concluida_${id}`).innerHTML
  var formData = new FormData()
  formData.append(`nome`, `${nome}`)
  formData.append(`data`, `${data}`)
  fetch("http://127.0.0.1:5000/reciclar_tarefa",{
    method: "patch",
    body: formData
  })
  .then(function(response){
    window.location.reload();
  })
  .catch(function(){
      console.log('erro!')
})
}

function remove(clicked_id){
  var id = clicked_id.replace("botao_excluir_","")
  nome = document.getElementById(`nome_${id}`).innerHTML
  data = document.getElementById(`data_${id}`).innerHTML
  var formData = new FormData()
  formData.append(`nome`, `${nome}`)
  formData.append(`data`, `${data}`)
  fetch("http://127.0.0.1:5000/remover_tarefa",{
    method: "delete",
    body: formData
  })
  .then(function(response){
    window.location.reload();
  })
  .catch(function(){
      console.log('erro!')
  })
}

function sucesso_concluidas(response){
  largura = response['tarefas'].length
  while (y < largura){
    nome = response['tarefas'][y]['nome']
    data = response['tarefas'][y]['data']

    var nome_p = document.createElement("p")
    nome_p.innerHTML = nome
    nome_p.setAttribute("id", `nome_concluida_${y}`)
    nome_p.setAttribute("class", "nome")

    var data_p = document.createElement("p")
    data_p.innerHTML = data
    data_p.setAttribute("id", `data_concluida_${y}`)
    data_p.setAttribute("class", "data")

    var botao_reciclar = document.createElement("button")
    botao_reciclar.innerHTML = "<img src='../Images/Recycle Bin with paper-1.png'>"
    botao_reciclar.setAttribute("class", "btn")
    botao_reciclar.setAttribute("id", `botao_reciclar_${y}`)
    botao_reciclar.setAttribute("onclick", "reciclar(this.id)")

    var botao_excluir = document.createElement("button")
    botao_excluir.innerHTML = "<img src='../Images/Cross.png'>"
    botao_excluir.setAttribute("class", "btn")
    botao_excluir.setAttribute("id", `botao_excluir_concluida_${y}`)
    botao_excluir.setAttribute("onclick", "remove(this.id)")

    var div = document.createElement("div")
    div.setAttribute("class", "list")
    div.appendChild(nome_p)
    div.appendChild(data_p)
    div.appendChild(botao_reciclar)
    div.appendChild(botao_excluir)
    div_concluidos = document.getElementById("concluidos")
    div_concluidos.appendChild(div)
    y = y + 1
  }
}

function adicionar_tarefa(){
  nome = document.getElementById(`nome_input`).value
  data = document.getElementById(`data_input`).value
  var formData = new FormData()
  formData.append(`nome`, `${nome}`)
  formData.append(`data`, `${data}`)
  fetch("http://127.0.0.1:5000/adicionar_tarefa",{
    method: "post",
    body: formData
  })
  .then(function(response){
    window.location.reload();
  })
  .catch(function(){
      console.log('erro!')
})
}

function alterar(clicked_id){
  var id = clicked_id.replace("botao_alterar_","")
  console.log(id)
  nome = document.getElementById(`nome_${id}`).innerHTML
  data = document.getElementById(`data_${id}`).innerHTML
  novo_nome = document.getElementById(`input_nome_${id}`).value
  if (novo_nome == 0){
    novo_nome = nome
  }
  nova_data = document.getElementById(`input_data_${id}`).value
  if (nova_data == 0){
    nova_data = data
  }
  var formData = new FormData()
  formData.append(`nome`, `${nome}`)
  formData.append(`data`, `${data}`)
  formData.append(`novo_nome`, `${novo_nome}`)
  formData.append(`nova_data`, `${nova_data}`)
  fetch("http://127.0.0.1:5000/alterar_tarefa",{
    method: "patch",
    body: formData
  })
  .then(function(response){
    window.location.reload();
  })
  .catch(function(){
      console.log('erro!')
})
}