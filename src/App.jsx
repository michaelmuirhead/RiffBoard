import { useState, useEffect } from "react";

// ─── Data ──────────────────────────────────────────────────────────
const initialAssignments = [
  { id: 2,  category: "Tone Comparison",    theme: "Tone Lab Tuesday",      title: "Gratitude Intro 3 Ways",            task: "Play the intro riff clean, ambient, and overdriven.",                                          tier: "Tier 1", status: false, notes: "" },
  { id: 4,  category: "Improvisation",      theme: "One Riff Worship",      title: "Spontaneous Instrumental",          task: "Record a 20-second spontaneous instrumental in D at 72 BPM.",                                 tier: "Tier 1", status: false, notes: "Sunday Sounds" },
  { id: 8,  category: "Tone Comparison",    theme: "Tone Lab Tuesday",      title: "Firm Foundation Chorus Comparison", task: "Record chorus with chorus pedal OFF and ON.",                                                   tier: "Tier 1", status: false, notes: "Preset Friday" },
  { id: 12, category: "Song Recreation",    theme: "Worship Tone Breakdown", title: "Goodness of God Edge-of-Breakup",  task: "Play using only edge-of-breakup tone with no ambient effects.",                                tier: "Tier 1", status: false, notes: "Ambient Minute" },
  { id: 20, category: "Teaching",           theme: "Sunday Sounds",         title: "Underrated Worship Guitar Trick",   task: "Demonstrate your favorite underrated worship guitar trick.",                                    tier: "Tier 1", status: false, notes: "Tone Lab Tuesday" },
  { id: 1,  category: "Song Recreation",    theme: "Ambient Minute",        title: "What A Beautiful Name Bridge",      task: "Record the bridge with ambient swells and sustain using a BigSky-heavy tone.",                  tier: "Tier 2", status: false, notes: "One Riff Worship" },
  { id: 3,  category: "Preset Building",    theme: "Preset Friday",         title: "Sunday Morning Preset",             task: "Build a worship preset with compressor, dotted eighth delay, shimmer, and low gain.",           tier: "Tier 2", status: false, notes: "Pedal Board Sessions" },
  { id: 5,  category: "Rig Explanation",    theme: "Pedal Board Sessions",  title: "Footswitch Tour",                   task: "Explain what every footswitch does during worship.",                                           tier: "Tier 2", status: false, notes: "Worship Gear Essentials" },
  { id: 6,  category: "Technique",          theme: "Sunday Sounds",         title: "Volume Pedal Techniques",           task: "Demonstrate 5 volume pedal techniques in 60 seconds.",                                         tier: "Tier 2", status: false, notes: "Can it Ambient?" },
  { id: 7,  category: "Song Recreation",    theme: "Ambient Minute",        title: "Holy Forever Atmosphere",           task: "Recreate the atmosphere and texture from Holy Forever.",                                       tier: "Tier 2", status: false, notes: "Sunday Rig Diary" },
  { id: 9,  category: "Constraint Challenge", theme: "Can it Ambient?",     title: "3-Pedal Ambient Patch",             task: "Build a patch using only ACS1, delay, and reverb.",                                            tier: "Tier 2", status: false, notes: "Worship Tone Breakdown" },
  { id: 10, category: "Teaching",           theme: "Sunday Rig Diary",      title: "3 Worship Transitions",             task: "Demonstrate three worship transitions every guitarist should know.",                            tier: "Tier 2", status: false, notes: "" },
  { id: 11, category: "Gear Content",       theme: "Worship Gear Essentials", title: "$300 vs Premium Tone",            task: "Compare budget-style tone to premium worship tone.",                                           tier: "Tier 2", status: false, notes: "" },
  { id: 14, category: "Teaching",           theme: "Worship Tone Breakdown", title: "3 Delay Uses",                     task: "Demonstrate rhythmic, ambient, and lead enhancement delay uses.",                              tier: "Tier 2", status: false, notes: "" },
  { id: 15, category: "Gear Content",       theme: "Worship Tone Breakdown", title: "BigSky Preset Tour",               task: "Showcase cloud, shimmer, plate, and bloom-style sounds.",                                      tier: "Tier 2", status: false, notes: "" },
  { id: 17, category: "Technique Challenge", theme: "One Riff Worship",     title: "Build My Life Fingerstyle",         task: "Record the bridge fingerstyle only with no pick.",                                             tier: "Tier 2", status: false, notes: "" },
  { id: 18, category: "Sound Design",       theme: "Can it Ambient?",       title: "Guitar as Synth Pad",               task: "Use modulation, reverb, and volume swells to emulate a synth.",                               tier: "Tier 2", status: false, notes: "" },
  { id: 19, category: "Skill Progression",  theme: "Sunday Sounds",         title: "3 Difficulty Levels",               task: "Play G-D-Em-C progression as beginner, intermediate, and advanced.",                          tier: "Tier 2", status: false, notes: "" },
  { id: 13, category: "Rig Breakdown",      theme: "Pedal Board Sessions",  title: "Signal Chain Explanation",          task: "Film your signal chain and explain each pedal while playing.",                                 tier: "Tier 3", status: false, notes: "" },
  { id: 16, category: "Writing",            theme: "Sunday Sounds",         title: "Ambient Intro Composition",         task: "Write an original ambient intro in E and 6/8 time.",                                           tier: "Tier 3", status: false, notes: "" },
];

