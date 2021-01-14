import {Router} from 'express';

let router = Router();

router.post('/hello',(req,res)=>{
	let forename = req.body.forename;
	let surname = req.body.surname;
	res.status(200).send({
		status:true,
		response:`Hello ${forename} ${surname}`
	});
});

export default router;