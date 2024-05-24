/**
 * Generate with Mudey Formation (https://mudey.fr)
 * Created at : {date}
 */
import { Controller, Param, Body, Get, Post, Put, Delete, Req, Res, UseBefore  } from 'routing-controllers';
import { Request, Response } from 'express';
import {Name} from '../models/{Name}.ts';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/responseHelper';
import { getPaginationUrls } from '../helpers/paginationHelper';
import { checkRole, verifyToken } from '../middleware/authMiddleware';

@Controller('/api/{name}s')
@UseBefore(verifyToken)
export class {Name}Controller {

  @Post('/')
  @UseBefore(checkRole(['ROLE_ADMIN']))
  async create{Name}(@Req() req: Request, @Res() res: Response) {
    try {
      const {name} = new {Name}(req.body);
      await {name}.save();
      return sendSuccessResponse(res, 201, {data : {name}});
    } catch (error: any) {
      return sendErrorResponse(res, 500, error.message);
    }
  }

  @Get('/')
  @UseBefore(checkRole(['ROLE_ADMIN']))
  async get{Name}s(@Req() req: Request, @Res() res: Response) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      let limit = parseInt(req.query.limit as string, 10) || 10;

      // maxium de donnée récupérée
      limit = limit <= 50 ? limit : 50

      const skip = (page - 1) * limit;

      let baseUrl = `${ process.env.NODE_ENV ==='development' ? req.protocol : 'https'}://${req.get('host')}${req.baseUrl}`;

      const {name}s = await {Name}.find().skip(skip).limit(limit).select('-password');
      const total = await {Name}.countDocuments();

      const paginationUrls = getPaginationUrls(page, limit, total, baseUrl);

      return sendSuccessResponse(res, 200, {
        datas : {name}s,
        pagination: {
          total,
          page,
          limit,
          ...paginationUrls,
        },
      });
    } catch (error: any) {
      return sendErrorResponse(res, 500, error.message);
    }
  }

  @Get('/:id')
  @UseBefore(checkRole(['ROLE_USER']))
  async get{Name}ById(@Param('id') id: string, @Res() res: Response) {
    try {
      const {name} = await {Name}.findById(id).select('-password');
      if (!{name}) {
        return sendErrorResponse(res, 404, '{Name} not found');
      }
      return sendSuccessResponse(res, 200, {data: {name}});
    } catch (error: any) {
      return sendErrorResponse(res, 500, error.message);
    }
  }

  @Put('/:id')
  @UseBefore(checkRole(['ROLE_USER']))
  async update{Name}(@Param('id') id: string, @Body() body: any, @Res() res: Response) {
    try {
      const {name} = await {Name}.findByIdAndUpdate(id, body, { new: true });
      if (!{name}) {
        return sendErrorResponse(res, 404, '{Name} not found');
      }
      return sendSuccessResponse(res, 200, {data: {name}});
    } catch (error: any) {
      return sendErrorResponse(res, 500, error.message);
    }
  }

  @Delete('/:id')
  @UseBefore(checkRole(['ROLE_ADMIN','ROLE_USER']))
  async delete{Name}(@Param('id') id: string, @Res() res: Response) {
    try {
      const {name} = await {Name}.findByIdAndDelete(id);
      if (!{name}) {
        return sendErrorResponse(res, 404, '{Name} not found');
      }
      return sendSuccessResponse(res, 200, '{Name} deleted');
    } catch (error: any) {
      return sendErrorResponse(res, 500, error.message);
    }
  }
}
