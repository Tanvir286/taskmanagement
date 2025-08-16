import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid'
import { AuthUser, UserRole } from 'src/entity/authuser.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

   constructor(@InjectRepository(AuthUser) private usersRepository: Repository<AuthUser>,
   private jwtService: JwtService) {}


    /*<========================================>
       🏳️       Register Area Start        🏳️
    ===========================================>*/
    async register(registerDto: RegisterDto) {

        const { 
              username,
              email,
              password,
              role,
        } = registerDto;

        // Check if user already exists
        const exitingUser = await this.usersRepository.findOne({ where: { username } });
        
        if (exitingUser) {
            throw new UnauthorizedException('User already exists');
        }

        // Check if email already exists
        const exitingEmail = await this.usersRepository.findOne({ where: { email } });

        if (exitingEmail) {
            throw new UnauthorizedException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = this.usersRepository.create({
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
            refreshToken: uuidv4()
        });
        await this.usersRepository.save(newUser);

        const payload = { 
             username: newUser.username,
             email: newUser.email, 
             sub: newUser.id,
             role: newUser.role,
            }

        return{
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            }
        }

    }
    /*<========================================>
       🚩       Register Area End        🚩
    ===========================================>*/


     /*<========================================>
       🏳️       Login Area Start        🏳️
    ===========================================>*/

    async login(loginDto: LoginDto) {
        
        const { email, password } = loginDto;

        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }


        const newRefreshToken = uuidv4();
        await this.usersRepository.update(user.id, { refreshToken: newRefreshToken });



        const payload = {
            username: user.username,
            email: user.email,
            sub: user.id,
            role: user.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        };
    }
    
    /*<========================================>
       🚩       Register Area End        🚩
    ===========================================>*/
     /*<========================================>
       🏳️      GetAllUsers Area Start        🏳️
    ===========================================>*/
    async findAllUsers(): Promise<AuthUser[]> {
        return this.usersRepository.find({
            where: { role: UserRole.USER } // enum use kora hocche
        });
    }
    /*<========================================>
       🚩      GetAllUsers Area End        🚩
    ===========================================>*/












}
