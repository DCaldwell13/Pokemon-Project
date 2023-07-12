const evolution = require('express').Router();
const db = require('../models');
const { Pokemon, Element } = db;
const { Op } = require ('sequelize');

evolution.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.name ? req.query.name : '';
        const foundEvolution = await Evolution.findAll({ 
            order: [ 
                [ 'pokemon', 'ASC' ],
                ['name', 'ASC'] 
            ],
            where: {
                name: {
                    [Op.like]: `%${searchTerm}%`,
                }
            }
        })
        res.status(200).json(foundEvolutions)
    } catch (error) {
        res.status(500).json(error)
    }
})

evolution.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const foundEvolution = await Evolution.findOne({
            where: { name },
            include: [
                {
                  model: Pokemon,
                  as: 'Pokemon',
                  attributes: {
                    exclude: ['weight', 'height']
                  },
                  include: {
                    model: element,
                    as: 'element',
                    attributes: {
                        exclude: ['height', 'weight']
                    }
                  }
                },
            ]
            
        });
        if (!foundEvolution) {
            res.status(404).json({ message: 'Could not find Evolution'})
        } else{
            res.status(200).json(foundEvolution);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// CREATE A Event
evolution.post('/', async (req, res) => {
    const { id } = req.params;
    try {
        const newEvolution = await Evolution.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new evolution',
            data: newEvolution
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A Event
evolution.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEvolution = await Evolution.update(req.body, {
            where: {
                evolution_id: id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvolution} evolution(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A EVENT
evolution.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvolution = await Evolution.destroy({
            where: {
                evolution_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvolution} evolution(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = evolution;