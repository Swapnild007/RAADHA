const root=document.getElementById("root");

const nav=[
  ["Home","home"],["Chats","chat"],["Create","image"],["Library","library"]
];

const capabilities=[
  ["Research","Deep research & sources","globe","Research"],
  ["Create","Images, video & docs","image","Create"],
  ["Analyze","Data, charts & insights","chart","Analyze"],
  ["Code","Build, debug & review","code","Code"],
  ["Plan","Turn goals into action","route","Plan"],
  ["Act","Tasks & workflows","bolt","Act"]
];

const conversations=[
  ["Research the AI landscape","Today","Comparing capabilities, products and opportunities."],
  ["Create a cinematic concept","Yesterday","Developing an image concept and visual direction."],
  ["Plan my weekend","Sep 30","A practical plan with timing and options."],
  ["Explain this document","Sep 28","Breaking down the important points and next steps."]
];

const library=[
  ["RADHA concept","Creation · Today","image"],
  ["AI landscape research","Research · Yesterday","globe"],
  ["Project brief","Document · Sep 30","file"],
  ["Brand concept","Creation · Sep 26","image"],
  ["Launch checklist","Project · Sep 24","check"]
];

const state={
  page:"Home",chat:null,query:"",libraryFilter:"All",createType:"Image",mode:"Auto",
  composer:"",messages:[],toast:"",voice:false,workspaceTab:"Overview",settings:false,search:false,
  splash:true,activity:""
};

function icon(name,size=18){
 const p={
  home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v10h14V9"/><path d="M9 19v-6h6v6"/>',
  chat:'<path d="M20 11.5a8 8 0 0 1-8 8 9 9 0 0 1-4-.9L3 21l1.8-4.2A8 8 0 0 1 4 11.5a8 8 0 0 1 8-8 8 8 0 0 1 8 8Z"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-4-4-7 7"/>',
  library:'<path d="M4 5a2 2 0 0 1 2-2h14v17H6a2 2 0 0 0-2 2Z"/><path d="M4 5v15M8 7h8M8 11h7"/>',
  grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  send:'<path d="m4 4 16 8-16 8 3-8-3-8Z"/><path d="M7 12h13"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  camera:'<path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/>',
  paperclip:'<path d="m20 11-7.5 7.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-7.5 7.5a2 2 0 0 1-3-3L14 7"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
  chart:'<path d="M5 20V10M12 20V4M19 20v-7M3 20h18"/>',
  code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  bolt:'<path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/>',
  route:'<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a5 5 0 0 0 5-5V8"/>',
  spark:'<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/>',
  settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1A1.8 1.8 0 0 1 7.2 2.8l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0V2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-.9 3Z"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  chevron:'<path d="m9 18 6-6-6-6"/>',
  down:'<path d="m6 9 6 6 6-6"/>',
  arrow:'<path d="M5 12h13"/><path d="m13 6 6 6-6 6"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  share:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M5 12v7h14v-7"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>',
  play:'<path d="m8 5 11 7-11 7V5Z"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  refresh:'<path d="M20 11a8 8 0 0 0-14-4L4 9"/><path d="M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14 4l2-2"/><path d="M20 20v-5h-5"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 4.1 1.7c-.9.8-1.9 1.3-1.9 2.8M12 17h.01"/>'
 };
 return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(p[name]||p.spark)+'</svg>';
}
function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function button(cls,content,action,label=""){return '<button class="'+cls+'" data-action="'+action+'"'+(label?' aria-label="'+label+'"':'')+'>'+content+'</button>'}

function splash(){
 root.innerHTML='<div class="launch"><div class="launch-mark">R</div><div class="launch-word">RADHA</div></div>';
 setTimeout(()=>{state.splash=false;render()},900);
}

function navButton(n){
 return button("nav-item "+(state.page===n[0]?"active":""),icon(n[1],18)+"<span>"+n[0]+"</span>","page:"+n[0],n[0]);
}

