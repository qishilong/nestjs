// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }

// import { z } from 'zod';

// export const createCatSchema = z
//   .object({
//     name: z.string(),
//     age: z.number(),
//     breed: z.string(),
//   })
//   .required();

// export type CreateCatDto = z.infer<typeof createCatSchema>;

import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
