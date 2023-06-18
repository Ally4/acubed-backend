module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "NKUBITO Emmanuel",
          email: "emmanuelnkubito2@gmail.com",
          password:
            "$2b$12$89zO5H8EZ0diXju0ZMZXcejpBZMHtfwjC/2oEm9HQU8H99L1/CoWq",
          birthdate: "1998-10-23",
          gender: "male",
          role: "operator",
          isLoggedIn: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Admin",
          email: "admin@phantom.com",
          password:
            "$2b$12$89zO5H8EZ0diXju0ZMZXcejpBZMHtfwjC/2oEm9HQU8H99L1/CoWq",
          role: "admin",
          isLoggedIn: true,
          birthdate: "1981-11-08T00:00:00.000Z",
          gender: "male",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Niyiragira Gerard",
          email: "niyiragiragerard@gmail.com",
          password:
            "$2b$12$uWtrBIWu.QWEBahtvUPTiOvARAJHV.1f/Clijqsl.kr/QOr5mZTaG",
          role: "operator",
          isLoggedIn: true,
          birthdate: "1890-02-28T21:49:40.000Z",
          gender: "male",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Ncuti Xavier",
          email: "happyka52@gmail.com",
          password:
            "$2a$10$I5iHDBzgymJ7lNVFgOKr1ec65/OX/lqb66mZ5xsEJhhVcURYFmwYG",
          birthdate: "1998-10-23",
          gender: "female",
          role: "driver",
          isLoggedIn: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "Ncuti Xavier",
          email: "karigirwa@gmail.com",
          password:
            "$2a$10$I5iHDBzgymJ7lNVFgOKr1ec65/OX/lqb66mZ5xsEJhhVcURYFmwYG",
          birthdate: "1998-10-23",
          gender: "female",
          role: "driver",
          isLoggedIn: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