function sidebar(){
 return '<aside class="sidebar">'+button("brand",'<span class="brand-mark">R</span><span class="brand-name">RADHA</span>',"page:Home","RADHA home")+
 '<button class="compose-nav" data-action="newchat">'+icon("spark",16)+'<span>New conversation</span><kbd>N</kbd></button>'+
 '<div class="side-section"><span>Navigate</span></div><nav class="side-nav">'+nav.map(navButton).join("")+'</nav>'+
 '<div class="side-section lower"><span>More</span></div>'+
 '<div class="side-mini">'+button("mini-item",icon("settings",17)+"<span>Settings</span>","settings")+'</div>'+
 button("mini-item",icon("grid",17)+"<span>Workspace</span>","page:Workspace")+
 '<div class="account"><span class="avatar">S</span><span><b>Swapnil</b><small>Personal space</small></span>'+icon("chevron",15)+'</div></aside>';
}

function topbar(){
 return '<header class="topbar"><div class="mobile-menu">'+button("icon-button",icon("plus",19),"newchat","New conversation")+'</div><div class="mobile-brand"><span class="brand-mark">R</span><b>RADHA</b></div><div class="topbar-title">'+(state.chat?esc(state.chat):state.page)+'</div><div class="topbar-actions">'+button("icon-button",icon("search",18),"search","Search")+button("avatar-button","S","profile","Profile")+'</div></header>';
}

function orb(){
 return '<div class="radha-orb" aria-hidden="true"><div class="orb-halo halo-a"></div><div class="orb-halo halo-b"></div><div class="orb-core"><span>R</span></div><i class="orb-dot dot-a"></i><i class="orb-dot dot-b"></i><i class="orb-dot dot-c"></i></div>';
}

function composer(){
 return '<div class="command-card"><div class="command-row"><button class="mode-pill" data-action="cyclemode">'+icon("spark",14)+'<span>'+state.mode+'</span>'+icon("down",12)+'</button><span class="command-hint">Ask, attach or speak</span></div><textarea id="home-input" placeholder="Ask RADHA anything…" aria-label="Ask RADHA anything">'+esc(state.composer)+'</textarea><div class="command-bottom"><div class="command-tools">'+button("tool-button",icon("plus",19),"attach","Add file")+button("tool-button",icon("paperclip",16)+"<span>File</span>","attach")+button("tool-button "+(state.voice?"active":""),icon("mic",16)+"<span>Voice</span>","voice")+button("tool-button",icon("camera",16)+"<span>Vision</span>","vision")+'</div>'+button("send-button "+(state.composer.trim()?"ready":"disabled"),icon("arrow",17),"sendhome","Send")+'</div></div>';
}

function home(){
 return '<section class="home-page"><div class="home-hero"><div class="hero-copy"><span class="eyebrow">RADHA</span><h1>What can I<br><em>help you with?</em></h1><p>Ask, create, research, analyze or get something done. Just tell RADHA what you need.</p></div>'+orb()+'</div>'+
 composer()+
 '<div class="capability-strip">'+capabilities.slice(0,4).map(c=>button("cap-card",'<span class="cap-symbol">'+icon(c[2],19)+'</span><span><b>'+c[0]+'</b><small>'+c[1]+'</small></span>'+icon("chevron",14),"cap:"+c[3])).join("")+'</div>'+
 '<div class="home-section-head"><div><b>Recent</b><span>Pick up a conversation.</span></div>'+button("text-button","See all "+icon("arrow",14),"page:Chats")+'</div>'+
 '<div class="continue-row">'+conversations.slice(0,3).map(c=>button("continue-card",'<span class="continue-icon">'+icon(c[0].includes("Research")?"globe":c[0].includes("Create")?"image":"chat",16)+'</span><span><b>'+esc(c[0])+'</b><small>'+esc(c[1])+'</small></span>'+icon("arrow",14),"chat:"+c[0])).join("")+'</div>'+
 '<div class="home-footer"><span><i></i> RADHA is ready</span></div></section>';
}

function chats(){
 const list=conversations.filter(c=>(c[0]+" "+c[2]).toLowerCase().includes(state.query.toLowerCase()));
 return '<section class="page chats-page"><div class="page-head"><div><span class="eyebrow">CONVERSATIONS</span><h1>Your conversations</h1><p>Every thread stays connected to your work.</p></div>'+button("primary-button",icon("plus",15)+"New conversation","newchat")+'</div>'+
 '<div class="search-field">'+icon("search",17)+'<input id="chat-search" value="'+esc(state.query)+'" placeholder="Search conversations…">'+(state.query?button("clear-button",icon("close",15),"clearsearch"):"")+'</div>'+
 (list.length?'<div class="thread-list">'+list.map(c=>button("thread",'<span class="thread-icon">'+icon("chat",17)+'</span><span class="thread-copy"><b>'+esc(c[0])+'</b><small>'+esc(c[2])+'</small></span><time>'+c[1]+'</time>'+icon("chevron",15),"chat:"+c[0])).join("")+'</div>':'<div class="empty-state">'+icon("search",25)+'<b>No conversations found</b><span>Try a different search.</span></div>')+
 '<div class="page-note">'+icon("clock",14)+' Conversations are saved to your RADHA workspace.</div></section>';
}

