import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Alert {
  @Prop()
  city: string;

  @Prop()
  date: string;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
