const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', (req, res) => {
    res.render('./laerere')
})

router.get('/admin', (req, res) => {
    res.render('./laerere/admin')
})

module.exports = router