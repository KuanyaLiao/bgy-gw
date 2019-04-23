const express=require('express');
const pool=require('../pool.js');
var router=express.Router();


//验证用户是否注册
router.post("/isreg",function(req,res){
	console.log(14);
	var $uname=req.body.uname;
	
	if (!$uname)
	{
		res.send("会员名格式错误");
		return;
	}else if($uname.length<4){
		res.send("会员登录名长度应在4-20之间");
		return;
	}
	pool.query("SELECT * FROM bgy_user WHERE $uname=?",[$uname],(err,result)=>{
		if(err) throw err;
		if (result.length>0)
		{
			console.log(456);
			res.send("会员登录名已被注册");
			return;
		}	
	});
});


//用户注册

router.post("/reg",function(req,res){
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if (!$uname)
	{
		res.send("会员名格式错误");
		return;
	}else if($uname.length<4){
		res.send("会员登录名长度应在4-20之间");
		return;
	}
	//if (!$upwd)
	//{
		//res.send("会员登录密码不能为空");
		//return;
	//}
	//验证用户名是否存在
	pool.query("SELECT * FROM bgy_user WHERE $uname=?",[$uname],(err,result)=>{
		if(err) throw err;
		if (result.length>0)
		{
			res.send("会员登录名已被注册");
			return;
		}else {
		pool.query("INSERT INTO bgy_user SET $uname=?,$upwd=?",[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if (result.affectedRows>0)
		{
			res.send("注册成功")
		}else{res.send("注册失败")}
	
	})
	
		};
		
	});

	});

//用户登录
router.post("/login",function(req,res){
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	if (!$uname)
	{
		res.send("会员名格式错误");
		return;
	}
	var sql="SELECT * FROM bgy_user WHERE $uname=? AND $upwd=?"
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if (result.length>0)
		{
			res.send("登录成功")
		}else{res.send("登录失败")}
	})

});



module.exports=router;
