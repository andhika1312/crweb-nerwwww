const admin=require('firebase-admin');
if(!admin.apps.length)admin.initializeApp({credential:admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))});
const db=admin.firestore();
async function isAdmin(e){try{const u=await admin.auth().verifyIdToken((e.headers.authorization||'').slice(7));return (await db.doc('admins/'+u.uid).get()).exists}catch{return false}}
async function hook(title,fields){try{const s=await db.doc('secrets/orders').get();if(!s.exists)return;
 await fetch(s.data().webhook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({embeds:[{title,color:0x8b5cf6,timestamp:new Date().toISOString(),fields:Object.entries(fields).map(([k,v])=>({name:k,value:String(v||'-').slice(0,1000)}))}]})})}catch{}}
module.exports={admin,db,isAdmin,hook};
