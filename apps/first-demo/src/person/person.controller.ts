import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { PersonService } from "./person.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@Controller("/api/person")
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Post("file")
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: "uploads/"
    })
  )
  body(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    console.log(files);
    return this.personService.create(createPersonDto);
  }

  @Get("find")
  query(@Query("name") name: string, @Query("age") age: number) {
    return `received: name=${name}, age=${age}`;
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.personService.remove(+id);
  }
}
