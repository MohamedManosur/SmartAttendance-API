import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

const objectIdSchema = z
  .string()
  .nonempty('ID cannot be empty')
  .refine((value) => isValidObjectId(value), { message: 'Invalid MongoDB ObjectId' });

export const createSectionSchema = z.object({
  body: z.object({
    classId: objectIdSchema,
    sectionNumber: z.string().nonempty('Section number cannot be empty'), // Changed from number to string
    dayNumber: z.number().min(1).optional(),
    studentIds: z.array(objectIdSchema).optional(),
  }),
});

export const updateSectionSchema = z.object({
  body: z.object({
    sectionId: objectIdSchema,
    sectionNumber: z.string().nonempty('Section number cannot be empty').optional(), // Changed from number to string
    dayNumber: z.number().min(1).optional(),
    studentIds: z.array(objectIdSchema).optional(),
  }),
});

export const deleteSectionSchema = z.object({
  body: z.object({
    sectionId: objectIdSchema,
  }),
});

export const addStudentsToSectionSchema = z.object({
  body: z.object({
    sectionId: objectIdSchema,
    studentIds: z.array(objectIdSchema).min(1, 'At least one student ID is required'),
  }),
});

export const removeStudentsFromSectionSchema = z.object({
  body: z.object({
    sectionId: objectIdSchema,
    studentIds: z.array(objectIdSchema).min(1, 'At least one student ID is required'),
  }),
});