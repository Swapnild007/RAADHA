import React,{useState} from 'react'; import {createRoot} from 'react-dom/client'; import {Send,Plus,Mic,Paperclip,Globe,Image as ImageIcon,FileText,Code2,Search,Library,MessageSquare,Settings,ChevronDown,ArrowUpRight,Sparkles} from 'lucide-react'; import './styles.css';

const caps=[['Web research',Globe],['Create',ImageIcon],['Files',FileText],['Coding',Code2]];
const nav=[['Home',Sparkles],['Chats',MessageSquare],['Create',ImageIcon],['Library',Library]];

function App(){
 const [page,setPage]=useState('Home'); const [mode,setMode]=useState('Auto'); const [text,setText]=useState(''); const [sent,setSent]=useState(false);
 const send=()=>{if(!text.trim())return;setSent(true);setTimeout(()=>setSent(false),900);setText('')};
 return <div className="app">
  <div className="ambient a1"/><div className="ambient a2"/>
  <aside className="sidebar">
   <div className="brand"><div className="mark">R</div><span>RADHA</span></div>
   <div className="nav">{nav.map(([label,Icon])=><button className={page===label?'active':''} onClick={()=>setPage(label)} key={label}><Icon size={18}/><span>{label}</span></button>)}</div>
   <div className="side-bottom"><button><Settings size={18}/><span>Settings</span></button><div className="profile"><div className="avatar">S</div><div><b>Swapnil</b><small>Personal workspace</small></div></div></div>
  </aside>
  <main>
   <header><div className="mobile-brand"><div className="mark">R</div><b>RADHA</b></div><div className="top-actions"><button className="icon-btn"><Search size={18}/></button><button className="profile-mini">S</button></div></header>
   <section className="content">
    {page==='Home'&&<><div className="hero"><p className="eyebrow">ONE INTELLIGENCE · MANY CAPABILITIES</p><h1>What can we<br/><em>work on?</em></h1><p className="sub">Ask a question, build something, research a topic, or turn an idea into a finished result.</p></div>
    <Composer text={text} setText={setText} mode={mode} setMode={setMode} send={send} sent={sent}/>
    <div className="cap-grid">{caps.map(([label,Icon])=><button key={label} onClick={()=>setMode(label==='Create'?'Create':label==='Web research'?'Web':'Files')}><Icon size={18}/><span>{label}</span><ArrowUpRight size={15}/></button>)}</div>
    <div className="section-head"><div><h2>Recent work</h2><p>Pick up where you left off.</p></div><button>View all</button></div>
    <div className="recent"><Work title="Build a product roadmap" meta="Today · Workspace" tag="Plan"/><Work title="Research the AI landscape" meta="Yesterday · Research" tag="Web"/><Work title="Q4 performance analysis" meta="Sep 30 · Data" tag="Analysis"/></div></>}
    {page!=='Home'&&<div className="placeholder"><div className="placeholder-icon">{page==='Chats'?<MessageSquare/>:page==='Create'?<ImageIcon/>:<Library/>}</div><h1>{page}</h1><p>This workspace is ready for its real data and actions. The shell is intentionally stable before provider integrations are added.</p><button onClick={()=>setPage('Home')}>Back home</button></div>}
   </section>
   <nav className="mobile-nav">{nav.map(([label,Icon])=><button className={page===label?'active':''} onClick={()=>setPage(label)} key={label}><Icon size={19}/><span>{label}</span></button>)}</nav>
  </main>
 </div>
}
function Composer({text,setText,mode,setMode,send,sent}){return <div className="composer"><div className="mode-row"><button className="mode" onClick={()=>setMode(mode==='Auto'?'Web':mode==='Web'?'Files':mode==='Files'?'Create':'Auto')}><Sparkles size={15}/>{mode}<ChevronDown size={14}/></button></div><textarea value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Ask anything…"/><div className="composer-bottom"><div><button className="round"><Plus size={19}/></button><button className="tool"><Paperclip size={17}/><span>Attach</span></button><button className="tool"><Mic size={17}/><span>Voice</span></button></div><button className={sent?'send sending':'send'} onClick={send}>{sent?'✓':<Send size={18}/>}</button></div></div>}
function Work({title,meta,tag}){return <button className="work"><div><span className="work-tag">{tag}</span><h3>{title}</h3><p>{meta}</p></div><ArrowUpRight size={17}/></button>}
createRoot(document.getElementById('root')).render(<App/>);