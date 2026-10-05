import React,{useEffect,useMemo,useState} from "react";
import{createRoot}from"react-dom/client";
import{Activity,ArrowLeft,ArrowUpRight,BarChart3,BookOpen,Check,ChevronDown,ChevronRight,Code2,Copy,FileText,FolderOpen,Globe,Grid2X2,Image as ImageIcon,Library,Link2,Menu,MessageSquare,Mic,MoreHorizontal,Paperclip,PenLine,Play,Plus,Search,Send,Settings,Share2,Sparkles,Square,Upload,Video, X}from"lucide-react";
import"./styles.css";

const nav=[["Home",Sparkles],["Chats",MessageSquare],["Create",ImageIcon],["Library",Library]];
const capabilities=[
 {label:"Research",meta:"Explore a topic",icon:Globe},
 {label:"Create",meta:"Image, video or document",icon:ImageIcon},
 {label:"Files",meta:"Read and work with files",icon:FileText},
 {label:"Analyze",meta:"Turn data into insight",icon:BarChart3},
 {label:"Code",meta:"Build and review",icon:Code2},
 {label:"Plan",meta:"Shape the next step",icon:Grid2X2}
];
const recent=[
 {title:"Build a product roadmap",meta:"Today · Workspace",tag:"Plan"},
 {title:"Research the AI landscape",meta:"Yesterday · Research",tag:"Research"},
 {title:"Q4 performance analysis",meta:"Sep 30 · Analysis",tag:"Data"}
];
const conversations=[
 {title:"Build a product roadmap",time:"Today",preview:"Turning the product direction into a clear sequence of releases."},
 {title:"Research the AI landscape",time:"Yesterday",preview:"Comparing the current landscape, capabilities and opportunities."},
 {title:"Q4 performance analysis",time:"Sep 30",preview:"A concise readout of performance, trends and next actions."},
 {title:"Travel plan for Kerala",time:"Sep 28",preview:"A practical itinerary with places, timing and options."}
];

function App(){
 const[ready,setReady]=useState(false);
 const[page,setPage]=useState("Home");
 const[chat,setChat]=useState(null);
 const[query,setQuery]=useState("");
 const[searchOpen,setSearchOpen]=useState(false);
 const[settingsOpen,setSettingsOpen]=useState(false);
 const[profileOpen,setProfileOpen]=useState(false);
 const[toast,setToast]=useState("");
 const[createType,setCreateType]=useState("Image");
 const[theme,setTheme]=useState("light");

 useEffect(()=>{const t=setTimeout(()=>setReady(true),700);return()=>clearTimeout(t)},[]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(""),1800);return()=>clearTimeout(t)},[toast]);

 const openPage=p=>{setPage(p);setChat(null);setSearchOpen(false);setProfileOpen(false)};
 const openChat=item=>{setPage("Chats");setChat(item.title||item);setToast("Workspace opened")};
 const filtered=useMemo(()=>conversations.filter(x=>(x.title+" "+x.preview).toLowerCase().includes(query.toLowerCase())),[query]);

 if(!ready)return <Splash/>;

 return <div className={"app "+(theme==="soft"?"soft-theme":"")}>
   <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
   <aside className="sidebar">
     <button className="brand" onClick={()=>openPage("Home")} aria-label="RADHA home"><span className="brand-mark">R</span><span>RADHA</span></button>
     <button className="new-chat" onClick={()=>openChat("New workspace")}><Plus size={17}/>New workspace</button>
     <div className="side-label">Workspace</div>
     <nav className="side-nav">{nav.map(([label,Icon])=><NavButton key={label} label={label} Icon={Icon} active={page===label} onClick={()=>openPage(label)}/>)}</nav>
     <div className="side-spacer"/>
     <button className="side-link" onClick={()=>setSettingsOpen(true)}><Settings size={18}/><span>Settings</span></button>
     <div className="account">
       <button className="account-button" onClick={()=>setProfileOpen(v=>!v)}><span className="avatar">S</span><span className="account-copy"><b>Swapnil</b><small>Personal workspace</small></span><ChevronRight size={15}/></button>
       {profileOpen&&<div className="account-pop"><button onClick={()=>setSettingsOpen(true)}>Preferences</button><button onClick={()=>setToast("Account menu ready")}>Workspace profile</button></div>}
     </div>
   </aside>

   <main className="main">
     <header className="topbar">
       <div className="mobile-brand"><span className="brand-mark">R</span><b>RADHA</b></div>
       <div className="topbar-actions">
         <button className="top-icon" onClick={()=>setSearchOpen(true)} aria-label="Search"><Search size={18}/></button>
         <button className="top-avatar" onClick={()=>setProfileOpen(v=>!v)}>S</button>
       </div>
     </header>

     <div className="page-shell">
       {page==="Home"&&<Home openChat={openChat} setPage={openPage} setToast={setToast}/>}
       {page==="Chats"&&<Chats query={query} setQuery={setQuery} filtered={filtered} openChat={openChat} setToast={setToast}/>}
       {page==="Create"&&<Create type={createType} setType={setCreateType} setToast={setToast}/>}
       {page==="Library"&&<LibraryPage setToast={setToast}/>}
       {chat&&<Conversation title={chat} onBack={()=>setChat(null)} setToast={setToast}/>}
     </div>

     <MobileNav page={page} openPage={openPage}/>
   </main>

   {searchOpen&&<SearchOverlay query={query} setQuery={setQuery} results={filtered} close={()=>setSearchOpen(false)} openChat={openChat} openPage={openPage}/>}
   {settingsOpen&&<SettingsSheet theme={theme} setTheme={setTheme} close={()=>setSettingsOpen(false)} setToast={setToast}/>}
   {toast&&<div className="toast"><Check size={15}/>{toast}</div>}
 </div>
}

