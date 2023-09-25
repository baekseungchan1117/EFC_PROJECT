const db = require('../models/db');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const INSERT_USER_QUERY = `
            INSERT INTO users (userid, password, name, nickname)
            VALUES (?, ?, ?, ?)
        `;

        // 파라미터화된 쿼리 사용
        db.query(INSERT_USER_QUERY, [req.body.userid, hashedPassword, req.body.name, req.body.nickname], (error, results) => {
            if (error) {
                return res.status(400).send({ error });
            }
            res.status(201).send({ message: 'User registered successfully' });
        });
    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.login = (req, res) => {
    const { userid, password } = req.body;

    // 유저를 데이터베이스에서 찾기
    const FIND_USER_QUERY = `SELECT * FROM users WHERE userid = ?`;

    // 콜백 함수의 매개변수 수정
    db.query(FIND_USER_QUERY, [userid], async (error, results) => {
        if (error) {
            return res.status(500).send({ message: 'Server error' });
        }
        // 사용자가 없거나 비밀번호가 틀린 경우
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send({ message: 'Userid or Password is incorrect' });
        }
        
        // JWT 토큰 생성
        const accessToken = jwt.sign({ id: results[0].id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: results[0].id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // HTTP-only 쿠키에 토큰 저장
        res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/token', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(200).send({
            message: 'Logged in successfully',
            accessToken
            // refreshToken ; refreshToken // 로컬 스토리지나 세션에 저장 경우 사용
        });
    });
};

exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).send({ message: 'Refresh token not found.' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(403).send({ message: 'Invalid refresh token.' });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200).send({ accessToken });
    });
};
