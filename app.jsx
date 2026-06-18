const { useState, useRef, useEffect } = React;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
  body { font-family: 'Inter', sans-serif; background: #F5F0E8; color: #1A1A2E; margin: 0; }
  * { box-sizing: border-box; }
  .sidebar { position:fixed; top:0; left:0; bottom:0; width:220px; background:#0E1C36; display:flex; flex-direction:column; z-index:100; }
  .logo-area { padding:24px 18px; border-bottom:1px solid #1E3A5F; }
  .firm-name { font-family:'Playfair Display',serif; font-size:13px; color:#D4AF6A; line-height:1.4; }
  .firm-loc { font-size:10px; color:#5A6E8A; letter-spacing:.1em; text-transform:uppercase; margin-top:3px; }
  .nav-sec { padding:12px 0; border-bottom:1px solid #1E3A5F; }
  .nav-lbl { font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:#5A6E8A; padding:0 18px 6px; }
  .nav-item { display:flex; align-items:center; gap:10px; padding:9px 18px; font-size:12.5px; color:#A0B4CC; cursor:pointer; border-left:3px solid transparent; }
  .nav-item:hover { background:#1E3A5F; color:#fff; }
  .nav-active { background:#162848; color:#D4AF6A; border-left-color:#B8963E; }
  .topbar { background:#fff; border-bottom:1px solid #EAE3D2; padding:14px 24px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; }
  .page-title { font-family:'Playfair Display',serif; font-size:20px; color:#0E1C36; }
  .content { padding:22px 24px; }
  .grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:18px; }
  .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px; }
  .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
  .stat { background:#fff; border:1px solid #EAE3D2; border-radius:6px; padding:16px; position:relative; overflow:hidden; }
  .stat::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:#B8963E; }
  .stat-n { font-family:'Playfair Display',serif; font-size:30px; color:#0E1C36; }
  .stat-l { font-size:10px; color:#6B7280; text-transform:uppercase; letter-spacing:.08em; margin-top:4px; }
  .stat-d { font-size:11px; margin-top:6px; }
  .up { color:#2D6A4F; } .dn { color:#7F1D1D; }
  .card { background:#fff; border:1px solid #EAE3D2; border-radius:6px; padding:18px; margin-bottom:18px; }
  .card-title { font-family:'Playfair Display',serif; font-size:15px; color:#0E1C36; margin-bottom:12px; padding-bottom:10px; border-bottom:1px solid #EAE3D2; display:flex; justify-content:space-between; }
  .btn { display:inline-flex; align-items:center; gap:6px; padding:7px 13px; border-radius:5px; font-size:12px; font-weight:500; cursor:pointer; border:none; font-family:'Inter',sans-serif; }
  .btn-navy { background:#0E1C36; color:#fff; }
  .btn-gold { background:#B8963E; color:#fff; }
  .btn-ghost { background:transparent; color:#0E1C36; border:1px solid #EAE3D2; }
  .pill { display:inline-block; padding:2px 8px; border-radius:99px; font-size:10px; font-weight:600; }
  .pill-active { background:#D1FAE5; color:#065F46; }
  .pill-review { background:#FEF3C7; color:#92400E; }
  .pill-urgent { background:#FEE2E2; color:#991B1B; }
  .pill-closed { background:#F3F4F6; color:#6B7280; }
  .qa { display:flex; flex-direction:column; align-items:center; gap:6px; padding:14px; background:#fff; border:1px solid #EAE3D2; border-radius:6px; cursor:pointer; text-align:center; }
  .qa:hover { border-color:#B8963E; background:#FFFBF3; }
  .qa-icon { font-size:22px; }
  .qa-lbl { font-size:11px; color:#0E1C36; font-weight:500; }
  .dl-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #EAE3D2; }
  .dl-item:last-child { border-bottom:none; }
  .dl-date { width:42px; text-align:center; background:#0E1C36; border-radius:4px; padding:5px; flex-shrink:0; }
  .dl-mo { font-size:9px; color:#D4AF6A; text-transform:uppercase; }
  .dl-day { font-size:18px; font-weight:700; color:#fff; font-family:'Playfair Display',serif; line-height:1; }
  .act-item { display:flex; gap:10px; padding:9px 0; border-bottom:1px solid #EAE3D2; }
  .act-item:last-child { border-bottom:none; }
  .act-icon { width:28px; height:28px; border-radius:50%; background:#F5F0E8; display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
  .act-text { font-size:12px; line-height:1.5; }
  .act-time { font-size:10px; color:#6B7280; margin-top:2px; }
  table { width:100%; border-collapse:collapse; font-size:12.5px; }
  thead th { text-align:left; padding:8px 12px; background:#F5F0E8; font-size:10px; text-transform:uppercase; letter-spacing:.1em; color:#6B7280; border-bottom:1px solid #EAE3D2; }
  tbody td { padding:10px 12px; border-bottom:1px solid #EAE3D2; }
  tbody tr:hover { background:#F5F0E8; }
  .ai-panel { background:#0E1C36; border-radius:6px; display:flex; flex-direction:column; height:420px; }
  .ai-hdr { padding:13px 16px; border-bottom:1px solid #1E3A5F; display:flex; align-items:center; gap:10px; }
  .ai-dot { width:8px; height:8px; border-radius:50%; background:#B8963E; animation:pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .ai-title { font-size:13px; font-weight:600; color:#D4AF6A; font-family:'Playfair Display',serif; }
  .ai-msgs { flex:1; overflow-y:auto; padding:14px 16px; display:flex; flex-direction:column; gap:10px; }
  .ai-msgs::-webkit-scrollbar { width:3px; }
  .ai-msgs::-webkit-scrollbar-thumb { background:#1E3A5F; border-radius:2px; }
  .msg { display:flex; flex-direction:column; gap:3px; max-width:85%; }
  .msg-ai { align-self:flex-start; }
  .msg-user { align-self:flex-end; align-items:flex-end; }
  .bubble-ai { background:#162848; color:#D0DEF0; padding:8px 12px; border-radius:4px 12px 12px 12px; font-size:12.5px; line-height:1.55; }
  .bubble-user { background:#B8963E; color:#0E1C36; padding:8px 12px; border-radius:12px 4px 12px 12px; font-size:12.5px; font-weight:500; }
  .msg-time { font-size:9px; color:#3D5070; }
  .ai-input-row { padding:10px 16px; border-top:1px solid #1E3A5F; display:flex; gap:8px; }
  .ai-input { flex:1; background:#162848; border:1px solid #1E3A5F; border-radius:6px; padding:8px 11px; font-size:12.5px; color:#fff; outline:none; font-family:'Inter',sans-serif; }
  .ai-input::placeholder { color:#3D5070; }
  .ai-input:focus { border-color:#B8963E; }
  .ai-send { background:#B8963E; border:none; border-radius:6px; width:34px; height:34px; cursor:pointer; color:#0E1C36; font-size:15px; display:flex; align-items:center; justify-content:center; }
  .doc-opt { display:flex; align-items:center; gap:10px; padding:10px 12px; background:#F5F0E8; border-radius:5px; cursor:pointer; border:1px solid transparent; margin-bottom:8px; font-size:12.5px; }
  .doc-opt:hover { border-color:#B8963E; background:#FFFBF3; }
  .tag { display:inline-block; padding:2px 7px; background:#F5F0E8; border:1px solid #EAE3D2; border-radius:99px; font-size:10px; color:#6B7280; }
  .sidebar-footer { margin-top:auto; padding:14px 18px; border-top:1px solid #1E3A5F; }
  .avatar { width:30px; height:30px; border-radius:50%; background:#1E3A5F; display:flex; align-items:center; justify-content:center; font-size:11px; color:#D4AF6A; font-weight:600; }
`;

const CASES = [
  {id:"JVM-2024-0091",client:"R. Hargrove Estate",type:"Probate",atty:"T. Johnson",status:"review",updated:"Jun 11"},
  {id:"JVM-2024-0087",client:"Landsberg Const. v. Price",type:"Civil Litigation",atty:"M. Vorhees",status:"active",updated:"Jun 12"},
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

const AI_INIT = [{role:"ai",text:"Good morning. I'm JVM Counsel AI — here to help manage caseload, draft documents, and surface deadlines for Johnson, Vorhees & Marticci. What do you need?",time:"now"}];

function getReply(input) {
  const l = input.toLowerCase();
  if(l.includes("draft")||l.includes("letter")||l.includes("motion")) return "I can draft that. Which case is this for? Once confirmed I'll prepare a first draft following Missouri court standards.";
  if(l.includes("deadline")||l.includes("due")||l.includes("upcoming")) return "Most urgent: City of Joplin Zoning response brief — due June 17, 4 days out. T. Johnson assigned. Should I prepare an outline?";
  if(l.includes("intake")||l.includes("new client")) return "To run a new intake I need: full client name, matter type, opposing party, and referring attorney. I'll run a conflict check.";
  if(l.includes("conflict")) return "Running conflict check across JVM's full matter database... No conflicts found.";
  if(l.includes("invoice")||l.includes("billing")) return "I can generate a billing summary from logged time entries. Which matter and date range?";
  return "I can help with case research, document drafts, deadline tracking, client intake, conflict checks, and billing summaries. What would you like to tackle first?";
}

const now = () => new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

function Dashboard({setView}) {
  const stats = [
    ["94","Active Matters","▲ 6 this month",true],
    ["17","Upcoming Deadlines","▲ 3 this week",false],
    ["$128K","Unbilled Time","▼ $14K from last mo.",true],
    ["4.8","Client Sat. Score","↑ Strong","false"]
  ];
  const actions = [
    ["📋","New Intake","intake"],
    ["⚖️","Active Matters","cases"],
    ["📝","Draft Document","docs"],
    ["🔍","Conflict Check","ai"],
    ["💰","Generate Invoice","billing"],
    ["📅","View Deadlines","deadlines"]
  ];
  return (
    <div>
      <div className="grid4">
        {stats.map(([n,l,d,up],i)=>(
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
          {actions.map(([icon,label,v],i)=>(
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
              <div><div style={{fontSize:"12.5px",fontWeight:500,color:"#0E1C36"}}>{d.case}</div><div style={{fontSize:"11px",color:"#6B7280"}}>{d.type}</div><div style={{fontSize:"10px",color:"#5A6E8A"}}>{d.atty}</div></div>
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
      <input placeholder="Search client, type, attorney…" value={search} onChange={e=>setSearch(e.target.value)} style={{padding:"8px 12px",border:"1px solid #EAE3D2",borderRadius:"5px",fontSize:"12.5px",width:"100%",marginBottom:"12px"}}/>
      <table>
        <thead><tr><th>Matter ID</th><th>Client</th><th>Type</th><th>Attorney</th><th>Status</th><th>Updated</th></tr></thead>
        <tbody>
          {filtered.map((c,i)=>(
            <tr key={i}>
              <td style={{fontFamily:"monospace",fontSize:"11px",color:"#6B7280"}}>{c.id}</td>
              <td style={{fontWeight:500}}>{c.client}</td>
              <td><span className="tag">{c.type}</span></td>
              <td style={{color:"#B8963E",fontWeight:500}}>{c.atty}</td>
              <td><span className={`pill pill-${c.status}`}>{c.status.charAt(0).toUpperCase()+c.status.slice(1)}</span></td>
              <td style={{color:"#6B7280"}}>{c.updated}</td>
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
  const prompts = ["Draft a demand letter for Webb Personal Injury","What deadlines are coming up this week?","Run a conflict check for new client Martinez","Generate a billing summary for June","Research case law on tort liability"];
  return (
    <div className="grid2">
      <div className="ai-panel">
        <div className="ai-hdr"><div className="ai-dot"></div><div className="ai-title">JVM Counsel AI</div><span style={{fontSize:"10px",color:"#5A6E8A",marginLeft:"auto"}}>Powered by Claude</span></div>
        <div className="ai-msgs">
          {msgs.map((m,i)=>(
            <div key={i} className={`msg ${m.role==="ai"?"msg-ai":"msg-user"}`}>
              <div className={m.role==="ai"?"bubble-ai":"bubble-user"}>{m.text}</div>
              <div className="msg-time">{m.time}</div>
            </div>
          ))}
          {typing&&<div className="msg msg-ai"><div className="bubble-ai"><div style={{display:"flex",gap:"3px"}}><span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#B8963E"}}></span><span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#B8963E"}}></span><span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#B8963E"}}></span></div></div></div>}
          <div ref={endRef}/>
        </div>
        <div className="ai-input-row">
          <input className="ai-input" placeholder="Ask about deadlines, draft a motion, conflict check…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
          <button className="ai-send" onClick={send}>➤</button>
        </div>
      </div>
      <div>
        <div className="card">
          <div className="card-title">Try These Prompts</div>
          {prompts.map((p,i)=>(
            <div key={i} className="doc-opt" onClick={()=>setInput(p)}><span style={{color:"#B8963E"}}>→</span> {p}</div>
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
          <div style={{flex:1}}><div style={{fontSize:"12.5px",fontWeight:500,color:"#0E1C36"}}>{d.case}</div><div style={{fontSize:"11px",color:"#6B7280"}}>{d.type}</div><div style={{fontSize:"10px",color:"#5A6E8A"}}>{d.atty}</div></div>
          <div style={{display:"flex",gap:"6px"}}><button className="btn btn-ghost" style={{fontSize:"11px",padding:"4px 10px"}}>Remind</button><button className="btn btn-navy" style={{fontSize:"11px",padding:"4px 10px"}}>Done</button></div>
        </div>
      ))}
    </div>
  );
}

function Billing() {
  const billingStats = [["$43,200","Billed — June","#1A6B3C"],["$128,400","Outstanding","#92400E"],["$6,800","Overdue 90+ Days","#7F1D1D"]];
  const billingRows = [["Webb Personal Injury","M. Vorhees","12.5","$285","$3,562","review"],["Chen Divorce","A. Marticci","8.0","$250","$2,000","active"],["Joplin Zoning","T. Johnson","6.5","$310","$2,015","active"]];
  return (
    <div>
      <div className="grid3">
        {billingStats.map(([n,l,c],i)=>(
          <div key={i} className="stat"><div className="stat-n" style={{color:c,fontSize:"26px"}}>{n}</div><div className="stat-l">{l}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-title">Matter Billing Summary <button className="btn btn-gold" style={{fontSize:"11px"}}>Generate Invoice</button></div>
        <table>
          <thead><tr><th>Matter</th><th>Attorney</th><th>Hours</th><th>Rate</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {billingRows.map((r,i)=>(
              <tr key={i}><td>{r[0]}</td><td style={{color:"#B8963E"}}>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td style={{fontWeight:600}}>{r[4]}</td><td><span className={`pill pill-${r[5]}`}>{r[5].charAt(0).toUpperCase()+r[5].slice(1)}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const NAV = [
  {section:"Overview",items:[{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"ai",icon:"🤖",label:"JVM Counsel AI"}]},
  {section:"Case Management",items:[{id:"cases",icon:"⚖️",label:"Active Matters"},{id:"deadlines",icon:"📅",label:"Deadlines"}]},
  {section:"Tools",items:[{id:"billing",icon:"💰",label:"Billing"}]},
];

const TITLES = {dashboard:"Dashboard",ai:"JVM Counsel AI",cases:"Active Matters",deadlines:"Upcoming Deadlines",billing:"Billing"};

function App() {
  const [view,setView] = useState("dashboard");
  return (
    <>
      <style>{styles}</style>
      <div style={{display:"flex",minHeight:"100vh"}}>
        <aside className="sidebar">
          <div className="logo-area">
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
              <div><div style={{fontSize:"12px",color:"#fff",fontWeight:500}}>T. Johnson</div><div style={{fontSize:"10px",color:"#5A6E8A"}}>Managing Partner</div></div>
            </div>
          </div>
        </aside>
        <main style={{marginLeft:"220px",flex:1}}>
          <div className="topbar">
            <div className="page-title">{TITLES[view]}</div>
            <span style={{fontSize:"12px",color:"#6B7280"}}>JVM Law · Joplin, MO</span>
          </div>
          <div className="content">
            {view==="dashboard"&&<Dashboard setView={setView}/>}
            {view==="cases"&&<Cases/>}
            {view==="ai"&&<AIAssistant/>}
            {view==="deadlines"&&<Deadlines/>}
            {view==="billing"&&<Billing/>}
          </div>
        </main>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
