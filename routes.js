const express = require('express'),
      router = express.Router()

const storage = require('node-persist');

let players = [];

(async function() {
  await Promise.resolve(storage.init());
  persistedplayers = await storage.getItem('players')
  // console.log(`players: ${persistedplayers.length}`)
  // if (persistedplayers.length > 0) {
  //   players = persistedplayers
  // }
}());

async function persistplayers() {
  await storage.updateItem('players', players)
}

router
  .get('/', async (req, res) => {
    res.send(players)
  })
  .get('/:key/', async (req, res) => {
    indexOfNote = players.findIndex(note => note.key === req.params.key)

    if (req.params.key && indexOfNote !== -1) {
      res.send(players[indexOfNote])
    } else {  
      res.send(`A ${req.params.key} could not be found.`)
    }
  })
  .post('/createPlayer', async (req, res) => {
    indexOfNote = players.findIndex(note => note.key === req.body.key)

    if (indexOfNote == -1 && req.body.key && req.body.name && req.body.text ) {
      players.push({
        id: players.length | 0,
        ...req.body
      })
      console.log(players)
      res.send(`This id ${req.body.key} was saved.`)
    } else if (indexOfNote !== -1 ) {
      res.send(`This id ${req.body.key} is already saved.`)
    } else {
      res.send('A required field was missing.')
    }

    persistplayers()
  })
  .get('/deletePlayer', async (req, res) => {
    indexOfNote = players.findIndex(note => note.key === req.body.key)

    if (req.body.key && indexOfNote !== -1) {
      players.splice(indexOfNote, 1)
      res.send(`This id ${req.body.key} was deleted.`)
    } else {  
      console.log(`This id ${req.body.key} could not be found.`)
      res.send(`This id ${req.body.key} could not be found.`)
    }

    persistplayers()
  })
  .get('/:key/deletePlayer', async (req, res) => {
    indexOfNote = players.findIndex(note => note.key === req.params.key)

    if (req.params.key && indexOfNote !== -1) {
      players.splice(indexOfNote, 1)
      res.send(`This id ${req.params.key} was deleted.`)
    } else {  
      console.log(`This id ${req.params.key} could not be found.`)
      res.send(`This id ${req.params.key} could not be found.`)
    }

    persistplayers()
  })
  .put('/updatePlayer', async (req, res) => {
    indexOfNote = players.findIndex(note => note.key === req.body.key)

    if (req.body.key && indexOfNote !== -1) {
      players.splice(indexOfNote, 1, {
        id: players.length | 0,
        ...req.body
      })
      res.send(`This id ${req.body.key} was updated.`)
    } else {  
      console.log(`This id ${req.body.key} could not be found.`)
      res.send(`This id ${req.body.key} could not be found.`)
    }

    persistplayers()
  })
  .put('/:key/updatePlayer', async (req, res) => {
    indexOfNote = players.findIndex(note => note.key === req.params.key)

    if (req.params.key && indexOfNote !== -1) {
      players.splice(indexOfNote, 1, {
        id: players.length | 0,
        ...req.body
      })
      res.send(`This id  ${req.params.key} was updated.`)
    } else {  
      console.log(`This id  ${req.params.key} could not be found.`)
      res.send(`This id  ${req.params.key} could not be found.`)
    }

    persistplayers()
  })

module.exports = router;