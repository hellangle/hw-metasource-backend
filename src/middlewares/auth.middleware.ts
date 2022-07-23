import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authorization = req.header('Authorization') ? req.header('Authorization').split(' ')[1] : null;
    if (!authorization) {
      next(new HttpException(401, 'Wrong authentication token'));
    }

    const credentials = Buffer.from(authorization, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    if (username === 'metasource' && password === 'testing') {
      next();
    } else {
      next(new HttpException(401, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
