import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {


    constructor(private readonly authService: AuthService) {}

    /*🏳️<===============(Register Area Start)===============>🏳️*/
 
     @Post('register')
     async register(@Body() registerDto: RegisterDto ) {
            return this.authService.register(registerDto);
     }
    /*🚩<===============(Register Area End)===============>🚩*/


    /*🏳️<===============(Login Area Start)===============>🏳️*/
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    /*🚩<===============(Login Area End)===============>🚩*/

}
