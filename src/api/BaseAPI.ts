import HTTPTransport from "../utils/myFetch";

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: number): Promise<unknown>;

  public abstract update?(identifier: number, data: unknown): Promise<unknown>;

  public abstract delete?(identifier: number): Promise<unknown>;
}
