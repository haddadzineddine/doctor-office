import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('TECHNICAL TEST x EURL ITEXC AGENCY')
  .setVersion('1.0')
  .addTag('EURL ITEXC AGENCY')
  .build();
