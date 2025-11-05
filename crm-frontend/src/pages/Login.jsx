
import React, {useState} from 'react';
import API from '../api';
export default function Login(){
  const [email,setEmail]=useState('admin@example.com');
  const [password,setPassword]=useState('admin123');
  async function submit(e){
    e.preventDefault();
    try{
      const res = await API.post('/auth/login',{email,password});
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    }catch(e){ alert(e.response?.data?.msg || e.message); }
  }
  return <div className='center'>
    <form className='card' onSubmit={submit}>
      <h2>CRM Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' />
      <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' />
      <button>Login</button>
    </form>
  </div>
}
