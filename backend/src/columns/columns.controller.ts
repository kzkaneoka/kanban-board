import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/access.decorator';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnModel } from './models/column.model';

@Controller('columns')
export class ColumnsController {
  constructor(
    private readonly logger: Logger,
    private readonly columnsService: ColumnsService,
  ) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto): Promise<ColumnModel> {
    const message = `ColumnsController.create() createColumnDto=${JSON.stringify(
      createColumnDto,
    )}`;
    this.logger.log(message);
    return this.columnsService.create(createColumnDto);
  }

  @Get()
  @Public()
  findAll(): Promise<ColumnModel[]> {
    const message = 'ColumnsController.findAll()';
    this.logger.log(message);
    return this.columnsService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ColumnModel> {
    const message = `ColumnsController.findOne() id=${id}`;
    this.logger.log(message);
    return this.columnsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ): Promise<ColumnModel> {
    const message = `ColumnsController.update() id=${id} updateColumnDto=${JSON.stringify(
      updateColumnDto,
    )}`;
    this.logger.log(message);
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ColumnModel> {
    const message = `ColumnsController.remove() id=${id}`;
    this.logger.log(message);
    return this.columnsService.remove(id);
  }
}
