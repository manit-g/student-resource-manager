import mongoose, { Document, Schema } from 'mongoose';

export interface IResource extends Document {
  title: string;
  subject: string;
  type: 'note' | 'assignment' | 'link' | 'file';
  description: string;
  url?: string;
  fileUrl?: string;
  fileName?: string;
  tags: string[];
  userId: mongoose.Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [50, 'Subject cannot be more than 50 characters'],
  },
  type: {
    type: String,
    required: [true, 'Resource type is required'],
    enum: {
      values: ['note', 'assignment', 'link', 'file'],
      message: 'Resource type must be note, assignment, link, or file',
    },
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  url: {
    type: String,
    trim: true,
    validate: {
      validator: function(v: string) {
        if (this.type === 'link' && !v) return false;
        if (v && !/^https?:\/\/.+/.test(v)) return false;
        return true;
      },
      message: 'URL is required for links and must be a valid URL',
    },
  },
  fileUrl: {
    type: String,
    trim: true,
  },
  fileName: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot be more than 20 characters'],
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Index for better query performance
ResourceSchema.index({ userId: 1, createdAt: -1 });
ResourceSchema.index({ subject: 1 });
ResourceSchema.index({ type: 1 });
ResourceSchema.index({ tags: 1 });

export default mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);
