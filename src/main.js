const root=document.getElementById("root");

const threads=[
  ["Research the AI landscape","Today","Comparing capabilities, products and opportunities.","globe"],
  ["Create a cinematic concept","Yesterday","Developing an image concept and visual direction.","image"],
  ["Plan my weekend","Sep 30","A practical plan with timing and options.","calendar"],
  ["Explain this document","Sep 28","Breaking down the important points and next steps.","file"]
];

const state={view:"home",chat:null,query:"",composer:"",messages:[],search:false,tools:false,settings:false,library:false,voice:false,toast:"",splash:true};

function icon(n,s=18){
 const p={
  spark:'<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
  camera:'<path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-4-4-7 7"/>',
  file:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>',
  chart:'<path d="M5 20V10M12 20V4M19 20v-7M3 20h18"/>',
  code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15l.1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1A1.8 1.8 0 0 1 7.2 2.8l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0V2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3Z"/>',
  library:'<path d="M4 5a2 2 0 0 1 2-2h14v17H6a2 2 0 0 0-2 2Z"/><path d="M4 5v15M8 7h8M8 11h7"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  arrow:'<path d="M5 12h13"/><path d="m13 6 6 6-6 6"/>',
  check:'<path d="m5 12 4 4L19 6"/>'
 };
 return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(p[n]||p.spark)+'</svg>';
}
const esc=v=>String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const btn=(c,x,a,l="")=>'<button class="'+c+'" data-action="'+esc(a)+'"'+(l?' aria-label="'+esc(l)+'"':'')+'>'+x+'</button>';

function splash(){root.innerHTML='<div class="launch"><span>R</span><b>RADHA</b></div>';setTimeout(()=>{state.splash=false;render()},420)}

