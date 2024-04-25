const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

router.route('/')
    .get((req, res) => {
        res.render('ny')
    })
    
router.post(('/nyelev'), async (req, res) => {
    const elev = await prisma.elev.create({
        data: {
            fornavn: req.body.fornavn,
            etternavn: req.body.etternavn,
            epost: req.body.epost,
            passord: await bcrypt.hash(req.body.passord, 10),
            klasse: {
                connect: { id: parseInt(req.body.klasse) }
            }
        }
    })
    res.redirect('/')
})
    
router.post(('/nylaerer'), async (req, res) => {
        const laerer = await prisma.laerer.create({
            data: {
                fornavn: req.body.fornavn,
                etternavn: req.body.etternavn,
                epost: req.body.epost,
                passord: await bcrypt.hash(req.body.passord, 10),
                isAdmin: false,
                klasse: {
                    connect: req.body.klasse.map((klasse) => {
                        return { id: parseInt(klasse) }
                    })
                }
            }
        })
        res.redirect('/')
    })

module.exports = router