const TIERS = ["Tier 1", "Tier 2", "Tier 3"];

const ALL_CATEGORIES = [
  "Tone Comparison","Improvisation","Song Recreation","Teaching",
  "Preset Building","Rig Explanation","Technique","Constraint Challenge",
  "Gear Content","Technique Challenge","Sound Design","Skill Progression",
  "Rig Breakdown","Writing",
];

const ALL_THEMES = [
  "Tone Lab Tuesday","One Riff Worship","Worship Tone Breakdown","Sunday Sounds",
  "Ambient Minute","Preset Friday","Pedal Board Sessions","Can it Ambient?",
  "Sunday Rig Diary","Worship Gear Essentials",
];

const tierColors = {
  "Tier 1": { badge: "#2e7d32" },
  "Tier 2": { badge: "#1565c0" },
  "Tier 3": { badge: "#c62828" },
};

const categoryEmoji = {
  "Tone Comparison":"🎛️","Improvisation":"🎸","Song Recreation":"🎵",
  "Teaching":"📖","Preset Building":"🎚️","Rig Explanation":"🔌",
  "Technique":"🤙","Constraint Challenge":"🔒","Gear Content":"🛠️",
  "Technique Challenge":"⚡","Sound Design":"🌊","Skill Progression":"📈",
  "Rig Breakdown":"🧩","Writing":"✍️",
};

// ─── Breakpoint hook ───────────────────────────────────────────────
function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
    width,
  };
}

// ─── Editable Field ────────────────────────────────────────────────
function EditableField({ value, onChange, multiline, placeholder }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const commit = () => { setEditing(false); onChange(draft); };
  const base = {
    width:"100%", border:"1.5px solid #7c3aed", borderRadius:6,
    padding:"6px 8px", fontSize:"inherit", fontFamily:"inherit",
    outline:"none", background:"#faf5ff",
    WebkitAppearance:"none",
  };
  if (editing) return multiline
    ? <textarea autoFocus value={draft} onChange={e=>setDraft(e.target.value)}
        onBlur={commit} placeholder={placeholder}
        style={{...base, resize:"vertical", minHeight:60}} />
    : <input autoFocus value={draft} onChange={e=>setDraft(e.target.value)}
        onBlur={commit} onKeyDown={e=>e.key==="Enter"&&commit()}
        placeholder={placeholder} style={base} />;
  return (
    <span onClick={()=>{setEditing(true);setDraft(value);}}
      title="Tap to edit" style={{cursor:"text",display:"block",lineHeight:1.4}}>
      {value||<span style={{color:"#bbb",fontStyle:"italic"}}>{placeholder||"Tap to edit…"}</span>}
    </span>
  );
}

