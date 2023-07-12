const element = require('express').Router();
const db = require('../models');
const { Pokemon, Evolution } = db;
const { Op } = require ('sequelize');

element.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.name ? req.query.name : '';
        const foundElement = await Stage.findAll({ 
            order: [ 
                ['name', 'ASC'] 
            ],
            where: {
                name: {
                    [Op.like]: `%${searchTerm}%`,
                }
            }
        })
        res.status(200).json(foundElement)
    } catch (error) {
        res.status(500).json(error)
    }
})

element.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const foundElement = await Element.findOne({
            where: { name },
            include: {
                model: Evolutionary,
                as: 'evolutions',
                through: {
                    attributes: []
                }
            },
            order: [
                [{ model: Evolution, as: 'evolutions'}, 'string', 'ASC']
            ]
        });
        if (!foundElement) {
            res.status(404).json({ message: 'Could not find Element'})
        } else{
            res.status(200).json(foundElement);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// CREATE A ELEMENT
element.post('/', async (req, res) => {
    const { id } = req.params;
    try {
        const newElement = await Element.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new Element',
            data: newElement
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A ELEMENT
element.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedElement = await Element.update(req.body, {
            where: {
                element_id: id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedElement} element(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A ELEMENT
element.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedElement = await Element.destroy({
            where: {
                element_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedElement} element(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = element;