const { app } = require('../../../app');
const request = require('supertest');
const assert = require('assert');
const client = require('../../../db');
let jwt = require('jsonwebtoken');

const userOne = {
    username: 'test1@g.ucla.edu',
    password: '1234',
    id: '6218001ccdb32898af64d0bd',
    token: '',
};

beforeAll((done) => {
    // wait 3 seconds to allow database to connect
    setTimeout(() => {
        const now = new Date();
        const seconds = Math.round(now.getTime() / 1000) + 7200;

        let payload = {
            exp: seconds,
            usr: userOne.username,
        };
        let private_key = process.env.SALT_HASH;

        let token = jwt.sign(payload, private_key, {});
        userOne.token = token;
        done();
    }, 3000);
});

describe('getAllLabels tests', () => {
    it('test that username is not required in request to fetch labels', (done) => {
        request(app)
            .get('/label/getLabels')
            .send()
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('test that username being included still returns all labels', (done) => {
        request(app)
            .get(`/label/getLabels?username=${userOne.username}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('test that on a valid request, a non-zero number of labels are returned', (done) => {
        request(app)
            .get(`/label/getLabels?username=${userOne.username}`)
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                assert(res.body.length > 0, 'Response body length should be greater than 0');
                assert(res.body[0].type !== undefined, 'Type should be defined in label');
                assert(
                    ['interests', 'affiliations', 'classes'].includes(res.body[0].type),
                    'Type in label should be one of the three pre-defined types'
                );
                assert(res.body[0].name !== undefined, 'Name should be defined in label');
                done();
            })
            .catch((err) => done(err));
    });
});

describe('getLabelsMatches tests', () => {
    it('test that valid interest lookup returns matching users', (done) => {
        const interestsString = JSON.stringify(['CS 31']);
        request(app)
            .get(`/label?username=${userOne.username}&labels=${interestsString}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                assert(
                    res.body.matches.length > 0,
                    'Response matches length should be greater than 0'
                );
                let foundCollin = false;
                for (let match of res.body.matches) {
                    if (match['username'] === 'cprince99@g.ucla.edu') {
                        foundCollin = true;
                    }
                }
                assert(foundCollin, 'Match that should be in database was not found');
                done();
            })
            .catch((err) => done(err));
    });

    it('validate that not including labels param returns no matches', (done) => {
        request(app)
            .get(`/label?username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                assert(res.body.matches === undefined, 'No matches should be returned');
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('validate that an empty labels param returns no matches', (done) => {
        request(app)
            .get(`/label?username=${userOne.username}&labels=[]`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) => {
                assert(res.body.matches === undefined, 'No matches should be returned');
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

const DUMMY_LABEL_NAME = 'ifSomeoneMakesALabelLikeThisWeAreAllInTrouble12345341949018321';

const deleteDummyLabel = async () => {
    let interests = await client.db('flannel').collection('interests');
    await interests.findOneAndDelete({ name: DUMMY_LABEL_NAME }, function (err, doc) {
        // console.log(doc);
    });
};

describe('createLabel tests', () => {
    // clear db of dummy label after each test
    afterEach(async () => {
        await deleteDummyLabel();
    });

    it('validate that create label endpoint adds label with type affiliations to db', async () => {
        const res = await request(app)
            .post(`/label/createLabel?username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send({
                interest: DUMMY_LABEL_NAME,
                type: 'affiliations',
            })
            .expect(200);
        assert(res.text === 'Interest created', "Text should equal 'Interest Created'");
    });

    it('validate that create label endpoint responds with message that label has already been created if label name present', async () => {
        // create label first time
        const res1 = await request(app)
            .post(`/label/createLabel?username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send({
                interest: DUMMY_LABEL_NAME,
                type: 'affiliations',
            })
            .expect(200);
        assert(res1.text === 'Interest created', "Text should equal 'Interest Created'");

        // create label second time
        const res2 = await request(app)
            .post(`/label/createLabel?username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send({
                interest: DUMMY_LABEL_NAME,
                type: 'affiliations',
            })
            .expect(200);
        assert(
            res2.text === 'Interest already exists',
            "Text should equal 'Interest already exists'"
        );
    });

    it("validate that malformed request with no 'interest' key in body returns 400 error", async () => {
        const res = await request(app)
            .post(`/label/createLabel?username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send({
                type: 'affiliations',
            })
            .expect(400);
        assert(
            res.text === 'interest parameter required',
            "Text response should be 'interest parameter required'"
        );
    });

    it("validate that malformed request with no 'type' key in body returns 400 error", async () => {
        const res = await request(app)
            .post(`/label/createLabel?username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send({
                interest: DUMMY_LABEL_NAME,
            })
            .expect(400);
        assert(
            res.text === 'type parameter required',
            "Text response should be 'type parameter required'"
        );
    });

    it("validate that malformed request with no 'type' or 'interest' key in body returns 400 error", async () => {
        await request(app)
            .post(`/label/createLabel?username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send()
            .expect(400);
    });

    it("validate that malformed request with a type that doesn't belong to valid type enum returns 400 error", async () => {
        const res = await request(app)
            .post(`/label/createLabel?username=${userOne.username}`)
            .set('Authorization', `jwt=${userOne.token}`)
            .send({
                interest: DUMMY_LABEL_NAME,
                type: 'notAValidType',
            })
            .expect(400);
        console.log(res.text);
        expect(res.text).toContain('type parameter must be one of the following:');
    });
});
