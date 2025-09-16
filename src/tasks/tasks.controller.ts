import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { ITask } from './task.model';
import { CreateTaskDTO } from './create-task.dto';
import { FindOneParams } from './find-one.params';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}
  @Get()
  public findAll(): ITask[] {
    return this.taskService.findAll();
  }
  //   @Get('/:id/:add')
  //   public findOne(@Param('id') id: any, @Param('add') add: any): string {
  //     return `The number is ${id} and ${add}`;
  //   }
  @Get('/:id')
  public findOne(@Param() params: FindOneParams): ITask {
    const task = this.taskService.findOne(params.id);

    if (task) {
      return task;
    }

    throw new NotFoundException();
  }
  @Post()
  public create(@Body() createTaskDto: CreateTaskDTO) {
    return this.taskService.create(createTaskDto);
  }
}