function Splash(){return <div className="splash"><div className="splash-mark">R</div><div className="splash-name">RADHA</div><p>One intelligence. Many capabilities.</p></div>}

function NavButton({label,Icon,active,onClick}){return <button className={"nav-item "+(active?"active":"")} onClick={onClick}><Icon size={18}/><span>{label}</span></button>}

function MobileNav({page,openPage}){return <nav className="mobile-nav">{nav.map(([label,Icon])=><button key={label} className={page===label?"active":""} onClick={()=>openPage(label)}><Icon size={19}/><span>{label}</span></button>)}</nav>}

function Home({openChat,setPage,setToast}){
 const[text,setText]=useState("");
 const[mode,setMode]=useState("Auto");
 const[focused,setFocused]=useState(false);
 const[attached,setAttached]=useState(false);
 const[recording,setRecording]=useState(false);
 const send=()=>{if(!text.trim())return;openChat(text.trim());setText("")};
 const cycle=()=>setMode(mode==="Auto"?"Web":mode==="Web"?"Files":mode==="Files"?"Create":"Auto");
 return <section className="home">
   <div className="hero">
     <span className="eyebrow">ONE INTELLIGENCE · MANY CAPABILITIES</span>
     <h1>What can we<br/><em>work on?</em></h1>
     <p>Ask a question, build something, research a topic, or turn an idea into a finished result.</p>
   </div>

   <div className={"composer "+(focused?"focused":"")}>
     {attached&&<div className="attachment-chip"><FileText size={14}/>Project-notes.pdf<button onClick={()=>setAttached(false)} aria-label="Remove attachment"><X size={13}/></button></div>}
     <div className="composer-top"><button className="mode-button" onClick={cycle}><Sparkles size={15}/>{mode}<ChevronDown size={14}/></button></div>
     <textarea value={text} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Ask anything…" aria-label="Ask anything"/>
     <div className="composer-bottom">
       <div className="composer-tools">
         <button className="round-tool" onClick={()=>setAttached(true)} aria-label="Attach file"><Plus size={19}/></button>
         <button className="soft-tool" onClick={()=>setAttached(true)}><Paperclip size={16}/><span>Attach</span></button>
         <button className={"soft-tool "+(recording?"recording":"")} onClick={()=>{setRecording(v=>!v);setToast(recording?"Voice input stopped":"Voice input ready")}}><Mic size={16}/><span>{recording?"Listening":"Voice"}</span></button>
       </div>
       <button className={"send-button "+(!text.trim()?"disabled":"")} onClick={send} disabled={!text.trim()} aria-label="Send"><Send size={17}/></button>
     </div>
   </div>

   <div className="capability-grid">{capabilities.map(({label,meta,icon:Icon})=><button key={label} onClick={()=>label==="Create"?setPage("Create"):setToast(label+" workspace ready")}><span className="cap-icon"><Icon size={17}/></span><span className="cap-copy"><b>{label}</b><small>{meta}</small></span><ArrowUpRight size={15}/></button>)}</div>

   <div className="section-heading"><div><h2>Recent work</h2><p>Pick up where you left off.</p></div><button onClick={()=>setPage("Chats")}>View all <ChevronRight size={14}/></button></div>
   <div className="recent-grid">{recent.map(item=><button className="recent-card" key={item.title} onClick={()=>openChat(item)}><div><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.meta}</p></div><ArrowUpRight size={16}/></button>)}</div>
 </section>
}

