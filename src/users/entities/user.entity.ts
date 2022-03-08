import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Vehicle } from './vehicles.entity';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  surname: string;

  @Prop({ unique: true })
  cpf: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({
    // type: [{ type: mongoose.Schema.Types.Mixed, ref: Vehicle.name }],
  })
  @Type(() => Vehicle)
  vehicle: Vehicle[];

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);