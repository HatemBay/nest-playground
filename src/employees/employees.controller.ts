import { Controller } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { Employee } from './entities/employee.entity';

@Crud({
  model: {
    type: CreateEmployeeDto,
  },
  query: {
    join: {
      contactInfo: {
        eager: true,
      },
      directReports: {
        eager: true,
      },
    },
  },
})
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController implements CrudController<Employee> {
  constructor(public service: EmployeesService) {}

  // @Post()
  // create(@Body() createEmployeeDto: CreateEmployeeDto) {
  //   return this.employeesService.create(createEmployeeDto);
  // }
  // @Get()
  // findAll() {
  //   return this.employeesService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.employeesService.findOne(+id);
  // }
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto,
  // ) {
  //   return this.employeesService.update(+id, updateEmployeeDto);
  // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employeesService.remove(+id);
  // }
}
