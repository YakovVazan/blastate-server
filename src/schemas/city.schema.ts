import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class City {
  @Prop()
  hebName: string;

  @Prop()
  enName: string;

  @Prop()
  cityId: string;

  @Prop()
  lat: string;

  @Prop()
  lng: string;

  @Prop()
  boundingBox: string[];
}

export const CitySchema = SchemaFactory.createForClass(City);
