module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Routes',
    [
      {
        routeID: '4',
        origin: 'down-town',
        price: '567',
        destination: 'Kabeza',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        routeID: '2',
        origin: 'down-town',
        price: '567',
        destination: 'Kabeza',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        routeID: '3',
        origin: 'down-town',
        price: '567',
        destination: 'Kabeza',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        routeID: '5',
        origin: 'down-town',
        price: '567',
        destination: 'Kabeza',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Routes', null, {}),
};
