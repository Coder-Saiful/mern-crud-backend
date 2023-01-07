const {validateData, Contact} = require('../models/contact');
const _ = require('lodash');

module.exports.createData = async (req, res) => {
    try {
        const {error} = validateData(req.body);
        if (error) {
            error.details.forEach(err => {
                err[err.context.key] = err.message;
                delete err.context;
                delete err.type;
                delete err.message;
                delete err.path;
            });
    
            const [name, email, phone] = error.details;
            const Error = {...name, ...email, ...phone};

            return res.status(400).send(Error);
        } else {
            let user = await Contact.findOne({email: req.body.email});
            if (user) {
                return res.status(400).send({message: 'Data already exists!'});
            } else {
                const contactData = new Contact(_.pick(req.body, ["name", "email", "phone"]))
                const result = await contactData.save();
                return res.status(201).send({
                    message: "Data added successfully!",
                    data: result
                });
            }
        }
    } catch (error) {
        return res.status(400).send({message: "Data added failed!"});
    }
}

module.exports.getData = async (req, res) => {
    try {
        if (await Contact.count() > 0) {
            const data = await Contact.find();
            return res.status(200).send(data);
        } else {
            return res.status(200).send({message: "No data available!"}); 
        }
    } catch (error) {
        return res.status(400).send({message: "Failed to fetch data!"});
    }
}

module.exports.getSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Contact.findById(id);
        if (!data) return res.status(400).send({message: "Failed to fetch data details!"});
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({message: "Failed to fetch data details!"});
    }
}

module.exports.updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Contact.findByIdAndUpdate(id, _.pick(req.body, ["name", "email", "password"]));
        if (!data) return res.status(400).send({message: "Data updated failed!"});
        return res.status(200).send({message: "Data updated successfully!"});
    } catch (error) {
        return res.status(400).send({message: "Data updated failed!"});
    }
}

module.exports.deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Contact.findByIdAndDelete(id);
        if (!data) return res.status(400).send({message: "Data deleted failed!"});
        return res.status(200).send({message: "Data deleted successfully!"});
    } catch (error) {
        return res.status(400).send({message: "Data deleted failed!"});
    }
}