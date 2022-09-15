const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {

    async index(request, response) {
        // Listar todos os registros
        const contacts = await ContactsRepository.findAll();
        response.json(contacts)
    }

    async show(request, response) {
        // Obter um registro
        const { id } = request.params;

        const contact = await ContactsRepository.findById(id);

        if (!contact) {

            return response.status(404).json({ error: 'User not found!' })
        }

        response.json(contact);

    }

    async store(request, response) {
        // Criar novo registro
        const { name, email, phone, category_id } = request.body;


        if (!name) {
            response.status(400).json({ error: 'Name is require!' })
        }

        const contactExists = await ContactsRepository.findByEmail(email);

        if (contactExists) {

            response.status(400).json({ error: 'This e-mail is already been user!' })
        }

        const contact = await ContactsRepository.create({

            name, email, phone, category_id,
        });

        response.json(contact);

    }


    async update(request, response) {
        // Editar um registro

        const { id } = request.params;
        const { name, email, phone, category_id } = request.body;

        const contactExists = await ContactsRepository.findById(id);

        if (!contactExists) {
            return response.status(404).json({ error: 'User note found!' })
        }


        if (!name) {
            response.status(400).json({ error: 'Name is require!' })
        }

        const contactByEmail = await ContactsRepository.findByEmail(email);

        if (contactByEmail && contactByEmail.id !== id) {

            response.status(400).json({ error: 'This e-mail is already been user!' })
        }


        const contact = await ContactsRepository.update(id, {
            name, email, phone, category_id,
        });

        response.json(contact);


    }


    async delete(request, response) {
        // Deletar um registro

        const { id } = request.params;


        const contact = await ContactsRepository.findById(id);

        if (!contact) {

            return response.status(404).json({ error: 'User not found!' })
        }

        await ContactsRepository.delete(id);
        response.sendStatus(204);


    }


}

module.exports = new ContactController();

