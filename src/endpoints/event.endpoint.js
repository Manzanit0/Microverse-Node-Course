/**
 GET /event -> Get events list
 GET /event/id -> Get an event with id

 POST /event -> Creqate new event

 PUT /event/id -> Update and event with whole event object
 PATCH /event/id -> Update and event with single modification

 DELETE /event/id -> Delete an event by id
 DELETE /event -> Delete all events
*/

'use strict';

/**
 * Load express libraries
 */
const express = require('express'),
    router = express.Router();

const events = require('../models/event.model');

/**
 * Retrieve all events
 *
 * @param req
 * @param res
 */
const getAllEvents = (req, res) => {
    if (events.length > 0) {
        res.status(200).json({result: 'ok', code: 200, data: events});
    } else {
        res.status(204).json();
    }
};

/**
 * Retrieve one event by id
 *
 * @param req
 * @param res
 */
const getEventById = (req, res) => {
    const id = req.params.id;

    let found = false;
    let result;

    if (id) {
        for (let i = 0; events.length > i; i++) {
            if (events[i].id == id) {
                found = true;
                result = events[i];
            }
        }

        if (found) {
            res.status(200).json({result: 'ok', code: 200, data: result});
        } else {
            res.status(204).json();
        }
    } else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

/**
 * Crete new event
 *
 * @param req
 * @param res
 */
const postEvent = (req, res) => {
    if (req.body.id) {
        events.push(req.body);
        res.status(201).json({result: 'ok', code: 201, data: req.body});
    }
    else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

/**
 * Update event with id
 *
 * @param req
 * @param res
 */
const updateEvent = (req, res) => {
    let found = false;

    if (req.params.id) {
        for (let i = 0; events.length > i; i++) {
            if (events[i].id == req.params.id) {
                found = true;
                events[i] = req.body;
            }
        }

        if (found) {
            res.status(200).json({result: 'ok', code: 200, data: req.body});
        } else {
            res.status(204).json();
        }
    } else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

/**
 * Delete event by id
 *
 * @param req
 * @param res
 */
const deleteEvent = (req, res) => {
    let found = false;

    if (req.params.id) {
        for (let i = 0; events.length > i; i++) {
            if (events[i].id == req.params.id) {
                found = true;
                events.splice(i, 1);
            }
        }

        if (found) {
            res.status(200).json({result: 'ok', code: 200, data: {msg: 'delete succesful'}});
        } else {
            res.status(204).json();
        }
    } else {
        res.status(422).json({result: 'error', code: 422, data: {msg: 'Unprocessable Entity'}});
    }
};

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', postEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
