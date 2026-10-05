const root=document.getElementById("root");

const recent=[
  {title:"Research the AI landscape",meta:"Today · Research",icon:"globe"},
  {title:"Create a cinematic concept",meta:"Yesterday · Creation",icon:"image"},
  {title:"Plan my weekend",meta:"Sep 30 · Planning",icon:"calendar"},
  {title:"Explain this document",meta:"Sep 28 · Files",icon:"file"}
];

const state={
  splash:true,
  chat:null,
  composer:"",
  messages:[],
  overlay:null,
  query:"",
  working:false,
  toast:"",
  voice:false
};

function icon(name,size=18){
 const p={
  spark:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  camera:'<path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/>',
  file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-4-4-7 7"/>',
  chart:'<path d="M5 20V10M12 20V4M19 20v-7M3 20h18"/>',
  code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  library:'<path d="M4 5a2 2 0 0 1 2-2h14v17H6a2 2 0 0 0-2 2Z"/><path d="M4 5v15M8 7h8M8 11h7"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L6 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4.7v-2.4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L6 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.6 1Z"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  arrow:'<path d="M5 12h13M13 6l6 6-6 6"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  refresh:'<path d="M20 11a8 8 0 0 0-14.9-3M4 5v4h4M4 13a8 8 0 0 0 14.9 3M20 19v-4h-4"/>'
 };
 return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(p[name]||p.spark)+'</svg>';
}
const esc=v=>String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const action=(cls,content,a,label="")=>'<div class="'+cls+'" role="button" tabindex="0" data-action="'+esc(a)+'"'+(label?' aria-label="'+esc(label)+'"':'')+'>'+content+'</div>';

function topbar(){
 return '<header class="topbar">'+
 action("icon-btn",icon("plus",19),"new","New conversation")+
 action("brand",'<img src="./assets/radha-mark.svg" alt="" /><b>RADHA</b>',"home","RADHA")+
 '<div class="top-actions">'+action("icon-btn",icon("search",18),"search","Search")+
 action("avatar","S","profile","Profile")+'</div></header>';
}

function composer(){
 return '<div class="composer">'+
 '<textarea id="composer" rows="1" placeholder="Ask RADHA anything…">'+esc(state.composer)+'</textarea>'+
 '<div class="composer-bottom"><div class="composer-left">'+
 action("mini-btn",icon("plus",18),"tools","Add context")+
 action("mini-btn",icon("mic",17),"voice","Voice")+
 action("mini-btn",icon("camera",17),"vision","Image")+
 '</div>'+action("send-btn "+(state.composer.trim()?"ready":""),icon("arrow",17),"send","Send")+
 '</div></div>';
}

function home(){
 return '<section class="home">'+
 '<div class="hero">'+
 ''+
 '<h1>What are we<br><em>working on?</em></h1>'+
 '<p>Tell RADHA what you want to accomplish. We’ll work it out together.</p>'+
 '</div>'+
 composer()+
 '<div class="quick-row">'+
 action("quick",icon("globe",15)+"Research","prompt:Research the latest information about ") +
 action("quick",icon("file",15)+"Analyze files","tools")+
 action("quick",icon("image",15)+"Create","prompt:Create ")+
 action("quick",icon("code",15)+"Build","prompt:Build ")+
 '</div>'+
 '<section class="recent-section"><div class="section-title"><div><span>CONTINUE</span><h2>Recent work</h2></div>'+
 action("text-btn",icon("search",14)+"Search","search")+'</div>'+
 '<div class="recent-list">'+recent.map(r=>action("recent-row",'<i>'+icon(r.icon,16)+'</i><span><b>'+esc(r.title)+'</b><small>'+esc(r.meta)+'</small></span>'+icon("arrow",15),"chat:"+r.title)).join("")+
 '</div></section></section>';
}

function conversation(){
 const messages=state.messages.length?state.messages:[
  {role:"radha",text:"I'm ready. Tell me the outcome you want, and I'll work out the steps."}
 ];
 return '<section class="conversation">'+
 '<div class="conversation-head">'+action("back-btn",icon("back",18),"home","Back")+
 '<div class="conversation-title"><i></i><span>'+esc(state.chat||"RADHA")+'</span></div>'+
 action("icon-btn",icon("more",17),"more","More")+'</div>'+
 '<div class="messages">'+messages.map(m=>'<article class="'+m.role+'">'+
 (m.role==="radha"?'<div class="message-mark">R</div>':'')+
 '<div class="message-body"><small>'+ (m.role==="radha"?"RADHA":"YOU")+'</small><p>'+esc(m.text)+'</p></div></article>').join("")+
 (state.working?'<div class="working"><i></i><span>RADHA is working</span><em></em><em></em><em></em></div>':"")+
 '</div>'+composer()+'</section>';
}

