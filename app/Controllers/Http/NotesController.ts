import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Folder from 'App/Models/Folder'
import IndexNoteValidator from 'App/Validators/IndexNoteValidator'
import CreateNoteValidator from 'App/Validators/CreateNoteValidator'
import Note from 'App/Models/Note'
import UpdateNoteValidator from 'App/Validators/UpdateNoteValidator'

export default class NotesController {
  public async index(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const payload = await ctx.request.validate(IndexNoteValidator)
    const folder = await Folder.query()
      .where('userId', user.id)
      .where('id', payload.folder_id)
      .preload('notes')
      .first()
    if (!folder) return ctx.response.notFound()
    const notes = folder.notes
    return ctx.response.send({ notes: notes || [] })
  }

  public async show(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const payload = await ctx.request.validate(IndexNoteValidator)
    const note = await Note.query()
      .where('folder_id', payload.folder_id)
      .where('id', ctx.params.id)
      .preload('folder')
      .first()
    if (!note) return ctx.response.notFound()
    if (note.folder.userId !== user.id) return ctx.response.forbidden()
    return ctx.response.send({ note })
  }

  public async create(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const payload = await ctx.request.validate(CreateNoteValidator)
    const folder = await Folder.query()
      .where('userId', user.id)
      .where('id', payload.folder_id)
      .first()
    if (!folder) return ctx.response.notFound()
    const note = new Note()
    note.fill({
      title: payload.title,
      content: payload.content || '',
    })
    await folder.related('notes').save(note)
    return ctx.response.send({ note })
  }

  public async update(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const payload = await ctx.request.validate(UpdateNoteValidator)
    const note = await Note.query()
      .where('folder_id', payload.folder_id)
      .where('id', ctx.params.id)
      .preload('folder')
      .first()
    if (!note) return ctx.response.notFound()
    if (note.folder.userId !== user.id) return ctx.response.forbidden()
    note.merge(payload)
    await note.save()
    return ctx.response.send({ note })
  }

  public async delete(ctx: HttpContextContract) {
    const user = ctx.auth.user!
    const payload = await ctx.request.validate(IndexNoteValidator)
    const note = await Note.query()
      .where('folder_id', payload.folder_id)
      .where('id', ctx.params.id)
      .preload('folder')
      .first()
    if (!note) return ctx.response.notFound()
    if (note.folder.userId !== user.id) return ctx.response.forbidden()
    await note.delete()
    return ctx.response.send({ status: true })
  }
}
