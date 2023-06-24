import dotenv from 'dotenv';
import mail from '@sendgrid/mail';
import { paginate } from 'paginate-info';
import model from '../database/models';

const { Op } = require('sequelize');

dotenv.config();
mail.setApiKey(process.env.SENDGRID);

const { Bus } = model;
const { Users } = model;

function assign() {
  const assignDriver = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({
        where: { email: req.body.email },
      });
      const updated = await Bus.update({ userId: user.id },
        { where: { id: req.params.id } });
      if (updated) {
        const bus = await Bus.findOne({
          where: { id: req.params.id },
          include: [{
            model: Users,
            as: 'driver',
            attributes: ['id', 'firstname', 'email'],
          }],
        });
        const assignmentDriver = {
          to: email,
          from: 'mugema8@gmail.com',
          subject: 'Phantom assignment',
          text: `Dear ${user.dataValues.firstname}, you were assigned to drive bus with Plate No: ${bus.busPlate}`,
          html: `Dear ${user.dataValues.firstname}, you were assigned to drive bus with Plate No: ${bus.busPlate}`,
        };
        mail.send(assignmentDriver);
        return res.status(200).json({
          message: 'assign successfully',
          bus,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  const unassignDriver = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({
        where: { email: req.body.email },
      });
      const updated = await Bus.update({ userId: null },
        { where: { id: req.params.id } });
      if (updated) {
        const bus = await Bus.findOne({
          where: { id: req.params.id },
        });
        const unassignmentDriver = {
          to: email,
          from: 'mugema8@gmail.com',
          subject: 'Phantom unassignment',
          text: `Dear ${user.dataValues.firstname}, you were unassigned to drive bus with Plate No: ${bus.busPlate}`,
          html: `Dear ${user.dataValues.firstname}, you were unassigned to drive bus with Plate No: ${bus.busPlate}`,
        };
        mail.send(unassignmentDriver);
        return res.status(200).json({
          message: 'unassign successfully',
          bus,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: 'can not unassign' });
    }
  };

  const getAssignedBuses = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { rows, count } = await Bus.findAndCountAll({
        page,
        limit,
        offset,
        where: { userId: { [Op.ne]: null } },
        include: [{
          model: Users,
          as: 'driver',
          attributes: ['id', 'firstname', 'email'],
        }],
        order: [['id', 'asc']],
      });
      const pagination = paginate(page, count, rows, limit);
      if (offset >= count) {
        res.status(404).json({
          message: res.__('page not found'),
        });
      }
      return res.status(200).json({
        pagination,
        rows,
      });
    } catch (error) {
      res.status(500).json({
        message: res.__("can't get buses"),
      });
    }
  };
  return { assignDriver, unassignDriver, getAssignedBuses };
}

function crudBuses() {
  const createBus = async (req, res) => {
    try {
      const existingBus = await Bus.findOne({
        where: { busPlate: req.body.busPlate },
      });
      if (existingBus) {
        return res.status(400).json({
          status: 400,
          message: res.__('Bus already exists in the system.'),
        });
      }
      const bus = await Bus.create(req.body);
      return res.status(200).json({
        status: 200,
        message: res.__('Bus created successfully.'),
        Bus: bus,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  };

  const getAllBuses = async (req, res) => {
    try {
      const { query: { page = 1, limit = 10 } } = req;
      const offset = (page - 1) * limit;
      const { rows, count } = await Bus.findAndCountAll({
        page,
        limit,
        offset,
      });
      const pagination = paginate(page, count, rows, limit);

      if (offset >= count) {
        res.status(400).json({
          message: res.__('There are no buses registered in the system'),
        });
      }
      return res.status(200).json({
        pagination,
        rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message,
      });
    }
  };

  const getBusById = async (req, res) => {
    try {
      const { id } = req.params;
      const bus = await Bus.findOne({
        where: { id },
      });
      if (!bus) {
        return res.status(401).json({
          status: 401,
          message: res.__("The bus searched doesn't exist in the system"),
        });
      }
      return res.status(200).json({
        status: 200,
        message: res.__('Bus retrieved successfully'),
        bus,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  };

  const updateBus = async (req, res) => {
    try {
      const { id } = req.params;
      const [updateById] = await Bus.update(req.body, {
        where: { id },
      });
      if (!updateById) {
        return res.status(400).json({
          status: 400,
          message: res.__(
            'The bus you\'re searching for doesn\'t exist in the system',
          ),
        });
      }
      const updatedBus = await Bus.findOne({ where: { id } });
      return res.status(200).json({
        status: 200,
        message: res.__('Bus updated successfully'),
        bus: updatedBus,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  };

  const deleteBus = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteById = await Bus.destroy({
        where: { id },
      });
      if (deleteById) {
        return res.status(200).json({
          status: 200,
          message: res.__('Bus deleted successfully.'),
        });
      }
      return res.status(403).json({
        status: 403,
        message: res.__(
          "The bus you're trying to delete doesn't exist in the system",
        ),
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  };
  return {
    createBus, getAllBuses, getBusById, updateBus, deleteBus,
  };
}

const {
  createBus, getAllBuses, getBusById, updateBus, deleteBus,
} = crudBuses();

const { assignDriver, unassignDriver, getAssignedBuses } = assign();

const viewListOfBuses = async (req, res) => {
  try {
    const buses = await model.Buses.findAll({
      where: { routeId: req.route.routeID },
      order: [['busPlate', 'asc']],
    });
    return res.status(200).json({
      status: 200,
      buses,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus,
  assignDriver,
  unassignDriver,
  getAssignedBuses,
  viewListOfBuses,
};
