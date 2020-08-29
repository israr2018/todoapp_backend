// Languages Routes handler

var express = require("express");

const todosRepo=require('../repositories/todosRepo');
const validators=require('../common/joiValidator');
const messages=require('../common/messages');

var routes=function(){
    const router = express.Router();

    router.route('/').post(async function(req,res){
      
            let data= await todosRepo.create(req.body).catch(e=>{
                messages.fail(res,error,'');
            });
           
            console.log("data:"+JSON.stringify(data));
            messages.created(res,data,"success");
    });
 
    router.route('/').get(async function(req,res){
       
       let data= await todosRepo.all().catch(e=>{
            messages.fail(res,e);
        });
       
       messages.success(res,data);
    });
    router.route('/').put(async function(req,res){
         let payload={...req.body};
         let data=await todosRepo.update(payload).catch(e=>{
             messages.fail(res,error);

         })
         messages.success(res,data);
    });
    router.route('/:_id').get(async function(req,res){
        if (req.params._id){
             let param={_id:req.params._id};
             let data= await todosRepo.findById(param).catch(e=>{
                messages.fail(res,e);
             });
             messages.success(res,data);

        }
        messages.fail(res,"Invalid  Parameters");
    });
    router.route('/:_id').delete(async function(req,res){
     
        if (req.params._id){
            
            let data= await todosRepo.remove({_id:req.params._id}).catch(e=>{
                console.log("error:"+e);
                 messages.fail(res,e);
            });
           
            if(data)
            {
            console.log("if part")
             messages.remove(res);
             
            }
             else{
                 console.log("else part");
                 messages.fail(res,"coulde not deleted ");
             }
             
       }
       else{
        messages.fail(res,"Invalid  Parameters");
       }
       
    });
    return router;
}
module.exports=routes;