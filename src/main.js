const root=document.getElementById("root");

const nav=[["Home","home"],["Chats","chat"],["Create","image"],["Library","library"]];
const threads=[
 ["Research the AI landscape","Today","Comparing capabilities, products and opportunities.","globe"],
 ["Create a cinematic concept","Yesterday","Developing an image concept and visual direction.","image"],
 ["Plan my weekend","Sep 30","A practical plan with timing and options.","chat"],
 ["Explain this document","Sep 28","Breaking down the important points and next steps.","file"]
];
const library=[
 ["RADHA concept","Creation","Today","image"],
 ["AI landscape research","Research","Yesterday","globe"],
 ["Project brief","Document","Sep 30","file"],
 ["Brand concept","Creation","Sep 26","image"],
 ["Launch checklist","Project","Sep 24","check"]
];

const state={page:"Home",chat:null,query:"",filter:"All",create:"Image",composer:"",messages:[],search:false,settings:false,voice:false,toast:"",splash:true};

function icon(n,s=18){
 const p={
  home:'<path d="m3 10 9-7 9 7"/><path d="M5 9v10h14V9"/><path d="M9 19v-6h6v6"/>',
  chat:'<path d="M20 11.5a8 8 0 0 1-8 8 9 9 0 0 1-4-.9L3 21l1.8-4.2A8 8 0 0 1 4 11.5a8 8 0 0 1 8-8 8 8 0 0 1 8 8Z"/>',
  image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-4-4-7 7"/>',
  library:'<path d="M4 5a2 2 0 0 1 2-2h14v17H6a2 2 0 0 0-2 2Z"/><path d="M4 5v15M8 7h8M8 11h7"/>',
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
  spark:'<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/>',
  settings:'<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15l.1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1A1.8 1.8 0 0 1 7.2 2.8l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0V2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3Z"/>',
  more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  back:'<path d="m15 18-6-6 6-6"/>',
  arrow:'<path d="M5 12h13"/><path d="m13 6 6 6-6 6"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>',
  play:'<path d="m8 5 11 7-11 7V5Z"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  copy:'<path d="M8 8h10v10H8z"/><path d="M6 16H4V4h12v2"/>'
 };
 return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(p[n]||p.spark)+'</svg>';
}
const esc=v=>String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const btn=(c,x,a,l="")=>'<button class="'+c+'" data-action="'+esc(a)+'"'+(l?' aria-label="'+esc(l)+'"':'')+'>'+x+'</button>';

