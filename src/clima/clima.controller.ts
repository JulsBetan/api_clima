import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ClimaService } from './clima.service';

@Controller('clima')
export class ClimaController {
  constructor(private readonly climaService: ClimaService) {}

  @Get()
  async obtenerClima(
    @Query('city') city?: string,
    @Query('lat') lat?: string,
    @Query('lon') lon?: string,
  ) {
    if (city) {
      // Si se proporciona la ciudad, se consulta el clima por ciudad
      return this.climaService.getClima(city);
    } else if (lat && lon) {
      // Si se proporcionan coordenadas, se consulta el clima por coordenadas
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      if (isNaN(latitude) || isNaN(longitude)) {
        throw new BadRequestException('Las coordenadas lat y lon deben ser números válidos.');
      }

      return this.climaService.getClimaByCoordinates(latitude, longitude);
    } else {
      // Si no se proporciona ni ciudad ni coordenadas, devuelve un error
      throw new BadRequestException('Debes proporcionar una ciudad (city) o coordenadas (lat y lon).');
    }
  }
}
