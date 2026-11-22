const {isAdmin}=require('./_a');
exports.handler=async e=>{
 if(!(await isAdmin(e)))return{statusCode:403,body:'{"error":"bukan admin"}'};
 const q={...(e.queryStringParameters||{})},path=q.path;delete q.path;
 if(!['players','logs','bans','unban','ban','inventory','coin','setcoin'].includes(path))return{statusCode:400,body:'{"error":"path salah"}'};
 try{const r=await fetch(process.env.FIVEM_API+'/'+path+'?'+new URLSearchParams(q),{headers:{'x-secret':process.env.FIVEM_SECRET}});
  return{statusCode:200,headers:{'Content-Type':'application/json'},body:await r.text()}}
 catch(x){return{statusCode:200,body:JSON.stringify({error:'Tidak bisa terhubung ke FiveM: '+x.message})}}};
exports.handler=require('./_a').safe(exports.handler);
