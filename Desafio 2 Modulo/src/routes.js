import express from 'express'
import celebrate from 'celebrate'
import Grade from './app/controllers/Grade'
import Media from './app/controllers/Media'
import Nota from './app/controllers/Nota'
import Best from './app/controllers/Best'

const celebrateFunction = celebrate.celebrate
const { Joi } = celebrate

const routes = new express.Router()

routes.post(
  '/grade',
  celebrateFunction(
    {
      body: Joi.object().keys({
        student: Joi.string().required(),
        subject: Joi.string().required(),
        value: Joi.number().required(),
        type: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  Grade.create,
)
routes.get('/grade/:id', Grade.show)
routes.delete('/grade/:id', Grade.delete)
routes.put(
  '/grade/:id',
  celebrateFunction(
    {
      body: Joi.object().keys({
        student: Joi.string(),
        subject: Joi.string(),
        value: Joi.number(),
        type: Joi.string(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  Grade.update,
)

routes.get('/media', Media.show)
routes.get('/nota', Nota.show)
routes.get('/best', Best.show)

export default routes
