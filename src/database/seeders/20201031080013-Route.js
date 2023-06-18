module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Routes',
    [
      {
        routeID: 305,
        name: 'Kimironko - Nyabugogo',
        origin: 'Kimironko',
        destination: 'Nyabugogo',
        price: 354,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface) => queryInterface.bulkDelete('Routes', null, {}),
};
