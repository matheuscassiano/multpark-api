import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  model: string;

  @Prop({ unique: true })
  plate: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);