function conversation(){
 const title=esc(state.chat||"New conversation");
 const msgs=state.messages.length?state.messages:[
  {role:"user",text:state.chat?"Let's continue with this work.":"Let's start something new."},
  {role:"radha",text:"I'm ready. Give me a goal, a question, a file or an idea. I'll help turn it into a useful result."}
 ];
 return '<section class="conversation-page"><div class="conversation-bar">'+button("back-control",icon("back",18),"back","Back")+'<div class="conversation-name"><span class="status-dot"></span><b>'+title+'</b></div><div class="bar-actions">'+button("icon-button",icon("share",17),"toast:Share link ready","Share")+button("icon-button",icon("more",17),"toast:More actions ready","More")+'</div></div>'+
 '<div class="messages">'+msgs.map(m=>'<article class="message '+m.role+'"><span class="message-role">'+(m.role==="radha"?"RADHA":"YOU")+'</span><div>'+esc(m.text)+'</div>'+(m.role==="radha"?'<div class="response-tools">'+button("tiny-action",icon("copy",13),"toast:Copied","Copy")+button("tiny-action",icon("refresh",13),"toast:Response ready","Retry")+'</div>':"")+'</article>').join("")+'</div>'+
 '<div class="conversation-command"><div class="conversation-tools">'+button("tool-button",icon("plus",18),"attach","Add")+button("tool-button",icon("paperclip",16),"attach","File")+button("tool-button",icon("mic",16),"voice","Voice")+'</div><textarea id="conversation-input" placeholder="Continue with RADHA…"></textarea>'+button("send-button "+(state.composer.trim()?"ready":"disabled"),icon("arrow",17),"sendchat","Send")+'</div></section>';
}

function createPage(){
 const types=[["Image","image"],["Video","play"],["Document","file"]];
 return '<section class="page create-page"><div class="page-head"><div><span class="eyebrow">CREATE</span><h1>Make something real.</h1><p>Start with an idea. RADHA handles the heavy lifting.</p></div></div>'+
 '<div class="create-tabs">'+types.map(t=>button(state.createType===t[0]?"active":"",""+icon(t[1],16)+t[0],"create:"+t[0])).join("")+'</div>'+
 '<div class="create-grid"><div class="create-stage"><div class="stage-glow"></div><div class="stage-center">'+icon(state.createType==="Video"?"play":state.createType==="Document"?"file":"spark",30)+'<b>'+state.createType+' canvas</b><span>Your result will appear here</span></div></div>'+
 '<div class="create-panel"><div class="panel-title"><b>Describe the result</b><span>RADHA will refine it with you.</span></div><textarea id="create-input" placeholder="'+(state.createType==="Image"?"Describe the image, subject, style and mood…":state.createType==="Video"?"Describe the story, scenes, movement and sound…":"Describe the document, audience and outcome…")+'"></textarea><div class="control-grid"><label>Format<select><option>Adaptive</option><option>Landscape</option><option>Portrait</option><option>Square</option></select></label><label>Quality<select><option>High</option><option>Balanced</option><option>Fast</option></select></label></div>'+button("primary-button full-width",icon("spark",15)+"Prepare "+state.createType,"prepare-create")+'<small class="panel-foot">You can refine the result after the first pass.</small></div></div></section>';
}

function libraryPage(){
 const items=library.filter(x=>state.libraryFilter==="All"||x[1].startsWith(state.libraryFilter==="Files"?"Document":state.libraryFilter==="Creations"?"Creation":state.libraryFilter==="Projects"?"Project":"__"));
 return '<section class="page library-page"><div class="page-head"><div><span class="eyebrow">LIBRARY</span><h1>Your work, connected.</h1><p>Files, creations, research and projects — all in one place.</p></div>'+button("primary-button",icon("upload",15)+"Upload","attach")+'</div>'+
 '<div class="library-top"><div class="search-field">'+icon("search",17)+'<input id="library-search" placeholder="Search library…"></div><div class="filters">'+["All","Files","Creations","Projects"].map(f=>button(state.libraryFilter===f?"active":"",""+f,"library-filter:"+f)).join("")+'</div></div>'+
 '<div class="library-grid">'+items.map(x=>'<button class="library-item" data-action="toast:'+esc(x[0])+' opened"><span class="library-icon">'+icon(x[2],18)+'</span><span><b>'+esc(x[0])+'</b><small>'+esc(x[1])+'</small></span>'+icon("more",17)+'</button>').join("")+'</div>'+
 '<div class="drop-zone">'+icon("upload",22)+'<b>Drop files here</b><span>or use Upload to bring documents into RADHA.</span></div></section>';
}

