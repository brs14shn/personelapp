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
                    username: faker.internet.userName(),
                    password: "1234",
                    firstName: faker.person.fullName(),
                    lastName: faker.person.lastName(),
                    phone: faker.phone.number,
                    email:faker.internet.email(),
                    title: faker.person.jobTitle,
                    salary: 2500,
                    description: "description",
                    isActive: true,
                    isAdmin: false,
                    isLead: false,
                    startedAt:faker.date.past()
                })
            }
            console.log('- Personnels Added.')
        })
    })
    /* Department & Personnel */
}
