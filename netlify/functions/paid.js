const {db,isAdmin,hook}=require('./_a');
const rnd=()=>{const c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<8;i++)s+=c[Math.floor(Math.random()*c.length)];return 'CR-'+s.slice(0,4)+'-'+s.slice(4)};
exports.handler=async e=>{
 if(!(await isAdmin(e)))return{statusCode:403,body:'{"error":"bukan admin"}'};
 const {id}=JSON.parse(e.body||'{}'),ref=db.doc('orders/'+id);
 try{const r=await db.runTransaction(async t=>{const o=await t.get(ref);if(!o.exists)throw Error('Order tidak ada');const d=o.data();
   if(d.status!=='menunggu pembayaran')throw Error('Status order: '+d.status);
   const code=rnd();t.set(db.doc('claims/'+code),{orderId:id,coins:d.coins,name:d.name,claimed:false,ts:Date.now()});
   t.update(ref,{status:'berhasil',paidAt:Date.now()});t.set(db.doc('finance/'+id),{orderId:id,name:d.name,total:d.total,ts:Date.now()});return {code,d}});
  await hook('Pembayaran dikonfirmasi #'+id,{'Order ID':id,Nama:r.d.name,Total:'Rp'+Number(r.d.total).toLocaleString('id-ID'),'Jumlah CR':r.d.coins,'Kode claim':r.code});
  return{statusCode:200,body:JSON.stringify({code:r.code})}}
 catch(x){return{statusCode:200,body:JSON.stringify({error:x.message})}}};
exports.handler=require('./_a').safe(exports.handler);
