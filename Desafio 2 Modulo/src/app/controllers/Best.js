import fs from 'fs'
import path from 'path'

class Best {
  async show(req, res) {
    const { type, subject } = req.query

    fs.readFile(
      path.resolve('src', 'data', 'grades.json'),
      'utf8',
      async (err, data) => {
        try {
          if (err) throw err

          const json = JSON.parse(data)

          const grades = json.grades
            .reduce(
              (acc, cur) =>
                cur.type === type && cur.subject === subject
                  ? [...acc, cur.value]
                  : acc,
              [],
            )
            .sort((a, b) => b - a)
            .slice(0, 3)

          if (!grades) {
            res.status(404).send('As melhores notas não pode ser calculadas')
          } else {
            res.status(200).json({ best: grades })
          }
        } catch (error) {
          res.status(400).send(error.message)
        }
      },
    )
  }
}

export default new Best()
