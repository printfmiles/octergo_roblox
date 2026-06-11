import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseCuidPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value || value.length < 10) {
      throw new BadRequestException('Invalid ID');
    }
    return value;
  }
}