function toolsSheet(){
 const items=[
  ["file","Files","PDFs, documents, spreadsheets","attach"],
  ["image","Photos","Images for understanding or creation","vision"],
  ["globe","Research","Search and investigate","prompt:Research the latest information about "],
  ["spark","Create","Images, video, documents","prompt:Create "],
  ["chart","Analyze","Data and structured information","prompt:Analyze "],
  ["code","Build","Software, websites and code","prompt:Build "]
 ];
 return overlay('<div class="sheet"><div class="sheet-head"><div><span>CONTEXT</span><h2>Give RADHA more to work with.</h2><p>Add something only when the task needs it.</p></div>'+action("close-btn",icon("close",18),"close","Close")+'</div>'+
 '<div class="context-grid">'+items.map(x=>action("context-card",icon(x[0],19)+'<span><b>'+x[1]+'</b><small>'+x[2]+'</small></span>',x[3])).join("")+'</div></div>');
}

function searchSheet(){
 const q=state.query.toLowerCase();
 const list=recent.filter(r=>(r.title+" "+r.meta).toLowerCase().includes(q));
 return '<div class="overlay top-overlay" data-action="close"><div class="search-panel" data-stop>'+
 '<div class="search-input">'+icon("search",18)+'<input id="search-input" autofocus value="'+esc(state.query)+'" placeholder="Search conversations and work"><kbd>Esc</kbd></div>'+
 '<div class="search-list">'+(list.length?list.map(r=>action("search-item",icon(r.icon,16)+'<span><b>'+esc(r.title)+'</b><small>'+esc(r.meta)+'</small></span>',"chat:"+r.title)).join(""):'<div class="empty">No matching work.</div>')+'</div></div></div>';
}

function profileSheet(){
 return overlay('<div class="sheet narrow"><div class="sheet-head"><div><span>YOU</span><h2>RADHA, your way.</h2><p>Everything important stays close.</p></div>'+action("close-btn",icon("close",18),"close","Close")+'</div>'+
 action("profile-link",icon("library",18)+'<span><b>Your library</b><small>Files, reports and creations</small></span>'+icon("arrow",15),"library")+
 action("profile-link",icon("settings",18)+'<span><b>Settings</b><small>Appearance, memory and privacy</small></span>'+icon("arrow",15),"settings")+
 '</div>');
}

function librarySheet(){
 return overlay('<div class="sheet narrow"><div class="sheet-head"><div><span>LIBRARY</span><h2>Your work.</h2><p>Everything RADHA has helped you create.</p></div>'+action("close-btn",icon("close",18),"close","Close")+'</div>'+
 '<div class="library-items">'+
 '<div>'+icon("image",17)+'<span><b>RADHA concept</b><small>Creation · Today</small></span></div>'+
 '<div>'+icon("globe",17)+'<span><b>AI landscape research</b><small>Research · Yesterday</small></span></div>'+
 '<div>'+icon("file",17)+'<span><b>Project brief</b><small>Document · Sep 30</small></span></div>'+
 '</div>'+action("secondary",""+icon("plus",15)+" Add files","attach")+'</div>');
}

function settingsSheet(){
 return overlay('<div class="sheet narrow"><div class="sheet-head"><div><span>SETTINGS</span><h2>Keep it simple.</h2><p>Control how RADHA behaves for you.</p></div>'+action("close-btn",icon("close",18),"close","Close")+'</div>'+
 setting("Appearance","Light, calm and readable.","Light")+
 setting("Memory","Use approved context across conversations.","Manage")+
 setting("Privacy","Control data and connected services.","View")+
 setting("Motion","Smooth interface transitions.","On")+
 '</div>');
}
function setting(a,b,c){return '<div class="setting"><span><b>'+a+'</b><small>'+b+'</small></span><strong>'+c+'</strong></div>'}

function overlay(inner){return '<div class="overlay" data-action="close">'+inner+'</div>'}

function render(){
 if(state.splash){root.innerHTML='<div class="launch"><img class="launch-mark" src="./assets/radha-mark.svg" alt="RADHA"><b>RADHA</b><small>ONE INTELLIGENCE</small></div>';return}
 let body=state.chat?conversation():home();
 let modal="";
 if(state.overlay==="tools")modal=toolsSheet();
 if(state.overlay==="search")modal=searchSheet();
 if(state.overlay==="profile")modal=profileSheet();
 if(state.overlay==="library")modal=librarySheet();
 if(state.overlay==="settings")modal=settingsSheet();
 root.innerHTML='<div class="app"><main>'+topbar()+'<div class="shell">'+body+'</div></main>'+modal+
 (state.toast?'<div class="toast">'+icon("check",13)+esc(state.toast)+'</div>':"")+'</div>';
 bind();
 requestAnimationFrame(()=>document.querySelector(".shell")?.classList.add("enter"));
}