// ─── Delete Button (two-tap confirm) ──────────────────────────────
function DeleteButton({ id, onDelete }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <button
      onClick={()=>{ if(confirm){ onDelete(id); } else { setConfirm(true); setTimeout(()=>setConfirm(false),2500); }}}
      title={confirm?"Tap again to confirm":"Delete"}
      style={{
        background:confirm?"#ef4444":"transparent",
        border:`2px solid ${confirm?"#ef4444":"rgba(0,0,0,0.15)"}`,
        borderRadius:"50%",width:30,height:30,cursor:"pointer",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:confirm?11:14,
        color:confirm?"#fff":"rgba(0,0,0,0.3)",
        flexShrink:0,transition:"all 0.2s",
        WebkitTapHighlightColor:"transparent",
        fontWeight:confirm?700:400,
      }}>
      {confirm?"✕":"🗑"}
    </button>
  );
}

// ─── Assignment Card ───────────────────────────────────────────────
function AssignmentCard({ assignment, onUpdate, onToggle, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const tc = tierColors[assignment.tier];
  return (
    <div style={{
      background:"#fff", borderRadius:14,
      boxShadow:"0 2px 12px rgba(0,0,0,0.07)",
      border:`1.5px solid ${assignment.status?"#d1fae5":"#ede9fe"}`,
      overflow:"hidden", display:"flex", flexDirection:"column",
      opacity:assignment.status?0.72:1, transition:"opacity 0.2s",
    }}>
      {/* Card header */}
      <div style={{
        background:assignment.status?"linear-gradient(90deg,#d1fae5,#a7f3d0)":"linear-gradient(90deg,#ede9fe,#ddd6fe)",
        padding:"10px 14px", display:"flex", alignItems:"center",
        justifyContent:"space-between", gap:8,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <span style={{fontSize:18}}>{categoryEmoji[assignment.category]||"🎸"}</span>
          <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:13,color:"#4c1d95"}}>
            #{assignment.id}
          </span>
          <span style={{
            background:tc.badge,color:"#fff",borderRadius:20,
            fontSize:10,fontWeight:700,padding:"2px 8px",
            letterSpacing:0.5,textTransform:"uppercase",
          }}>{assignment.tier}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <button onClick={()=>onToggle(assignment.id)}
            style={{
              background:assignment.status?"#10b981":"transparent",
              border:`2px solid ${assignment.status?"#10b981":"#a78bfa"}`,
              borderRadius:"50%", width:30,height:30, cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:14,color:assignment.status?"#fff":"#a78bfa",
              flexShrink:0,transition:"all 0.15s",
              WebkitTapHighlightColor:"transparent",
            }}>
            {assignment.status?"✓":"○"}
          </button>
          <button
            onClick={()=>{ if(confirmDelete){ onDelete(assignment.id); } else { setConfirmDelete(true); setTimeout(()=>setConfirmDelete(false),2500); }}}
            title={confirmDelete?"Tap again to confirm delete":"Delete"}
            style={{
              background:confirmDelete?"#ef4444":"transparent",
              border:`2px solid ${confirmDelete?"#ef4444":"rgba(0,0,0,0.15)"}`,
              borderRadius:"50%",width:30,height:30,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:confirmDelete?11:14,
              color:confirmDelete?"#fff":"rgba(0,0,0,0.3)",
              flexShrink:0,transition:"all 0.2s",
              WebkitTapHighlightColor:"transparent",
              fontWeight:confirmDelete?700:400,
            }}>
            {confirmDelete?"✕":"🗑"}
          </button>
        </div>
      </div>

      {/* Card body */}
      <div style={{padding:"12px 14px",flex:1,display:"flex",flexDirection:"column",gap:10}}>
        <div>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,color:"#7c3aed",marginBottom:3}}>Title</div>
          <EditableField value={assignment.title} onChange={v=>onUpdate(assignment.id,"title",v)} placeholder="Assignment title…"/>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <span style={{background:"#f5f3ff",color:"#6d28d9",fontSize:11,borderRadius:20,padding:"3px 10px",fontWeight:600}}>{assignment.theme}</span>
          <span style={{background:"#f0fdf4",color:"#15803d",fontSize:11,borderRadius:20,padding:"3px 10px",fontWeight:600}}>{assignment.category}</span>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,color:"#9ca3af",marginBottom:3}}>Task</div>
          <EditableField value={assignment.task} onChange={v=>onUpdate(assignment.id,"task",v)} placeholder="Describe the task…" multiline/>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,color:"#9ca3af",marginBottom:3}}>Notes</div>
          <EditableField value={assignment.notes} onChange={v=>onUpdate(assignment.id,"notes",v)} placeholder="Add notes…"/>
        </div>
      </div>
      <div style={{height:4,background:tc.badge,opacity:0.5}}/>
    </div>
  );
}

