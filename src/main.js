const root=document.getElementById("root");

const nav=[
  ["Home","home"],["Chats","chat"],["Create","image"],["Library","library"],["Workspace","grid"]
];
const capabilities=[
  ["Research","Explore a topic","globe"],
  ["Create","Image, video or document","image"],
  ["Files","Read and work with files","file"],
  ["Analyze","Turn data into insight","chart"],
  ["Code","Build and review","code"],
  ["Plan","Shape the next step","grid"]
];
const recent=[
  ["Build a product roadmap","Today · Workspace","Plan"],
  ["Research the AI landscape","Yesterday · Research","Research"],
  ["Q4 performance analysis","Sep 30 · Analysis","Data"]
];
const conversations=[
  ["Build a product roadmap","Today","Turning the product direction into a clear sequence of releases."],
  ["Research the AI landscape","Yesterday","Comparing the current landscape, capabilities and opportunities."],
  ["Q4 performance analysis","Sep 30","A concise readout of performance, trends and next actions."],
  ["Travel plan for Kerala","Sep 28","A practical itinerary with places, timing and options."]
];

const state={page:"Home",chat:null,query:"",toast:"",mode:"Auto",createType:"Image",theme:"light",workspaceTab:"Overview"};

function icon(name,size=18){
 const p={
  home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v10h14V9"/><path d="M9 19v-6h6v6"/>',
  chat:'<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-4-.8L3 21l1.9-4.3A8.3 8.3 0 0 1 3 11.5a8.5 8.5 0 0 1 9-8.5 8.5 8.5 0 0 1 9 8.5Z"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-4-4-7 7"/>',
  library:'<path d="M4 5a2 2 0 0 1 2-2h14v17H6a2 2 0 0 0-2 2Z"/><path d="M4 5v15"/><path d="M8 7h8"/><path d="M8 11h7"/>',
  settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1A1.8 1.8 0 0 1 7.2 2.8l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0V2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-.9 3Z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  send:'<path d="m4 4 16 8-16 8 3-8-3-8Z"/><path d="M7 12h13"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  paperclip:'<path d="m20 11-7.5 7.5a5 5 0 0 1-7-7L13 4a3.5 3.5 0 0 1 5 5l-7.5 7.5a2 2 0 0 1-3-3L14 7"/>',
  chevron:'<path d="m9 18 6-6-6-6"/>',
  down:'<path d="m6 9 6 6 6-6"/>',
  arrow:'<path d="M5 12h13"/><path d="m13 6 6 6-6 6"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
  chart:'<path d="M5 20V10M12 20V4M19 20v-7"/><path d="M3 20h18"/>',
  code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  share:'<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 12v7h14v-7"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  copy:'<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  play:'<path d="m8 5 11 7-11 7V5Z"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>',
  book:'<path d="M5 4a2 2 0 0 1 2-2h12v17H7a2 2 0 0 0-2 2Z"/><path d="M5 4v17M9 7h6M9 11h6"/>',
  spark:'<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/>'
 };
 return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(p[name]||p.spark)+'</svg>';
}

function button(cls,content,action,label=""){return '<button class="'+cls+'" data-action="'+action+'"'+(label?' aria-label="'+label+'"':'')+'>'+content+'</button>'}
function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function splash(){
 root.innerHTML='<div class="splash"><div class="splash-mark">R</div><div class="splash-name">RADHA</div><p>One intelligence. Many capabilities.</p></div>';
 setTimeout(()=>render(),650);
}

function sidebar(){
 return '<aside class="sidebar">'+button("brand",'<span class="brand-mark">R</span><span>RADHA</span>',"home","RADHA home")+
 button("new-chat",icon("plus",17)+"New workspace","newchat")+
 '<div class="side-label">Workspace</div><nav class="side-nav">'+nav.map(n=>button("nav-item "+(state.page===n[0]?"active":""),icon(n[1],18)+"<span>"+n[0]+"</span>","page:"+n[0])).join("")+
 '</nav><div class="side-spacer"></div>'+button("side-link",icon("settings",18)+"<span>Settings</span>","settings")+
 '<div class="account"><button class="account-button" data-action="profile"><span class="avatar">S</span><span class="account-copy"><b>Swapnil</b><small>Personal workspace</small></span>'+icon("chevron",15)+'</button></div></aside>';
}

