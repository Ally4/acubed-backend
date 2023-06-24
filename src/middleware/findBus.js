import Models from '../database/models';
import AssignBusesToRoutesResponses from '../utils/assignBusesToRoutes';

const { Buses } = Models;

const busToFind = async (req, res, next) => {
  const busToAssign = await Buses.findOne({
    where: { id: req.params.id },
  });

  if (!busToAssign) {
    return AssignBusesToRoutesResponses(res, 404, 'The bus you are looking for is not in the system');
  }
  next();
};

export default busToFind;
