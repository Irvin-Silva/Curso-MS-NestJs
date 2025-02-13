import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  //Ceate a new course async
  async create(createCourseDto: CreateCourseDto):Promise<Course> {
    return this.courseRepository.save(createCourseDto);
  }

  //search all courses
  async findAll():Promise<Course[]> {
    return this.courseRepository.find({});
  }

  //search a course by id
  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  //update a course by id
  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.findOne({where: {id}});
    if (course) {
      return this.courseRepository.save({ ...course, ...updateCourseDto}); 
    }  
    return course;
  }



  //delete a course by id
  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
