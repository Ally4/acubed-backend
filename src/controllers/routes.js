import models from '../database/models';

class routes {
  static async createRoutes(req, res) {
    try {
      const newRoute = await models.Routes.create(req.body);

      return res.status(201).json({
        newRoute,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  static async getRoutes(req, res) {
    try {
      const routes = await models.Routes.findAll();
      return res.status(200).json({ routes });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  static async getOneRoute(req, res) {
    try {
      const { id } = req.params;
      const route = await models.Routes.findOne({
        where: { id },
      });
      if (route) {
        return res.status(200).json({ route });
      }
      return res.status(401).json({ message: 'No Route with that Id' });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  static async updateRoute(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await models.Routes.update(req.body, { where: { id } });
      if (updated) {
        const updateRoute = await models.Routes.findOne({ where: { id } });
        return res.status(200).json({ route: updateRoute });
      }
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }

  static async deleteRoute(req, res) {
    try {
      const { id } = req.params;
      const deleted = await models.Routes.destroy({
        where: { id },
      });
      if (deleted) {
        return res.status(204).json({ message: 'Route deleted successfully' });
      }
      throw new Error('Route Not Found');
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}

export default routes;
