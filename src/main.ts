import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    credentials: true,
    origin: true,
  });

  const config = new DocumentBuilder()
    .setTitle("ADORA Metrics")
    .setDescription("API documentation")
    .setVersion("0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs/api", app, document);

  process.on("SIGINT", () => {
    console.log("Request to exit ...");
    process.kill(process.pid, "SIGTERM");
  });
  process.on("SIGTERM", () => {
    console.log("Terminating ...");
    app
      .close()
      .catch((err) => console.error("Error when closing application", err))
      .then(() => console.log("Process terminated"));
  });

  await app.listen(process.env.PORT || 3000, "0.0.0.0");
}
bootstrap();
