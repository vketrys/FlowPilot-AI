import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { prisma } from '@flowpilot/database';

export interface HealthResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  database: 'connected' | 'disconnected';
  environment: string;
  uptimeSeconds: number;
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'System health and database connectivity check' })
  @ApiResponse({ status: 200, description: 'System is healthy and database is connected' })
  @ApiResponse({ status: 503, description: 'Database is disconnected' })
  async getHealth(@Res() res: Response): Promise<Response> {
    let databaseStatus: 'connected' | 'disconnected' = 'disconnected';

    try {
      // Direct raw query to verify PostgreSQL connectivity
      await prisma.$queryRaw`SELECT 1`;
      databaseStatus = 'connected';
    } catch (error) {
      console.error('[HealthController] Database connection failed:', error);
      databaseStatus = 'disconnected';
    }

    const isHealthy = databaseStatus === 'connected';
    const responsePayload: HealthResponse = {
      status: isHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      database: databaseStatus,
      environment: process.env.NODE_ENV || 'development',
      uptimeSeconds: Math.floor(process.uptime()),
    };

    return res.status(isHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE).json(responsePayload);
  }
}
