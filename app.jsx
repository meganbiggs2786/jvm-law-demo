const { useState, useRef, useEffect } = React;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
  body { background:#2A0E0E; }
  .sidebar { position:fixed; top:0; left:0; bottom:0; width:220px; background:linear-gradient(180deg, #7A2424 0%, #5C3A21 50%, #3D1F12 100%); display:flex; flex-direction:column; z-index:100; border-right:3px solid #C9962F; }
  .logo-area { background:linear-gradient(135deg,#7A2424 0%,#5C3A21 100%); border-bottom:2px solid #C9962F; text-align:center; padding:22px 16px; }
  .firm-name { font-family:'Playfair Display',serif; font-size:13px; color:#E3B65A; line-height:1.4; }
  .firm-loc { font-size:10px; color:#E8C9A3; letter-spacing:.1em; text-transform:uppercase; margin-top:3px; }
  .nav-sec { padding:12px 0; border-bottom:1px solid #5C3A21; }
  .nav-lbl { font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:#B89A78; padding:0 18px 6px; }
  .nav-item { display:flex; align-items:center; gap:10px; padding:9px 18px; font-size:12.5px; color:#D8C3A5; cursor:pointer; border-left:3px solid transparent; }
  .nav-item:hover { background:rgba(201,150,47,0.15); color:#E3B65A; }
  .nav-active { background:rgba(201,150,47,0.2); color:#E3B65A; border-left-color:#C9962F; }
  .main { margin-left:220px; min-height:100vh; background:#2A0E0E; }
  .topbar { background:linear-gradient(135deg,#7A2424 0%,#5C3A21 100%); border-bottom:2px solid #C9962F; padding:14px 24px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; }
  .page-title { font-family:'Playfair Display',serif; font-size:20px; color:#E3B65A; }
  .content { padding:22px 24px; }
  .grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:18px; }
  .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px; }
  .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
  .stat { background:linear-gradient(135deg,#4A1A1A 0%,#3D2210 100%); border:1px solid #C9962F; border-radius:6px; padding:16px; position:relative; overflow:hidden; }
  .stat::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#C9962F,#E3B65A); }
  .stat-n { font-family:'Playfair Display',serif; font-size:30px; color:#E3B65A; }
  .stat-l { font-size:10px; color:#B89A78; text-transform:uppercase; letter-spacing:.08em; margin-top:4px; }
  .stat-d { font-size:11px; margin-top:6px; }
  .up { color:#7BC47F; } .dn { color:#FF8A80; }
  .card { background:linear-gradient(135deg,#3D1A1A 0%,#2E1A0E 100%); border:1px solid #C9962F; border-radius:6px; padding:18px; margin-bottom:18px; }
  .card-title { font-family:'Playfair Display',serif; font-size:15px; color:#E3B65A; margin-bottom:12px; padding-bottom:10px; border-bottom:2px solid #C9962F; display:flex; justify-content:space-between; align-items:center; }
  .btn { display:inline-flex; align-items:center; gap:6px; padding:7px 13px; border-radius:5px; font-size:12px; font-weight:500; cursor:pointer; border:none; font-family:'Inter',sans-serif; }
  .btn-navy { background:#7A2424; color:#E3B65A; }
  .btn-gold { background:#C9962F; color:#2A0E0E; font-weight:600; }
  .btn-ghost { background:transparent; color:#E3B65A; border:1px solid #C9962F; }
  .pill { display:inline-block; padding:2px 8px; border-radius:99px; font-size:10px; font-weight:600; }
  .pill-active { background:rgba(123,196,127,0.2); color:#7BC47F; }
  .pill-review { background:rgba(201,150,47,0.2); color:#E3B65A; }
  .pill-urgent { background:rgba(255,138,128,0.2); color:#FF8A80; }
  .pill-closed { background:rgba(184,154,120,0.2); color:#B89A78; }
  .qa { display:flex; flex-direction:column; align-items:center; gap:6px; padding:14px; background:linear-gradient(135deg,#4A1A1A 0%,#3D2210 100%); border:1px solid #5C3A21; border-radius:6px; cursor:pointer; text-align:center; }
  .qa:hover { border-color:#C9962F; background:linear-gradient(135deg,#5C2020 0%,#4A2A10 100%); }
  .qa-icon { font-size:22px; }
  .qa-lbl { font-size:11px; color:#E3B65A; font-weight:500; }
  .dl-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #5C3A21; }
  .dl-item:last-child { border-bottom:none; }
  .dl-date { width:42px; text-align:center; background:linear-gradient(135deg,#7A2424,#5C3A21); border-radius:4px; padding:5px; flex-shrink:0; border:1px solid #C9962F; }
  .dl-mo { font-size:9px; color:#E3B65A; text-transform:uppercase; }
  .dl-day { font-size:18px; font-weight:700; color:#fff; font-family:'Playfair Display',serif; line-height:1; }
  .act-item { display:flex; gap:10px; padding:9px 0; border-bottom:1px solid #5C3A21; }
  .act-item:last-child { border-bottom:none; }
  .act-icon { width:28px; height:28px; border-radius:50%; background:rgba(201,150,47,0.15); display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
  .act-text { font-size:12px; line-height:1.5; color:#D8C3A5; }
  .act-time { font-size:10px; color:#B89A78; margin-top:2px; }
  table { width:100%; border-collapse:collapse; font-size:12.5px; }
  thead th { text-align:left; padding:8px 12px; background:rgba(201,150,47,0.1); font-size:10px; text-transform:uppercase; letter-spacing:.1em; color:#B89A78; border-bottom:2px solid #C9962F; }
  tbody td { padding:10px 12px; border-bottom:1px solid #5C3A21; color:#D8C3A5; }
  tbody tr:hover { background:rgba(201,150,47,0.08); }
  .ai-panel { background:linear-gradient(180deg,#4A1A1A 0%,#2E1A0E 100%); border-radius:6px; display:flex; flex-direction:column; height:420px; border:2px solid #C9962F; }
  .ai-hdr { padding:13px 16px; border-bottom:1px solid #5C3A21; display:flex; align-items:center; gap:10px; background:linear-gradient(135deg,#7A2424,#5C3A21); border-radius:6px 6px 0 0; }
  .ai-dot { width:8px; height:8px; border-radius:50%; background:#C9962F; animation:pulse 2s infinite; box-shadow:0 0 6px #C9962F; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .ai-title { font-size:13px; font-weight:600; color:#E3B65A; font-family:'Playfair Display',serif; }
  .ai-msgs { flex:1; overflow-y:auto; padding:14px 16px; display:flex; flex-direction:column; gap:10px; }
  .ai-msgs::-webkit-scrollbar { width:3px; }
  .ai-msgs::-webkit-scrollbar-thumb { background:#5C3A21; border-radius:2px; }
  .msg { display:flex; flex-direction:column; gap:3px; max-width:85%; }
  .msg-ai { align-self:flex-start; }
  .msg-user { align-self:flex-end; align-items:flex-end; }
  .bubble-ai { background:rgba(92,58,33,0.6); color:#E8D9C0; padding:8px 12px; border-radius:4px 12px 12px 12px; font-size:12.5px; line-height:1.55; border:1px solid #5C3A21; }
  .bubble-user { background:linear-gradient(135deg,#C9962F,#E3B65A); color:#2A0E0E; padding:8px 12px; border-radius:12px 4px 12px 12px; font-size:12.5px; font-weight:500; }
  .msg-time { font-size:9px; color:#8A7050; }
  .ai-input-row { padding:10px 16px; border-top:1px solid #5C3A21; display:flex; gap:8px; }
  .ai-input { flex:1; background:rgba(92,58,33,0.4); border:1px solid #5C3A21; border-radius:6px; padding:8px 11px; font-size:12.5px; color:#E8D9C0; outline:none; font-family:'Inter',sans-serif; }
  .ai-input::placeholder { color:#8A7050; }
  .ai-input:focus { border-color:#C9962F; }
  .ai-send { background:linear-gradient(135deg,#C9962F,#E3B65A); border:none; border-radius:6px; width:34px; height:34px; cursor:pointer; color:#2A0E0E; font-size:15px; display:flex; align-items:center; justify-content:center; font-weight:700; }
  .typing { display:flex; gap:3px; align-items:center; padding:4px 0; }
  .typing span { width:5px; height:5px; border-radius:50%; background:#C9962F; opacity:.6; animation:bounce 1.2s infinite; }
  .typing span:nth-child(2){animation-delay:.2s} .typing span:nth-child(3){animation-delay:.4s}
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
  .doc-opt { display:flex; align-items:center; gap:10px; padding:10px 12px; background:rgba(92,58,33,0.3); border-radius:5px; cursor:pointer; border:1px solid transparent; margin-bottom:8px; font-size:12.5px; color:#D8C3A5; }
  .doc-opt:hover { border-color:#C9962F; background:rgba(201,150,47,0.1); }
  .shimmer { background:linear-gradient(90deg,#5C3A21 25%,#7A4A2A 50%,#5C3A21 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:4px; height:14px; }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  input,select { font-family:'Inter',sans-serif; }
  .tag { display:inline-block; padding:2px 7px; background:rgba(201,150,47,0.15); border:1px solid #C9962F; border-radius:99px; font-size:10px; color:#E3B65A; }
  .sidebar-footer { margin-top:auto; padding:14px 18px; border-top:1px solid #5C3A21; }
  .avatar { width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg,#7A2424,#C9962F); display:flex; align-items:center; justify-content:center; font-size:11px; color:#2A0E0E; font-weight:700; }
  .intake-input { width:100%; padding:8px 10px; border:1px solid #5C3A21; border-radius:5px; font-size:12.5px; outline:none; background:rgba(92,58,33,0.3); color:#E8D9C0; }
  .intake-select { width:100%; padding:8px 10px; border:1px solid #5C3A21; border-radius:5px; font-size:12.5px; outline:none; background:#3D1A1A; color:#E8D9C0; }
  .search-input { padding:8px 12px; border:1px solid #5C3A21; border-radius:5px; font-size:13px; width:280px; margin-bottom:14px; outline:none; background:rgba(92,58,33,0.3); color:#E8D9C0; }
`;

const CASES = [
  {id:"JVM-2024-0091",client:"R. Hargrove Estate",type:"Probate",atty:"T. Johnson",status:"review",updated:"Jun 11"},
  {id:"JVM-2024-0087",client:`Landsberg Const. v. Price`,type:"Civil Litigation",atty:"M. Vorhees",status:"active",updated:"Jun 12"},
  {id:"JVM-2024-0083",client:"Chen Divorce Proceedings",type:"Family Law",atty:"A. Marticci",status:"active",updated:"Jun 12"},
  {id:"JVM-2024-0079",client:"City of Joplin Zoning",type:"Municipal",atty:"T. Johnson",status:"urgent",updated:"Jun 13"},
  {id:"JVM-2024-0071",client:"Webb Personal Injury",type:"PI / Tort",atty:"M. Vorhees",status:"active",updated:"Jun 10"},
  {id:"JVM-2024-0064",client:"Midwest Farms LLC",type:"Contract",atty:"A. Marticci",status:"closed",updated:"Jun 5"},
];

const DEADLINES = [
  {month:"JUN",day:"17",case:"City of Joplin Zoning",type:"Response Brief Due",atty:"T. Johnson"},
  {month:"JUN",day:"20",case:"Chen Divorce Proceedings",type:"Mediation Session",atty:"A. Marticci"},
  {month:"JUN",day:"24",case:"Webb Personal Injury",type:"Deposition — Dr. Ellis",atty:"M. Vorhees"},
  {month:"JUN",day:"28",case:"Landsberg v. Price",type:"Motion Hearing",atty:"M. Vorhees"},
  {month:"JUL",day:"3",case:"Hargrove Estate",type:"Probate Filing",atty:"T. Johnson"},
];

const ACTIVITY = [
  {icon:"📄",text:"AI drafted demand letter for Webb Personal Injury — ready for review",time:"12 min ago"},
  {icon:"⚠️",text:"Deadline alert: Joplin Zoning brief due in 4 days",time:"1 hr ago"},
  {icon:"👤",text:"New intake completed: Martinez Workers Comp (Marticci)",time:"2 hr ago"},
  {icon:"📧",text:"Client email from Chen family flagged for Marticci",time:"3 hr ago"},
  {icon:"✅",text:"Invoice #4482 sent to Midwest Farms LLC — $3,200 billed",time:"Yesterday"},
];

const AI_INIT = [{role:"ai",text:"Good morning. I'm JVM Counsel AI — here to help manage caseload, draft documents, and surface deadlines for Johnson, Vorhees & Marticci. What do you need?",time:"9:01 AM"}];

function getReply(input) {
  const l = input.toLowerCase();
  if(l.includes("draft")||l.includes("letter")||l.includes("motion")) return "I can draft that. Which case is this for? Once confirmed I'll prepare a first draft following Missouri court standards and flag Jasper County requirements.";
  if(l.includes("deadline")||l.includes("due")||l.includes("upcoming")) return "Most urgent: City of Joplin Zoning response brief — due June 17, 4 days out. T. Johnson assigned. Should I prepare a deadline summary email for the team?";
  if(l.includes("intake")||l.includes("new client")) return "To run a new intake I need: full client name, matter type, opposing party, and referring attorney. I'll run a conflict check across all 94 active and archived matters automatically.";
  if(l.includes("conflict")) return "Running conflict check across JVM's full matter database... Cross-referencing client names, opposing parties, related entities, and disclosed interests.";
  if(l.includes("invoice")||l.includes("billing")) return "I can generate a billing summary from logged time entries. Which matter and date range should I pull? I'll format it per your standard retainer agreement terms.";
  return "I can help with case research, document drafts, deadline tracking, client intake, conflict checks, and billing summaries. What would you like to tackle first?";
}

const now = () => new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

function Dashboard({setView}) {
  return (
    <div>
      <div className="grid4">
        {[["94","Active Matters","▲ 6 this month",true],["17","Upcoming Deadlines","▲ 3 this week",false],["$128K","Unbilled Time","▼ $14K from last mo.",true],["4.8","Client Sat. Score","▲ 0.2 pts",true]].map(([n,l,d,up],i)=>(
          <div key={i} className="stat">
            <div className="stat-n">{n}</div>
            <div className="stat-l">{l}</div>
            <div className={`stat-d ${up?"up":"dn"}`}>{d}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-title">Quick Actions</div>
        <div className="grid4">
          {[["📋","New Intake","intake"],["⚖️","Active Matters","cases"],["📝","Draft Document","ai"],["🔍","Conflict Check","ai"],["💰","Generate Invoice","billing"],["📅","View Deadlines","deadlines"],["📊","Reports","reports"],["🤖","Ask JVM AI","ai"]].map(([icon,label,v],i)=>(
            <div key={i} className="qa" onClick={()=>setView(v)}>
              <div className="qa-icon">{icon}</div>
              <div className="qa-lbl">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid2">
        <div className="card">
          <div className="card-title">Upcoming Deadlines <button className="btn btn-ghost" style={{fontSize:"11px",padding:"4px 10px"}} onClick={()=>setView("deadlines")}>See all</button></div>
          {DEADLINES.slice(0,4).map((d,i)=>(
            <div key={i} className="dl-item">
              <div className="dl-date"><div className="dl-mo">{d.month}</div><div className="dl-day">{d.day}</div></div>
              <div><div style={{fontSize:"12.5px",fontWeight:500,color:"#E3B65A"}}>{d.case}</div><div style={{fontSize:"11px",color:"#B89A78"}}>{d.type}</div><div style={{fontSize:"10px",color:"#C9962F",marginTop:"2px"}}>{d.atty}</div></div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Recent Activity</div>
          {ACTIVITY.map((a,i)=>(
            <div key={i} className="act-item">
              <div className="act-icon">{a.icon}</div>
              <div><div className="act-text">{a.text}</div><div className="act-time">{a.time}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Cases() {
  const [search,setSearch] = useState("");
  const filtered = CASES.filter(c=>c.client.toLowerCase().includes(search.toLowerCase())||c.type.toLowerCase().includes(search.toLowerCase())||c.atty.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="card">
      <div className="card-title">Active Matters <button className="btn btn-gold">+ New Matter</button></div>
      <input className="search-input" placeholder="Search client, type, attorney…" value={search} onChange={e=>setSearch(e.target.value)} />
      <table>
        <thead><tr><th>Matter ID</th><th>Client</th><th>Type</th><th>Attorney</th><th>Status</th><th>Updated</th></tr></thead>
        <tbody>
          {filtered.map((c,i)=>(
            <tr key={i}>
              <td style={{fontFamily:"monospace",fontSize:"11px",color:"#B89A78"}}>{c.id}</td>
              <td style={{fontWeight:500,color:"#E8D9C0"}}>{c.client}</td>
              <td><span className="tag">{c.type}</span></td>
              <td style={{color:"#C9962F",fontWeight:600}}>{c.atty}</td>
              <td><span className={`pill pill-${c.status}`}>{c.status.charAt(0).toUpperCase()+c.status.slice(1)}</span></td>
              <td style={{color:"#B89A78"}}>{c.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AIAssistant() {
  const [msgs,setMsgs] = useState(AI_INIT);
  const [input,setInput] = useState("");
  const [typing,setTyping] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"})},[msgs,typing]);
  const send = () => {
    if(!input.trim()) return;
    const u = {role:"user",text:input,time:now()};
    setMsgs(m=>[...m,u]); setInput(""); setTyping(true);
    setTimeout(()=>{setTyping(false);setMsgs(m=>[...m,{role:"ai",text:getReply(u.text),time:now()}]);},1400+Math.random()*600);
  };
  return (
    <div className="grid2">
      <div className="ai-panel">
        <div className="ai-hdr">
          <div className="ai-dot"></div>
          <div className="ai-title">JVM Counsel AI</div>
          <span style={{fontSize:"10px",color:"#B89A78",marginLeft:"auto"}}>Powered by Claude</span>
        </div>
        <div className="ai-msgs">
          {msgs.map((m,i)=>(
            <div key={i} className={`msg ${m.role==="ai"?"msg-ai":"msg-user"}`}>
              <div className={m.role==="ai"?"bubble-ai":"bubble-user"}>{m.text}</div>
              <div className="msg-time">{m.time}</div>
            </div>
          ))}
          {typing&&<div className="msg msg-ai"><div className="bubble-ai"><div className="typing"><span/><span/><span/></div></div></div>}
          <div ref={endRef}/>
        </div>
        <div className="ai-input-row">
          <input className="ai-input" placeholder="Ask about deadlines, draft a motion, conflict check…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} />
          <button className="ai-send" onClick={send}>➤</button>
        </div>
      </div>
      <div>
        <div className="card">
          <div className="card-title">Try These Prompts</div>
          {["Draft a demand letter for Webb Personal Injury","What deadlines are coming up this week?","Run a conflict check for new client Martinez","Generate a billing summary for June","Research Missouri statute of limitations"].map((p,i)=>(
            <div key={i} className="doc-opt" onClick={()=>setInput(p)}><span style={{color:"#C9962F",marginRight:"6px"}}>→</span>{p}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Deadlines() {
  return (
    <div className="card">
      <div className="card-title">All Upcoming Deadlines</div>
      {DEADLINES.map((d,i)=>(
        <div key={i} className="dl-item">
          <div className="dl-date"><div className="dl-mo">{d.month}</div><div className="dl-day">{d.day}</div></div>
          <div style={{flex:1}}>
            <div style={{fontSize:"12.5px",fontWeight:500,color:"#E3B65A"}}>{d.case}</div>
            <div style={{fontSize:"11px",color:"#B89A78"}}>{d.type}</div>
            <div style={{fontSize:"10px",color:"#C9962F",marginTop:"2px"}}>{d.atty}</div>
          </div>
          <div style={{display:"flex",gap:"6px"}}>
            <button className="btn btn-ghost" style={{fontSize:"11px",padding:"4px 10px"}}>Remind</button>
            <button className="btn btn-gold" style={{fontSize:"11px",padding:"4px 10px"}}>Prepare</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Billing() {
  return (
    <div>
      <div className="grid3">
        {[["$43,200","Billed — June","#7BC47F"],["$128,400","Outstanding","#E3B65A"],["$6,800","Overdue 90+ Days","#FF8A80"]].map(([n,l,c],i)=>(
          <div key={i} className="stat">
            <div className="stat-n" style={{color:c,fontSize:"26px"}}>{n}</div>
            <div className="stat-l">{l}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-title">Matter Billing Summary <button className="btn btn-gold" style={{fontSize:"11px"}}>Generate Invoice</button></div>
        <table>
          <thead><tr><th>Matter</th><th>Attorney</th><th>Hours</th><th>Rate</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {[["Webb Personal Injury","M. Vorhees","12.5","$285","$3,562","review"],["Chen Divorce","A. Marticci","8.0","$250","$2,000","active"],["Joplin Zoning","T. Johnson","6.5","$310","$2,015","review"],["Landsberg v. Price","M. Vorhees","21.0","$285","$5,985","review"],["Hargrove Estate","T. Johnson","9.0","$310","$2,790","urgent"]].map((r,i)=>(
              <tr key={i}>
                <td>{r[0]}</td>
                <td style={{color:"#C9962F",fontWeight:600}}>{r[1]}</td>
                <td>{r[2]}</td><td>{r[3]}</td>
                <td style={{fontWeight:600,color:"#E3B65A"}}>{r[4]}</td>
                <td><span className={`pill pill-${r[5]}`}>{r[5].charAt(0).toUpperCase()+r[5].slice(1)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Intake() {
  const [step,setStep] = useState(1);
  const [conflict,setConflict] = useState(null);
  return (
    <div className="grid2">
      <div className="card">
        <div className="card-title">New Client Intake</div>
        <div style={{display:"flex",gap:"6px",marginBottom:"18px"}}>
          {["Client Info","Matter Details","Conflict Check","Assignment"].map((s,i)=>(
            <div key={i} onClick={()=>setStep(i+1)} style={{flex:1,textAlign:"center",padding:"6px 4px",borderRadius:"4px",background:step===i+1?"linear-gradient(135deg,#7A2424,#C9962F)":("rgba(92,58,33,0.3)"),color:step===i+1?"#2A0E0E":"#B89A78",fontSize:"10px",fontWeight:step===i+1?700:400,cursor:"pointer"}}>{s}</div>
          ))}
        </div>
        {step===1&&<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {["Full Legal Name","Phone Number","Email Address","Mailing Address"].map((l,i)=>(
            <div key={i}>
              <label style={{fontSize:"11px",color:"#B89A78",display:"block",marginBottom:"3px"}}>{l}</label>
              <input className="intake-input" />
            </div>
          ))}
          <button className="btn btn-gold" onClick={()=>setStep(2)} style={{marginTop:"6px"}}>Next → Matter Details</button>
        </div>}
        {step===2&&<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {[["Matter Type",["Civil Litigation","Family Law","Probate","Criminal","Real Estate","Contract"]],["Opposing Party"],["Brief Description"]].map(([l,opts],i)=>(
            <div key={i}>
              <label style={{fontSize:"11px",color:"#B89A78",display:"block",marginBottom:"3px"}}>{l}</label>
              {opts?<select className="intake-select"><option>Select…</option>{opts.map(o=><option key={o}>{o}</option>)}</select>:<input className="intake-input" />}
            </div>
          ))}
          <div style={{display:"flex",gap:"8px",marginTop:"6px"}}>
            <button className="btn btn-ghost" onClick={()=>setStep(1)}>← Back</button>
            <button className="btn btn-gold" style={{flex:1}} onClick={()=>{setStep(3);setTimeout(()=>setConflict("clear"),1800);}}>Run Conflict Check →</button>
          </div>
        </div>}
        {step===3&&<div style={{textAlign:"center",padding:"28px 0"}}>
          {!conflict?<>
            <div style={{fontSize:"28px",marginBottom:"10px"}}>🔍</div>
            <div style={{fontSize:"14px",fontWeight:600,color:"#E3B65A",marginBottom:"6px"}}>Running Conflict Check</div>
            <div style={{fontSize:"12px",color:"#B89A78",marginBottom:"18px"}}>Searching 94 active + 412 archived matters…</div>
            <div className="shimmer" style={{width:"80%",margin:"0 auto 8px"}}/>
            <div className="shimmer" style={{width:"60%",margin:"0 auto"}}/>
          </>:<>
            <div style={{fontSize:"36px",marginBottom:"10px"}}>✅</div>
            <div style={{fontSize:"14px",fontWeight:600,color:"#7BC47F",marginBottom:"6px"}}>No Conflicts Found</div>
            <div style={{fontSize:"12px",color:"#B89A78",marginBottom:"18px"}}>Client and opposing party have no prior JVM matters.</div>
            <button className="btn btn-gold" onClick={()=>setStep(4)}>Assign Attorney →</button>
          </>}
        </div>}
        {step===4&&<div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          <div style={{padding:"12px",background:"rgba(123,196,127,0.15)",borderRadius:"6px",fontSize:"12.5px",color:"#7BC47F",marginBottom:"6px",border:"1px solid rgba(123,196,127,0.3)"}}>✅ Conflict check passed. Ready to assign and open matter.</div>
          {[["Assigned Attorney",["T. Johnson","M. Vorhees","A. Marticci"]],["Retainer Amount"]].map(([l,opts],i)=>(
            <div key={i}>
              <label style={{fontSize:"11px",color:"#B89A78",display:"block",marginBottom:"3px"}}>{l}</label>
              {opts?<select className="intake-select">{opts.map(o=><option key={o}>{o}</option>)}</select>:<input className="intake-input" />}
            </div>
          ))}
          <button className="btn btn-gold" style={{justifyContent:"center",marginTop:"6px"}}>Open Matter & Send Retainer Agreement</button>
        </div>}
      </div>
      <div className="card">
        <div className="card-title">AI Intake Notes</div>
        {[["Missouri SOL","Civil: 5yr · PI: 5yr · Contract: 5yr · Property: 10yr"],["Conflict Check","Runs against all clients, opposing parties & related entities"],["Retainer Policy","Min. $1,500 for new civil matters · Probate: flat-fee applies"],["Referral Protocol","Document referral source for bar compliance & marketing"]].map(([t,b],i)=>(
          <div key={i} style={{padding:"10px 0",borderBottom:i<3?"1px solid #5C3A21":"none"}}>
            <div style={{fontSize:"12px",fontWeight:600,color:"#E3B65A"}}>{t}</div>
            <div style={{fontSize:"11.5px",color:"#B89A78",marginTop:"2px"}}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NAV = [
  {section:"Overview",items:[{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"ai",icon:"🤖",label:"JVM Counsel AI"}]},
  {section:"Case Management",items:[{id:"cases",icon:"⚖️",label:"Active Matters"},{id:"deadlines",icon:"📅",label:"Deadlines"},{id:"intake",icon:"👤",label:"New Intake"}]},
  {section:"Tools",items:[{id:"billing",icon:"💰",label:"Billing"},{id:"reports",icon:"📈",label:"Reports"}]},
];

const TITLES = {dashboard:"Dashboard",ai:"JVM Counsel AI",cases:"Active Matters",deadlines:"Upcoming Deadlines",intake:"New Client Intake",billing:"Billing",reports:"Reports"};

function App() {
  const [view,setView] = useState("dashboard");
  return (
    <>
      <style>{styles}</style>
      <div style={{display:"flex",minHeight:"100vh"}}>
        <aside className="sidebar">
          <div className="logo-area">
            <div style={{fontSize:"38px",lineHeight:1,marginBottom:"10px",filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.5))"}}>⚖️</div>
            <div className="firm-name">Johnson, Vorhees<br/>& Marticci</div>
            <div className="firm-loc">Joplin, MO · Legal OS</div>
          </div>
          {NAV.map(sec=>(
            <div key={sec.section} className="nav-sec">
              <div className="nav-lbl">{sec.section}</div>
              {sec.items.map(item=>(
                <div key={item.id} className={`nav-item ${view===item.id?"nav-active":""}`} onClick={()=>setView(item.id)}>
                  <span>{item.icon}</span>{item.label}
                </div>
              ))}
            </div>
          ))}
          <div className="sidebar-footer">
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <div className="avatar">TJ</div>
              <div>
                <div style={{fontSize:"12px",color:"#E3B65A",fontWeight:500}}>T. Johnson</div>
                <div style={{fontSize:"10px",color:"#B89A78"}}>Managing Partner</div>
              </div>
            </div>
          </div>
        </aside>
        <main style={{marginLeft:"220px",flex:1}}>
          <div className="topbar">
            <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
              <span style={{fontSize:"22px"}}>⚖️</span>
              <div className="page-title">{TITLES[view]}</div>
            </div>
            <span style={{fontSize:"12px",color:"#E8C9A3",fontWeight:500}}>JVM Law · Joplin, MO</span>
          </div>
          <div className="content">
            {view==="dashboard"&&<Dashboard setView={setView}/>}
            {view==="cases"&&<Cases/>}
            {view==="ai"&&<AIAssistant/>}
            {view==="deadlines"&&<Deadlines/>}
            {view==="billing"&&<Billing/>}
            {view==="intake"&&<Intake/>}
            {view==="reports"&&
              <div className="card" style={{textAlign:"center",padding:"60px 0"}}>
                <div style={{fontSize:"32px",marginBottom:"12px"}}>📈</div>
                <div style={{fontSize:"14px",fontWeight:600,color:"#E3B65A",marginBottom:"6px"}}>Analytics Coming Soon</div>
                <div style={{fontSize:"12px",color:"#B89A78"}}>Matter volume, billing trends & client satisfaction reports.</div>
              </div>
            }
          </div>
        </main>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
