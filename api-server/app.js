import createError from 'http-errors'
import express from 'express'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use(function (req, res, next) {
	next(createError(404))
})

app.use(function (err, req, res, next) {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status(err.status || 500)
	res.render('error')
})

export default app