function Chats({query,setQuery,filtered,openChat,setToast}){
 return <section className="workspace chats-page">
   <div className="workspace-head"><div><span className="eyebrow">WORKSPACE</span><h1>Your conversations</h1><p>Continue a thread or start something new.</p></div><button className="primary-button" onClick={()=>openChat("New workspace")}><Plus size={16}/>New</button></div>
   <div className="search-field"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search conversations…"/>{query&&<button onClick={()=>setQuery("")}><X size={15}/></button>}</div>
   <div className="conversation-list">{filtered.map(item=><button className="conversation-row" key={item.title} onClick={()=>openChat(item)}><span className="conversation-icon"><MessageSquare size={17}/></span><span className="conversation-copy"><b>{item.title}</b><small>{item.preview}</small></span><span className="conversation-time">{item.time}</span><ChevronRight size={16}/></button>)}</div>
   {!filtered.length&&<Empty title="No conversations found" text="Try another search term."/>}
   <button className="quiet-link" onClick={()=>setToast("Archive is available from each conversation.")}>Manage conversations <ArrowUpRight size={14}/></button>
 </section>
}

function Conversation({title,onBack,setToast}){
 const[messages,setMessages]=useState([{role:"user",text:title==="New workspace"?"Let's start a new workspace.":"Let's continue with this work."},{role:"system",text:"The workspace is ready. Add context, files or a direction and we can take it from there."}]);
 const[text,setText]=useState("");
 const[sending,setSending]=useState(false);
 const send=()=>{if(!text.trim())return;const value=text.trim();setMessages(m=>[...m,{role:"user",text:value},{role:"system",text:"Received. The next step is ready to be shaped around your request."}]);setText("");setSending(true);setTimeout(()=>setSending(false),700)};
 return <section className="conversation">
   <div className="conversation-header"><button className="back-button" onClick={onBack}><ArrowLeft size={17}/><span>Chats</span></button><div className="conversation-title"><span className="live-dot"/><b>{title}</b></div><div className="conversation-actions"><button onClick={()=>setToast("Link copied")}><Share2 size={17}/></button><button onClick={()=>setToast("More actions ready")}><MoreHorizontal size={18}/></button></div></div>
   <div className="message-stream">{messages.map((m,i)=><div key={i} className={"message "+m.role}><div className="message-label">{m.role==="user"?"You":"RADHA"}</div><div className="message-body">{m.text}</div>{m.role==="system"&&<div className="message-actions"><button onClick={()=>setToast("Copied")}><Copy size={14}/></button><button onClick={()=>setToast("Saved to library")}><Library size={14}/></button></div>}</div>)}</div>
   <div className="conversation-composer"><div className="mini-tools"><button onClick={()=>setToast("Attachment picker ready")}><Plus size={18}/></button><button onClick={()=>setToast("Attachment picker ready")}><Paperclip size={16}/></button></div><textarea value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Continue the conversation…"/><button className={"send-button "+(!text.trim()?"disabled":"")} disabled={!text.trim()} onClick={send}>{sending?<Square size={14}/>:<Send size={17}/>}</button></div>
 </section>
}

