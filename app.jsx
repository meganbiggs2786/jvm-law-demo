const { useState, useRef, useEffect } = React;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
  body { background:#F2E8D5; margin: 0; font-family: 'Inter', sans-serif; }
  * { box-sizing: border-box; }
  .sidebar { position:fixed; top:0; left:0; bottom:0; width:220px; background:#3D1F12; display:flex; flex-direction:column; z-index:100; border-right:3px solid #C9962F; }
  .logo-area { padding:24px 18px; border-bottom:1px solid #5C3A21; }
  .firm-name { font-family:'Playfair Display',serif; font-size:13px; color:#E3B65A; line-height:1.4; }
  .firm-loc { font-size:10px; color:#B89A78; letter-spacing:.1em; text-transform:uppercase; margin-top:3px; }
  .nav-sec { padding:12px 0; border-bottom:1px solid #5C3A21; }
  .nav-lbl { font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:#B89A78; padding:0 18px 6px; }
  .nav-item { display:flex; align-items:center; gap:10px; padding:9px 18px; font-size:12.5px; color:#D8C3A5; cursor:pointer; border-left:3px solid transparent; }
  .nav-item:hover { background:#5C3A21; color:#fff; }
  .nav-active { background:#4A2A16; color:#E3B65A; border-left-color:#C9962F; }
  .topbar { background:#fff; border-bottom:2px solid #C9962F; padding:14px 24px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; }
  .page-title { font-family:'Playfair Display',serif; font-size:20px; color:#3D1F12; }
  .content { padding:22px 24px; }
  .grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:18px; }
  .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px; }
  .grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:18px; }
  .stat { background:#fff; border:1px solid #E0CFAE; border-radius:6px; padding:16px; position:relative; overflow:hidden; }
  .stat::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:#C9962F; }
  .stat-n { font-family:'Playfair Display',serif; font-size:30px; color:#3D1F12; margin: 0; }
  .stat-l { font-size:10px; color:#7A6A55; text-transform:uppercase; letter-spacing:.08em; margin-top:4px; }
  .stat-d { font-size:11px; margin-top:6px; }
  .up { color:#5C7A3A; } .dn { color:#7A2424; }
  .card { background:#fff; border:1px solid #E0CFAE; border-radius:6px; padding:18px; margin-bottom:18px; }
  .card-title { font-family:'Playfair Display',serif; font-size:15px; color:#3D1F12; margin-bottom:12px; padding-bottom:10px; border-bottom:2px solid #C9962F; display:flex; justify-content:space-between; align-items:center; }
  .btn { display:inline-flex; align-items:center; gap:6px; padding:7px 13px; border-radius:5px; font-size:12px; font-weight:500; cursor:pointer; border:none; font-family:'Inter',sans-serif; }
  .btn-navy { background:#3D1F12; color:#fff; }
  .btn-gold { background:#C9962F; color:#3D1F12; font-weight:600; }
  .btn-ghost { background:transparent; color:#3D1F12; border:1px solid #E0CFAE; }
  .pill { display:inline-block; padding:2px 8px; border-radius:99px; font-size:10px; font-weight:600; }
  .pill-active { background:#E3EBD6; color:#3F5226; }
  .pill-review { background:#F7E3C0; color:#7A4E10; }
  .pill-urgent { background:#F3D8D8; color:#7A2424; }
  .pill-closed { background:#EAE2D3; color:#7A6A55; }
  .qa { display:flex; flex-direction:column; align-items:center; gap:6px; padding:14px; background:#fff; border:1px solid #E0CFAE; border-radius:6px; cursor:pointer; text-align:center; }
  .qa:hover { border-color:#C9962F; background:#FBF3E3; }
  .qa-icon { font-size:22px; }
  .qa-lbl { font-size:11px; color:#3D1F12; font-weight:500; }
  .dl-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #E0CFAE; }
  .dl-item:last-child { border-bottom:none; }
  .dl-date { width:42px; text-align:center; background:#3D1F12; border-radius:4px; padding:5px; flex-shrink:0; }
  .dl-mo { font-size:9px; color:#E3B65A; text-transform:uppercase; }
  .dl-day { font-size:18px; font-weight:700; color:#fff; font-family:'Playfair Display',serif; line-height:1; }
  .act-item { display:flex; gap:10px; padding:9px 0; border-bottom:1px solid #E0CFAE; }
  .act-item:last-child { border-bottom:none; }
  .act-icon { width:28px; height:28px; border-radius:50%; background:#F2E8D5; display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
  .act-text { font-size:12px; line-height:1.5; }
  .act-time { font-size:10px; color:#7A6A55; margin-top:2px; }
  table { width:100%; border-collapse:collapse; font-size:12.5px; }
  thead th { text-align:left; padding:8px 12px; background:#F2E8D5; font-size:10px; text-transform:uppercase; letter-spacing:.1em; color:#7A6A55; border-bottom:2px solid #C9962F; }
  tbody td { padding:10px 12px; border-bottom:1px solid #E0CFAE; }
  tbody tr:hover { background:#FBF3E3; }
  .ai-panel { background:#3D1F12; border-radius:6px; display:flex; flex-direction:column; height:420px; border:2px solid #C9962F; }
  .ai-hdr { padding:13px 16px; border-bottom:1px solid #5C3A21; display:flex; align-items:center; gap:10px; }
  .ai-dot { width:8px; height:8px; border-radius:50%; background:#C9962F; animation:pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .ai-title { font-size:13px; font-weight:600; color:#E3B65A; font-family:'Playfair Display',serif; }
  .ai-msgs { flex:1; overflow-y:auto; padding:14px 16px; display:flex; flex-direction:column; gap:10px; }
  .ai-msgs::-webkit-scrollbar { width:3px; }
  .ai-msgs::-webkit-scrollbar-thumb { background:#5C3A21; border-radius:2px; }
  .msg { display:flex; flex-direction:column; gap:3px; max-width:85%; }
  .msg-ai { align-self:flex-start; }
  .msg-user { align-self:flex-end; align-items:flex-end; }
  .bubble-ai { background:#4A2A16; color:#E8D9C0; padding:8px 12px; border-radius:4px 12px 12px 12px; font-size:12.5px; line-height:1.55; }
  .bubble-user { background:#C9962F; color:#3D1F12; padding:8px 12px; border-radius:12px 4px 12px 12px; font-size:12.5px; font-weight:500; }
  .msg-time { font-size:9px; color:#8A7050; }
  .ai-input-row { padding:10px 16px; border-top:1px solid #5C3A21; display:flex; gap:8px; }
  .ai-input { flex:1; background:#4A2A16; border:1px solid #5C3A21; border-radius:6px; padding:8px 11px; font-size:12.5px; color:#fff; outline:none; font-family:'Inter',sans-serif; }
  .ai-input::placeholder { color:#8A7050; }
  .ai-input:focus { border-color:#C9962F; }
  .ai-send { background:#C9962F; border:none; border-radius:6px; width:34px; height:34px; cursor:pointer; color:#3D1F12; font-size:15px; display:flex; align-items:center; justify-content:center; }
  .doc-opt { display:flex; align-items:center; gap:10px; padding:10px 12px; background:#F2E8D5; border-radius:5px; cursor:pointer; border:1px solid transparent; margin-bottom:8px; font-size:12.5px; }
  .doc-opt:hover { border-color:#C9962F; background:#FBF3E3; }
  .tag { display:inline-block; padding:2px 7px; background:#F2E8D5; border:1px solid #E0CFAE; border-radius:99px; font-size:10px; color:#7A6A55; }
  .sidebar-footer { margin-top:auto; padding:14px 18px; border-top:1px solid #5C3A21; }
  .avatar { width:30px; height:30px; border-radius:50%; background:#5C3A21; display:flex; align-items:center; justify-content:center; font-size:11px; color:#E3B65A; font-weight:600; }
  input, select { font-family: 'Inter', sans-serif; }
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

const AI_INIT = [{role:"ai",text:"Good morning! I'm JVM Counsel AI. How can I help you today?",time:"9:01 AM"}];

function getReply(input) {
  const l = input.toLowerCase();
  if(l.includes("draft")||l.includes("letter")||l.includes("motion")) return "I can draft that. Which case?"
  if(l.includes("deadline")||l.includes("due")||l.includes("upcoming")) return "Most urgent: City of Joplin Zoning response brief — due June 17, 4 days out."
  if(l.includes("intake")||l.includes("new client")) return "To run a new intake I need: full client name, matter type, opposing party, and referring attorney."
  if(l.includes("conflict")) return "Running conflict check across JVM's full matter database..."
  return "I can help with case research, document drafts, deadline tracking, and more. What would you like to tackle?"
}

const now = () => new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

function Dashboard({setView}) {
  return React.createElement(
    "div", null,
    React.createElement("div", {className: "grid4"},
      React.createElement("div", {className: "stat"}, 
        React.createElement("div", {className: "stat-n"}, "94"), 
        React.createElement("div", {className: "stat-l"}, "Active Matters")
      ),
      React.createElement("div", {className: "stat"}, 
        React.createElement("div", {className: "stat-n"}, "17"), 
        React.createElement("div", {className: "stat-l"}, "Upcoming Deadlines")
      ),
      React.createElement("div", {className: "stat"}, 
        React.createElement("div", {className: "stat-n"}, "$128K"), 
        React.createElement("div", {className: "stat-l"}, "Unbilled Time")
      ),
      React.createElement("div", {className: "stat"}, 
        React.createElement("div", {className: "stat-n"}, "4.8"), 
        React.createElement("div", {className: "stat-l"}, "Client Sat. Score")
      )
    ),
    React.createElement("div", {className: "card"},
      React.createElement("div", {className: "card-title"}, "Quick Actions"),
      React.createElement("div", {className: "grid4"},
        React.createElement("div", {className: "qa", onClick: () => setView("cases")}, React.createElement("div", {className: "qa-icon"}, "⚖️"), React.createElement("div", {className: "qa-lbl"}, "Active Matters")),
        React.createElement("div", {className: "qa", onClick: () => setView("deadlines")}, React.createElement("div", {className: "qa-icon"}, "📅"), React.createElement("div", {className: "qa-lbl"}, "Deadlines")),
        React.createElement("div", {className: "qa", onClick: () => setView("billing")}, React.createElement("div", {className: "qa-icon"}, "💰"), React.createElement("div", {className: "qa-lbl"}, "Billing")),
        React.createElement("div", {className: "qa", onClick: () => setView("ai")}, React.createElement("div", {className: "qa-icon"}, "🤖"), React.createElement("div", {className: "qa-lbl"}, "Ask AI"))
      )
    ),
    React.createElement("div", {className: "grid2"},
      React.createElement("div", {className: "card"},
        React.createElement("div", {className: "card-title"}, "Upcoming Deadlines"),
        DEADLINES.slice(0,3).map((d,i) => React.createElement("div", {key: i, className: "dl-item"},
          React.createElement("div", {className: "dl-date"}, React.createElement("div", {className: "dl-mo"}, d.month), React.createElement("div", {className: "dl-day"}, d.day)),
          React.createElement("div", null, React.createElement("div", {style: {fontSize: "12.5px", fontWeight: 500, color: "#3D1F12"}}, d.case), React.createElement("div", {style: {fontSize: "11px", color: "#7A6A55"}}, d.type))
        ))
      ),
      React.createElement("div", {className: "card"},
        React.createElement("div", {className: "card-title"}, "Recent Activity"),
        ACTIVITY.slice(0,3).map((a,i) => React.createElement("div", {key: i, className: "act-item"},
          React.createElement("div", {className: "act-icon"}, a.icon),
          React.createElement("div", null, React.createElement("div", {className: "act-text"}, a.text), React.createElement("div", {className: "act-time"}, a.time))
        ))
      )
    )
  )
}

function Cases() {
  const [search, setSearch] = useState("");
  const filtered = CASES.filter(c => c.client.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase()));
  return React.createElement("div", {className: "card"},
    React.createElement("div", {className: "card-title"}, "Active Matters"),
    React.createElement("input", {placeholder: "Search cases...", value: search, onChange: e => setSearch(e.target.value), style: {padding: "8px", marginBottom: "12px", width: "100%", border: "1px solid #E0CFAE", borderRadius: "5px"}}),
    React.createElement("table", null,
      React.createElement("thead", null, React.createElement("tr", null,
        React.createElement("th", null, "ID"),
        React.createElement("th", null, "Client"),
        React.createElement("th", null, "Type"),
        React.createElement("th", null, "Attorney"),
        React.createElement("th", null, "Status")
      )),
      React.createElement("tbody", null,
        filtered.map((c,i) => React.createElement("tr", {key: i},
          React.createElement("td", {style: {fontSize: "11px", color: "#7A6A55"}}, c.id),
          React.createElement("td", null, c.client),
          React.createElement("td", null, React.createElement("span", {className: "tag"}, c.type)),
          React.createElement("td", {style: {color: "#C9962F", fontWeight: 600}}, c.atty),
          React.createElement("td", null, React.createElement("span", {className: `pill pill-${c.status}`}, c.status))
        ))
      )
    )
  );
}

function AIAssistant() {
  const [msgs, setMsgs] = useState(AI_INIT);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  const send = () => {
    if(!input.trim()) return;
    setMsgs(m => [...m, {role:"user", text:input, time:now()}]);
    setInput("");
    setTimeout(() => setMsgs(m => [...m, {role:"ai", text:getReply(input), time:now()}]), 800);
  };
  return React.createElement("div", {className: "grid2"},
    React.createElement("div", {className: "ai-panel"},
      React.createElement("div", {className: "ai-hdr"}, React.createElement("div", {className: "ai-dot"}), React.createElement("div", {className: "ai-title"}, "JVM Counsel AI")),
      React.createElement("div", {className: "ai-msgs"},
        msgs.map((m,i) => React.createElement("div", {key: i, className: `msg ${m.role==="ai"?"msg-ai":"msg-user"}`},
          React.createElement("div", {className: m.role==="ai"?"bubble-ai":"bubble-user"}, m.text),
          React.createElement("div", {className: "msg-time"}, m.time)
        )),
        React.createElement("div", {ref: endRef})
      ),
      React.createElement("div", {className: "ai-input-row"},
        React.createElement("input", {className: "ai-input", placeholder: "Ask a question...", value: input, onChange: e => setInput(e.target.value), onKeyDown: e => e.key==="Enter" && send()}),
        React.createElement("button", {className: "ai-send", onClick: send}, "➤")
      )
    ),
    React.createElement("div", {className: "card"},
      React.createElement("div", {className: "card-title"}, "Sample Prompts"),
      ["Draft a letter", "Show deadlines", "New client intake", "Run conflict check"].map((p,i) => React.createElement("div", {key: i, className: "doc-opt", onClick: () => setInput(p)}, "→ ", p))
    )
  );
}

function Deadlines() {
  return React.createElement("div", {className: "card"},
    React.createElement("div", {className: "card-title"}, "All Deadlines"),
    DEADLINES.map((d,i) => React.createElement("div", {key: i, className: "dl-item"},
      React.createElement("div", {className: "dl-date"}, React.createElement("div", {className: "dl-mo"}, d.month), React.createElement("div", {className: "dl-day"}, d.day)),
      React.createElement("div", {style: {flex: 1}}, React.createElement("div", {style: {fontSize: "12.5px", fontWeight: 500, color: "#3D1F12"}}, d.case), React.createElement("div", {style: {fontSize: "11px", color: "#7A6A55"}}, d.type)),
      React.createElement("div", {style: {fontSize: "10px", color: "#C9962F"}}, d.atty)
    ))
  );
}

function Billing() {
  return React.createElement("div", {className: "card"},
    React.createElement("div", {className: "card-title"}, "Billing Summary"),
    React.createElement("table", null,
      React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Matter"), React.createElement("th", null, "Hours"), React.createElement("th", null, "Amount"))),
      React.createElement("tbody", null,
        [["Webb Personal Injury", "12.5", "$3,562"], ["Chen Divorce", "8.0", "$2,000"], ["Joplin Zoning", "6.5", "$2,015"]].map((r,i) => React.createElement("tr", {key: i}, React.createElement("td", null, r[0]), React.createElement("td", null, r[1]), React.createElement("td", {style: {fontWeight: 600}}, r[2])))
      )
    )
  );
}

const NAV = [
  {section:"Overview",items:[{id:"dashboard",icon:"📊",label:"Dashboard"},{id:"ai",icon:"🤖",label:"JVM Counsel AI"}]},
  {section:"Case Management",items:[{id:"cases",icon:"⚖️",label:"Active Matters"},{id:"deadlines",icon:"📅",label:"Deadlines"}]},
  {section:"Tools",items:[{id:"billing",icon:"💰",label:"Billing"}]},
];

const TITLES = {dashboard:"Dashboard",ai:"JVM Counsel AI",cases:"Active Matters",deadlines:"Deadlines",billing:"Billing"};

function App() {
  const [view, setView] = useState("dashboard");
  let content;
  if(view==="cases") content = React.createElement(Cases);
  else if(view==="ai") content = React.createElement(AIAssistant);
  else if(view==="deadlines") content = React.createElement(Deadlines);
  else if(view==="billing") content = React.createElement(Billing);
  else content = React.createElement(Dashboard, {setView});
  return React.createElement(React.Fragment, null,
    React.createElement("style", null, styles),
    React.createElement("div", {style: {display: "flex", minHeight: "100vh"}},
      React.createElement("aside", {className: "sidebar"},
        React.createElement("div", {className: "logo-area"},
          React.createElement("div", {className: "firm-name"}, "Johnson, Vorhees", React.createElement("br"), "& Marticci"),
          React.createElement("div", {className: "firm-loc"}, "Joplin, MO · Legal OS")
        ),
        NAV.map(sec => React.createElement("div", {key: sec.section, className: "nav-sec"},
          React.createElement("div", {className: "nav-lbl"}, sec.section),
          sec.items.map(item => React.createElement("div", {key: item.id, className: view===item.id ? "nav-item nav-active" : "nav-item", onClick: () => setView(item.id)},
            React.createElement("span", null, item.icon), item.label
          ))
        )),
        React.createElement("div", {className: "sidebar-footer"},
          React.createElement("div", {style: {display: "flex", alignItems: "center", gap: "10px"}},
            React.createElement("div", {className: "avatar"}, "TJ"),
            React.createElement("div", null,
              React.createElement("div", {style: {fontSize: "12px", color: "#fff", fontWeight: 500}}, "T. Johnson"),
              React.createElement("div", {style: {fontSize: "10px", color: "#B89A78"}}, "Managing Partner")
            )
          )
        )
      ),
      React.createElement("main", {style: {marginLeft: "220px", flex: 1}},
        React.createElement("div", {className: "topbar"},
          React.createElement("div", {className: "page-title"}, TITLES[view] || "JVM Law"),
          React.createElement("span", {style: {fontSize: "12px", color: "#7A6A55"}}, "JVM Law · Joplin, MO")
        ),
        React.createElement("div", {className: "content"}, content)
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
