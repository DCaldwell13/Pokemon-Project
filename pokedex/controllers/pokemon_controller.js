const Pokemon = require('express').Router();
const db = require('../models');
const { Evolution, Element } = db;
const { Op } = require ('sequelize');
const pokemon = require('../models/pokemon');

// FIND ALL POKEMON
pokemon.get('/', async (req, res) => {
    try {
        const { name = '', limit = 99, offset = 0 } = req.query;
       // const searchTerm = req.query.name ? req.query.name : '';
        const foundPokemon = await Pokemon.findAll({ 
            order: [ 
                [ 'element', 'ASC' ],
                ['name', 'ASC'] 
            ],
            where: {
                name: {
                    [Op.like]: `%${name}%`,
                }
            },
            limit
        })
        res.status(200).json(foundPokemon)
    } catch (error) {
        res.status(500).json(error)
    }
})

pokemon.get('/:name', async (req, res) => {
    const { name } = req.params;
    const { element = '' } = req.query;
    try {
        const foundPokemon = await Pokemon.findOne({
            where: { name },
            include: [
                {
                model: element,
                as: 'elements',
                include: {
                    model: Evolution,
                    as: 'evolutions',
                    where: {
                        name: {
                            [Op.like]: `%${element}%`,
                        }
                    }
                }
              },
            ]
            
        });
        if (!foundPokemon) {
            res.status(404).json({ message: 'Could not find Pokemon'})
        } else{
            res.status(200).json(Pokemon);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// CREATE A POKEMON
pokemon.post('/', async (req, res) => {
    const { name } = req.params;
    try {
        const newPokemon = await Pokemon.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new pokemon',
            data: newPokemon
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A POKEMON
pokemon.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPokemon = await Pokemon.update(req.body, {
            where: {
                pokemon_id: id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedPokemon} pokemon(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A POKEMON
pokemon.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPokemon = await Pokemon.destroy({
            where: {
                pokemon_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedPokemon} pokemon(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})



module.exports = pokemon;