function Create({type,setType,setToast}){
 const types=[["Image",ImageIcon],["Video",Video],["Document",FileText]];
 return <section className="workspace create-page">
   <div className="workspace-head"><div><span className="eyebrow">CREATE</span><h1>Make something</h1><p>Choose a format and shape the result with a focused workspace.</p></div></div>
   <div className="create-tabs">{types.map(([label,Icon])=><button className={type===label?"active":""} key={label} onClick={()=>setType(label)}><Icon size={16}/>{label}</button>)}</div>
   <div className="create-layout">
     <div className="create-preview">{type==="Image"&&<><div className="preview-art"><Sparkles size={28}/><span>Creation preview</span><small>Your result will appear here</small></div></>}{type==="Video"&&<div className="preview-art video-preview"><Play size={27}/><span>Video canvas</span><small>Preview and refine scenes here</small></div>}{type==="Document"&&<div className="document-preview"><BookOpen size={26}/><h3>Document canvas</h3><p>Draft, structure and refine a finished document.</p><div className="document-lines"><i/><i/><i/><i/></div></div>}</div>
     <div className="create-panel">
       <label>Describe your idea<textarea placeholder={type==="Image"?"Describe the image you want…":type==="Video"?"Describe the story, scene or motion…":"Describe the document and outcome…"}/></label>
       <div className="control-grid"><label>Format<select><option>{type==="Image"?"Landscape":"Standard"}</option><option>Portrait</option><option>Square</option></select></label><label>Quality<select><option>Balanced</option><option>Detailed</option><option>Fast</option></select></label></div>
       <button className="primary-button full" onClick={()=>setToast(type+" workspace prepared")}>{type==="Video"?<Play size={16}/>:<Sparkles size={16}/>}Prepare {type}</button>
       <p className="panel-note">You can refine the result after the first pass.</p>
     </div>
   </div>
 </section>
}

function LibraryPage({setToast}){
 const items=[["Product roadmap.pdf","Document","Today",FileText],["AI landscape research","Research","Yesterday",Globe],["Q4 analysis","Data","Sep 30",BarChart3],["Brand concept","Creation","Sep 28",ImageIcon]];
 return <section className="workspace library-page">
   <div className="workspace-head"><div><span className="eyebrow">LIBRARY</span><h1>Your work, in one place.</h1><p>Files, creations and saved work stay easy to find.</p></div><button className="secondary-button" onClick={()=>setToast("Upload picker ready")}><Upload size={16}/>Upload</button></div>
   <div className="library-toolbar"><div className="search-field compact"><Search size={16}/><input placeholder="Search library…"/></div><div className="filter-pills"><button className="active">All</button><button>Files</button><button>Creations</button><button>Projects</button></div></div>
   <div className="library-grid">{items.map(([name,kind,date,Icon])=><button className="library-card" key={name} onClick={()=>setToast(name+" opened")}><div className="library-icon"><Icon size={18}/></div><div className="library-card-copy"><b>{name}</b><span>{kind} · {date}</span></div><MoreHorizontal size={17}/></button>)}</div>
 </section>
}

function SearchOverlay({query,setQuery,results,close,openChat,openPage}){
 return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="search-modal"><div className="modal-search"><Search size={18}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search RADHA…"/><button onClick={close}><X size={17}/></button></div><div className="search-section-label">Conversations</div>{results.slice(0,5).map(x=><button className="search-result" key={x.title} onClick={()=>openChat(x)}><MessageSquare size={16}/><span><b>{x.title}</b><small>{x.preview}</small></span><ChevronRight size={15}/></button>)}<div className="search-section-label">Navigate</div>{nav.slice(1).map(([label,Icon])=><button className="search-result" key={label} onClick={()=>{openPage(label);close()}}><Icon size={16}/><span>{label}</span><ChevronRight size={15}/></button>)}</div></div>
}

function SettingsSheet({theme,setTheme,close,setToast}){
 return <div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&close()}><div className="settings-sheet"><div className="sheet-head"><div><span className="eyebrow">PREFERENCES</span><h2>Settings</h2></div><button onClick={close}><X size={18}/></button></div><div className="setting-row"><span><b>Appearance</b><small>Keep the workspace light and calm.</small></span><div className="segmented"><button className={theme==="light"?"active":""} onClick={()=>setTheme("light")}>Light</button><button className={theme==="soft"?"active":""} onClick={()=>setTheme("soft")}>Soft</button></div></div><div className="setting-row"><span><b>Interface motion</b><small>Use subtle transitions and feedback.</small></span><button className="toggle on" onClick={()=>setToast("Motion preference kept on")}><span/></button></div><div className="setting-row"><span><b>Notifications</b><small>Control workspace reminders.</small></span><button className="toggle" onClick={()=>setToast("Notifications preference updated")}><span/></button></div><button className="danger-link" onClick={()=>setToast("Account actions are protected")}>Account & privacy <ArrowUpRight size={14}/></button></div></div>
}

function Empty({title,text}){return <div className="empty"><FolderOpen size={25}/><h3>{title}</h3><p>{text}</p></div>}

createRoot(document.getElementById("root")).render(<App/>);