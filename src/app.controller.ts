import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class AppController {
  // constructor(@Inject('Mongo') private database: Db) {}

  @Get()
  @Header('content-type', 'text/html')
  getHello(): string {
    return `
    <h1>API</h1>
    <ul>
      <li><a href="/docs"> Documentacion </a></li>
    </ul>
    `;
  }
}
