const {db,hook}=require('./_a');
const out=o=>({statusCode:200,body:JSON.stringify(o)});
exports.handler=async e=>{
 const b=JSON.parse(e.body||'{}');
 if(!process.env.FIVEM_SECRET||b.secret!==process.env.FIVEM_SECRET)return{statusCode:403,body:JSON.stringify({ok:false,msg:'Secret salah'})};
 const code=String(b.code||'').trim().toUpperCase(),ref=db.doc('claims/'+code);
 try{const d=await db.runTransaction(async t=>{const s=await t.get(ref);if(!s.exists)throw Error('Kode tidak valid');if(s.data().claimed)throw Error('Kode sudah dipakai');
   t.update(ref,{claimed:true,by:String(b.player||''),claimedAt:Date.now()});return s.data()});
  await hook('Kode claim dipakai',{Kode:code,Order:d.orderId,Pemain:b.player,'Jumlah CR':d.coins});
  return out({ok:true,coins:d.coins,orderId:d.orderId})}
 catch(x){return out({ok:false,msg:x.message})}};
