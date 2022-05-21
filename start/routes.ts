/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', () => {
  return 'api server'
})

Route.get('users', 'UsersController.index').middleware('auth:api')
Route.get('users/me', 'UsersController.me').middleware('auth:api')
Route.post('users/register', 'UsersController.register')
Route.post('users/login', 'UsersController.login')
Route.post('users/logout', 'UsersController.logout').middleware('auth:api')

Route.get('folders', 'FoldersController.index').middleware('auth:api')
Route.get('folders/:id', 'FoldersController.show').middleware('auth:api')
Route.post('folders', 'FoldersController.create').middleware('auth:api')
Route.put('folders/:id', 'FoldersController.update').middleware('auth:api')
Route.delete('folders/:id', 'FoldersController.delete').middleware('auth:api')
