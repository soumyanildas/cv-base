import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
  ) { }

  async updateCompany(updateCompanyDto: UpdateCompanyDto, id: string): Promise<any> {
    const company = await this.companyRepository.findOne({ where: { user: id } });
    const entity = Object.assign(new Company(), { ...company, ...updateCompanyDto });
    return await this.companyRepository.save(entity);
  }

}
