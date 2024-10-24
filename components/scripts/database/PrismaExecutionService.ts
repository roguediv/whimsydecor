// prismaExecutionService.ts
class PrismaExecutionService {
  private isRunning = false;

  startQuery() {
    if (this.isRunning) {
      console.warn("Prisma is already running a query");
      return false; // Prevent further queries
    }
    this.isRunning = true;
    return true; // Allow the query to start
  }

  endQuery() {
    this.isRunning = false;
  }

  isQueryRunning() {
    return this.isRunning;
  }
}

export const prismaExecutionService = new PrismaExecutionService();