import User from '#models/user';
import { loginValidator } from '#validators/login_user';
import { registerValidator } from '#validators/register_user';
import { type HttpContext } from '@adonisjs/core/http'
import authProvider from '../providers/auth_provider.js';

import hash from '@adonisjs/core/services/hash';

export default class AuthController {
    private auth_provider: authProvider = new authProvider()
    public async register({ request,response }: HttpContext) {
        const data = request.all()
        const payload = await registerValidator.validate(data)
        await User.create(payload)
        return response.safeStatus(201).json({message:"User created!"})
    }

    public async login({ request,response }: HttpContext) {
        const data = request.all()
        const payload = await loginValidator.validate(data)
        const user  = await User.findByOrFail('email',payload.email)
        if(!user){
            response.abort('Invalid credentials')
        }
        const verifyPassword = await hash.verify(user.password,payload.password)

        if(!verifyPassword){
            response.abort('Invalid credentials')
        }
        
    return response.safeStatus(200).json({token:await this.auth_provider.token(user),message:"Login successful!"})
    }

     
} 

/*

*/