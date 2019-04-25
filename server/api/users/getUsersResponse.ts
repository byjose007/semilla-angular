import { Request, Response } from 'express';
import * as fs from 'fs';
import { CommonUtils } from '../../utils/common.utils';

export function getUsersResponse(req: Request, res: Response) {
  const params = CommonUtils.getRequestParams(req);
  const file = fs.readFileSync(`${__dirname}/data/${params.resource}.json`).toString();
  const data = JSON.parse(file);
  res.status(200).json(data);
}
