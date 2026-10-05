export default async function handler(req,res){
 if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
 const {message,mode="auto"}=req.body||{};
 if(!message?.trim()) return res.status(400).json({error:"Message is required"});
 res.status(200).json({ok:true,status:"accepted",mode,message});
}