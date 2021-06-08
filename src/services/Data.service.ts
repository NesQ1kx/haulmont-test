import { HttpService } from ".";
import { IMission } from "../interfaces";

export class DataService {
  private static instanceInternal: DataService;
  private httpService = HttpService.instance;

  public static get instance(): DataService {
    if (!DataService.instanceInternal) {
      DataService.instanceInternal = new DataService();
    }

    return DataService.instanceInternal;
  }

  public async fetchLaunches(): Promise<IMission[]> {
    const missions = await this.httpService.get<IMission[]>("launches");
    return missions;
  }
}
