import mongoose,{Document,Schema} from "mongoose";

export interface Task extends Document {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
  projectId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["To Do", "In Progress", "Done"], required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  dueDate: { type: Date },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});


const TaskModel = mongoose.model<Task>('Task', taskSchema);
export default TaskModel;