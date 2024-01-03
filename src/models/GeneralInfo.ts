import mongoose, { Document, Schema} from "mongoose";

export interface GeneralInfo extends Document {
    email: string;
    telefone: string;
    missao: string;
    historia: string;
    refundPolicy: string;
    privacyPolicy: string;
}

const generalinfoSchema = new Schema<GeneralInfo>({
    email: { type: String },
    telefone: { type: String },
    missao: { type: String },
    historia: { type: String },
    refundPolicy: { type: String },
    privacyPolicy: { type: String },

});

export const GeneralInfoModel = mongoose.model<GeneralInfo>('GeneralInfo', generalinfoSchema);