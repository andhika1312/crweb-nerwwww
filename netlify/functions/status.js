const {isAdmin}=require('./_a');
exports.handler=async e=>{const out={};
 try{const u=process.env.FIVEM_URL;const i=await(await fetch(u+'/info.json')).json(),p=await(await fetch(u+'/players.json')).json();
  out.players=p.length;out.max=i.vars&&i.vars.sv_maxClients;
  if(await isAdmin(e))out.list=p.map(x=>({id:x.id,name:x.name,ping:x.ping}))}catch{}
 try{const d=await(await fetch('https://discord.com/api/v10/invites/'+process.env.DISCORD_INVITE+'?with_counts=true')).json();
  out.discord=d.approximate_member_count;out.online=d.approximate_presence_count}catch{}
 return{statusCode:200,headers:{'Content-Type':'application/json'},body:JSON.stringify(out)}};
