import { Body, Controller, Get, NotFoundException, Param, ParseArrayPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor (private usersService: UsersService){

    }

    @ApiOkResponse({type: User, isArray: true})
    @ApiQuery({name: 'name', required: false})
    @Get()
    getUsers(@Query('name') name: string): User[]{
        return this.usersService.findAll(name);
    }

    @ApiOkResponse({type: User, description: 'the user'})
    @Get(':id')
    @ApiNotFoundResponse()
    getUserById(@Param('id', ParseIntPipe) id: number): User{

        const user = this.usersService.findById(id);

        // console.log('-->', typeof id);
        if(!user){
            throw new NotFoundException();
        }
        return user;
    }

    @ApiCreatedResponse({type: User})
    @Post()
    createUser(@Body() body: CreateUserDto): User{
        return this.usersService.createUser(body)
    }
}
