import Person from '../models/Person.js';

const personService = {
  createPerson: async (personData) => {
    const newPerson = new Person(personData);
    return newPerson.save();
  },
  getPersonById: async (personId) => {
    const person = await Person.findById(personId);
    if (!person) {
      throw new Error('Person not found');
    }
    return person;
  },
  getAllPeople: async () => {
    return Person.find();
  },
  updatePersonById: async (personId, updateData) => {
    const person = await Person.findByIdAndUpdate(personId, updateData, { new: true });
    if (!person) {
      throw new Error('Person not found');
    }
    return person;
  },

  deletePersonById: async (personId) => {
    const person = await Person.findByIdAndDelete(personId);
    if (!person) {
      throw new Error('Person not found');
    }
    return person;
  }
};

export default personService;
