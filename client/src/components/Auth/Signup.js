import React, { useState } from 'react';
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        name: '',
        nickname: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('/auth/signup', formData) // 백엔드의 회원가입 엔드포인트를 호출합니다.
            .then(response => {
                console.log(response.data); // 백엔드로부터의 응답을 출력합니다.
                alert('회원가입 성공');
                // 추가적인 로직 (예: 로그인 페이지로 리다이렉트)
            })
            .catch(error => {
                console.error("There was an error!", error);
                alert('회원가입 실패');
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userid" placeholder="User ID" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <input type="text" name="nickname" placeholder="Nickname" onChange={handleChange} />
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
