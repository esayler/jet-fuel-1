const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp)

describe('Client Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => {
      database.seed.run()
    })
    done()
    // one migration : latest
    // seed
  })

  afterEach((done) => {
    database.seed.run()
    done()
    //  seed
  })


})