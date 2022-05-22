import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Folder from 'App/Models/Folder'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}).build()

export const FolderFactory = Factory.define(Folder, ({ faker }) => {
  return {
    title: faker.lorem.word(),
  }
}).build()
