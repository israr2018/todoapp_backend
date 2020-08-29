
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const todoSchema=new Schema({
title:String,
description:String,
isCompleted:{type:Boolean,default:false}
});
module.exports=mongoose.model('todo',todoSchema,'todo');
