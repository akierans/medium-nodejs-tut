import {Router} from 'express';
let router = Router();

router.post('/hello',(req,res)=>{
	let uname = req.body.username;
	let surname = req.body.sname;
	res.status(200).send({
		status:true,
		response:`Hello ${uname} ${surname}`
	});
});

export default router;