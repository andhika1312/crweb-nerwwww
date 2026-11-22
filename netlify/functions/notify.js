const {db}=require('./_a');
exports.handler=async e=>{
 const {typeId,title,fields}=JSON.parse(e.body||'{}');
 const g=typeId=='orders'?null:await db.doc((typeId=='admin_recruit'?'settings/':'types/')+typeId).get();
 if(g&&g.exists&&g.data().open===false)return{statusCode:403,body:'{"error":"pendaftaran ditutup"}'};
 const s=await db.doc('secrets/'+typeId).get();
 if(!s.exists)return{statusCode:404,body:'{"error":"webhook belum diatur"}'};
 const embed={title:String(title).slice(0,250),color:0x8b5cf6,timestamp:new Date().toISOString(),
  fields:Object.entries(fields||{}).slice(0,24).map(([k,v])=>({name:k.slice(0,250),value:String(v||'-').slice(0,1000)}))};
 const r=await fetch(s.data().webhook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({embeds:[embed]})});
 return{statusCode:200,body:JSON.stringify({ok:r.ok})}};
exports.handler=require('./_a').safe(exports.handler);
