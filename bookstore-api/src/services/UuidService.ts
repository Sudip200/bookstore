import { v4 as uuid } from 'uuid'
class UuidSingeltonService {
    public static serviceInstance: UuidSingeltonService;
    getInstance(): UuidSingeltonService {
      if(!UuidSingeltonService.serviceInstance){
          UuidSingeltonService.serviceInstance  = new UuidSingeltonService();
      }
      return  UuidSingeltonService.serviceInstance;
    }
    generateId(): string {
        return uuid();
    }
}
export default UuidSingeltonService;