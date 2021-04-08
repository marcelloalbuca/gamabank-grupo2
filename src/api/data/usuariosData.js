const database = require('../../infraestructure/database')

exports.criarUsuario = async (sqlStatement, passEncrypted) => {
  return new Promise((resolve, reject) => {
    try {
      const { nome, email, cpf } = sqlStatement

      const queryString = `INSERT INTO usuarios (nome, email, cpf, senha) 
      values ("${nome}", "${email}", "${cpf}", "${passEncrypted.encryptedPassword}");`

      database.query(queryString, (err, rows) => {

        resolve(rows)
      })
    } catch (error) {
      reject(err)
    }
  })
}

exports.buscarUsuarios = () => {
  try {
    return new Promise((resolve, reject) => {
      database.query('select * from usuarios;', (err, rows) => {
        reject(err)
        resolve(rows)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.buscarUsuarioPorId = (sqlStatement) => {
  try {
    return new Promise((resolve, reject) => {
      database.query(`select * from usuarios WHERE id = ${sqlStatement};`, (err, rows) => {
        reject(err)
        resolve(rows)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.deletarUsuarioPorId = (sqlStatement) => {
  try {
    return new Promise((resolve, reject) => {
      database.query(`delete from usuarios where id = "${sqlStatement}";`, (err, rows) => {
        reject(err)
        resolve(rows)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

exports.alterarUsuarioPorId = (id, sqlStatement) => {
  try {
    return new Promise((resolve, reject) => {
      database.query(`update usuarios set senha="${sqlStatement}" where id = "${id}";`, (err, rows) => {
        reject(err)
        resolve(rows)
      })
    })
  } catch (error) {
    console.log(error)
  }
}