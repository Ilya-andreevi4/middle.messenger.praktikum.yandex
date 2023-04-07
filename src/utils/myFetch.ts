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

type HTTPMethod = (path: string, options?: Options) => Promise<unknown>;

export default class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";

  public queryStringify(data: Record<string, string>) {
    const templ = `?${Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join("&")}`;
    return templ;
  }

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get: HTTPMethod = (path, options = {}) => {
    const currentPath = `${this.endpoint}${
      options.id && path !== "/" ? `${path}/${options.id}` : path
    }`;
    return this.request(currentPath, {
      ...options,
      method: METHODS.GET,
      data: options.data
    });
  };

  public post: HTTPMethod = (path: string, options = {}) => {
    const currentPath = this.endpoint + path;
    return this.request(currentPath, { ...options, method: METHODS.POST, data: options.data });
  };

  public put: HTTPMethod = (path: string, options = {}) => {
    const currentPath = this.endpoint + path;
    return this.request(currentPath, { ...options, method: METHODS.PUT, data: options.data });
  };

  public patch: HTTPMethod = (path: string, options = {}) => {
    const currentPath = this.endpoint + path;
    return this.request(currentPath, { method: METHODS.PATCH, data: options.data });
  };

  public delete: HTTPMethod = (path: string, options = {}) => {
    const currentPath = this.endpoint + path;
    return this.request(currentPath, { ...options, method: METHODS.DELETE, data: options.data });
  };

  private request: HTTPMethod = (url: string, options: Options = { method: METHODS.GET }) => {
    const { headers, method = METHODS.GET, timeout = 5000, data } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method,
        method === METHODS.GET && !!data
          ? `${url}${this.queryStringify(data as Record<string, string>)}`
          : `${url}`
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
  };
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
    return new HTTPTransport(endpoint).post(url, fetchOptions).catch((e) => onError(e));
  }
  if (currentMethod === "delete") {
    return new HTTPTransport(endpoint).delete(url).catch((e) => onError(e));
  }
  if (currentMethod === "put") {
    return new HTTPTransport(endpoint).put(url, fetchOptions).catch((e) => onError(e));
  }
  if (currentMethod === "patch") {
    return new HTTPTransport(endpoint).patch(url, fetchOptions).catch((e) => onError(e));
  }
  return new HTTPTransport(endpoint).get(url, fetchOptions).catch((e) => onError(e));
}
