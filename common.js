firebase.initializeApp(CFG.firebase);const auth=firebase.auth(),db=firebase.firestore();
const $=s=>document.querySelector(s);
async function api(fn,body,method='POST'){const t=auth.currentUser?await auth.currentUser.getIdToken():'';
 const r=await fetch('/.netlify/functions/'+fn,{method,headers:{'Content-Type':'application/json',Authorization:'Bearer '+t},body:method=='POST'?JSON.stringify(body):undefined});return r.json()}
function form(sel,F,cb,label='Kirim pendaftaran'){const f=$(sel);
 f.innerHTML=F.map(([k,l,t])=>`<label>${l}${t==1?`<textarea name="${k}" required></textarea>`:`<input name="${k}" type="${t==2?'date':t==3?'number':'text'}" required>`}</label>`).join('')+`<button class="btn">${label}</button>`;
 f.onsubmit=async e=>{e.preventDefault();const b=f.querySelector('button');b.disabled=true;try{await cb(Object.fromEntries(new FormData(f)));f.reset()}catch(x){alert('Gagal: '+x.message)}b.disabled=false}}
document.addEventListener('pointerdown',e=>{for(let i=0;i<8;i++){const d=document.createElement('i');d.className='fx';const a=i/8*6.28,r=40+Math.random()*30;
 d.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;--x:${Math.cos(a)*r}px;--y:${Math.sin(a)*r}px`;document.body.appendChild(d);setTimeout(()=>d.remove(),700)}
 const o=document.createElement('b');o.className='rip';o.style.cssText=`left:${e.clientX}px;top:${e.clientY}px`;document.body.appendChild(o);setTimeout(()=>o.remove(),600)});

const PH="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#1d1233"/><circle cx="50" cy="38" r="18" fill="#8b5cf6"/><path d="M15 100c0-25 15-38 35-38s35 13 35 38z" fill="#8b5cf6"/></svg>');
const LOGO="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 6l38 22v44L50 94 12 72V28z" fill="none" stroke="#8b5cf6" stroke-width="6"/></svg>');
const R=[['Founder','L'],['Developer','L'],['Moderator','L'],['Management','L'],['Head Admin','L'],['Admin','R'],['Helper','R'],['Admin Media','R'],['Graphic Design','R'],['Brand Ambassador','R']];
const DEF={
rp:{title:'Peraturan Roleplay',body:`Hormati semua pemain, tanpa toxic dan diskriminasi.
Tetap di karakter (IC) selama bermain.
Dilarang metagaming: informasi OOC tidak dipakai di dalam kota.
Dilarang powergaming dan fail RP.
Dilarang RDM, VDM, dan cop baiting.
Ikuti arahan staff saat scene berlangsung.
Dilarang memakai cheat, bug abuse, atau modifikasi.`},
kota:{title:'Peraturan Kota',body:`Satu akun, satu karakter aktif.
Dilarang menyebarkan konten SARA, porno, atau ujaran kebencian.
Dilarang membocorkan data server ke pihak luar.
Keluhan disampaikan lewat tiket Discord, bukan di chat publik.
Staff berhak memberi sanksi sesuai tingkat pelanggaran.`},
bahasa:{title:'Bahasa Dasar RP',body:`IC: In Character, semua yang terjadi di dalam peran.
OOC: Out of Character, obrolan di luar peran.
/me: perintah untuk menjelaskan tindakan karaktermu.
/do: perintah untuk menjelaskan keadaan atau lingkungan.
Metagaming: memakai info OOC di dalam IC.
Powergaming: memaksakan tindakan tanpa memberi lawan main kesempatan.
RDM: membunuh pemain tanpa alasan RP.
VDM: menabrak pemain dengan kendaraan tanpa alasan RP.
NLR: karakter lupa kejadian saat mati.`},
donasi:{title:'Ketentuan Donasi',body:`Pembayaran dilakukan di Discord lewat tiket.
Tunjukkan Order ID kepada admin di tiket.
Donasi tidak dapat dikembalikan.
Barang diberikan setelah pembayaran dikonfirmasi admin.
Donasi tidak membebaskan dari aturan kota.`}};

const E=s=>String(s==null?'':s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
