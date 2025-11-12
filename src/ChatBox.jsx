import React, { useState, useEffect } from 'react';
export default function ChatBox({ room }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    // Websocket or polling for live chat
    // Replace with backend connection to room
  }, [room]);
  const send = () => { setMessages([...messages, { user: 'me', text: msg }]); setMsg(''); };
  return (
    <div style={{border:"2px solid #334155",borderRadius:"12px",padding:"2rem",margin:"1rem"}}>
      <div style={{marginBottom:"1rem"}}><b>Chat Room:</b> {room}</div>
      <div style={{minHeight:"180px", maxHeight:"260px",overflowY:"auto",background:"#0f172a",color:"#fff",padding:"10px",borderRadius:"8px"}}>
        {messages.map((m, i) => <div key={i}><b>{m.user}:</b> {m.text}</div>)}
      </div>
      <input value={msg} onChange={e=>setMsg(e.target.value)} style={{width:"80%",padding:"8px",borderRadius:"8px"}} />
      <button onClick={send} style={{marginLeft:"10px",padding:"8px 18px",borderRadius:"8px",background:"#10b981",color:"#fff"}}>Send</button>
    </div>
  );
}
