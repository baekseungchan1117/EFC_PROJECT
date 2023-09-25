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


// 조회
exports.getAllPosts = (req, res) => {
    const SELECT_ALL_POSTS_QUERY = "SELECT * FROM posts";
    db.query(SELECT_ALL_POSTS_QUERY, (error, results) => {
        if (error) {
            return res.status(500).send({ message: "Error fetching posts", error });
        }
        res.status(200).send(results);
    });
};


exports.getPost = (req, res) => {
    const postId = req.params.id; 
    
    // 게시물 ID를 이용하여 해당 게시물을 데이터베이스에서 찾는 쿼리
    const FIND_POST_BY_ID_QUERY = "SELECT * FROM posts WHERE id = ?";

    db.query(FIND_POST_BY_ID_QUERY, [postId], (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send(results[0]);
    });
};


//업데이트
exports.updatePost = (req, res) => {
    const { id, title, content } = req.body;
    const UPDATE_POST_QUERY = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    db.query(UPDATE_POST_QUERY, [title, content, id], (error, results) => {
        if (error) {
            return res.status(500).send({ message: "Error updating post", error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send({ message: "Post updated successfully!" });
    });
};



//삭제
exports.deletePost = (req, res) => {
    const { id } = req.body;
    const DELETE_POST_QUERY = "DELETE FROM posts WHERE id = ?";
    db.query(DELETE_POST_QUERY, [id], (error, results) => {
        if (error) {
            return res.status(500).send({ message: "Error deleting post", error });
        }
        if (results.affectedRows === 0) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send({ message: "Post deleted successfully!" });
    });
};
