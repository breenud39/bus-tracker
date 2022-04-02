const express = require('express');
const router = express.Router()



router.get('/', (req, res) => { 
     resstatus(200).json({message: 'Show all roots'})
});

router.getById('/:id', (req, res) => { 
    resstatus(200).json({message: 'Show only one root '})
});

module.export = router

