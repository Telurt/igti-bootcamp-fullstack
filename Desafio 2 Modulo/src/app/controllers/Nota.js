import fs from 'fs'
import path from 'path'

class Nota {
  async show(req, res) {
    const { student, subject } = req.query

    fs.readFile(
      path.resolve('src', 'data', 'grades.json'),
      'utf8',
      async (err, data) => {
        try {
          if (err) throw err

          const json = JSON.parse(data)

          const nota = json.grades.reduce((acc, cur) => {
            return cur.student === student && cur.subject === subject
              ? acc + cur.value
              : acc
          }, 0)

          if (!nota) {
            res.status(404).send('A nota não pode ser calculada')
          } else {
            res.status(200).json({ nota: `${nota}` })
          }
        } catch (error) {
          res.status(400).send(error.message)
        }
      },
    )
  }
}

export default new Nota()
