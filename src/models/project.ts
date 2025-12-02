import mongoose,{Document,Schema} from "mongoose";

export interface Project extends Document {
    projectId: string;
    name: string;
    startDate: Date;
    endDate: Date;
}

const projectSchema: Schema = new Schema({
    projectId: { type: String,unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const ProjectModel = mongoose.model<Project>('Project', projectSchema);
export default ProjectModel;