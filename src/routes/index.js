const { status } = require('../api/controllers/app.controller')
const userController = require('../api/controllers/user.controller')
const { buscarSaldoPorId } = require('../api/controllers/saldo.controller')
const { StatusCodes, ReasonPhrases } = require("http-status-codes")
const { TransactionResponseDTO } = require('../api/models/dto/trasactions.dto')
const Joi = require('joi')
// const { TransactionResponseDTO } = require('../api/models/dto/trasactions.dto')
//const authController = require('../api/controllers/auth.controller')
//const { LoginRequestDTO, LoginResponseDTO } = require('../api/models/dto/auth.dto')

const authController = require('../api/controllers/auth.controller')

const { verifyJWT } = require('../helpers/verificaToken')

const root = {
  method: "GET",
  path: "/",
  handler: status,
  options: {
    tags: ['api'],
    description: 'API Gamabank',
    notes: 'API desenvolvida pelo Grupo Desenvolvedores do Amanhã'
  }
};

const testeAcessoToken = {
  method: 'GET',
  path: '/teste_token',
  handler: async (request, h) => {
    try {
      const token = request.headers.authorization

      if (!token) return h
        .response({ message: 'token não providenciado' })
        .code(401)

      verifyJWT(token, request)

      return { userId: request.userId }
    } catch (err) {
      return h
        .response({ message: ReasonPhrases.BAD_REQUEST, err: err })
        .code(StatusCodes.BAD_REQUEST)
    }
  },
  options: {
    tags: ['api', 'usuarios'],
    description: 'Listar todos os usuários',
    notes: 'Listar todos os usuários cadastrados na Gamabank',
  }
}

// const listarUsuarios = {
//   method: 'GET',
//   path: '/usuarios',
//   handler: async () => {
//     try {
//       const response = await userController.buscarUsuarios()
//       return response
//     } catch (err) {
//       console.log(err)
//     }
//   },
//   options: {
//     tags: ['api', 'usuarios'],
//     description: 'Listar todos os usuários',
//     notes: 'Listar todos os usuários cadastrados na Gamabank',
//   }
// }

const listarUsuarioPorId = {
  method: 'GET',
  path: '/usuarios',
  handler: async (request, h) => {
    try {
      const token = request.headers.authorization

      if (!token) return h
        .response({ message: 'token não providenciado' })
        .code(401)

      verifyJWT(token, request)

      const id = request.userId

      return await userController.buscarUsuarioPorId(id)
    } catch (err) {
      return h
        .response({ message: ReasonPhrases.BAD_REQUEST, err: err })
        .code(StatusCodes.BAD_REQUEST)
    }

  },
  options: {
    tags: ['api', 'usuarios'],
    description: 'Listar usuário por ID',
    notes: 'Listar usuário por ID cadastrado na Gamabank'
  }
}

const criarUsuario = {
  method: 'POST',
  path: '/cadastrar',
  handler: async (request, h) => {
    try {
      const dadosCriacao = request.payload
      const response = await userController.criarUsuario(dadosCriacao, h)

      return response
    } catch (err) {
      return h
        .response({ message: ReasonPhrases.BAD_REQUEST, err: err })
        .code(StatusCodes.BAD_REQUEST)
    }
  },
  options: {
    tags: ['api', 'usuarios'],
    description: 'Cadastrar novos usuários',
    notes: 'Cadastrar novos usuários na Gamabank',
  }
}

const logarUsuario = {
  method: 'POST',
  path: '/login',
  handler: async (request, h) => {
    try {
      const dadosLogin = request.payload
      const response = await authController.login(dadosLogin, h)

      return response
    } catch (err) {
      return h
        .response({ message: ReasonPhrases.BAD_REQUEST, err: err })
        .code(StatusCodes.BAD_REQUEST)
    }
  },
  options: {
    tags: ['api', 'usuarios'],
    description: 'Logar usuario',
    notes: 'logar usuário na Gamabank',
  }
}

const deletarUsuario = {
  method: 'DELETE',
  path: '/usuarios/{id}',
  handler: userController.deletarUsuarioPorId,
  options: {
    tags: ['api', 'usuarios'],
    description: 'Deletar usuário cadastrado na Gamabank',
    notes: 'Deletar usuário cadastrado na Gamabank por ID'
  }
}

const atualizarUsuario = {
  method: 'PUT',
  path: '/usuarios/{id}',
  handler: userController.alterarUsuarioPorId,
  options: {
    tags: ['api', 'usuarios'],
    description: 'Atualizar dados do usuário cadastrado na Gamabank',
    notes: 'Atualizar nome, e-mail e senha do usuário cadastrado na Gamabank por ID'
  }
}

//ROTAS DE SALDO
const { listarExtradoPorId } = require('../api/controllers/saldo.controller')
const { TransactionResponseDTO } = require('../api/models/dto/trasactions.dto')

const listarExtrado = {

    method: 'GET',
    path: '/extratos/{id}',
    handler: listarExtradoPorId,
    options:{
            tags: ['api', 'saldo'],
            description: 'Lista o extrato', 
            notes: 'Lista o extrado completo do usuário',
            validate: {
                params: Joi.object({
                    id : Joi.number()
                            .required()
                            .description('id do usuário'),
                })
            }

    }
  }


const depositoUsuario = {
    method: 'PUT',
    path: '/deposito', //informar ID E VALOR
    handler: userController.depositoUsuario,
    options: {
      tags: ['api', 'usuarios'],
      description: 'O usuário poderá realizar deposito em sua conta.',
      notes: 'O usuário poderá realizar deposito em sua conta cadastrada na Gamabank.'
    }
  }

module.exports = [

  listarUsuarioPorId,
  // listarUsuarios,
  criarUsuario,
  deletarUsuario,
  atualizarUsuario,
  root,
  listarSaldoPorId,
  logarUsuario,
  depositoUsuario,
  testeAcessoToken,
  listarExtrado

]

