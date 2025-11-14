import { Schema, model, Document } from "mongoose";

export interface ILog extends Document {
  message: string;
  stack?: string;
  path?: string;
  method?: string;
  timestamp: Date;
}

const logSchema = new Schema<ILog>({
  message: String,
  stack: String,
  path: String,
  method: String,
  timestamp: { type: Date, default: Date.now },
});

export const Log = model<ILog>("Log", logSchema);
