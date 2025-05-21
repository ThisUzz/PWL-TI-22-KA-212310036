const { Sequelize, sequelize, Users, Messengers } = require("../models");
const { Op } = require('sequelize');

exports.index = async (req, res) => {
  res.json({
    status: 200,
    message: "prefix for end-poin users",
  });
};

exports.createData = async (req, res) => {
  const payloadData = req.body;
  try {
    const results = await Messengers.create(payloadData);
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Error creating message",
      },
      errors: error.errors,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const results = await Messengers.findAll({
      include: [
        { model: Users, as: 'Sender' },
        { model: Users, as: 'Receiver' }
      ]
    });
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed retrive data",
      },
      errors: error.errors,
    });
  }
};

exports.getByID = async (req, res) => {
  const msg_id = req.params.id;
  try {
    const results = await Messengers.findByPk(msg_id);
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed retrive data",
      },
      errors: error.errors,
    });
  }
};

exports.getSelectedChat = async (req, res) => {
  const payloadData = req.body;
  try {
    const results = await Messengers.findAll({
      where: {
        [Op.or]: [
          { from_id: payloadData.from_id, to_user_id: payloadData.to_user_id },
          { from_id: payloadData.to_user_id, to_user_id: payloadData.from_id }
        ]
      },
      include: [
        {
          association: 'Sender',
          attributes: ['fullname'] // sesuaikan atribut yang ingin ditampilkan
        },
        {
          association: 'Receiver',
          attributes: ['fullname'] // sesuaikan atribut yang ingin ditampilkan
        }
      ],
      order: [['createdAt', 'DESC']] 
    });
    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed retrive data",
      },
      errors: error.errors,
    });
  }
};


exports.updatedData = async (req, res) => {
  const payloadData = req.body;

  try {
    const results = await Messengers.update(payloadData, {
      where: {
        id: payloadData.id,
      },
    });

    res.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed retrive data",
      },
      errors: error.errors,
    });
  }
};

exports.deleteData = async (req, res) => {
  const { id } = req.body;
  try {
    var message = "", statusCode = 0;
    const delete_user = await Messengers.destroy({ where: { id } });
    if (delete_user) {
      statusCode = 200;
      message = "Successfully removed";
    } else {
      statusCode = 509;
      message = "Failed remove";
    }
    res.json({
      status: statusCode,
      message: message,
    });
  } catch (error) {
    res.json({
      status: 502,
      message: {
        internal: error.message,
        user: "Failed remove data",
      },
      errors: error.errors,
    });
  }
};
