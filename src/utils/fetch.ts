import { JsonObject } from "./Interfaces";

enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

type Options = {
  method?: METHODS;
  data?: JsonObject;
};

// function queryStringify(data: any, prefix?: string): string {
//   if (typeof data !== "object") {
//     throw new Error("Query data must be object");
//   }
//   let res: string[] = [];
//   data.forEach((p: string) => {
//     const key = prefix ? `${prefix}[${p}]` : p;
//     const value = data[key] === null || data[key] === undefined || Number.isNaN(data[key]) ? "" : data[key];
//     res.push(
//       typeof value === "object"
//         ? queryStringify(value, key)
//         : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
//     );
//   });
//   return `${!prefix && "?"}${res.join("&")}`;
// }

export default class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = "/", id?: number): Promise<Response> {
    return this.request(this.endpoint + path + id && `/${id}`, { method: METHODS.GET });
  }

  public post<Response = void>(path: string, data?: JsonObject): Promise<Response> {
    return this.request(this.endpoint + path, { method: METHODS.POST, data });
  }

  public put<Response = void>(path: string, data: JsonObject): Promise<Response> {
    return this.request(this.endpoint + path, { data, method: METHODS.PUT });
  }

  public patch<Response = void>(path: string, data: JsonObject): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: METHODS.PATCH,
      data,
    });
  }

  public delete<Response>(path: string): Promise<Response> {
    return this.request(this.endpoint + path, { method: METHODS.DELETE });
  }

  private request<Response>(url: string, options: Options = { method: METHODS.GET }): Promise<Response> {
    const { method, data } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      // const isGet = method === METHODS.GET;
      // if (isGet) {
      //   const newUrl = url + queryStringify(data);
      //   xhr.open(method, newUrl);
      // } else {
      //   xhr.open(method, url);
      // }
      xhr.open(method ? method : METHODS.GET, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });

      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

// type FetchWithRetriyOptions = Options & {
//   retries: number;
// };

// export function fetchWithRetry(
//   url: string,
//   options: FetchWithRetriyOptions
// ): Promise<XMLHttpRequest> {
//   const { retries = 5, ...fetchOptions } = options;

//   function onError() {
//     if (retries === 1) {
//       throw new Error("No retries left");
//     }
//     return fetchWithRetry(url, {
//       ...fetchOptions,
//       ...{ retries: retries - 1 },
//     });
//   }

//   return new HTTPTransport().request(url, fetchOptions).catch(onError);
// }