function workspacePage(){
 const tabs=["Overview","Tasks","Automations","Memory","Insights"];
 let body="";
 if(state.workspaceTab==="Overview") body='<div class="workspace-intro"><span class="eyebrow">ADVANCED</span><h2>Work when you need it.</h2><p>Projects, tasks, automations and memory are here when a request needs more than a conversation.</p></div><div class="workspace-section"><div class="section-title"><b>Projects</b><span>3 active</span></div>'+["RADHA product","Creative work","Travel planning"].map((x,i)=>'<button class="project-item" data-action="toast:'+x+' opened"><span class="project-symbol">'+icon(i===0?"spark":i===1?"chart":"route",17)+'</span><span><b>'+x+'</b><small>'+(i===0?"Building the next-generation platform.":i===1?"Analysis and next actions.":"Places, timing and options.")+'</small></span>'+icon("chevron",15)+'</button>').join("")+'</div>';
 if(state.workspaceTab==="Tasks") body='<div class="task-stack">'+["Review product architecture","Finish research brief","Prepare Q4 summary","Organize project files"].map((x,i)=>'<div class="task-item"><button class="check-button" data-action="toast:Task completed">'+icon("check",14)+'</button><span><b>'+x+'</b><small>'+(i===0?"Today · High priority":i===1?"Tomorrow · Medium priority":"This week · Normal priority")+'</small></span>'+icon("chevron",15)+'</div>').join("")+'</div>';
 if(state.workspaceTab==="Automations") body='<div class="automation-hero"><span class="automation-icon">'+icon("bolt",22)+'</span><h2>Let RADHA keep the work moving.</h2><p>Schedule recurring research, reminders, summaries and condition-based follow-ups without turning the interface into a control panel.</p>'+button("primary-button","Create automation","toast:Automation builder ready")+'</div><div class="automation-list"><div><b>Morning brief</b><small>Daily · 8:00 AM · Ready</small></div><div><b>Project follow-up</b><small>When a task changes · Ready</small></div></div>';
 if(state.workspaceTab==="Memory") body='<div class="memory-panel"><span class="memory-icon">'+icon("spark",22)+'</span><h2>Context that makes RADHA useful.</h2><p>Memory should improve continuity without becoming clutter. Review, control and remove what RADHA keeps.</p><div class="memory-points"><span>✓ Helpful preferences</span><span>✓ Project context</span><span>✓ Conversation continuity</span></div>'+button("secondary-button","Review memory controls","settings")+'</div>';
 if(state.workspaceTab==="Insights") body='<div class="insights-grid">'+[["Momentum","High","Most active work is product building.","bolt"],["Focus","Build + Research","Your recent work spans creation and analysis.","chart"],["Next best action","Finish the UI foundation","Stabilize the core experience before provider integrations.","route"]].map(x=>'<div class="insight-card"><span class="insight-icon">'+icon(x[3],18)+'</span><b>'+x[0]+'</b><strong>'+x[1]+'</strong><small>'+x[2]+'</small></div>').join("")+'</div>';
 return '<section class="page workspace-page"><div class="page-head"><div><span class="eyebrow">MORE</span><h1>Advanced capabilities.</h1><p>Projects, tasks, automations, memory and insights stay connected.</p></div>'+button("primary-button",icon("plus",15)+"New project","toast:Project workspace ready")+'</div><div class="workspace-tabs">'+tabs.map(t=>button(state.workspaceTab===t?"active":"",t,"workspace:"+t)).join("")+'</div>'+body+'</section>';
}

