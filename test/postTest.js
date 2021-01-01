const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('POsts API', () => {

    /**
     * Test the GET route
     */
    describe("GET /api/posts/", () => {
        it("It should GET all the posts", (done) => {
            chai.request(server)
                .get("/api/posts/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });

        it("It should NOT GET all the posts", (done) => {
            chai.request(server)
                .get("/api/post")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

    });

    /**
  * Test the GET (by id) route
  */
    describe("GET /api/tasks/:id", () => {
        it("It should GET a posts by ID", (done) => {
            const postId = 1;
            chai.request(server)
                .get("/api/posts/" + postId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('title');
                    response.body.should.have.property('body');
                    response.body.should.have.property('id').eq(1);
                    done();
                });
        });

        it("It should NOT GET a posts by ID", (done) => {
            const postId = 123;
            chai.request(server)
                .get("/api/posts/" + postId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq('{"message":"Post not found!"}');
                    done();
                });
        });

    });

    /**
  * Test the POST route
  */
    describe("POST /api/posts", () => {
        it("It should POST a new posts", (done) => {
            const post = {
                title: "post  4",
                body: 'hello form test',
                userId: 1
            };
            chai.request(server)
                .post("/api/posts/")
                .send(post)
                .end((err, response) => {
                    response.should.have.status(401);
                    done();
                });
        });

    });

});