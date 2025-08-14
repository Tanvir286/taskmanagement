
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { AuthUser } from "src/entity/authuser.entity";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(AuthUser) private usersRepository: Repository<AuthUser>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'your_jwt_secret', 
        });
    }

    async validate(payload: any) {
        const user = await this.usersRepository.findOne({ where: {id: payload.sub} });
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        }
    } 


}