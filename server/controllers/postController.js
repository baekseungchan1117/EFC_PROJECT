const db = require('../models/db');


// 생성
exports.createPost = (req, res) => {
    const { title, content } = req.body;
    const INSERT_POST_QUERY = "INSERT INTO posts (title, content) VALUES (?, ?)";
    db.query(INSERT_POST_QUERY, [title, content], (error, results) => {
        if (error) {
            return res.status(500).send({ message: "Error creating post", error });
        }
        res.status(201).send({ message: "Post created successfully!" });
    });
};
