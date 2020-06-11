import fs from 'fs'
import path from 'path'

class Grade {
  async create(req, res) {
    const grade = req.body

    fs.readFile(
      path.resolve('src', 'data', 'grades.json'),
      'utf8',
      async (err, data) => {
        try {
          if (err) throw err

          const json = JSON.parse(data)

          const newGrade = {
            id: json.nextId,
            ...grade,
            timestamp: new Date(),
          }
          json.nextId += 1

          json.grades.push(newGrade)

          fs.writeFile(
            path.resolve('src', 'data', 'grades.json'),
            JSON.stringify(json),
            error => {
              if (error) {
                res.status(400).send({ message: error.message })
              } else {
                res.status(204).send()
              }
            },
          )
        } catch (error) {
          res.status(400).send({ message: error.message })
        }
      },
    )
  }

  async update(req, res) {
    const { id } = req.params
    const newGradeInfo = req.body

    fs.readFile(
      path.resolve('src', 'data', 'grades.json'),
      'utf8',
      async (err, data) => {
        try {
          if (err) throw err

          const json = JSON.parse(data)

          if (!json.grades.find(item => item.id === Number(id)))
            res.status(404).send('Registro não encontrado')

          json.grades = json.grades.map(item => {
            return item.id === Number(id) ? { ...item, ...newGradeInfo } : item
          })

          fs.writeFile(
            path.resolve('src', 'data', 'grades.json'),
            JSON.stringify(json),
            error => {
              if (error) {
                res.status(400).send({ message: error.message })
              } else {
                res.status(200).send({ message: 'Registro atualizado' })
              }
            },
          )
        } catch (error) {
          res.status(400).send(error.message)
        }
      },
    )
  }

  async show(req, res) {
    const { id } = req.params

    fs.readFile(
      path.resolve('src', 'data', 'grades.json'),
      'utf8',
      async (err, data) => {
        try {
          if (err) throw err

          const json = JSON.parse(data)

          const grade = json.grades.find(item => item.id === Number(id))

          if (!grade) {
            res.status(404).send('Registro não encontrado')
          } else {
            res.status(200).json(grade)
          }
        } catch (error) {
          res.status(400).send(error.message)
        }
      },
    )
  }

  async delete(req, res) {
    const { id } = req.params

    fs.readFile(
      path.resolve('src', 'data', 'grades.json'),
      'utf8',
      async (err, data) => {
        try {
          if (err) throw err

          const json = JSON.parse(data)

          const grade = json.grades.find(item => item.id === Number(id))

          if (!grade) res.status(404).send('Registro não encontrado')

          json.grades = json.grades.filter(item => item.id !== Number(id))

          json.nextId -= 1

          fs.writeFile(
            path.resolve('src', 'data', 'grades.json'),
            JSON.stringify(json),
            error => {
              if (error) {
                res.status(400).send({ message: error.message })
              } else {
                res.status(200).send({ message: 'Registro excluído' })
              }
            },
          )
        } catch (error) {
          res.status(400).send(error.message)
        }
      },
    )
  }
}

export default new Grade()
