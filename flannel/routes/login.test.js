const { app } = require('../app.js')
const request = require('supertest')
const makeReq = require('request')
const { idText } = require('typescript')
const { TestWatcher } = require('jest')
const client = require('../db.js')
const { waitForDebugger } = require('inspector')
let jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { response } = require('express')

const userOne = {
    username: 'test1@g.ucla.edu',
    password: '1234',
    id: '6218001ccdb32898af64d0bd',
    token: '',
}

const userTwo = {
    username: 'test2@g.ucla.edu',
    password: '1234',
    id: '62180055cdb32898af64d0be',
}

const userThree = {
    //we are going to delete this user every time and dummy log it in
    username: 'test3@g.ucla.edu',
    password: '1234',
    token: '',
}

const userFour = {
    //we are going to delete this user every time and dummy log it in
    username: 'henry@g.ucla.edu',
    password: '1234',
    id: '62058ecec54374bc9112fc2d',
    token: '',
}

function run() {
    let users = client.db('flannel').collection('users')
    users.findOneAndDelete({ username: userThree.username }, function (err, doc) {
        console.log(doc)
    })
}

beforeAll(async () => {
    const now = new Date()
    const seconds = Math.round(now.getTime() / 1000) + 7200

    let payload = {
        exp: seconds,
        usr: userOne.username,
    }
    let private_key = process.env.SALT_HASH

    let token = await jwt.sign(payload, private_key, {})
    userOne.token = token

    payload.usr = 'henry@g.ucla.edu'
    let token2 = jwt.sign(payload, private_key, {})
    userFour.token = token2

    payload.usr = 'test3@g.ucla.edu'
    let token3 = jwt.sign(payload, private_key, {})
    userThree.token = token3
})

it('Testing to see if Jest works', (done) => {
    expect(1).toBe(1)
    done()
})

describe('test user login / signup', () => {
    it('tests invalid username', function (done) {
        request(app)
            .post('/login')
            .send({ name: 'john' })
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err)
                return done()
            })
    })

    it('tests valid username', function (done) {
        request(app)
            .post('/login')
            .send({ username: 'test1@g.ucla.edu', password: '1234' })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                return done()
            })
    })

    it('tests valid username, invalid password', function (done) {
        request(app)
            .post('/login')
            .send({ username: 'henry@g.ucla.edu', password: '1234' })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                return done()
            })
    })

    it('tests trying to duplicate user', function (done) {
        request(app)
            .post('/login/register')
            .send({ username: userOne.username, password: userOne.password })
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err)
                return done()
            })
    })

    it('tests deleting user', function (done) {
        request(app)
            .post('/user/deleteUser?username=test3@g.ucla.edu')
            .send()
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                return done()
            })
    })

    it('tests creating a new user, then checks to make sure we cant create a user that exists', function (done) {
        request(app)
            .post('/login/register')
            .send({ username: userThree.username, password: userThree.password })
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err)
                return request(app)
                    .post('/login/register')
                    .send({ username: userThree.username, password: userThree.password })
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err)
                        return done()
                    })
            })
    })

    it('tests getting full user list', function (done) {
        request(app)
            .get(`/user?username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send()
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)

                expect(res.body).not.toBe({})
                return done()
            })
    })

    it('tests getting a user profile given ID', function (done) {
        request(app)
            .get(`/user/getUserProfile?ID=${userOne.id}&username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send()
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body._id).toBe('6218001ccdb32898af64d0bd')
                return done()
            })
    })
})

describe('test matching endpoints', () => {
    it('tests getting a users match list', function (done) {
        request(app)
            .get(`/user/getMatchesList?username=henry@g.ucla.edu`)
            .set('Authorization', `jwt=${userFour.token}`)
            .send()
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body.matches).toStrictEqual([
                    { username: 'chi@g.ucla.edu', id: '62081da1f5ec62b03a34eca0' },
                    { username: 'ishaan@g.ucla.edu', id: '6205904f308e7d7d8d84075f' },
                ])
                return done()
            })
    })

    it('tests setting a users match list', function (done) {
        request(app)
            .post(`/user/addUserToMatchList?username=test3@g.ucla.edu`)
            .set('Authorization', `jwt=${userThree.token}`)
            .send({ username: userFour.username, id: userFour.id })
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err)
                console.log(res.body.lastErrorObject.updatedExisting)
                expect(res.body.lastErrorObject.updatedExisting).toBe(true)
                return done()
            })
    })
})
