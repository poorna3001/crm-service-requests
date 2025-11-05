
import React, {useEffect, useState} from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import { Chart as C, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
C.register(CategoryScale, LinearScale, BarElement);

export default function Dashboard(){
  const [stats,setStats]=useState({});
  useEffect(()=>{
    // simple stats from tickets list
    API.get('/tickets').then(r=>{
      const tickets = r.data;
      const counts = tickets.reduce((acc,t)=>{ acc[t.status]=(acc[t.status]||0)+1; return acc;}, {});
      setStats(counts);
    }).catch(()=>{});
  },[]);
  const data = { labels: Object.keys(stats), datasets: [{ label:'Tickets', data: Object.values(stats) }] };
  return <div className='container'>
    <header><h1>CRM Dashboard</h1><nav><Link to='/tickets'>Tickets</Link> | <a href='#' onClick={()=>{localStorage.removeItem('token');window.location.reload();}}>Logout</a></nav></header>
    <section className='card'>
      <h3>Quick Stats</h3>
      <Bar data={data} />
    </section>
  </div>
}
