import { JsonObject } from "./Interfaces";

enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

type Options = {
  headers?: Record<string, string>;
  method?: METHODS;
  timeout?: number;
  id?: number;
  data?: JsonObject | FormData;
};

function queryStringify(data: any, prefix?: string): string {
  if (typeof data !== "object") {
    throw new Error("Query data must be object");
  }
  const res: string[] = [];
  data.forEach((p: string) => {
    const key = prefix ? `${prefix}[${p}]` : p;
    const value =
      data[key] === null || data[key] === undefined || Number.isNaN(data[key]) ? "" : data[key];
    res.push(
      typeof value === "object"
        ? queryStringify(value, key)
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    );
  });
  return `${!prefix && "?"}${res.join("&")}`;
}

type HTTPMethod<Response = void> = (
  path: string,
  data?: JsonObject | FormData,
  id?: number
) => Promise<Response>;

export default class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = "/", id?: number): Promise<Response> {
    const currentPath = id && path !== "/" ? `${path}/${id}` : path;

    return this.request(this.endpoint + currentPath, { method: METHODS.GET });
  }

  public post: HTTPMethod = (path, data?) => {
    const currentPath = this.endpoint + path;
    return this.request(currentPath, { method: METHODS.POST, data });
  };

  public put: HTTPMethod = (path, data?) => {
    const currentPath = this.endpoint + path;
    return this.request(currentPath, { method: METHODS.PUT, data });
  };

  public patch: HTTPMethod = (path, data?) => {
    const currentPath = this.endpoint + path;
    return this.request(currentPath, { method: METHODS.PATCH, data });
  };

  public delete: HTTPMethod = (path, data?) => {
    const currentPath = this.endpoint + path;
    return this.request(currentPath, { method: METHODS.DELETE, data });
  };

  private request<Response>(
    url: string,
    options: Options = { method: METHODS.GET }
  ): Promise<Response> {
    const { headers, method = METHODS.GET, timeout = 5000, data } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method,
        method === METHODS.GET && !!data
          ? `${this.endpoint}${url}${queryStringify(data)}`
          : `${this.endpoint}${url}`
      );

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      if (headers) {
        Object.keys(headers).forEach((key: string) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });

      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

type FetchWithRetriyOptions = Options & {
  retries: number;
};

export function fetchWithRetry(
  endpoint: string,
  url: string,
  options: FetchWithRetriyOptions
): Promise<any> {
  const { retries = 5, ...fetchOptions } = options;

  function onError(e: any) {
    if (retries === 1) {
      throw new Error("Retries left. Error:", e);
    }
    return fetchWithRetry(endpoint, url, {
      ...fetchOptions,
      ...{ retries: retries - 1 }
    });
  }
  const currentMethod = options.method?.toLowerCase() || "get";
  if (currentMethod === "post") {
    return new HTTPTransport(endpoint).post(url, fetchOptions.data).catch((e) => onError(e));
  }
  if (currentMethod === "delete") {
    return new HTTPTransport(endpoint).delete(url).catch((e) => onError(e));
  }
  if (currentMethod === "put") {
    return new HTTPTransport(endpoint).put(url, fetchOptions.data).catch((e) => onError(e));
  }
  if (currentMethod === "patch") {
    return new HTTPTransport(endpoint).patch(url, fetchOptions.data).catch((e) => onError(e));
  }
  return new HTTPTransport(endpoint).get(url, fetchOptions.id).catch((e) => onError(e));
}
