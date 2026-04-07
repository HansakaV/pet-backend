import mongoose,{Document,Schema} from "mongoose";

export interface Project extends Document {
  projectId: string;
  name: string;
  description: string;
  userId: mongoose.Schema.Types.ObjectId;
}

const projectSchema: Schema = new Schema({
  projectId: { type: String, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


const ProjectModel = mongoose.model<Project>('Project', projectSchema);
export default ProjectModel;