function overlay(){
 return '<div class="modal-backdrop" data-action="close-overlay"><div class="command-modal" data-stop><div class="modal-search">'+icon("search",18)+'<input id="global-search" autofocus placeholder="Search RADHA…"><kbd>Esc</kbd></div><div class="modal-label">Quick actions</div>'+
 [["New conversation","Start a fresh thread","chat"],["Research","Open research workspace","globe"],["Create","Make an image, video or document","image"],["Tasks","See active work","clock"],["Settings","Preferences and privacy","settings"]].map(x=>button("modal-item",icon(x[2],17)+"<span><b>"+x[0]+"</b><small>"+x[1]+"</small></span>","modal:"+x[0])).join("")+'</div></div>';
}

function settingsSheet(){
 return '<div class="modal-backdrop" data-action="close-overlay"><div class="settings-panel" data-stop><div class="sheet-head"><div><span class="eyebrow">SETTINGS</span><h2>RADHA, your way.</h2></div>'+button("close-button",icon("close",18),"close-overlay")+'</div>'+
 '<div class="setting-row"><span><b>Appearance</b><small>Keep RADHA light, calm and readable.</small></span><span class="segmented"><button class="active">Light</button><button>Auto</button></span></div>'+
 '<div class="setting-row"><span><b>Motion</b><small>Use smooth transitions and subtle feedback.</small></span><button class="toggle on"><span></span></button></div>'+
 '<div class="setting-row"><span><b>Memory</b><small>Control what RADHA can retain.</small></span><button class="secondary-button">Manage</button></div>'+
 '<div class="setting-row"><span><b>Privacy</b><small>Provider keys belong on the server, never in the browser.</small></span>'+button("secondary-button","View","toast:Privacy controls ready")+'</div></div></div>';
}

function render(){
 if(state.splash)return splash();
 root.innerHTML='<div class="app"><div class="ambient ambient-one"></div><div class="ambient ambient-two"></div>'+sidebar()+'<main class="main">'+topbar()+'<div class="page-shell">'+(state.chat?conversation():state.page==="Home"?home():state.page==="Chats"?chats():state.page==="Create"?createPage():state.page==="Library"?libraryPage():workspacePage())+'</div></main><nav class="mobile-nav">'+nav.map(n=>button("mobile-tab "+(state.page===n[0]&&!state.chat?"active":""),icon(n[1],19)+"<span>"+n[0]+"</span>","page:"+n[0])).join("")+'</nav>'+(state.search?overlay():"")+(state.settings?settingsSheet():"")+(state.toast?'<div class="toast">'+icon("check",14)+esc(state.toast)+'</div>':"")+'</div>';
 bind();
 requestAnimationFrame(()=>document.querySelector(".page-shell")?.classList.add("page-enter"));
}

function bind(){
 const homeInput=document.getElementById("home-input");
 const chatInput=document.getElementById("conversation-input");
 if(homeInput){homeInput.addEventListener("input",e=>{state.composer=e.target.value;updateSend(homeInput.closest(".command-card"))});homeInput.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send("home")}});homeInput.addEventListener("focus",()=>homeInput.closest(".command-card")?.classList.add("focused"))}
 if(chatInput){chatInput.addEventListener("input",e=>{state.composer=e.target.value;updateSend(chatInput.closest(".conversation-command"))});chatInput.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send("chat")}})}
 const chatSearch=document.getElementById("chat-search"); if(chatSearch)chatSearch.addEventListener("input",e=>{state.query=e.target.value;render();requestAnimationFrame(()=>{const el=document.getElementById("chat-search");el?.focus();el?.setSelectionRange(el.value.length,el.value.length)})});
 const global=document.getElementById("global-search"); if(global)global.addEventListener("keydown",e=>{if(e.key==="Escape"){state.search=false;render()}});
}

function updateSend(card){const b=card?.querySelector(".send-button");if(b){b.classList.toggle("ready",!!state.composer.trim());b.classList.toggle("disabled",!state.composer.trim())}}

function navigate(page){
 state.chat=null;state.page=page;state.query="";state.composer="";
 if(document.startViewTransition)document.startViewTransition(()=>render());else{document.querySelector(".page-shell")?.classList.add("page-exit");setTimeout(render,80)}
}

function send(target){
 const text=state.composer.trim();if(!text)return;
 if(target==="home"){state.chat="New conversation";state.page="Chats";state.messages=[{role:"user",text},{role:"radha",text:"I have your request. The next RADHA layer will connect this command surface to real intelligence, tools and verification."}]}else{state.messages.push({role:"user",text},{role:"radha",text:"Received. RADHA is ready to work through this with you."})}
 state.composer="";
 render();
}

