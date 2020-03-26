import { Controller, Get, Body, Res, HttpStatus, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  // @Get('users')
  // async findAll(@Res() res: any) {
  //   const users = await this.userService.findAll();
  //   return res.status(HttpStatus.OK).json({
  //     error: false,
  //     users
  //   });
  // }

  // @Post('users')
  // async create(@Body() createUserDto: any, @Res() res: any) {
  //   const user = await this.userService.create(createUserDto);
  //   return res.status(HttpStatus.OK).json({
  //     error: false,
  //     message: 'User has been created successfully',
  //     user: {
  //       name: user.firstName + ' ' + user.lastName
  //     }
  //   });
  // }

}
