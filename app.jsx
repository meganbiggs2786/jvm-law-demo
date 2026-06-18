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
  .card { background:#fff; border:1px solid #EAE3D2; border-radius:6px; padding:18px; margin-bottom:18px; }
  .card-title { font-family:'Playfair Display',serif; font-size:15px; color:#0E1C36; margin-bottom:12px; }
  .btn { display:inline-block; padding:8px 12px; background:#B8963E; color:#fff; border:none; border-radius:5px; cursor:pointer; font-size:12px; }
  .btn-ghost { background:#F5F0E8; color:#0E1C36; border:1px solid #EAE3D2; }
  .stat { background:#fff; border:1px solid #EAE3D2; border-radius:6px; padding:16px; }
  .stat-n { font-family:'Playfair Display',serif; font-size:30px; color:#0E1C36; }
  .stat-l { font-size:10px; color:#6B7280; text-transform:uppercase; margin-top:4px; }
  .qa { display:flex; flex-direction:column; align-items:center; gap:6px; padding:14px; background:#fff; border:1px solid #EAE3D2; border-radius:6px; cursor:pointer; }
  .qa:hover { border-color:#B8963E; background:#FFFBF3; }
  .dl-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #EAE3D2; }
  .dl-date { width:50px; text-align:center; background:#0E1C36; border-radius:4px; padding:5px; color:#fff; }
  .dl-mo { font-size:9px; color:#D4AF6A; }
  .dl-day { font-size:18px; font-weight:700; }
  .act-item { display:flex; gap:10px; padding:9px 0; border-bottom:1px solid #EAE3D2; }
  .act-icon { width:28px; height:28px; border-radius:50%; background:#F5F0E8; display:flex; align-items:center; justify-content:center; }
  .act-text { font-size:12px; }
  table { width:100%; border-collapse:collapse; font-size:12px; }
  thead th { text-align:left; padding:8px; background:#F5F0E8; font-size:11px; border-bottom:1px solid #EAE3D2; }
  tbody td { padding:8px; border-bottom:1px solid #EAE3D2; }
  .sidebar-footer { margin-top:auto; padding:14px 18px; border-top:1px solid #1E3A5F; }
  .avatar { width:30px; height:30px; border-radius:50%; background:#1E3A5F; display:flex; align-items:center; justify-content:center; font-size:11px; color:#D4AF6A; font-weight:600; }
  input { padding:8px; border:1px solid #EAE3D2; border-radius:5px; font-size:12px; width:100%; }
  .tag { display:inline-block; padding:2px 6px; background:#F5F0E8; border:1px solid #EAE3D2; border-radius:4px; font-size:10px; }
`;

const CASES = [
  { id: "JVM-2024-0091", client: "R. Hargrove Estate", type: "Probate", atty: "T. Johnson", status: "review", updated: "Jun 11" },
  { id: "JVM-2024-0087", client: "Landsberg Const. v. Price", type: "Civil Litigation", atty: "M. Vorhees", status: "active", updated: "Jun 12" },
  { id: "JVM-2024-0083", client: "Chen Divorce Proceedings", type: "Family Law", atty: "A. Marticci", status: "active", updated: "Jun 12" },
  { id: "JVM-2024-0079", client: "City of Joplin Zoning", type: "Municipal", atty: "T. Johnson", status: "urgent", updated: "Jun 13" },
  { id: "JVM-2024-0071", client: "Webb Personal Injury", type: "PI / Tort", atty: "M. Vorhees", status: "active", updated: "Jun 10" },
  { id: "JVM-2024-0064", client: "Midwest Farms LLC", type: "Contract", atty: "A. Marticci", status: "closed", updated: "Jun 5" }
];

const DEADLINES = [
  { month: "JUN", day: "17", case: "City of Joplin Zoning", type: "Response Brief Due", atty: "T. Johnson" },
  { month: "JUN", day: "20", case: "Chen Divorce Proceedings", type: "Mediation Session", atty: "A. Marticci" },
  { month: "JUN", day: "24", case: "Webb Personal Injury", type: "Deposition — Dr. Ellis", atty: "M. Vorhees" },
  { month: "JUN", day: "28", case: "Landsberg v. Price", type: "Motion Hearing", atty: "M. Vorhees" },
  { month: "JUL", day: "3", case: "Hargrove Estate", type: "Probate Filing", atty: "T. Johnson" }
];

const ACTIVITY = [
  { icon: "📄", text: "AI drafted demand letter for Webb Personal Injury", time: "12 min ago" },
  { icon: "⚠️", text: "Deadline alert: Joplin Zoning brief due in 4 days", time: "1 hr ago" },
  { icon: "👤", text: "New intake completed: Martinez Workers Comp", time: "2 hr ago" },
  { icon: "📧", text: "Client email from Chen family flagged", time: "3 hr ago" },
  { icon: "✅", text: "Invoice sent to Midwest Farms LLC", time: "Yesterday" }
];

function Dashboard(props) {
  var setView = props.setView;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "grid4" },
      React.createElement(
        "div",
        { className: "stat" },
        React.createElement("div", { className: "stat-n" }, "94"),
        React.createElement("div", { className: "stat-l" }, "Active Matters")
      ),
      React.createElement(
        "div",
        { className: "stat" },
        React.createElement("div", { className: "stat-n" }, "17"),
        React.createElement("div", { className: "stat-l" }, "Upcoming Deadlines")
      ),
      React.createElement(
        "div",
        { className: "stat" },
        React.createElement("div", { className: "stat-n" }, "$128K"),
        React.createElement("div", { className: "stat-l" }, "Unbilled Time")
      ),
      React.createElement(
        "div",
        { className: "stat" },
        React.createElement("div", { className: "stat-n" }, "4.8"),
        React.createElement("div", { className: "stat-l" }, "Client Sat. Score")
      )
    ),
    React.createElement(
      "div",
      { className: "card" },
      React.createElement("div", { className: "card-title" }, "Quick Actions"),
      React.createElement(
        "div",
        { className: "grid4" },
        React.createElement(
          "div",
          { className: "qa", onClick: function() { setView("cases"); } },
          React.createElement("div", null, "⚖️"),
          React.createElement("div", null, "Active Matters")
        ),
        React.createElement(
          "div",
          { className: "qa", onClick: function() { setView("deadlines"); } },
          React.createElement("div", null, "📅"),
          React.createElement("div", null, "Deadlines")
        ),
        React.createElement(
          "div",
          { className: "qa", onClick: function() { setView("billing"); } },
          React.createElement("div", null, "💰"),
          React.createElement("div", null, "Billing")
        ),
        React.createElement(
          "div",
          { className: "qa", onClick: function() { setView("ai"); } },
          React.createElement("div", null, "🤖"),
          React.createElement("div", null, "AI Assistant")
        )
      )
    ),
    React.createElement(
      "div",
      { className: "grid2" },
      React.createElement(
        "div",
        { className: "card" },
        React.createElement("div", { className: "card-title" }, "Upcoming Deadlines"),
        DEADLINES.slice(0, 3).map(function(d, i) {
          return React.createElement(
            "div",
            { key: i, className: "dl-item" },
            React.createElement(
              "div",
              { className: "dl-date" },
              React.createElement("div", { className: "dl-mo" }, d.month),
              React.createElement("div", { className: "dl-day" }, d.day)
            ),
            React.createElement(
              "div",
              null,
              React.createElement("div", null, d.case),
              React.createElement("div", { style: { fontSize: "11px", color: "#6B7280" } }, d.type)
            )
          );
        })
      ),
      React.createElement(
        "div",
        { className: "card" },
        React.createElement("div", { className: "card-title" }, "Recent Activity"),
        ACTIVITY.map(function(a, i) {
          return React.createElement(
            "div",
            { key: i, className: "act-item" },
            React.createElement("div", { className: "act-icon" }, a.icon),
            React.createElement(
              "div",
              null,
              React.createElement("div", { className: "act-text" }, a.text),
              React.createElement("div", { style: { fontSize: "10px", color: "#6B7280" } }, a.time)
            )
          );
        })
      )
    )
  );
}

function Cases() {
  var searchState = useState("");
  var search = searchState[0];
  var setSearch = searchState[1];
  var filtered = CASES.filter(function(c) {
    return c.client.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase());
  });
  return React.createElement(
    "div",
    { className: "card" },
    React.createElement("div", { className: "card-title" }, "Active Matters"),
    React.createElement("input", { placeholder: "Search cases...", value: search, onChange: function(e) { setSearch(e.target.value); }, style: { marginBottom: "12px" } }),
    React.createElement(
      "table",
      null,
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", null, "Matter ID"),
          React.createElement("th", null, "Client"),
          React.createElement("th", null, "Type"),
          React.createElement("th", null, "Attorney"),
          React.createElement("th", null, "Status")
        )
      ),
      React.createElement("tbody", null,
        filtered.map(function(c, i) {
          return React.createElement("tr", { key: i },
            React.createElement("td", { style: { fontSize: "11px", color: "#666" } }, c.id),
            React.createElement("td", null, c.client),
            React.createElement("td", null, React.createElement("span", { className: "tag" }, c.type)),
            React.createElement("td", { style: { color: "#B8963E" } }, c.atty),
            React.createElement("td", null, c.status)
          );
        })
      )
    )
  );
}

function Deadlines() {
  return React.createElement(
    "div",
    { className: "card" },
    React.createElement("div", { className: "card-title" }, "All Deadlines"),
    DEADLINES.map(function(d, i) {
      return React.createElement(
        "div",
        { key: i, className: "dl-item" },
        React.createElement(
          "div",
          { className: "dl-date" },
          React.createElement("div", { className: "dl-mo" }, d.month),
          React.createElement("div", { className: "dl-day" }, d.day)
        ),
        React.createElement(
          "div",
          { style: { flex: 1 } },
          React.createElement("div", { style: { fontWeight: 500 } }, d.case),
          React.createElement("div", { style: { fontSize: "11px", color: "#666" } }, d.type),
          React.createElement("div", { style: { fontSize: "10px", color: "#999" } }, d.atty)
        )
      );
    })
  );
}

function Billing() {
  return React.createElement(
    "div",
    { className: "card" },
    React.createElement("div", { className: "card-title" }, "Billing Summary"),
    React.createElement(
      "table",
      null,
      React.createElement("thead", null,
        React.createElement("tr", null,
          React.createElement("th", null, "Matter"),
          React.createElement("th", null, "Attorney"),
          React.createElement("th", null, "Hours"),
          React.createElement("th", null, "Amount")
        )
      ),
      React.createElement("tbody", null,
        [
          ["Webb Personal Injury", "M. Vorhees", "12.5", "$3,562"],
          ["Chen Divorce", "A. Marticci", "8.0", "$2,000"],
          ["Joplin Zoning", "T. Johnson", "6.5", "$2,015"]
        ].map(function(r, i) {
          return React.createElement("tr", { key: i },
            React.createElement("td", null, r[0]),
            React.createElement("td", { style: { color: "#B8963E" } }, r[1]),
            React.createElement("td", null, r[2]),
            React.createElement("td", { style: { fontWeight: 600 } }, r[3])
          );
        })
      )
    )
  );
}

function App() {
  var viewState = useState("dashboard");
  var view = viewState[0];
  var setView = viewState[1];

  var content;
  if (view === "cases") {
    content = React.createElement(Cases);
  } else if (view === "deadlines") {
    content = React.createElement(Deadlines);
  } else if (view === "billing") {
    content = React.createElement(Billing);
  } else {
    content = React.createElement(Dashboard, { setView: setView });
  }

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("style", null, styles),
    React.createElement(
      "div",
      { style: { display: "flex", minHeight: "100vh" } },
      React.createElement(
        "aside",
        { className: "sidebar" },
        React.createElement(
          "div",
          { className: "logo-area" },
          React.createElement("div", { className: "firm-name" }, "Johnson, Vorhees", React.createElement("br", null), "& Marticci"),
          React.createElement("div", { className: "firm-loc" }, "Joplin, MO · Legal OS")
        ),
        React.createElement(
          "div",
          { className: "nav-sec" },
          React.createElement("div", { className: "nav-lbl" }, "Overview"),
          React.createElement(
            "div",
            { className: view === "dashboard" ? "nav-item nav-active" : "nav-item", onClick: function() { setView("dashboard"); } },
            React.createElement("span", null, "📊"),
            "Dashboard"
          )
        ),
        React.createElement(
          "div",
          { className: "nav-sec" },
          React.createElement("div", { className: "nav-lbl" }, "Case Management"),
          React.createElement(
            "div",
            { className: view === "cases" ? "nav-item nav-active" : "nav-item", onClick: function() { setView("cases"); } },
            React.createElement("span", null, "⚖️"),
            "Active Matters"
          ),
          React.createElement(
            "div",
            { className: view === "deadlines" ? "nav-item nav-active" : "nav-item", onClick: function() { setView("deadlines"); } },
            React.createElement("span", null, "📅"),
            "Deadlines"
          )
        ),
        React.createElement(
          "div",
          { className: "nav-sec" },
          React.createElement("div", { className: "nav-lbl" }, "Tools"),
          React.createElement(
            "div",
            { className: view === "billing" ? "nav-item nav-active" : "nav-item", onClick: function() { setView("billing"); } },
            React.createElement("span", null, "💰"),
            "Billing"
          )
        ),
        React.createElement(
          "div",
          { className: "sidebar-footer" },
          React.createElement(
            "div",
            { style: { display: "flex", alignItems: "center", gap: "10px" } },
            React.createElement("div", { className: "avatar" }, "TJ"),
            React.createElement(
              "div",
              null,
              React.createElement("div", { style: { fontSize: "12px", color: "#fff", fontWeight: 500 } }, "T. Johnson"),
              React.createElement("div", { style: { fontSize: "10px", color: "#5A6E8A" } }, "Managing Partner")
            )
          )
        )
      ),
      React.createElement(
        "main",
        { style: { marginLeft: "220px", flex: 1 } },
        React.createElement(
          "div",
          { className: "topbar" },
          React.createElement("div", { className: "page-title" }, view === "dashboard" ? "Dashboard" : view === "cases" ? "Active Matters" : view === "deadlines" ? "Deadlines" : "Billing"),
          React.createElement("span", { style: { fontSize: "12px", color: "#6B7280" } }, "JVM Law · Joplin, MO")
        ),
        React.createElement("div", { className: "content" }, content)
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
