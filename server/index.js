const express = require('express');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = 8000;

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hello, World')
})

// CRUD 라우팅
app.use('/api', postRoutes);

// 인증 관련 라우팅
app.use('/auth', authRoutes); 


app.listen(PORT, ()=>{
    console.log(`서버 ${PORT} 접속 완료`);
})