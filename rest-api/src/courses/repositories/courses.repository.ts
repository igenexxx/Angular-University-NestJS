import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Course } from '../../../../shared/course';

@Injectable()
export class CoursesRepository {
  // @ts-ignore
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async addCourse(course: Omit<Course, '_id'>): Promise<Course> {
    const newCourse = new this.courseModel(course);
    // @ts-ignore
    await newCourse.save();
    // @ts-ignore
    return newCourse.toObject({ versionKey: false });
  }

  async updateCourse(
    courseId: string,
    changes: Partial<Course>,
  ): Promise<Course> {
    return this.courseModel.findOneAndUpdate(
      {
        _id: courseId,
      },
      changes,
      { new: true },
    );
  }

  async deleteCourse(courseId: string) {
    return this.courseModel.deleteOne({ _id: courseId });
  }
}
