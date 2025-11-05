
import React, {useEffect,useState} from 'react';
import API from '../api';
export default function Tickets(){
  const [tickets,setTickets]=useState([]);
  const [title,setTitle]=useState('');
  const [desc,setDesc]=useState('');
  const [q,setQ]=useState('');
  useEffect(()=>{ load(); },[]);
  function load(){ API.get('/tickets',{params:{q}}).then(r=>setTickets(r.data)); }
  async function create(e){
    e.preventDefault();
    await API.post('/tickets',{title,description:desc});
    setTitle('');setDesc('');load();
  }
  async function update(id,changes){
    await API.put(`/tickets/${id}`, changes);
    load();
  }
  return <div className='container'>
    <header><h1>Tickets</h1><nav><a href='/'>Dashboard</a></nav></header>
    <section className='card'>
      <form onSubmit={create}>
        <input placeholder='title' value={title} onChange={e=>setTitle(e.target.value)} required />
        <textarea placeholder='description' value={desc} onChange={e=>setDesc(e.target.value)} required />
        <button>Create Ticket</button>
      </form>
      <hr />
      <div>
        <input placeholder='search' value={q} onChange={e=>setQ(e.target.value)} />
        <button onClick={load}>Search</button>
      </div>
      <ul className='list'>
        {tickets.map(t=> <li key={t._id}>
          <strong>{t.title}</strong> — {t.status} — requester: {t.requester?.name || 'n/a'}
          <div>{t.description}</div>
          <div className='actions'>
            <button onClick={()=>update(t._id,{status:'in_progress'})}>In Progress</button>
            <button onClick={()=>update(t._id,{status:'resolved'})}>Resolve</button>
          </div>
        </li>)}
      </ul>
    </section>
  </div>
}
