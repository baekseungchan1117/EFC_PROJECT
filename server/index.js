const express = require('express');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const checkToken = require('./middleware/checkToken');
const cors = require('cors')
const app = express();
const PORT = 8000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello, World')
})

// 미들웨어로 토큰 검사 적용
app.use('/api', checkToken);

// CRUD 라우팅
app.use('/api', postRoutes);

// 인증 관련 라우팅
app.use('/auth', authRoutes); 


app.listen(PORT, ()=>{
    console.log(`서버 ${PORT} 접속 완료`);
})


// 보안을 강화할려면 특정 출처만 허용하도록 할 수 있다.
// app.use(cors({
//     origin: 'http://localhost:3000' // 리액트 앱의 주소만 허용
// }));
