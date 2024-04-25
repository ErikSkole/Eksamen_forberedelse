const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const elever = await prisma.elev.findMany({
        include: {
            klasse: true
        }
    })
    const laerere = await prisma.laerer.findMany({
        include: {
            klasse: true
        }
    })
    res.render('./elever', {elever, laerere})
})

router.get('/meg/:id', async (req, res) => {
    const bruker = await prisma.elev.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            klasse: true
        }
    })
    res.render('./elever/meg', {bruker})
})

module.exports = router