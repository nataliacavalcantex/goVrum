import User from '../models/User'
import * as Yup from 'yup'
class UserController{
    async store(req,res){
        const schema=Yup.object().shape({
            name:Yup.string().required(),
            email:Yup.string().email().required(),
            password:Yup.string().required().min(6)
        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Validation failed'})
        }


        const userExists= await User.findOne({where:{
            email:req.body.email
        }})
        if(userExists){
            return res.status(400).json({error:'User already exist'})
        }
        const {id,name,email}= await User.create(req.body)

        return res.json({
            id,
            name,
            email,
            
        })

    }
    async update(req,res){
        const schema= Yup.object().shape({
            name: Yup.string(),
            email:Yup.string().email(),
            oldPassword:Yup.string(),
            password:Yup.string().when('oldPassword',(oldPassword,field)=> oldPassword ? field.required(): field),
            confirmPassword:Yup.string().when('password',(password,field)=> password ? field.required().oneOf([Yup.ref('password')]): field)
        })
        if(!(await schema.isValid(req.body))){
            return res.status(401).json({message:"Invalid fields"})
        }

        const {email, oldPassword}=req.body
        const user= await User.findByPk(req.userId)
        if( email && email !== user.email){
            if(await User.findOne({where:{email: email}})){
                return res.status(400).json({error:'User already exist'})
            }
        }
        if(oldPassword && (!(await user.checkPassword(oldPassword)))){
            return res.status(401).json({error: 'Password does not match'})
        }
        const {id,name,} = await user.update(req.body)
        return res.json({
            id,
            name,
            email,
        })

    }
    async index(req,res){
        const user= await User.findByPk(req.userId)
        return res.json(user)
    }
    async show(){

    }
}
export default new UserController()