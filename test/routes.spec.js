const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

process.env.NODE_ENV = 'test';

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);
const server = require('../server/index');

chai.use(chaiHttp)

describe('Client Routes', () => {
  it('should return html on successful get', (done) => {
    chai.request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200)
      response.should.be.html
      done()
    })
  })

  it('should return 404 for a non existant get', (done) => {
    chai.request(server)
    .get('/error/err')
    .end((error, response) => {
      response.should.have.status(404)
      done()
    })
  })
})

describe('Api Routes', () => {
  beforeEach((done) => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run()
    })
    .then(() => {
      done()
    })

  })

  afterEach((done) => {
    database.migrate.rollback()
    .then(() => {
      done()
    })
  })

  describe('GET /api/v1/folders', () => {
    it('should return all folders', (done) => {
      chai.request(server)
      .get('/api/v1/folders')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.length.should.equal(2)
        response.body[0].should.have.property('id')
        response.body[0].id.should.equal(1)
        response.body[0].should.have.property('folder_name')
        response.body[0].folder_name.should.equal('NUFC')
        response.body[0].should.have.property('created_at')
        response.body[0].should.have.property('updated_at')
        done()
      })
    })

    it('should return an error on failed GET', (done) => {
      chai.request(server)
      .get('/api/v1/folder')
      .end((error, response) => {
        response.should.have.status(404)
        response.res.statusMessage.should.equal('Not Found')
        done()
      })
    })
  })

  describe('GET /api/v1/urls', () => {
    it('should return all urls', (done) => {
      chai.request(server)
      .get('/api/v1/urls')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.length.should.equal(4)
        response.body[0].should.have.property('id')
        response.body[0].id.should.equal(1)
        response.body[0].should.have.property('long_url')
        response.body[0].long_url.should.equal('www.nufc.com')
        response.body[0].should.have.property('created_at')
        response.body[0].created_at.should.equal('a few seconds ago')
        response.body[0].should.have.property('updated_at')
        response.body[0].updated_at.should.equal('a few seconds ago')
        done()
      })
    })

    it('should return an error on failed GET', (done) => {
      chai.request(server)
      .get('/api/v1/url')
      .end((error, response) => {
        response.should.have.status(404)
        response.res.statusMessage.should.equal('Not Found')
        done()
      })
    })
  })

  describe('GET /api/v1/folders/:id/urls', () => {
    it('should return the urls for a specific folder', (done) => {
      chai.request(server)
      .get('/api/v1/folders/2/urls')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.json
        response.body.length.should.equal(2)
        response.body[0].should.have.property('id')
        response.body[0].id.should.equal(3)
        response.body[0].should.have.property('long_url')
        response.body[0].long_url.should.equal('www.w3schools.com')
        response.body[0].should.have.property('created_at')
        response.body[0].created_at.should.equal('a few seconds ago')
        response.body[0].should.have.property('updated_at')
        response.body[0].updated_at.should.equal('a few seconds ago')
        done()
      })
    })

    it('should return an error on failed GET', (done) => {
      chai.request(server)
      .get('/api/v1/folders/2/url')
      .end((error, response) => {
        response.should.have.status(404)
        response.res.statusMessage.should.equal('Not Found')
        done()
      })
    })
  })

  describe('POST /api/v1/folders', () => {
    it('should create a new folder', (done) => {
      chai.request(server)
      .post('/api/v1/folders')
      .send({
        folder_name: 'Sport',
      })
      .end((err, response) => {
        response.should.have.status(201)
        response.body.should.be.a('object')
        response.body.should.have.property('id')
        response.body.id.should.equal(3)
        response.body.should.have.property('folder_name')
        response.body.folder_name.should.equal('Sport')
        chai.request(server)
        .get('/api/v1/folders')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(3)
          response.body[2].should.have.property('id')
          response.body[2].id.should.equal(3)
          response.body[2].should.have.property('folder_name')
          response.body[2].folder_name.should.equal('Sport')
          response.body[2].should.have.property('created_at')
          response.body[2].should.have.property('updated_at')
          done()
        })
      })
    })
  })

  it('should not create a folder with missing data', (done) => {
    chai.request(server)
    .post('/api/v1/folders')
    .send({ })
    .end((err, response) => {
      response.should.have.status(400)
      response.text.should.equal('Bad Request')
      done()
    })
  })

})

//POST /urls
//DELETE /urls/:id
//DELETE /folders/:id
//REDIRECT
