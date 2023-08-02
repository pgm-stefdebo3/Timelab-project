import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express/multer';
import { AuthModule } from './auth/auth.module';
import { LayerModule } from './layer/layer.module';
import { MarkerModule } from './marker/marker.module';
import { CoordinateModule } from './coordinate/coordinate.module';
import { TimestampModule } from './timestamp/timestamp.module';

@Module({
  imports: [
    UserModule,
    MulterModule.register({
      dest: './upload',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        if (process.env.NODE_ENV === 'production') {
          return {
            url: process.env.DATABASE_URL,
            type: 'postgres',
            ssl: {
              rejectUnauthorized: false,
            },
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
          };
        } else {
          return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'secret123',
            database: 'waterlab',
            synchronize: true,
            entities: ['dist/**/*.entity{.ts,.js}'],
          };
        }
      },
    }),
    AuthModule,
    LayerModule,
    MarkerModule,
    CoordinateModule,
    TimestampModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
