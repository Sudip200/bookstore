import config from "../config";
import bcrypt from 'bcryptjs';
class HashService {
  private saltRound: number | string;
  private static instance: HashService;
  constructor() {
    this.saltRound = config.saltRounds;
  }
  public static getInstance(): HashService {
    if (!HashService.instance) {
      HashService.instance = new HashService();
    }
    return HashService.instance;
  }
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRound)
  }
  async compare(hash: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password,hash)
  }
}
export default HashService;