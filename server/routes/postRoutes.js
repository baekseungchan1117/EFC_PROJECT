const express = require('express');
const {     createPost, 
    getAllPosts, 
    updatePost, 
    deletePost,
    getPost  } = require('../controllers/postController');


const router = express.Router();

router.post('/posts', createPost);     // 생성
router.get('/posts', getAllPosts);     // 전체 조회
router.get('/posts/:id', getPost);     // 특정 게시물 조회 (추가)
router.put('/posts/:id', updatePost);  // 업데이트
router.delete('/posts/:id', deletePost); // 삭제


module.exports = router;