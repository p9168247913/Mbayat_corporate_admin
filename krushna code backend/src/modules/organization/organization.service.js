const orgModel = require('./organization.model')

const orgRegistration = async (userBody, res) => {
	const user = await orgModel.create(userBody);
	if(user){
		return {data:user,status:true,code:200};
	}else{
		return {data:{},status:false,code:400}
	}
};


module.exports={
    orgRegistration
}