function bind(){
 const input=document.getElementById("composer");
 if(input){
  input.addEventListener("input",e=>{state.composer=e.target.value;resizeComposer(input)});
  input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}});
  requestAnimationFrame(()=>resizeComposer(input));
 }
 const search=document.getElementById("search-input");
 if(search){
  search.addEventListener("input",e=>{state.query=e.target.value;render();requestAnimationFrame(()=>{const x=document.getElementById("search-input");x?.focus();x?.setSelectionRange(x.value.length,x.value.length)})});
  search.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 }
}
function resizeComposer(el){el.style.height="auto";el.style.height=Math.min(el.scrollHeight,180)+"px";document.querySelector(".send-btn")?.classList.toggle("ready",!!state.composer.trim())}
function close(){state.overlay=null;state.query="";render()}
function newChat(){state.chat=null;state.messages=[];state.composer="";close();requestAnimationFrame(()=>document.getElementById("composer")?.focus())}
function openChat(title){state.chat=title;state.messages=[];state.composer="";state.overlay=null;render()}
const RADHA_API_BASE=(window.RADHA_API_URL||"/api").replace(/\/$/,"");

async function send(){
 const text=state.composer.trim();if(!text||state.working)return;
 if(!state.chat)state.chat=text.length>50?text.slice(0,50)+"…":text;
 state.messages.push({role:"user",text});
 state.composer="";
 state.working=true;
 render();
 try{
  const response=await fetch(RADHA_API_BASE+"/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,context:{timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC"}})});
  if(!response.ok)throw new Error("gateway unavailable");
  const data=await response.json();
  state.messages.push({role:"radha",text:data.reply||"RADHA completed the request without a response."});
 }catch(error){
  state.messages.push({role:"radha",text:"RADHA is ready, but its intelligence gateway is not reachable from this deployment yet."});
 }finally{
  state.working=false;
  render();
 }
}
function prompt(v){state.composer=v;state.overlay=null;render();requestAnimationFrame(()=>document.getElementById("composer")?.focus())}
function toast(m){state.toast=m;render();setTimeout(()=>{if(state.toast===m){state.toast="";render()}},1500)}
function attach(){
 const i=document.createElement("input");i.type="file";i.multiple=true;i.accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.ppt,.pptx,.png,.jpg,.jpeg,.webp";i.onchange=()=>toast((i.files?.length||0)+" file"+((i.files?.length||0)!==1?"s":"")+" ready");i.click();
}
function vision(){
 const i=document.createElement("input");i.type="file";i.accept="image/*";i.multiple=true;i.onchange=()=>toast((i.files?.length||0)+" image"+((i.files?.length||0)!==1?"s":"")+" ready");i.click();
}
function voice(){
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!R)return toast("Voice input is not supported here");
 if(state.voice){window.__radha?.stop();return}
 const r=new R();r.lang=navigator.language||"en-IN";r.interimResults=true;r.continuous=false;
 r.onstart=()=>{state.voice=true;render()};
 r.onresult=e=>{let t="";for(let i=e.resultIndex;i<e.results.length;i++)t+=e.results[i][0].transcript;state.composer=t;const el=document.getElementById("composer");if(el){el.value=t;resizeComposer(el)}};
 r.onend=()=>{state.voice=false;render()};r.onerror=()=>{state.voice=false;toast("Voice input could not start")};window.__radha=r;r.start();
}

document.addEventListener("click",e=>{
 const el=e.target.closest("[data-action]");if(!el)return;
 const a=el.dataset.action;
 if(a==="close"&&e.target.closest("[data-stop]"))return;
 if(a==="new")return newChat();
 if(a==="home")return newChat();
 if(a==="search"){state.overlay="search";state.query="";return render()}
 if(a==="profile"){state.overlay="profile";return render()}
 if(a==="tools"){state.overlay="tools";return render()}
 if(a==="close")return close();
 if(a==="send")return send();
 if(a==="attach")return attach();
 if(a==="vision")return vision();
 if(a==="voice")return voice();
 if(a==="library"){state.overlay="library";return render()}
 if(a==="settings"){state.overlay="settings";return render()}
 if(a==="more")return toast("More actions are coming with the intelligence layer.");
 if(a.startsWith("chat:"))return openChat(a.slice(5));
 if(a.startsWith("prompt:"))return prompt(a.slice(7));
});

document.addEventListener("keydown",e=>{
 const target=e.target?.closest?.("[role=button][data-action]");
 if(target&&(e.key==="Enter"||e.key===" ")){e.preventDefault();target.click();return}
 if(e.key==="Escape"&&state.overlay)close();
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();state.overlay="search";state.query="";render()}
 if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="n"){e.preventDefault();newChat()}
});

setTimeout(()=>{state.splash=false;render()},520);
