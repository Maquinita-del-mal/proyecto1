import { Message, Property } from "../models/index.js";

const returnError = (msg, res) => {
    return res.status(500).json({
        msg,
    });
};


const getMessageById = async (req, res) => {
  try {
    const { id } = req.params
    const message = await Message.find();
    const property = await Property.findById(id);
    property.messages.push(message)
    return res.json ({
      msg: 'Mensajes obtenidos del Inmueble',
      property,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar los mensajes',
      error,
    });
  }
};

const create = async (req, res) => {
    try {
        const newMessage = await Message.create(req.body);
        const property = await Property.findById(req.params.id)
        property.messages.push(newMessage.id);
        await property.save();
          return res.json({
            msg: 'mensaje creado',
            mensaje: newMessage,
        })
    } catch (error) {
        return returnError('Error creating message', res);
    }
}

export { create, getMessageById }
