import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { coursesMessagePattern } from '../constants';
import axios, { Axios } from 'axios';
import { CreateCourseDto } from './dto/create-course.dto';


@Injectable()
export class CoursesService implements OnApplicationBootstrap {
  private client: ClientProxy;
  private logger = new Logger('CoursesService');
  async onApplicationBootstrap() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.HOST_MICROSERVICE_COURSE,
        port: +(process.env.HOST_MICROSERVICE_PORT || 3001)

      }, 
    }); 
    await this.client.connect();
    this.logger.log('Connected to Courses microservice');
  }
  
  //find all courses
  async findAll() {
  //  const data = await axios.get('https://jsonplaceholder.typicode.com/todos/1');  
  //   return data.data;
   return this.client.send({ cmd: coursesMessagePattern.GET_ALL_COURSES },   {});
  }
  // Create a new course
  create(data: CreateCourseDto) {
    return this.client.send({ cmd: coursesMessagePattern.CREATE_COURSE }, data);
  }
  // Update a course
  update(id: string, body) {
    //return id and body to the microservice
    return this.client.send({ cmd: coursesMessagePattern.UPDATE_COURSE }, { id,...body });
  }
  
}
