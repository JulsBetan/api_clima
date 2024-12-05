import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClimaModule } from './clima/clima.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles globalmente
      envFilePath: process.env.NODE_ENV === 'production' ? '/app/.prod_env' : '.env', // Selecciona el archivo según el entorno
    }),
    ClimaModule, // Importa tus módulos aquí
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