function topbar(){
 return '<header class="topbar"><div class="mobile-brand"><span class="brand-mark">R</span><b>RADHA</b></div><div class="topbar-actions">'+button("top-icon",icon("search",18),"search","Search")+button("top-avatar","S","profile","Profile")+'</div></header>';
}

function composer(){
 return '<div class="composer"><div class="composer-top">'+button("mode-button",icon("spark",15)+state.mode+icon("down",14),"cyclemode")+'</div><textarea id="home-input" placeholder="Ask anything…" aria-label="Ask anything"></textarea><div class="composer-bottom"><div class="composer-tools">'+button("round-tool",icon("plus",19),"attach","Attach file")+button("soft-tool",icon("paperclip",16)+"<span>Attach</span>","attach")+button("soft-tool",icon("mic",16)+"<span>Voice</span>","voice")+'</div>'+button("send-button disabled",icon("send",17),"sendhome","Send")+'</div></div>';
}

function home(){
 return '<section class="home"><div class="hero"><span class="eyebrow">ONE INTELLIGENCE · MANY CAPABILITIES</span><h1>What can we<br><em>work on?</em></h1><p>Ask a question, build something, research a topic, or turn an idea into a finished result.</p></div>'+
 composer()+
 '<div class="capability-grid">'+capabilities.map(c=>button("capability",'<span class="cap-icon">'+icon(c[2],17)+'</span><span class="cap-copy"><b>'+c[0]+'</b><small>'+c[1]+'</small></span>'+icon("arrow",15),"cap:"+c[0])).join("")+'</div>'+
 '<div class="section-heading"><div><h2>Recent work</h2><p>Pick up where you left off.</p></div>'+button("quiet-link","View all "+icon("chevron",14),"page:Chats")+'</div>'+
 '<div class="recent-grid">'+recent.map(r=>button("recent-card",'<div><span class="tag">'+r[2]+'</span><h3>'+r[0]+'</h3><p>'+r[1]+'</p></div>'+icon("arrow",16),"chat:"+r[0])).join("")+'</div></section>';
}

function chats(){
 const list=conversations.filter(c=>(c[0]+" "+c[2]).toLowerCase().includes(state.query.toLowerCase()));
 return '<section class="workspace chats-page"><div class="workspace-head"><div><span class="eyebrow">WORKSPACE</span><h1>Your conversations</h1><p>Continue a thread or start something new.</p></div>'+button("primary-button",icon("plus",16)+"New","newchat")+'</div>'+
 '<div class="search-field">'+icon("search",17)+'<input id="chat-search" value="'+esc(state.query)+'" placeholder="Search conversations…">'+(state.query?button("search-clear",icon("close",15),"clearsearch"):"")+'</div>'+
 (list.length?'<div class="conversation-list">'+list.map(c=>button("conversation-row",'<span class="conversation-icon">'+icon("chat",17)+'</span><span class="conversation-copy"><b>'+esc(c[0])+'</b><small>'+esc(c[2])+'</small></span><span class="conversation-time">'+c[1]+'</span>'+icon("chevron",16),"chat:"+c[0])).join("")+'</div>':'<div class="empty">'+icon("library",25)+'<h3>No conversations found</h3><p>Try another search term.</p></div>')+
 '<div class="quiet-link" style="margin-top:17px">Manage conversations '+icon("arrow",14)+'</div></section>';
}

function conversation(){
 const title=esc(state.chat||"New workspace");
 return '<section class="conversation"><div class="conversation-header">'+button("back-button",icon("back",17)+"<span>Chats</span>","back")+
 '<div class="conversation-title"><span class="live-dot"></span><b>'+title+'</b></div><div class="conversation-actions">'+button("",icon("share",17),"toast:Link copied","Share")+button("",icon("more",18),"toast:More actions ready","More")+'</div></div>'+
 '<div class="message-stream"><div class="message user"><div class="message-label">You</div><div class="message-body">'+(title==="New workspace"?"Let’s start a new workspace.":"Let’s continue with this work.")+'</div></div><div class="message system"><div class="message-label">RADHA</div><div class="message-body">The workspace is ready. Add context, files or a direction and we can take it from there.</div><div class="message-actions">'+button("",icon("copy",14),"toast:Copied","Copy")+button("",icon("library",14),"toast:Saved to library","Save")+'</div></div></div>'+
 '<div class="conversation-composer"><div class="mini-tools">'+button("",icon("plus",18),"toast:Attachment picker ready")+button("",icon("paperclip",16),"toast:Attachment picker ready")+'</div><textarea id="conversation-input" placeholder="Continue the conversation…"></textarea>'+button("send-button disabled",icon("send",17),"sendchat","Send")+'</div></section>';
}

