import React, { useState } from 'react';
import axios from "axios";


function Login() {
    const [formData, setFormData] = useState({
        userid: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // API 호출 및 로그인 로직
        
        axios.post('/auth/login', formData, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            console.log(response.data.user);
            // 예를 들어, localStorage나 sessionStorage에 저장할 수 있습니다.
            // 액세스 토큰 저장
            localStorage.setItem('accessToken', response.data.accessToken);

            // 사용자 기본 정보 저장
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // 로컬 정보 가져오기
            // const user = JSON.parse(localStorage.getItem('user'));
            // console.log(user.userid, user.nickname);

            // HTTP-only 쿠키에 액세스 토큰이 저장될 경우 JavaScript로 접근할 수 없으므로
            // 여기서 토큰을 로컬 스토리지에 저장할 필요가 없습니다.
            alert('로그인 성공');
            // 추가적인 로직 (예: 메인 페이지로 리다이렉트)
        })
        .catch(error => {
            console.error("There was an error!", error);
            alert('로그인 실패');
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userid" placeholder="User ID" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
