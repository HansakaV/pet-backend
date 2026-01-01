import mongoose,{Document,Schema} from "mongoose";

export interface Task extends Document{
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
    
    projectId: string;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
});

const TaskModel = mongoose.model<Task>('Task', taskSchema);
export default TaskModel;