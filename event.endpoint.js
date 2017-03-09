'use strict';

const express = require('express'),
    router = express.Router();

const eventArray = [];

eventArray.push({id:12345, title:'Un evento', descripcion:'asñkdlfhasdkfjh', fecha:'12/01/1998'});
eventArray.push({id:98663, title:'Otro evento', descripcion:'qwerty', fecha:'01/02/2001'});

const getAllEvents = (req, res, next) => {
    if (eventArray.length > 0) {
        res.status(200).json(eventArray);
    } else {
        res.status(204).json();
    }
};

const getEventById = (req, res, next) => {
    const id = req.params.id;
    let found = false;
    let result;

    if (id) {
        for (let i = 0; eventArray.length > i; i++) {
            if (eventArray[i].id == id) {
                found = true;
                result = eventArray[i];
            }
        }

        if (found) {
            res.status(200).json({result: 'ok', code: 200, data: result});
        } else {
            res.status(204).json();
        }
    } else {
        res.status(422).json({result: 'error', code: 422, data: { msg: 'Unprocessable Entity'}});
    }
};

const postEvent = (req, res, next) => {

    console.log(req.body);

    if(req.body.id){
      eventArray.push(req.body);
      res.status(201).json({result: 'Perfect creation!', code: 201, data: req.body});
    }
    else{
      res.status(422).json({result: 'Dude, that didnt have an id!', code: 422, data: {}});
    }
}

const updateEvent = (req, res, next) => {
  let found = false;

  if (req.params.id) {
      for (let i = 0; eventArray.length > i; i++) {
          if (eventArray[i].id == req.params.id) {
              found = true;
              eventArray[i] = req.body;
          }
      }

      if (found) {
          res.status(200).json({result: 'ok', code: 200, data:req.body});
      } else {
          res.status(204).json();
      }
  } else {
      res.status(422).json({result: 'error', code: 422, data: { msg: 'Unprocessable Entity'}});
  }
}

const deleteEvent = (req, res, next) => {
  let found = false;

  if (req.params.id) {
      for (let i = 0; eventArray.length > i; i++) {
          if (eventArray[i].id == req.params.id) {
              found = true;
              //delete eventArray[i];
              eventArray.splice(i, 1);
          }
      }

      if (found) {
          res.status(200).json({result: 'ok', code: 200, data: { msg: 'delete succesful'}});
      } else {
          res.status(204).json();
      }
  } else {
      res.status(422).json({result: 'error', code: 422, data: { msg: 'Unprocessable Entity'}});
  }
}

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', postEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;


/**

 Get /event -> Lista con todos eventos
 Get /event/id -> Evento
 Post /event -> Crear evento nuevo

 Put /event/id -> Modificar un evento {id, description, date ...}
 Patch /event/id -> Modificar un evento {description}

 Delete /event/id -> Borrar evento
 Delete /event -> Borrar todos evento

 */
