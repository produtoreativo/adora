import { ConfigModule } from "@nestjs/config";
import dbConfiguration from "./db.config";

ConfigModule.forRoot({
    isGlobal: true,
    load: [dbConfiguration],
})

export default dbConfiguration()