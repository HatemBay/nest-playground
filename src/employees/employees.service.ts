import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class EmployeesService extends TypeOrmCrudService<Employee> {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {
    super(employeesRepository);
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = this.employeesRepository.create(createEmployeeDto);

    return await this.employeesRepository.save(newEmployee);
  }

  // async findAll(): Promise<Employee[]> {
  //   return this.employeesRepository.find({
  //     relations: [
  //       'contactInfo',
  //       'tasks',
  //       'directReports',
  //       'meetings',
  //       'manager',
  //     ],
  //   });
  // }

  // async findOne(id: number): Promise<Employee> {
  //   try {
  //     const employee = await this.employeesRepository.findOneOrFail({
  //       where: { id: id },
  //       relations: [
  //         'contactInfo',
  //         'tasks',
  //         'directReports',
  //         'meetings',
  //         'manager',
  //       ],
  //     });
  //     return employee;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async update(
  //   id: number,
  //   updateEmployeeDto: UpdateEmployeeDto,
  // ): Promise<Employee> {
  //   const employee = await this.findOne(id);
  //   if (employee) {
  //     // employee.name = updateEmployeeDto.name;
  //     ({
  //       name: employee.name,
  //       manager: employee.manager,
  //       directReports: employee.directReports,
  //       contactInfo: employee.contactInfo,
  //       meetings: employee.meetings,
  //       tasks: employee.tasks,
  //     } = updateEmployeeDto);

  //     return await this.employeesRepository.save(employee);
  //   }
  // }

  // async remove(id: number): Promise<Employee> {
  //   const employee = await this.findOne(id);

  //   return await this.employeesRepository.remove(employee);
  // }
}
