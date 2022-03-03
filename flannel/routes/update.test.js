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

const kobe = {
    username: 'kobe@g.ucla.edu',
    password: 'test',
    id: '621fdc779d2306ddf854c3c5',
    token: '',
}

const data = {
    username: 'kobe@g.ucla.edu',
    name: 'Kobe Brya',
    year: 'Sophmore',
    major: 'Computer Science',
    hometown: '',
    pronouns: '',
    bio: '',
    classes: ['cs180'],
    interests: ['Skating'],
    affiliations: ['upe'],
}

let sendData = JSON.stringify(data)

beforeAll(async () => {
    const now = new Date()
    const seconds = Math.round(now.getTime() / 1000) + 7200

    let payload = {
        exp: seconds,
        usr: kobe.username,
    }
    let private_key = process.env.SALT_HASH

    payload.usr = 'kobe@g.ucla.edu'
    let token = jwt.sign(payload, private_key, {})
    kobe.token = token
    console.log(kobe.token)
})

it('Testing to see if Jest works', (done) => {
    expect(1).toBe(1)
    done()
})

describe('test update user', () => {
    it('tests user update', function (done) {
        request(app)
            .post('/user/updateUserInfo')
            // .set('Content-type', 'application/json')
            .set('Authorization', `jwt=${kobe.token}`)
            .send({ sendData })
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err)
                return done()
            })
    })
})
