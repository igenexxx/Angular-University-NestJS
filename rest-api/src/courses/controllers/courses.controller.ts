import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { CoursesRepository } from '../repositories/courses.repository';

@Controller('courses')
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Post()
  async createCourse(@Body() course: Omit<Course, '_id'>): Promise<Course> {
    return this.coursesDB.addCourse(course);
  }

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }

  @Put(':courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: Partial<Course>,
  ): Promise<Course> {
    return this.coursesDB.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    return this.coursesDB.deleteCourse(courseId);
  }
}
