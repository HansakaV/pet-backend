import mongoose,{Document,Schema} from "mongoose";

export interface Task extends Document{
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    
    projectId: number;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], required: true },
    projectId: { type: Number, required: true }
});

const TaskModel = mongoose.model<Task>('Task', taskSchema);
export default TaskModel;