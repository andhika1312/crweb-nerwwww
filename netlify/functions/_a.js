let admin,db,initErr;
try{admin=require('firebase-admin');
 if(!admin.apps.length)admin.initializeApp({credential:admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))});
 db=admin.firestore()}catch(x){initErr=new Error('Firebase admin gagal start: '+x.message+' (cek FIREBASE_SERVICE_ACCOUNT di Netlify)')}
const chk=()=>{if(initErr)throw initErr};
async function isAdmin(e){chk();try{const u=await admin.auth().verifyIdToken((e.headers.authorization||'').slice(7));return (await db.doc('admins/'+u.uid).get()).exists}catch{return false}}
async function hook(title,fields){try{const s=await db.doc('secrets/orders').get();if(!s.exists)return;
 await fetch(s.data().webhook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({embeds:[{title,color:0x8b5cf6,timestamp:new Date().toISOString(),fields:Object.entries(fields).map(([k,v])=>({name:k,value:String(v||'-').slice(0,1000)}))}]})})}catch{}}
const safe=f=>async e=>{try{chk();return await f(e)}catch(x){return{statusCode:200,body:JSON.stringify({error:x.message,msg:x.message})}}};
module.exports={admin,get db(){chk();return db},isAdmin,hook,safe};
