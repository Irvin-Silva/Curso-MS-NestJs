import { Injectable, Logger } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);
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
    this.logger.log('Getting all courses', Math.random().toString());
    return this.courseRepository.find({});
  }

  //search a course by id
  findOne(id: String) {
    console.log('Get by id',id);
    return `This action returns a #${id} course`;
  }

  //update a course by id
  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<String | Course> {
    const course = await this.courseRepository.findOne({where: {id}});
    if (course) {
      return this.courseRepository.save({ ...course, ...updateCourseDto}); 
    }  
    return `Course with id ${id} not found`;
  }



  //delete a course by id
  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