// ─── New Task Modal ────────────────────────────────────────────────
function NewTaskModal({ onAdd, onClose, nextId }) {
  const { isMobile } = useBreakpoint();
  const [form, setForm] = useState({
    title:"",category:ALL_CATEGORIES[0],theme:ALL_THEMES[0],
    task:"",tier:"Tier 1",notes:"",
  });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const handleAdd = () => {
    if (!form.title.trim()) return;
    onAdd({...form,id:nextId,status:false});
    onClose();
  };
  const inp = {
    width:"100%",border:"1.5px solid #ddd6fe",borderRadius:8,
    padding:"10px 12px",fontSize:15,fontFamily:"inherit",
    outline:"none",background:"#faf5ff",color:"#1e1b4b",
    WebkitAppearance:"none",
  };
  const lbl = {
    display:"block",fontSize:10,fontWeight:700,
    textTransform:"uppercase",letterSpacing:0.8,color:"#7c3aed",marginBottom:5,
  };

  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:999,
      background:"rgba(30,27,75,0.65)",backdropFilter:"blur(4px)",
      display:"flex",
      alignItems:isMobile?"flex-end":"center",
      justifyContent:"center",
      padding:isMobile?0:20,
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"#fff",
        borderRadius:isMobile?"20px 20px 0 0":"18px",
        width:"100%",
        maxWidth:isMobile?"100%":520,
        maxHeight:isMobile?"92dvh":"90vh",
        overflowY:"auto",
        boxShadow:"0 24px 64px rgba(109,40,217,0.25)",
        paddingBottom:isMobile?"env(safe-area-inset-bottom,16px)":"0",
      }}>
        {/* Drag handle on mobile */}
        {isMobile && (
          <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}>
            <div style={{width:36,height:4,borderRadius:2,background:"#e0d9f7"}}/>
          </div>
        )}

        <div style={{
          background:"linear-gradient(90deg,#ede9fe,#ddd6fe)",
          padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",
        }}>
          <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:18,color:"#4c1d95"}}>
            ➕ New Assignment
          </span>
          <button onClick={onClose} style={{background:"transparent",border:"none",fontSize:22,cursor:"pointer",color:"#7c3aed",lineHeight:1,padding:"4px 8px"}}>✕</button>
        </div>

        <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <label style={lbl}>Title *</label>
            <input style={inp} value={form.title} onChange={e=>set("title",e.target.value)} placeholder="Assignment title…"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <label style={lbl}>Category</label>
              <select style={inp} value={form.category} onChange={e=>set("category",e.target.value)}>
                {ALL_CATEGORIES.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Tier</label>
              <select style={inp} value={form.tier} onChange={e=>set("tier",e.target.value)}>
                {TIERS.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={lbl}>Theme / Series</label>
            <select style={inp} value={form.theme} onChange={e=>set("theme",e.target.value)}>
              {ALL_THEMES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Task Description</label>
            <textarea style={{...inp,resize:"vertical",minHeight:80}}
              value={form.task} onChange={e=>set("task",e.target.value)}
              placeholder="What needs to be recorded or demonstrated?"/>
          </div>
          <div>
            <label style={lbl}>Notes / Cross-link</label>
            <input style={inp} value={form.notes} onChange={e=>set("notes",e.target.value)} placeholder="Optional notes or related series…"/>
          </div>
        </div>

        <div style={{padding:"0 20px 20px",display:"flex",gap:10,justifyContent:"flex-end"}}>
          <button onClick={onClose} style={{
            background:"#f5f3ff",border:"none",borderRadius:10,
            padding:"12px 20px",fontSize:14,fontWeight:600,color:"#7c3aed",cursor:"pointer",
          }}>Cancel</button>
          <button onClick={handleAdd} style={{
            background:form.title.trim()?"linear-gradient(135deg,#6d28d9,#4c1d95)":"#c4b5fd",
            border:"none",borderRadius:10,padding:"12px 24px",
            fontSize:14,fontWeight:700,color:"#fff",
            cursor:form.title.trim()?"pointer":"not-allowed",
            flex:1,
          }}>Add Assignment</button>
        </div>
      </div>
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────
export default function App() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [filterTier, setFilterTier] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const CATEGORIES = [...new Set(assignments.map(a=>a.category))];

  const onUpdate = (id,field,value) =>
    setAssignments(prev=>prev.map(a=>a.id===id?{...a,[field]:value}:a));
  const onToggle = (id) =>
    setAssignments(prev=>prev.map(a=>a.id===id?{...a,status:!a.status}:a));
  const onAdd = (item) =>
    setAssignments(prev=>[...prev,item]);
  const onDelete = (id) =>
    setAssignments(prev=>prev.filter(a=>a.id!==id));
  const nextId = Math.max(...assignments.map(a=>a.id))+1;

  const filtered = assignments.filter(a=>{
    if(filterTier!=="All"&&a.tier!==filterTier) return false;
    if(filterCategory!=="All"&&a.category!==filterCategory) return false;
    if(filterStatus==="Complete"&&!a.status) return false;
    if(filterStatus==="Incomplete"&&a.status) return false;
    if(search&&!`${a.title} ${a.theme} ${a.category} ${a.task}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const total = assignments.length;
  const done = assignments.filter(a=>a.status).length;
  const pct = Math.round((done/total)*100);

  // Grid columns: 1 on mobile, 2 on tablet, 3+ on desktop
  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(auto-fill,minmax(320px,1fr))";

  const activeFilters = [filterTier,filterCategory,filterStatus].filter(f=>f!=="All").length;

  return (
    <div style={{minHeight:"100vh",background:"#f8f7ff",fontFamily:"'DM Sans','Segoe UI',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { -webkit-text-size-adjust: 100%; }
        body { margin: 0; overscroll-behavior-y: none; }
        button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        button:focus { outline: none; }
        textarea, input, select {
          font-family: 'DM Sans','Segoe UI',sans-serif;
          font-size: 16px; /* prevents iOS zoom on focus */
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #c4b5fd; border-radius: 4px; }
        ::placeholder { color: rgba(196,181,253,0.7); }
      `}</style>

      {showModal&&<NewTaskModal onAdd={onAdd} onClose={()=>setShowModal(false)} nextId={nextId}/>}

      {/* ── HEADER ── */}
      <div style={{
        background:"linear-gradient(135deg,#1e1b4b 0%,#4c1d95 60%,#6d28d9 100%)",
        paddingTop:isMobile?"calc(env(safe-area-inset-top) + 16px)":"28px",paddingLeft:isMobile?"16px":"28px",paddingRight:isMobile?"16px":"28px",paddingBottom:0,
        position:"sticky",top:0,zIndex:100,
        boxShadow:"0 4px 24px rgba(109,40,217,0.25)",
      }}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>

          {/* Top row: title + actions */}
          <div style={{
            display:"flex",alignItems:"center",
            justifyContent:"space-between",gap:12,
            marginBottom:isMobile?12:16,
          }}>
            <div style={{minWidth:0}}>
              <div style={{color:"#c4b5fd",fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:2}}>
                Worship Guitar
              </div>
              <h1 style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:isMobile?"22px":"clamp(24px,3vw,32px)",
                fontWeight:900,color:"#fff",margin:0,lineHeight:1.1,letterSpacing:-0.5,
                whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
              }}>
                🎸 Riff Board
              </h1>
              <div style={{color:"#ddd6fe",fontSize:12,marginTop:4}}>
                {done}/{total} complete · {pct}%
              </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8,flexShrink:0}}>
              <button onClick={()=>setShowModal(true)} style={{
                background:"rgba(255,255,255,0.18)",border:"1.5px solid rgba(255,255,255,0.4)",
                borderRadius:10,padding:isMobile?"8px 12px":"9px 16px",color:"#fff",
                fontSize:isMobile?12:13,fontWeight:700,cursor:"pointer",
                display:"flex",alignItems:"center",gap:5,
                whiteSpace:"nowrap",
              }}>
                ➕ {isMobile?"New":"New Assignment"}
              </button>

              {/* Progress bar — desktop/tablet only */}
              {!isMobile&&(
                <div style={{minWidth:180}}>
                  <div style={{background:"rgba(255,255,255,0.15)",borderRadius:8,height:6,overflow:"hidden",marginBottom:6}}>
                    <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#a78bfa,#34d399)",borderRadius:8,transition:"width 0.4s ease"}}/>
                  </div>
                  <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
                    {TIERS.map(t=>{
                      const tc=assignments.filter(a=>a.tier===t);
                      const td=tc.filter(a=>a.status).length;
                      return(
                        <div key={t} style={{textAlign:"center"}}>
                          <div style={{color:"#c4b5fd",fontSize:9,fontWeight:700}}>{t}</div>
                          <div style={{color:"#fff",fontSize:11,fontWeight:700}}>{td}/{tc.length}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── FILTER BAR ── */}
          {isMobile ? (
            /* Mobile: search + filter toggle + view toggle in one row */
            <div>
              <div style={{display:"flex",gap:8,marginBottom:showFilters?10:0}}>
                <input value={search} onChange={e=>setSearch(e.target.value)}
                  placeholder="🔍 Search…"
                  style={{
                    flex:1,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",
                    borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:14,outline:"none",
                  }}/>
                <button onClick={()=>setShowFilters(f=>!f)} style={{
                  background:activeFilters>0?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.12)",
                  border:"1px solid rgba(255,255,255,0.2)",
                  borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:13,fontWeight:700,
                  cursor:"pointer",flexShrink:0,display:"flex",alignItems:"center",gap:4,
                }}>
                  ⚙ {activeFilters>0?`(${activeFilters})`:""}
                </button>
                <div style={{display:"flex",gap:4}}>
                  {["grid","list"].map(v=>(
                    <button key={v} onClick={()=>setView(v)} style={{
                      background:view===v?"#fff":"rgba(255,255,255,0.12)",
                      color:view===v?"#4c1d95":"#ddd6fe",
                      border:"none",borderRadius:8,padding:"8px 10px",fontSize:15,cursor:"pointer",
                    }}>{v==="grid"?"⊞":"☰"}</button>
                  ))}
                </div>
              </div>

              {/* Expandable filter panel */}
              {showFilters&&(
                <div style={{
                  background:"rgba(255,255,255,0.08)",borderRadius:10,
                  padding:"12px",display:"flex",flexDirection:"column",gap:10,
                  marginBottom:4,
                }}>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {["All",...TIERS].map(t=>(
                      <button key={t} onClick={()=>setFilterTier(t)} style={{
                        background:filterTier===t?"#fff":"rgba(255,255,255,0.12)",
                        color:filterTier===t?"#4c1d95":"#ddd6fe",
                        border:"none",borderRadius:20,padding:"6px 14px",
                        fontSize:12,fontWeight:700,cursor:"pointer",
                      }}>{t}</button>
                    ))}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)}
                      style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"8px 10px",color:"#ddd6fe",fontSize:13,outline:"none"}}>
                      <option value="All">All Categories</option>
                      {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
                      style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"8px 10px",color:"#ddd6fe",fontSize:13,outline:"none"}}>
                      <option value="All">All Statuses</option>
                      <option value="Incomplete">Incomplete</option>
                      <option value="Complete">Complete</option>
                    </select>
                  </div>
                </div>
              )}
              {/* Bottom padding to cap the header */}
              <div style={{height:12}}/>
            </div>
          ) : (
            /* Tablet/Desktop: full filter bar in one row */
            <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="🔍  Search assignments…"
                style={{
                  background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",
                  borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:13,
                  width:isTablet?160:220,outline:"none",flexShrink:0,
                }}/>
              {["All",...TIERS].map(t=>(
                <button key={t} onClick={()=>setFilterTier(t)} style={{
                  background:filterTier===t?"#fff":"rgba(255,255,255,0.12)",
                  color:filterTier===t?"#4c1d95":"#ddd6fe",
                  border:"none",borderRadius:20,padding:"6px 14px",
                  fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",
                }}>{t}</button>
              ))}
              <select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)}
                style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"7px 10px",color:"#ddd6fe",fontSize:12,outline:"none",cursor:"pointer"}}>
                <option value="All">All Categories</option>
                {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
                style={{background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"7px 10px",color:"#ddd6fe",fontSize:12,outline:"none",cursor:"pointer"}}>
                <option value="All">All Statuses</option>
                <option value="Incomplete">Incomplete</option>
                <option value="Complete">Complete</option>
              </select>
              <div style={{marginLeft:"auto",display:"flex",gap:4}}>
                {["grid","list"].map(v=>(
                  <button key={v} onClick={()=>setView(v)} style={{
                    background:view===v?"#fff":"rgba(255,255,255,0.12)",
                    color:view===v?"#4c1d95":"#ddd6fe",
                    border:"none",borderRadius:6,padding:"6px 10px",fontSize:14,cursor:"pointer",
                  }}>{v==="grid"?"⊞":"☰"}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:isMobile?"16px 12px":"24px 20px"}}>
        {filtered.length===0?(
          <div style={{textAlign:"center",color:"#a78bfa",padding:60,fontSize:16}}>
            No assignments match your filters.
          </div>
        ):view==="grid"?(
          <div style={{display:"grid",gridTemplateColumns:gridCols,gap:isMobile?12:18}}>
            {filtered.map(a=>(
              <AssignmentCard key={a.id} assignment={a} onUpdate={onUpdate} onToggle={onToggle} onDelete={onDelete}/>
            ))}
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {filtered.map(a=>(
              <div key={a.id} style={{
                background:"#fff",borderRadius:12,
                border:`1.5px solid ${a.status?"#d1fae5":"#ede9fe"}`,
                padding:isMobile?"10px 12px":"12px 16px",
                display:"flex",alignItems:"center",gap:isMobile?10:14,
                boxShadow:"0 1px 6px rgba(0,0,0,0.05)",opacity:a.status?0.72:1,
              }}>
                <button onClick={()=>onToggle(a.id)} style={{
                  background:a.status?"#10b981":"transparent",
                  border:`2px solid ${a.status?"#10b981":"#a78bfa"}`,
                  borderRadius:"50%",width:30,height:30,cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:14,color:a.status?"#fff":"#a78bfa",flexShrink:0,
                  WebkitTapHighlightColor:"transparent",
                }}>{a.status?"✓":"○"}</button>
                {!isMobile&&<span style={{width:28,textAlign:"center",fontSize:10,fontWeight:700,color:"#9ca3af"}}>#{a.id}</span>}
                <span style={{background:tierColors[a.tier].badge,color:"#fff",borderRadius:20,fontSize:10,fontWeight:700,padding:"2px 8px",flexShrink:0}}>{a.tier}</span>
                <span style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:isMobile?13:14,color:"#1e1b4b",flex:1,minWidth:0}}>
                  <EditableField value={a.title} onChange={v=>onUpdate(a.id,"title",v)}/>
                </span>
                {!isMobile&&<span style={{background:"#f5f3ff",color:"#6d28d9",fontSize:11,borderRadius:20,padding:"2px 10px",fontWeight:600,flexShrink:0}}>{a.theme}</span>}
                <DeleteButton id={a.id} onDelete={onDelete}/>
              </div>
            ))}
          </div>
        )}

        <div style={{textAlign:"center",color:"#c4b5fd",fontSize:12,marginTop:28,paddingBottom:isMobile?"calc(16px + env(safe-area-inset-bottom))":"16px"}}>
          {filtered.length} assignment{filtered.length!==1?"s":""} shown · Tap any field to edit
        </div>
      </div>
    </div>
  );
}
