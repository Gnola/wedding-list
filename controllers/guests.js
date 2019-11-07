const express = require('express');
const router = express.Router();
const Guest = require('../models/guests.js') // use guestSchema from /models/guests.js


// NEW GUEST
router.get('/new', (req, res) => { // clicked CREATE NEW from HOMEPAGE
  res.render('guests/newguest.ejs') // NEW GUEST PAGE
})

// CREATE (POST) GUEST
router.post('/', (req, res) => {
  Guest.create( // create a GUEST using the schema from MODELS/GUESTS.JS
    req.body, // get info from req.body
    (err, createdGuest) => { // then..
      res.redirect('/guests') // send them back to the HOMEPAGE
    }
  )
}) // GUEST IS NOW STORED IN GUESTS COLLECTION AND DISPLAYS ON HOMEPAGE


// INDEX (HOME)
router.get('/', (req, res) => {
  if (req.session.username) {
    Guest.find(
      {},
      (err, allGuests) => {
        console.log(allGuests);
        res.render(
          'guests/index.ejs',
          {
            guests: allGuests,
            username:req.session.username
          }
        )
      }
    )
  }
})


// COUNTS AND SEND CORRECT INFO BUT WANT TO PUT ON INDEX PAGE
router.get('/count', (req, res) => {
  Guest.countDocuments(
    {rsvp:"I'm in!"},
    (err, data) => {
      // console.log(`There are ${data} guests who are in!`)
      res.send(`There are ${data} guests who are in!`)
  })
})


// SHOW GUEST
router.get('/:id', (req, res) => {
  Guest.findById(
    req.params.id,
    (err, foundGuest) => {
      res.render(
        'guests/showguest.ejs',
        { guests: foundGuest}
      )
    }
  )
})


// DELETE GUEST
router.delete('/:id', (req, res) => {
  Guest.findByIdAndRemove(
    req.params.id,
    (err, data) => {
      res.redirect('/guests')
    }
  )
})

// EDIT GUEST
router.get('/:id/edit', (req, res) => {
  Guest.findById(
    req.params.id,
    (err, foundGuest) => {
      res.render(
        'guests/editguest.ejs',
        {
          guests : foundGuest
        }
      )
    }
  )
})

// UPDATE GUEST
router.put('/:id', (req, res) => {
  Guest.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err, updatedGuest) => {
      // res.send(updatedGuest)
      res.redirect('/guests/' + updatedGuest.id)
    }
  )
})


module.exports = router