function splash(){root.innerHTML='<div class="launch"><span>R</span><b>RADHA</b></div>';setTimeout(()=>{state.splash=false;render()},500)}
function sidebar(){
 return '<aside class="sidebar">'+btn("brand",'<i>R</i><b>RADHA</b>','page:Home','RADHA home')+
 btn("new-chat",icon("plus",16)+"<span>New chat</span>","newchat")+
 '<nav>'+nav.map(n=>btn("nav-link "+(state.page===n[0]&&!state.chat?"active":""),icon(n[1],17)+"<span>"+n[0]+"</span>","page:"+n[0],n[0])).join("")+'</nav>'+
 '<div class="side-bottom">'+btn("side-link",icon("search",16)+"<span>Search</span>","search")+btn("side-link",icon("settings",16)+"<span>Settings</span>","settings")+
 '<div class="account"><i>S</i><span><b>Swapnil</b><small>Personal</small></span></div></div></aside>';
}
function topbar(){
 return '<header class="topbar">'+btn("mobile-add",icon("plus",19),"newchat","New chat")+
 '<button class="mobile-brand" data-action="page:Home"><i>R</i><b>RADHA</b></button>'+
 '<strong>'+esc(state.chat||state.page)+'</strong><div class="top-actions">'+btn("top-icon",icon("search",18),"search","Search")+'<span class="profile">S</span></div></header>';
}
function composer(target="home"){
 const id=target==="home"?"home-input":"chat-input";
 return '<div class="composer"><div class="composer-meta"><span>'+icon("spark",13)+' Auto</span><small>RADHA decides how to help</small></div>'+
 '<textarea id="'+id+'" placeholder="'+(target==="home"?"Ask RADHA anything…":"Continue with RADHA…")+'">'+esc(state.composer)+'</textarea>'+
 '<div class="composer-foot"><div>'+btn("tool",icon("plus",19),"attach","Add files")+btn("tool",icon("mic",17),"voice","Voice")+btn("tool",icon("camera",17),"vision","Vision")+'</div>'+
 btn("send "+(state.composer.trim()?"ready":""),icon("arrow",17),target==="home"?"sendhome":"sendchat","Send")+'</div></div>';
}
function home(){
 const suggestions=[
  ["Research the latest AI landscape","globe"],
  ["Create a cinematic visual concept","image"],
  ["Analyze a file and find the key insights","chart"]
 ];
 return '<section class="home"><div class="home-copy"><span class="eyebrow">RADHA</span><h1>What can I help you with?</h1><p>Ask naturally. RADHA figures out the right way to help.</p></div>'+
 composer()+
 '<div class="suggestions"><span>Try asking</span>'+suggestions.map(x=>btn("suggestion",icon(x[1],14)+esc(x[0]),"starter:"+x[0])).join("")+'</div>'+
 '<div class="section-head"><div><h2>Recent</h2><small>Pick up where you left off</small></div>'+btn("quiet","See all "+icon("arrow",13),"page:Chats")+'</div>'+
 '<div class="recent">'+threads.slice(0,3).map(t=>btn("recent-item",'<i>'+icon(t[3],16)+'</i><span><b>'+esc(t[0])+'</b><small>'+esc(t[1])+'</small></span><em>'+icon("arrow",13)+'</em>',"chat:"+t[0])).join("")+'</div></section>';
}
function chatsPage(){
 const q=state.query.toLowerCase(),list=threads.filter(t=>(t[0]+" "+t[2]).toLowerCase().includes(q));
 return '<section class="page"><div class="page-heading"><span class="eyebrow">CHATS</span><h1>Your conversations</h1><p>Everything you ask RADHA stays connected.</p><div class="heading-action">'+btn("secondary",icon("plus",14)+"New chat","newchat")+'</div></div>'+
 '<div class="search-box">'+icon("search",17)+'<input id="chat-search" value="'+esc(state.query)+'" placeholder="Search conversations…"></div>'+
 (list.length?'<div class="list">'+list.map(t=>btn("list-row",'<i>'+icon("chat",17)+'</i><span><b>'+esc(t[0])+'</b><small>'+esc(t[2])+'</small></span><time>'+t[1]+'</time>'+icon("arrow",14),"chat:"+t[0])).join("")+'</div>':
 '<div class="empty">'+icon("search",25)+'<b>No conversations found</b><small>Try another search.</small></div>')+
 '</section>';
}
function conversation(){
 const ms=state.messages.length?state.messages:[{role:"radha",text:"I'm ready. Give me a question, idea, file or goal and we'll work through it together."}];
 return '<section class="conversation"><div class="conv-head">'+btn("back",icon("back",18),"back","Back")+'<span><i></i><b>'+esc(state.chat)+'</b></span>'+btn("top-icon",icon("more",17),"toast:More actions","More")+'</div>'+
 '<div class="messages">'+ms.map(m=>'<article class="'+m.role+'"><small>'+ (m.role==="radha"?"RADHA":"YOU")+'</small><p>'+esc(m.text)+'</p></article>').join("")+'</div>'+composer("chat")+'</section>';
}
function createPage(){
 const types=[["Image","image"],["Video","play"],["Document","file"]];
 const ph={Image:"Describe what you want to create…",Video:"Describe the scene, movement and mood…",Document:"Describe the document and its outcome…"};
 return '<section class="page create-page"><div class="page-heading"><span class="eyebrow">CREATE</span><h1>Make something.</h1><p>Give RADHA the idea. Refine the result together.</p></div>'+
 '<div class="create-tabs">'+types.map(t=>btn(state.create===t[0]?"active":"",icon(t[1],16)+t[0],"create:"+t[0])).join("")+'</div>'+
 '<div class="create-layout"><div class="create-brief"><label>Your idea<small>Start simple. RADHA can help shape the prompt.</small></label><textarea id="create-input" placeholder="'+ph[state.create]+'"></textarea><div class="create-controls"><button>Adaptive⌄</button><button>High quality⌄</button>'+btn("primary",icon("spark",14)+"Create","prepare-create")+'</div></div>'+
 '<div class="create-preview"><div class="preview-icon">'+icon(state.create==="Video"?"play":state.create==="Document"?"file":"image",22)+'</div><b>Nothing created yet</b><small>Your first result will appear here.</small></div></div></section>';
}
function libraryPage(){
 const q=state.query.toLowerCase(),fs=["All","Files","Creations","Research"];
 const list=library.filter(x=>(state.filter==="All"||(state.filter==="Files"&&["Document","Project"].includes(x[1]))||(state.filter==="Creations"&&x[1]==="Creation")||(state.filter==="Research"&&x[1]==="Research"))&&(x[0]+" "+x[1]).toLowerCase().includes(q));
 return '<section class="page library-page"><div class="page-heading library-heading"><span class="eyebrow">LIBRARY</span><h1>Your work.</h1><p>Files, creations and research in one place.</p><div class="heading-action">'+btn("secondary",icon("upload",14)+"Upload","attach")+'</div></div>'+
 '<div class="library-tools"><div class="search-box">'+icon("search",17)+'<input id="library-search" value="'+esc(state.query)+'" placeholder="Search library…"></div><div class="filters">'+fs.map(f=>btn(state.filter===f?"active":"",f,"filter:"+f)).join("")+'</div></div>'+
 (list.length?'<div class="list">'+list.map(x=>btn("list-row",'<i>'+icon(x[3],17)+'</i><span><b>'+esc(x[0])+'</b><small>'+x[1]+' · '+x[2]+'</small></span>'+icon("more",16),"toast:"+x[0]+" opened")).join("")+'</div>':'<div class="empty">'+icon("search",25)+'<b>No library items found</b><small>Try another filter.</small></div>')+
 '<button class="drop-zone" data-action="attach">'+icon("upload",19)+'<span><b>Drop files here</b><small>or tap to add a document</small></span></button></section>';
}
function overlay(){
 return '<div class="overlay" data-action="close"><div class="palette" data-stop><div class="palette-input">'+icon("search",18)+'<input id="global-search" autofocus placeholder="Search RADHA…"><kbd>Esc</kbd></div><small>QUICK ACTIONS</small>'+
 [["New chat","Start a fresh conversation","chat"],["Create","Make something","image"],["Library","Open your files","library"],["Settings","Preferences and privacy","settings"]].map(x=>btn("palette-row",icon(x[2],17)+'<span><b>'+x[0]+'</b><em>'+x[1]+'</em></span>','palette:'+x[0])).join("")+'</div></div>';
}
function settings(){
 return '<div class="overlay" data-action="close"><div class="settings" data-stop><div class="settings-head"><div><span class="eyebrow">SETTINGS</span><h2>RADHA, your way.</h2></div>'+btn("close",icon("close",18),"close","Close")+'</div>'+
 '<div class="setting"><span><b>Appearance</b><small>Light, calm and readable.</small></span><strong>Light</strong></div>'+
 '<div class="setting"><span><b>Motion</b><small>Smooth transitions and feedback.</small></span><button class="switch on"><i></i></button></div>'+
 '<div class="setting"><span><b>Memory</b><small>Control what RADHA retains.</small></span>'+btn("secondary","Manage","toast:Memory controls ready")+'</div>'+
 '<div class="setting"><span><b>Privacy</b><small>Provider credentials stay server-side.</small></span>'+btn("secondary","View","toast:Privacy controls ready")+'</div></div></div>';
}
function render(){
 if(state.splash)return splash();
 let content=state.chat?conversation():state.page==="Home"?home():state.page==="Chats"?chatsPage():state.page==="Create"?createPage():libraryPage();
 root.innerHTML='<div class="app">'+sidebar()+'<main>'+topbar()+'<div class="shell">'+content+'</div></main><nav class="mobile-nav">'+nav.map(n=>btn("mobile-nav-item "+(state.page===n[0]&&!state.chat?"active":""),icon(n[1],19)+"<span>"+n[0]+"</span>","page:"+n[0])).join("")+'</nav>'+(state.search?overlay():"")+(state.settings?settings():"")+(state.toast?'<div class="toast">'+icon("check",13)+esc(state.toast)+'</div>':"")+'</div>';
 bind();
 requestAnimationFrame(()=>document.querySelector(".shell")?.classList.add("enter"));
}
function bind(){
 for(const id of ["home-input","chat-input"]){
  const el=document.getElementById(id);if(!el)continue;
  el.addEventListener("input",e=>{state.composer=e.target.value;update(el)});
  el.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(id==="home-input"?"home":"chat")}});
 }
 const c=document.getElementById("chat-search");if(c)searchBind(c);
 const l=document.getElementById("library-search");if(l)searchBind(l);
 document.getElementById("global-search")?.addEventListener("keydown",e=>{if(e.key==="Escape"){state.search=false;render()}});
}
function update(el){el.style.height="auto";el.style.height=Math.min(el.scrollHeight,180)+"px";el.closest(".composer")?.querySelector(".send")?.classList.toggle("ready",!!state.composer.trim())}
function searchBind(el){el.addEventListener("input",e=>{state.query=e.target.value;render();requestAnimationFrame(()=>{const n=document.getElementById(el.id);n?.focus();n?.setSelectionRange(n.value.length,n.value.length)})})}
function navigate(p){state.page=p;state.chat=null;state.query="";state.filter="All";state.composer="";state.messages=[];render()}
function newChat(){state.page="Chats";state.chat="New conversation";state.messages=[];state.composer="";render();requestAnimationFrame(()=>document.getElementById("chat-input")?.focus())}
function openChat(t){state.page="Chats";state.chat=t;state.messages=[];state.composer="";render()}
function send(target){
 const t=state.composer.trim();if(!t)return;
 if(target==="home"){state.page="Chats";state.chat=t.length>42?t.slice(0,42)+"…":t;state.messages=[{role:"user",text:t},{role:"radha",text:"I have your request. RADHA is ready to work through it with you."}]}
 else state.messages.push({role:"user",text:t},{role:"radha",text:"Received. Let's work through the next step together."});
 state.composer="";render();
}
function toast(m){state.toast=m;render();setTimeout(()=>{if(state.toast===m){state.toast="";render()}},1400)}
function attach(){const i=document.createElement("input");i.type="file";i.multiple=true;i.accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.ppt,.pptx,.png,.jpg,.jpeg,.webp";i.onchange=()=>toast((i.files?.length||0)+" file"+((i.files?.length||0)!==1?"s":"")+" ready");i.click()}
function vision(){const i=document.createElement("input");i.type="file";i.accept="image/*";i.multiple=true;i.onchange=()=>toast((i.files?.length||0)+" image"+((i.files?.length||0)!==1?"s":"")+" ready");i.click()}
function voice(){
 const R=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!R)return toast("Voice input is not supported in this browser");
 if(state.voice){window.__radha?.stop();state.voice=false;render();return}
 const r=new R();r.lang=navigator.language||"en-IN";r.interimResults=true;r.continuous=false;
 r.onstart=()=>{state.voice=true;render()};r.onresult=e=>{let t="";for(let i=e.resultIndex;i<e.results.length;i++)t+=e.results[i][0].transcript;state.composer=t;const el=document.getElementById(state.chat?"chat-input":"home-input");if(el){el.value=t;update(el)}};
 r.onend=()=>{state.voice=false;render()};r.onerror=()=>{state.voice=false;toast("Voice input could not start")};window.__radha=r;r.start();
}
document.addEventListener("click",e=>{
 if(e.target.closest("[data-stop]"))return;
 const el=e.target.closest("[data-action]");if(!el)return;const a=el.dataset.action;
 if(a.startsWith("page:"))return navigate(a.slice(5));
 if(a==="newchat")return newChat();
 if(a.startsWith("chat:"))return openChat(a.slice(5));
 if(a==="back"){state.chat=null;state.page="Chats";return render()}
 if(a==="search"){state.search=true;return render()}
 if(a==="settings"){state.settings=true;return render()}
 if(a==="close"){state.search=false;state.settings=false;return render()}
 if(a==="sendhome")return send("home");
 if(a==="sendchat")return send("chat");
 if(a==="attach")return attach();
 if(a==="vision")return vision();
 if(a==="voice")return voice();
 if(a==="prepare-create")return toast(state.create+" brief ready");
 if(a.startsWith("create:")){state.create=a.slice(7);return render()}
 if(a.startsWith("filter:")){state.filter=a.slice(7);return render()}
 if(a.startsWith("starter:")){state.composer=a.slice(8);render();requestAnimationFrame(()=>document.getElementById("home-input")?.focus());return}
 if(a.startsWith("palette:")){const x=a.slice(8);state.search=false;if(x==="New chat")return newChat();if(x==="Create"){state.page="Create";state.chat=null;return render()}if(x==="Library"){state.page="Library";state.chat=null;return render()}if(x==="Settings"){state.settings=true;return render()}}
 if(a.startsWith("toast:"))return toast(a.slice(6));
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&(state.search||state.settings)){state.search=false;state.settings=false;render()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();state.search=true;render()}if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="n"){e.preventDefault();newChat()}});
splash();