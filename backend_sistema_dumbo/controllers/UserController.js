const { request, response } = require('express');


const userGet = (req = request, res = response) => {

    const query = req.query;

    res.json({
        msg: 'GET API',
        query
    });
}

const userPost = (req, res = response) => {

    const body = req.body;

    res.json({
        msg: 'POST API',
        body: body
    });
}

const userPut = (req, res = response) => {

    const id = req.params.id;


    res.json({
        msg: 'PUT API',
        id
    });
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH API'
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API'
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
};

