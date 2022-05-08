// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class UsersController {
  public async index() {
    return await User.all()
  }

  public async register(ctx: HttpContextContract) {
    const user = new User()
    try {
      const payload = await ctx.request.validate(RegisterUserValidator)
      await user
        .fill({
          email: payload.email,
          password: payload.password,
        })
        .save()
      ctx.response.send({ user })
    } catch (e) {
      ctx.response.badRequest(e.messages)
    }
  }

  public async login() {
    return 'login'
  }

  public async logout() {
    return 'logout'
  }
}
