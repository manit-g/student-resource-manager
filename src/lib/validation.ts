import { z } from 'zod';

// User validation schemas
export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters'),
});

export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(1, 'Password is required'),
});

// Resource validation schemas
export const resourceSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  subject: z.string()
    .min(1, 'Subject is required')
    .max(50, 'Subject cannot exceed 50 characters')
    .trim(),
  type: z.enum(['note', 'assignment', 'link', 'file'], {
    message: 'Type must be note, assignment, link, or file'
  }),
  description: z.string()
    .min(1, 'Description is required')
    .max(500, 'Description cannot exceed 500 characters')
    .trim(),
  url: z.string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  fileUrl: z.string()
    .url('Invalid file URL format')
    .optional()
    .or(z.literal('')),
  fileName: z.string()
    .max(100, 'File name cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),
  tags: z.array(z.string()
    .min(1, 'Tag cannot be empty')
    .max(20, 'Tag cannot exceed 20 characters')
    .trim()
  ).max(10, 'Cannot have more than 10 tags'),
  isPublic: z.boolean().optional().default(false),
});

// AI validation schemas
export const summarizeSchema = z.object({
  content: z.string()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content cannot exceed 10,000 characters'),
  type: z.enum(['note', 'assignment', 'other']).optional().default('note'),
});

export const studyTipsSchema = z.object({
  subject: z.string()
    .min(1, 'Subject is required')
    .max(50, 'Subject cannot exceed 50 characters')
    .trim(),
  resources: z.array(z.any()).optional().default([]),
});

// Utility functions
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: 'Invalid input' };
  }
}

// Sanitization functions
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
    return parsedUrl.toString();
  } catch {
    throw new Error('Invalid URL format');
  }
}
