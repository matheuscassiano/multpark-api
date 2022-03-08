import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    try {
      const user = new this.userModel({
        ...createUserDto,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return user.save();
    } catch (error) {
      return { error };
    }
  }

  findAll() {
    return this.userModel.find({ deleted_at: null });
  }

  findOne(_id: string) {
    return this.userModel.findOne({ _id, deleted_at: null }).exec();
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          ...updateUserDto,
          updated_at: new Date(),
        },
      },
      {
        new: true,
      },
    );
  }

  softDelete(_id: string) {
    return this.userModel.findByIdAndUpdate(
      { _id },
      {
        $set: { deleted_at: new Date() },
      },
      {
        new: true,
      },
    );
  }

  remove(_id: string) {
    return this.userModel.deleteOne({ _id }).exec();
  }
}