function topbar(){
 return '<header class="topbar">'+btn("top-add",icon("plus",18),"newchat","New chat")+
 '<button class="top-brand" data-action="home"><i>R</i><b>RADHA</b></button>'+
 '<div class="top-right">'+btn("top-icon",icon("search",18),"search","Search conversations")+'<button class="profile" data-action="profile" aria-label="Your settings">S</button></div></header>';
}
function composer(){
 return '<div class="composer"><textarea id="composer-input" placeholder="Ask RADHA anything…">'+esc(state.composer)+'</textarea>'+
 '<div class="composer-foot"><div class="composer-tools">'+btn("tool",icon("plus",19),"tools","Add")+btn("tool",icon("mic",17),"voice","Voice")+btn("tool",icon("camera",17),"vision","Vision")+'</div>'+
 btn("send "+(state.composer.trim()?"ready":""),icon("arrow",17),"send","Send")+'</div></div>';
}
function home(){
 const suggestions=[["Research the latest AI landscape","globe"],["Create a cinematic visual","image"],["Analyze this file for me","chart"]];
 return '<section class="home"><div class="home-copy"><span class="eyebrow">RADHA</span><h1>What can I help you with?</h1><p>Ask naturally. RADHA will figure out what needs to happen.</p></div>'+
 composer()+'<div class="suggestions"><span>Try asking</span>'+suggestions.map(x=>btn("suggestion",icon(x[1],14)+esc(x[0]),"starter:"+x[0])).join("")+'</div>'+
 '<section class="recent-section"><div class="section-head"><div><h2>Recent</h2><small>Continue where you left off</small></div>'+btn("quiet",icon("search",13)+"Search","search")+'</div>'+
 '<div class="recent-list">'+threads.map(t=>btn("recent-row",'<i>'+icon(t[3],16)+'</i><span><b>'+esc(t[0])+'</b><small>'+esc(t[1])+' · '+esc(t[2])+'</small></span><em>'+icon("arrow",14)+'</em>',"chat:"+t[0])).join("")+'</div></section></section>';
}
function conversation(){
 const ms=state.messages.length?state.messages:[{role:"radha",text:"I'm ready. Give me a question, idea, file or goal and we'll work through it together."}];
 return '<section class="conversation"><div class="conv-head">'+btn("back",icon("back",18),"home","Back")+'<span><i></i><b>'+esc(state.chat)+'</b></span>'+btn("top-icon",icon("more",17),"toast:More actions","More")+'</div>'+
 '<div class="messages">'+ms.map(m=>'<article class="'+m.role+'"><small>'+(m.role==="radha"?"RADHA":"YOU")+'</small><p>'+esc(m.text)+'</p></article>').join("")+'</div>'+composer()+'</section>';
}
function toolsSheet(){
 const tools=[["Files","Add documents, spreadsheets or PDFs","file","attach"],["Photos","Add images for vision or editing","image","vision"],["Search","Let RADHA research the web","globe","tool:Search"],["Create","Generate an image, video or document","spark","tool:Create"],["Analyze","Work with data and files","chart","tool:Analyze"],["Build","Create or edit software","code","tool:Build"]];
 return '<div class="overlay" data-action="close"><div class="sheet" data-stop><div class="sheet-head"><div><b>Give RADHA more context</b><small>Choose only when you need it.</small></div>'+btn("close",icon("close",18),"close","Close")+'</div>'+
 '<div class="tool-grid">'+tools.map(t=>btn("tool-card",icon(t[2],18)+'<span><b>'+t[0]+'</b><small>'+t[1]+'</small></span>',t[3])).join("")+'</div></div></div>';
}
function searchOverlay(){
 const q=state.query.toLowerCase(),list=threads.filter(t=>(t[0]+" "+t[2]).toLowerCase().includes(q));
 return '<div class="overlay" data-action="close"><div class="palette" data-stop><div class="palette-input">'+icon("search",18)+'<input id="global-search" value="'+esc(state.query)+'" autofocus placeholder="Search your conversations…"><kbd>Esc</kbd></div>'+
 '<div class="search-results">'+(list.length?list.map(t=>btn("search-row",'<i>'+icon(t[3],16)+'</i><span><b>'+esc(t[0])+'</b><small>'+esc(t[1])+' · '+esc(t[2])+'</small></span>',"chat:"+t[0])).join(""):'<div class="no-results">No matching conversations.</div>')+'</div></div></div>';
}
function profileSheet(){
 return '<div class="overlay" data-action="close"><div class="sheet profile-sheet" data-stop><div class="profile-head"><div><span class="eyebrow">YOU</span><h2>RADHA, your way.</h2></div>'+btn("close",icon("close",18),"close","Close")+'</div>'+
 '<div class="profile-row">'+icon("library",17)+'<span><b>Your library</b><small>Files and creations saved by RADHA.</small></span>'+btn("secondary","Open","library")+'</div>'+
 '<div class="profile-row">'+icon("settings",17)+'<span><b>Settings</b><small>Appearance, memory and privacy.</small></span>'+btn("secondary","Open","settings")+'</div></div></div>';
}
function libraryPage(){
 return '<div class="overlay" data-action="close"><div class="sheet library-sheet" data-stop><div class="profile-head"><div><span class="eyebrow">LIBRARY</span><h2>Your work</h2><small>Files and creations stay connected to RADHA.</small></div>'+btn("close",icon("close",18),"close","Close")+'</div>'+
 '<div class="library-list"><div class="library-item">'+icon("image",17)+'<span><b>RADHA concept</b><small>Creation · Today</small></span></div><div class="library-item">'+icon("globe",17)+'<span><b>AI landscape research</b><small>Research · Yesterday</small></span></div><div class="library-item">'+icon("file",17)+'<span><b>Project brief</b><small>Document · Sep 30</small></span></div></div>'+btn("secondary library-upload",icon("plus",14)+"Add files","attach")+'</div></div>';
}
function settingsSheet(){
 return '<div class="overlay" data-action="close"><div class="sheet profile-sheet" data-stop><div class="profile-head"><div><span class="eyebrow">SETTINGS</span><h2>Keep it simple.</h2></div>'+btn("close",icon("close",18),"close","Close")+'</div>'+
 '<div class="setting"><span><b>Appearance</b><small>Light, calm and readable.</small></span><strong>Light</strong></div>'+
 '<div class="setting"><span><b>Motion</b><small>Use smooth interface transitions.</small></span><button class="switch on"><i></i></button></div>'+
 '<div class="setting"><span><b>Memory</b><small>Control what RADHA can remember.</small></span>'+btn("secondary","Manage","toast:Memory controls ready")+'</div>'+
 '<div class="setting"><span><b>Privacy</b><small>Your provider credentials belong on the server.</small></span>'+btn("secondary","View","toast:Privacy controls ready")+'</div></div></div>';
}
function render(){
 if(state.splash)return splash();
 const content=state.chat?conversation():home();
 let overlay="";
 if(state.tools)overlay=toolsSheet();else if(state.search)overlay=searchOverlay();else if(state.library)overlay=libraryPage();else if(state.settings)overlay=settingsSheet();else if(state.view==="profile")overlay=profileSheet();
 root.innerHTML='<div class="app"><main>'+topbar()+'<div class="shell">'+content+'</div></main>'+overlay+(state.toast?'<div class="toast">'+icon("check",13)+esc(state.toast)+'</div>':"")+'</div>';
 bind();requestAnimationFrame(()=>document.querySelector(".shell")?.classList.add("enter"));
}
function bind(){
 const input=document.getElementById("composer-input");
 if(input){input.addEventListener("input",e=>{state.composer=e.target.value;updateComposer(input)});input.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}});requestAnimationFrame(()=>input.style.height=Math.min(input.scrollHeight,190)+"px")}
 const search=document.getElementById("global-search");
 if(search){search.addEventListener("input",e=>{state.query=e.target.value;render();requestAnimationFrame(()=>{const x=document.getElementById("global-search");x?.focus();x?.setSelectionRange(x.value.length,x.value.length)})});search.addEventListener("keydown",e=>{if(e.key==="Escape")closeOverlays()})}
}
function updateComposer(el){el.style.height="auto";el.style.height=Math.min(el.scrollHeight,190)+"px";el.closest(".composer")?.querySelector(".send")?.classList.toggle("ready",!!state.composer.trim())}
function closeOverlays(){state.search=false;state.tools=false;state.settings=false;state.library=false;state.view="home";state.query="";render()}
function newChat(){state.chat=null;state.messages=[];state.composer="";closeOverlays();requestAnimationFrame(()=>document.getElementById("composer-input")?.focus())}
function openChat(title){state.chat=title;state.messages=[];state.composer="";state.search=false;render()}
function send(){const t=state.composer.trim();if(!t)return;if(!state.chat)state.chat=t.length>48?t.slice(0,48)+"…":t;state.messages.push({role:"user",text:t},{role:"radha",text:"I have your request. RADHA is ready to work through it with you."});state.composer="";render()}
function toast(m){state.toast=m;render();setTimeout(()=>{if(state.toast===m){state.toast="";render()}},1400)}
function attach(){const i=document.createElement("input");i.type="file";i.multiple=true;i.accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.ppt,.pptx,.png,.jpg,.jpeg,.webp";i.onchange=()=>toast((i.files?.length||0)+" file"+((i.files?.length||0)!==1?"s":"")+" ready");i.click()}
function vision(){const i=document.createElement("input");i.type="file";i.accept="image/*";i.multiple=true;i.onchange=()=>toast((i.files?.length||0)+" image"+((i.files?.length||0)!==1?"s":"")+" ready");i.click()}
function voice(){
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return toast("Voice input is not supported in this browser");
 if(state.voice){window.__radha?.stop();state.voice=false;render();return}
 const r=new R();r.lang=navigator.language||"en-IN";r.interimResults=true;r.continuous=false;r.onstart=()=>{state.voice=true;render()};
 r.onresult=e=>{let t="";for(let i=e.resultIndex;i<e.results.length;i++)t+=e.results[i][0].transcript;state.composer=t;const el=document.getElementById("composer-input");if(el){el.value=t;updateComposer(el)}};
 r.onend=()=>{state.voice=false;render()};r.onerror=()=>{state.voice=false;toast("Voice input could not start")};window.__radha=r;r.start();
}
document.addEventListener("click",e=>{
 if(e.target.closest("[data-stop]"))return;
 const el=e.target.closest("[data-action]");if(!el)return;const a=el.dataset.action;
 if(a==="home"){state.chat=null;state.composer="";closeOverlays();return}
 if(a==="newchat")return newChat();
 if(a==="search"){state.search=true;state.query="";render();return}
 if(a==="tools"){state.tools=true;render();return}
 if(a==="profile"){state.view="profile";render();return}
 if(a==="library"){state.library=true;state.view="home";render();return}
 if(a==="settings"){state.settings=true;state.view="home";render();return}
 if(a==="close"||a==="back")return closeOverlays();
 if(a==="send")return send();
 if(a==="attach")return attach();
 if(a==="vision")return vision();
 if(a==="voice")return voice();
 if(a.startsWith("chat:"))return openChat(a.slice(5));
 if(a.startsWith("starter:")){state.composer=a.slice(8);render();requestAnimationFrame(()=>document.getElementById("composer-input")?.focus());return}
 if(a.startsWith("tool:")){const x=a.slice(5);state.tools=false;state.composer=x==="Search"?"Research the latest information about ":"";render();requestAnimationFrame(()=>document.getElementById("composer-input")?.focus());return}
 if(a.startsWith("toast:"))return toast(a.slice(6));
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&(state.search||state.tools||state.settings||state.library||state.view==="profile"))closeOverlays();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();state.search=true;state.query="";render()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="n"){e.preventDefault();newChat()}});
splash();