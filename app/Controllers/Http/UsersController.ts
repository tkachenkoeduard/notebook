// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import LoginUserValidator from 'App/Validators/LoginUserValidator'

export default class UsersController {
  public async index(ctx: HttpContextContract) {
    const users = await User.all()
    ctx.response.send({ users })
  }

  public async register(ctx: HttpContextContract) {
    const user = new User()
    const payload = await ctx.request.validate(RegisterUserValidator)
    await user
      .fill({
        email: payload.email,
        password: payload.password,
      })
      .save()
    const token = await ctx.auth.use('api').attempt(payload.email, payload.password)
    ctx.response.send({ user, token })
  }

  public async login(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(LoginUserValidator)
    const token = await ctx.auth.use('api').attempt(payload.email, payload.password)
    const user = ctx.auth.use('api').user
    ctx.response.send({ user, token })
  }

  public async logout(ctx: HttpContextContract) {
    await ctx.auth.use('api').logout()
    ctx.response.send(null)
  }
}
