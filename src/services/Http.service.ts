export class HttpService {
  private static instanceInternal: HttpService;
  private readonly apiUrl = "https://api.spacexdata.com/v3";

  public static get instance(): HttpService {
    if (!HttpService.instanceInternal) {
      HttpService.instanceInternal = new HttpService();
    }

    return HttpService.instanceInternal;
  }

  private constructor() {}

  public async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.apiUrl}/${url}`, {
      method: "GET",
    });

    return await response.json();
  }
}
