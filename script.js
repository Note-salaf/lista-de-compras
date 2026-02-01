const nomeProduto = document.querySelector('#cxProduto')
const btnAdicionar = document.querySelector('#btnAdicionar')
const listaProdutos = document.querySelector('#listaProdutos')

// ===== READ (carregar do localStorage) =====
let produtos = JSON.parse(localStorage.getItem('produtos')) || []

produtos.forEach(produto => criarItemNaLista(produto))

// ===== CREATE =====
btnAdicionar.addEventListener('click', () => {
  const texto = nomeProduto.value.trim()
  if (!texto) return

  produtos.push(texto)
  localStorage.setItem('produtos', JSON.stringify(produtos))

  criarItemNaLista(texto)
  nomeProduto.value = ''
})

// ===== Função que cria o <li> =====
function criarItemNaLista(texto) {
  const itemLista = document.createElement('li')

  const spanTexto = document.createElement('span')
  spanTexto.textContent = texto

  const btnRemover = document.createElement('button')
  btnRemover.textContent = 'Remover'

  // ===== DELETE =====
  btnRemover.addEventListener('click', () => {
    const indice = produtos.indexOf(texto)
    if (indice > -1) {
      produtos.splice(indice, 1)
      localStorage.setItem('produtos', JSON.stringify(produtos))
    }
    itemLista.remove()
  })

  // ===== UPDATE =====
  spanTexto.addEventListener('dblclick', () => {
    const novoTexto = prompt('Editar produto:', spanTexto.textContent)
    if (!novoTexto) return

    const indice = produtos.indexOf(spanTexto.textContent)
    if (indice > -1) {
      produtos[indice] = novoTexto
      localStorage.setItem('produtos', JSON.stringify(produtos))
    }

    spanTexto.textContent = novoTexto
  })

  itemLista.appendChild(spanTexto)
  itemLista.appendChild(btnRemover)
  listaProdutos.appendChild(itemLista)
}
