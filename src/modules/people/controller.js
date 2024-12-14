import personService from './service.js';
import { NotFoundError } from '../../errors/NotFoundError.js';

const personController = {
    createPerson: async (req, res, next) => {
        const { name, age, gender } = req.body;
        try {
            const person = await personService.createPerson({ name, age, gender });
            res.status(201).json({ data: person });
        } catch (error) {
            next(error);
        }
    },
    getPeople: async (req, res, next) => {
        try {
            const people = await personService.getAllPeople();
            res.status(200).json({ success: true, data: people });
        } catch (error) {
            next(error);
        }
    },
    getPerson: async (req, res, next) => {
        const { personId } = req.params;
        try {
            const existingPerson = await personService.getPersonById(personId);
            if (!existingPerson) {
                throw new NotFoundError('Person not found');
            }
            res.status(200).json({ success: true, data: existingPerson });
        } catch (error) {
            next(error);
        }
    },
    updatePerson: async (req, res, next) => {
        const { personId } = req.params;
        const { name, age, gender } = req.body;
        try {
            const existingPerson = await personService.getPersonById(personId);
            if (!existingPerson) {
                throw new NotFoundError('Person not found');
            }

            const updatedPersonData = await personService.updatePerson(personId, { name, age, gender });
            res.status(200).json({ success: true, data: updatedPersonData });
        } catch (error) {
            next(error);
        }
    },
    deletePerson: async (req, res, next) => {
        const { personId } = req.params;
        try {
            const existingPerson = await personService.getPersonById(personId);
            if (!existingPerson) {
                throw new NotFoundError('Person not found');
            }

            await personService.deletePerson(personId);
            res.status(204).json({ success: true });
        } catch (error) {
            next(error);
        }
    },
};

export default personController;