function toast(msg){state.toast=msg;render();setTimeout(()=>{state.toast="";render()},1700)}
function newChat(){state.chat="New conversation";state.page="Chats";state.messages=[];render()}
function openChat(title){state.chat=title;state.page="Chats";state.messages=[];render()}
function attach(){
 const input=document.createElement("input");input.type="file";input.multiple=true;input.accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.ppt,.pptx,.png,.jpg,.jpeg,.webp";
 input.onchange=()=>{const n=input.files?.length||0;toast(n?(n+" file"+(n>1?"s":"")+" added to this workspace"):"No file selected")};input.click();
}
function vision(){
 const input=document.createElement("input");input.type="file";input.accept="image/*";input.multiple=true;
 input.onchange=()=>{const n=input.files?.length||0;toast(n?(n+" image"+(n>1?"s":"")+" ready for vision"):"No image selected")};input.click();
}
function voice(){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){toast("Voice input is not supported in this browser");return}
 if(state.voice){window.__radhaRecognition?.stop();state.voice=false;render();return}
 const rec=new SR();rec.lang=navigator.language||"en-IN";rec.interimResults=true;rec.continuous=false;
 rec.onstart=()=>{state.voice=true;render()};
 rec.onresult=e=>{let t="";for(let i=e.resultIndex;i<e.results.length;i++)t+=e.results[i][0].transcript;state.composer=t;const input=document.getElementById(state.chat?"conversation-input":"home-input");if(input)input.value=t};
 rec.onend=()=>{state.voice=false;render()};
 rec.onerror=()=>{state.voice=false;toast("Voice input could not start")};
 window.__radhaRecognition=rec;rec.start();
}

document.addEventListener("click",e=>{
 const stop=e.target.closest("[data-stop]");if(stop)return;
 const el=e.target.closest("[data-action]");if(!el)return;
 const a=el.dataset.action;
 if(a.startsWith("page:")){navigate(a.slice(5));return}
 if(a==="newchat"){newChat();return}
 if(a.startsWith("chat:")){openChat(a.slice(5));return}
 if(a==="back"){state.chat=null;state.page="Chats";render();return}
 if(a==="search"){state.search=true;render();return}
 if(a==="settings"){state.settings=true;render();return}
 if(a==="close-overlay"||a==="profile"||a==="menu"){if(a==="profile"||a==="menu")toast(a==="menu"?"Navigation is always available below.":"Profile controls ready");else{state.search=false;state.settings=false;render()}return}
 if(a==="clearsearch"){state.query="";render();return}
 if(a==="cyclemode"){state.mode=state.mode==="Auto"?"Research":state.mode==="Research"?"Create":state.mode==="Create"?"Analyze":"Auto";render();return}
 if(a==="sendhome"){send("home");return}
 if(a==="sendchat"){send("chat");return}
 if(a==="attach"){attach();return}
 if(a==="vision"){vision();return}
 if(a==="voice"){voice();return}
 if(a.startsWith("cap:")){const c=a.slice(4);if(c==="Research"){state.page="Create";state.createType="Document"}else if(c==="Create")state.page="Create";else if(c==="Act"||c==="Plan")state.page="Workspace";else {state.chat=c;state.page="Chats"}render();return}
 if(a.startsWith("create:")){state.createType=a.slice(7);render();return}
 if(a==="prepare-create"){toast(state.createType+" workspace prepared");return}
 if(a.startsWith("library-filter:")){state.libraryFilter=a.slice(15);render();return}
 if(a.startsWith("workspace:")){state.workspaceTab=a.slice(10);render();return}
 if(a.startsWith("modal:")){const m=a.slice(6);state.search=false;if(m==="New conversation")newChat();else if(m==="Research"){state.page="Create";state.createType="Document";render()}else if(m==="Create"){state.page="Create";render()}else if(m==="Tasks"){state.page="Workspace";state.workspaceTab="Tasks";render()}else if(m==="Settings"){state.settings=true;render()}return}
 if(a.startsWith("toast:")){toast(a.slice(6));return}
});

document.addEventListener("keydown",e=>{
 if(e.key==="Escape"){if(state.search||state.settings){state.search=false;state.settings=false;render()}}
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();state.search=true;render()}
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="n"){e.preventDefault();newChat()}
});

splash();
