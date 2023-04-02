const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany()
  res.json(tasks)
})

app.post('/tasks', async (req, res) => {
  const task = await prisma.task.create({
    data: {
      name: req.body.name,
    },
  })
  res.json(task)
})

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params
  const task = await prisma.task.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: req.body.name,
      completed: req.body.completed,
    },
  })
  res.json(task)
})

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params
  await prisma.task.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.sendStatus(204)
})

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
