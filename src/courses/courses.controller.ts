import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern({cmd: 'CREATE_COURSE'})
  async create(@Payload() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @MessagePattern('GET_ALL_COURSES')
  async findAll():Promise<Course[]> {
    return this.coursesService.findAll();
  }


  @MessagePattern({cmd: 'UPDATE_COURSE'})
  update(@Payload() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(updateCourseDto.id, updateCourseDto);
  }
  

  @MessagePattern('GET_BY_ID')
  findOne(@Payload('id') id: string) {
    return this.coursesService.findOne(id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
