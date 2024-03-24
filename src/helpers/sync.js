"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// SYCHRONIZATION:

module.exports = async function() {

    //return null;

    /* REMOVE DATABASE */
    const { mongoose } = require('../configs/dbConnection')
    const faker = require('@faker-js/faker');

    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* REMOVE DATABASE */
    
    /* Department & Personnel */
    const Department = require('../models/departmentModel')
    const Personnel = require('../models/personnelModel')
    const departments = [
        "FullStack Department",
        "DevOps Department",
        "CyberSec Department",
    ]
    departments.forEach(value => {
        // Department.create:
        Department.create({ name: value }).then((department) => {
            console.log('- Department Added.')
            // Personnel.create:
            for (let i in [...Array(10)]) {
                Personnel.create({
                    departmentId: department._id,
                    username: "test" + (value[0] + i),
                    password: "1234",
                    firstName: faker.person.fullName(),
                    lastName: faker.name.lastName(),
                    phone: faker.phone.number,
                    email: "test" + (value[0] + i) + "@site.com",
                    title: faker.person.jobTitle,
                    salary: 2500,
                    description: "description",
                    isActive: true,
                    isAdmin: false,
                    isLead: false,
                    startedAt: "2023-10-15 13:14:15"
                })
            }
            console.log('- Personnels Added.')
        })
    })
    /* Department & Personnel */
}