function createPage(){
 const types=[["Image","image"],["Video","play"],["Document","file"]];
 return '<section class="workspace create-page"><div class="workspace-head"><div><span class="eyebrow">CREATE</span><h1>Make something</h1><p>Choose a format and shape the result with a focused workspace.</p></div></div>'+
 '<div class="create-tabs">'+types.map(t=>button(state.createType===t[0]?"active":"",""+icon(t[1],16)+t[0],"create:"+t[0])).join("")+'</div>'+
 '<div class="create-layout"><div class="create-preview"><div class="'+(state.createType==="Document"?"document-preview":"preview-art")+'">'+icon(state.createType==="Video"?"play":state.createType==="Document"?"book":"spark",28)+'<span>'+(state.createType==="Video"?"Video canvas":state.createType==="Document"?"Document canvas":"Creation preview")+'</span><small>'+(state.createType==="Video"?"Preview and refine scenes here":state.createType==="Document"?"Draft, structure and refine a finished document.":"Your result will appear here")+'</small></div></div>'+
 '<div class="create-panel"><label>Describe your idea<textarea placeholder="'+(state.createType==="Image"?"Describe the image you want…":state.createType==="Video"?"Describe the story, scene or motion…":"Describe the document and outcome…")+'"></textarea></label><div class="control-grid"><label>Format<select><option>Landscape</option><option>Portrait</option><option>Square</option></select></label><label>Quality<select><option>Balanced</option><option>Detailed</option><option>Fast</option></select></label></div>'+button("primary-button full",icon(state.createType==="Video"?"play":"spark",16)+"Prepare "+state.createType,"toast:"+state.createType+" workspace prepared")+'<p class="panel-note">You can refine the result after the first pass.</p></div></div></section>';
}

function library(){
 const items=[["Product roadmap.pdf","Document","Today","file"],["AI landscape research","Research","Yesterday","globe"],["Q4 analysis","Data","Sep 30","chart"],["Brand concept","Creation","Sep 28","image"]];
 return '<section class="workspace library-page"><div class="workspace-head"><div><span class="eyebrow">LIBRARY</span><h1>Your work, in one place.</h1><p>Files, creations and saved work stay easy to find.</p></div>'+button("secondary-button",icon("upload",16)+"Upload","toast:Upload picker ready")+'</div><div class="library-toolbar"><div class="search-field compact">'+icon("search",16)+'<input placeholder="Search library…"></div><div class="filter-pills"><button class="active">All</button><button>Files</button><button>Creations</button><button>Projects</button></div></div><div class="library-grid">'+items.map(i=>button("library-card",'<div class="library-icon">'+icon(i[3],18)+'</div><div class="library-card-copy"><b>'+i[0]+'</b><span>'+i[1]+' · '+i[2]+'</span></div>'+icon("more",17),"toast:"+i[0]+" opened")).join("")+'</div></section>';
}

