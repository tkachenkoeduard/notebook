// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Folder from 'App/Models/Folder'
import CreateFolderValidator from 'App/Validators/CreateFolderValidator'
import UpdateFolderValidator from 'App/Validators/UpdateFolderValidator'

export default class FoldersController {
  public async index(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const folders = user.folders
    return ctx.response.send({ folders: folders || [] })
  }

  public async show(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const folder = await Folder.query().where('userId', user.id).where('id', ctx.params.id).first()
    if (!folder) return ctx.response.notFound()
    return ctx.response.send({ folder })
  }

  public async create(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const payload = await ctx.request.validate(CreateFolderValidator)
    const folder = new Folder()
    folder.fill({ title: payload.title })
    const res = await user.related('folders').save(folder)
    return ctx.response.send({ folder, res })
  }

  public async update(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const payload = await ctx.request.validate(UpdateFolderValidator)
    const folder = await Folder.query().where('userId', user.id).where('id', ctx.params.id).first()
    if (!folder) return ctx.response.notFound()
    folder.merge(payload)
    await folder.save()
    return ctx.response.send({ folder })
  }

  public async delete(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const folder = await Folder.query().where('userId', user.id).where('id', ctx.params.id).first()
    if (!folder) return ctx.response.notFound()
    await folder.delete()
    return ctx.response.send({ status: true })
  }
}
