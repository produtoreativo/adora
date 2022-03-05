import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: true,
  });

  process.on('SIGINT', () => {
    console.log('Request to exit ...');
    process.kill(process.pid, 'SIGTERM');
  });
  process.on('SIGTERM', () => {
    console.log('Terminating ...');
    app
      .close()
      .catch((err) => console.error('Error when closing application', err))
      .then(() => console.log('Process terminated'));
  });

  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