function workspace(){
 const tabs=["Overview","Tasks","Memory","Insights"];
 const projects=[
  ["RADHA product","8 active items","Building the next-generation intelligence platform."],
  ["Q4 performance","3 files","Analysis, reporting and next actions."],
  ["Travel planning","2 conversations","A practical trip workspace."]
 ];
 const tasks=[
  ["Review product architecture","Today","High"],
  ["Finish research brief","Tomorrow","Medium"],
  ["Prepare Q4 summary","Friday","Low"]
 ];
 let body="";
 if(state.workspaceTab==="Overview") body='<div class="overview-grid"><div class="overview-main"><div class="overview-title"><span>Active projects</span>'+button("quiet-link","View all "+icon("arrow",13),"page:Library")+'</div>'+projects.map(p=>'<div class="project-row"><span class="project-icon">'+icon("grid",17)+'</span><span><b>'+p[0]+'</b><small>'+p[2]+'</small></span><em>'+p[1]+'</em>'+icon("chevron",15)+'</div>').join("")+'</div><div class="overview-side"><div class="stat-card"><span>Active work</span><strong>08</strong><small>Across projects and conversations</small></div><div class="stat-card"><span>Next task</span><strong>Today</strong><small>Review product architecture</small></div></div></div>';
 if(state.workspaceTab==="Tasks") body='<div class="task-list">'+tasks.map(t=>'<div class="task-row"><button class="task-check" data-action="toast:Task marked complete">'+icon("check",14)+'</button><span><b>'+t[0]+'</b><small>'+t[1]+'</small></span><em class="priority '+t[2].toLowerCase()+'">'+t[2]+'</em>'+icon("chevron",15)+'</div>').join("")+'</div>';
 if(state.workspaceTab==="Memory") body='<div class="memory-grid"><div class="memory-hero"><span class="memory-symbol">'+icon("spark",24)+'</span><h2>Useful context, under your control.</h2><p>RADHA can retain helpful preferences and project context without exposing internal routing or implementation details.</p>'+button("secondary-button","Review memory controls","settings")+'</div><div class="memory-list"><div><b>Product direction</b><small>RADHA is the next generation of SAARTHI.</small></div><div><b>Interface preference</b><small>Premium, light, calm and highly usable.</small></div><div><b>Work style</b><small>Direct answers with practical execution.</small></div></div></div>';
 if(state.workspaceTab==="Insights") body='<div class="insight-grid"><div class="insight-card"><span>'+icon("bolt",18)+'</span><b>Momentum</b><strong>High</strong><small>Most active work is concentrated on product building.</small></div><div class="insight-card"><span>'+icon("chart",18)+'</span><b>Recent focus</b><strong>Build + Research</strong><small>Recent work combines creation with analysis.</small></div><div class="insight-card"><span>'+icon("clock",18)+'</span><b>Next best action</b><strong>Finish the UI foundation</strong><small>Stabilize the core experience before provider integrations.</small></div></div>';
 return '<section class="workspace workspace-page"><div class="workspace-head"><div><span class="eyebrow">WORKSPACE</span><h1>Work that moves forward.</h1><p>Projects, tasks, memory and insights stay connected to the work you are doing.</p></div>'+button("primary-button",icon("plus",16)+"New project","toast:New project workspace ready")+'</div><div class="workspace-tabs">'+tabs.map(t=>'<button class="'+(state.workspaceTab===t?"active":"")+'" data-action="workspace-tab:'+t+'">'+t+'</button>').join("")+'</div>'+body+'</section>';
}

function overlay(type){
 if(type==="search")return '<div class="overlay" data-overlay="close"><div class="search-modal"><div class="modal-search">'+icon("search",18)+'<input id="overlay-search" autofocus placeholder="Search RADHA…" value="'+esc(state.query)+'">'+button("",icon("close",17),"closeoverlay")+'</div><div class="search-section-label">Conversations</div>'+conversations.slice(0,4).map(c=>button("search-result",icon("chat",16)+'<span><b>'+c[0]+'</b><small>'+c[2]+'</small></span>'+icon("chevron",15),"chat:"+c[0])).join("")+'<div class="search-section-label">Navigate</div>'+nav.slice(1).map(n=>button("search-result",icon(n[1],16)+'<span>'+n[0]+'</span>'+icon("chevron",15),"page:"+n[0])).join("")+'</div></div>';
 return '<div class="overlay" data-overlay="close"><div class="settings-sheet"><div class="sheet-head"><div><span class="eyebrow">PREFERENCES</span><h2>Settings</h2></div>'+button("",icon("close",18),"closeoverlay")+'</div><div class="setting-row"><span><b>Appearance</b><small>Keep the workspace light and calm.</small></span><div class="segmented">'+button(state.theme==="light"?"active":"","Light","theme:light")+button(state.theme==="soft"?"active":"","Soft","theme:soft")+'</div></div><div class="setting-row"><span><b>Interface motion</b><small>Use subtle transitions and feedback.</small></span><button class="toggle on" data-action="toast:Motion preference kept on"><span></span></button></div><div class="setting-row"><span><b>Notifications</b><small>Control workspace reminders.</small></span><button class="toggle" data-action="toast:Notifications preference updated"><span></span></button></div><button class="danger-link" data-action="toast:Account actions are protected">Account & privacy '+icon("arrow",14)+'</button></div></div>';
}

