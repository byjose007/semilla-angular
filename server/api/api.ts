import { Application } from 'express';
import { getLoginResponse } from './login/getLoginResponse';
import { getUsersResponse } from './users/getUsersResponse';

export function initRestApi(app: Application) {
  app.route('/:resource').post(getLoginResponse);
  app.route('/users/:resource').get(getUsersResponse);
}
