import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { prisma } from '@flowpilot/database';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

class BackgroundWorker {
  private isRunning = false;
  private heartbeatInterval?: NodeJS.Timeout;

  public async start(): Promise<void> {
    console.log('[FlowPilot Worker] Initializing background worker lifecycle...');

    // Verify database connectivity
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('[FlowPilot Worker] Connected to PostgreSQL persistence store.');
    } catch (error) {
      console.error('[FlowPilot Worker] Database connection error during startup:', error);
      process.exit(1);
    }

    this.isRunning = true;
    console.log('[FlowPilot Worker] Background worker operational (Ready for queue consumption in M2).');

    // Heartbeat log loop
    this.heartbeatInterval = setInterval(() => {
      if (this.isRunning) {
        console.log(`[FlowPilot Worker] Heartbeat tick at ${new Date().toISOString()}`);
      }
    }, 30000);

    const shutdownHandler = async (signal: string): Promise<void> => {
      console.log(`[FlowPilot Worker] Received ${signal}. Starting graceful shutdown...`);
      await this.stop();
      process.exit(0);
    };

    process.on('SIGTERM', () => void shutdownHandler('SIGTERM'));
    process.on('SIGINT', () => void shutdownHandler('SIGINT'));
  }

  public async stop(): Promise<void> {
    this.isRunning = false;
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    await prisma.$disconnect();
    console.log('[FlowPilot Worker] Graceful shutdown completed.');
  }
}

const worker = new BackgroundWorker();
worker.start().catch((err) => {
  console.error('[FlowPilot Worker] Fatal error:', err);
  process.exit(1);
});