function render(){
 root.innerHTML='<div class="app '+(state.theme==="soft"?"soft-theme":"")+'"><div class="ambient ambient-one"></div><div class="ambient ambient-two"></div>'+sidebar()+'<main class="main">'+topbar()+'<div class="page-shell">'+
 (state.chat?conversation():state.page==="Home"?home():state.page==="Chats"?chats():state.page==="Create"?createPage():state.page==="Library"?library():workspace())+
 '</div><nav class="mobile-nav">'+nav.map(n=>button(state.page===n[0]&&!state.chat?"active":"",icon(n[1],19)+"<span>"+n[0]+"</span>","page:"+n[0])).join("")+'</nav></main></div>'+
 (state.overlay?overlay(state.overlay):"")+(state.toast?'<div class="toast">'+state.toast+'</div>':"");
}

function toast(msg){state.toast=msg;render();setTimeout(()=>{if(state.toast===msg){state.toast="";render()}},1700)}
function openChat(title){state.chat=title;state.page="Chats";render()}
function homeSend(){const el=document.getElementById("home-input");if(el&&el.value.trim())openChat(el.value.trim())}

document.addEventListener("click",e=>{
 const b=e.target.closest("[data-action]");
 if(b){
  const a=b.dataset.action;
  if(a==="home"||a==="page:Home"){state.page="Home";state.chat=null;state.overlay=null;render();return}
  if(a.startsWith("page:")){state.page=a.slice(5);state.chat=null;state.overlay=null;render();return}
  if(a==="newchat"){openChat("New workspace");return}
  if(a.startsWith("chat:")){openChat(a.slice(5));return}
  if(a==="search"){state.overlay="search";render();return}
  if(a==="settings"){state.overlay="settings";render();return}
  if(a==="profile"){toast("Profile menu ready");return}
  if(a==="closeoverlay"){state.overlay=null;render();return}
  if(a==="back"){state.chat=null;state.page="Chats";render();return}
  if(a==="cyclemode"){state.mode=state.mode==="Auto"?"Web":state.mode==="Web"?"Files":state.mode==="Files"?"Create":"Auto";render();return}
  if(a==="sendhome"){homeSend();return}
  if(a==="sendchat"){const el=document.getElementById("conversation-input");if(el&&el.value.trim())toast("Message queued in this workspace.");return}
  if(a==="attach"){toast("Attachment picker ready");return}
  if(a==="voice"){toast("Voice input ready");return}
  if(a.startsWith("cap:")){const name=a.slice(4);if(name==="Create")state.page="Create";else toast(name+" workspace ready");render();return}
  if(a.startsWith("create:")){state.createType=a.slice(7);render();return}
  if(a.startsWith("theme:")){state.theme=a.slice(6);render();return}
  if(a.startsWith("workspace-tab:")){state.workspaceTab=a.slice(15);render();return}
  if(a.startsWith("toast:")){toast(a.slice(6));return}
 }
 if(e.target.matches("[data-overlay=close]")){state.overlay=null;render()}
});

document.addEventListener("input",e=>{
 if(e.target.id==="home-input"){
  const send=e.target.closest(".composer")?.querySelector(".send-button");
  if(send){send.disabled=!e.target.value.trim();send.classList.toggle("disabled",!e.target.value.trim())}
 }
 if(e.target.id==="chat-search"){state.query=e.target.value;render();const el=document.getElementById("chat-search");if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length)}}
 if(e.target.id==="overlay-search"){state.query=e.target.value;render();state.overlay="search";const el=document.getElementById("overlay-search");if(el){el.focus();el.setSelectionRange(el.value.length,el.value.length)}}
 if(e.target.id==="conversation-input"){
  const send=e.target.closest(".conversation-composer")?.querySelector(".send-button");
  if(send){send.disabled=!e.target.value.trim();send.classList.toggle("disabled",!e.target.value.trim())}
 }
});

document.addEventListener("keydown",e=>{
 if(e.key==="Enter"&&!e.shiftKey&&e.target.id==="home-input"){e.preventDefault();homeSend()}
 if(e.key==="Escape"&&state.overlay){state.overlay=null;render()}
});

splash();