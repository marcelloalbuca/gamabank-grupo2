const usuarioService = require('../api/service/usuarioService.js')

const listarUsuarios = {
  method: 'GET',
  path: '/usuarios',
  handler: async (request, h) => {
    const data = await usuarioService.buscarUsuarios()
    return data
  }
}

const listarUsuarioPorId = {
  method: 'GET',
  path: '/usuarios/{id}',
  handler: async (request, h) => {
    try {
      const { id } = request.params
      return await usuarioService.buscarUsuarioPorId(id)
    } catch (error) {
      console.log(error)
      return { message: 'Erro ao procurar usuário!' }

    }
  }
}

const criarUsuario = {
  method: 'POST',
  path: '/usuarios',
  handler: async (request, h) => {
    try {
      const user = request.payload

      const userCreated = await usuarioService.criarUsuario(user)

      console.log(user)
      console.log(userCreated)

      h.response(userCreated).code(200)
    } catch (error) {

    }
  }
}

const deletarUsuario = {
  method: 'DELETE',
  path: '/usuarios/{id}',
  handler: async (request, h) => {
    try {
      const { id } = request.params
      await usuarioService.deletarUsuarioPorId(id)
      return { message: 'Usuário Deletado!' }
    } catch (error) {
      return { message: 'Erro ao deletar usuário!' }
    }
  }
}

const atualizarUsuario = {
  method: 'PUT',
  path: '/usuarios/{id}',
  handler: async (request, h) => {
    try {
      const { id } = request.params
      const { senha } = request.payload

      await usuarioService.alterarUsuarioPorId(id, senha)
      return { message: 'Usuário atualizado!' }
    } catch (error) {
      return { message: 'Erro ao atualizar usuário!' }
    }
  }
}

module.exports = [listarUsuarioPorId, listarUsuarios, criarUsuario, deletarUsuario, atualizarUsuario]
