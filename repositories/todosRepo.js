const model=require('../models/todomodel');

const all=async()=>{

 const todos=await model.find().catch(e=>{
    return e;
 });
 
 return todos;
};
const create=async(payload)=>{
    const todoData=await model.create(payload).catch(e=>{
        return e;
     });
     return todoData;
};

const update=async(payload)=>{
    
    let doc=await model.findOne({_id:payload._id}).catch(e=>{
        return e;
    });
    
    doc.title=payload.title;
    doc.description=payload.description;
    doc.isCompleted=payload.isCompleted;
   
    let updatedDoc=await doc.save().catch(e2=>{
        return2
    });
    return updatedDoc;
};

const remove=async(params)=>{

    let docId=await model.deleteOne(params).catch(e=>{
        return e;
    });
    return docId;
};
const findById=async (params)=>{
   let todo=  await model.findOne(params).catch(e=>{
        return e;
     })
     return todo;
};

module.exports={all,create,update,remove,findById};