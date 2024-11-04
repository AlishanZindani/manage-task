import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './tasks/tasks.module';
import { AppDataSource } from './data-source'; // Adjust to match your export

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the configuration globally available
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        // Initialize the AppDataSource before returning the config
        await AppDataSource.initialize(); // Ensure it's initialized only once
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, 
        };
      },
    }),
    TaskModule,
  ],
})
export class AppModule {}
