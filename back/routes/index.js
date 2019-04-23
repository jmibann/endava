const express = require('express');
const router = express.Router();
const index = require('../models');

const usRouter = require('./usRouter');
const quRouter = require('./quRouter');
const candiRouter = require('./candiRouter');
const tagRouter = require('./tagRouter');
const interviewRouter = require('./interViewRouter');
const answersRouter = require('./answersRouter')

router.use('/users', usRouter);
router.use('/questions', quRouter);
router.use('/candidate', candiRouter);
router.use('/tags', tagRouter);
router.use('/interview', interviewRouter);
router.use('/answers', answersRouter);

module.exports = router;
