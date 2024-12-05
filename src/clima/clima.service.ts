import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ClimaService {
  constructor(private readonly configService: ConfigService) {}

  async getClima(city: string): Promise<any> {
    const apikey = this.configService.get<string>('WEATHER_API_KEY');// Usa una clave API para obtener el clima
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el clima para la ciudad ${city}: ${error.message}`);
      
      // Devolver valores predeterminados en caso de error
      return {
        clima: "desconocido",
        temperatura: null,
        descripcion: "No disponible",
      };
    }
  }

  // Método para obtener el clima por coordenadas
  async getClimaByCoordinates(latitude: number, longitude: number): Promise<any> {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY'); // Clave API
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el clima para las coordenadas (${latitude}, ${longitude}): ${error.message}`);
      
      // Devolver valores predeterminados en caso de error
      return {
        clima: "desconocido",
        temperatura: null,
        descripcion: "No disponible",
      };
    }
  }
}
