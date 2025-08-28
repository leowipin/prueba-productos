import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../dtos/auth/register.dto';

export class UserService {
    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }
    
    public async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    public async createUser(registerDto: RegisterDto): Promise<User> {
        const userEntity = this.userRepository.create(registerDto);
        return this.userRepository.save(userEntity);
    }

}