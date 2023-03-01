import { JsonObject } from "./Interfaces";

enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

type Options = {
  headers?: Record<string, string>;
  method?: METHODS;
  timeout?: number;
  data?: JsonObject;
};

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: any, prefix?: string): string {
  if (typeof data !== "object") {
    throw new Error("Query data must be object");
  }
  let res: string[] = [];
  data.forEach((p) => {
    const key = prefix ? `${prefix}[${p}]` : p;
    const value =
      data[key] === null || data[key] === undefined || Number.isNaN(data[key])
        ? ""
        : data[key];
    res.push(
      typeof value === "object"
        ? queryStringify(value, key)
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    );
  });
  return `${!prefix && "?"}${res.join("&")}`;
}

type HTTPMethod = (
  url: string,
  options?: Omit<Options, "method">
) => Promise<XMLHttpRequest>;

export class HTTPTransport {
  get: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options?.timeout
    );
  };

  post: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options?.timeout
    );
  };

  put: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options?.timeout
    );
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options?.timeout
    );
  };

  request = (
    url: string,
    options: Options,
    timeout = 5000
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      if (isGet) {
        const newUrl = url + queryStringify(data);
        xhr.open(method, newUrl);
      } else {
        xhr.open(method, url);
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.timeout = timeout;
      xhr.onload = function () {
        if (xhr.status >= 400) {
          reject(xhr.response);
        }
        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      if (isGet || !data) {
        xhr.send();
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
  url: string,
  options: FetchWithRetriyOptions
): Promise<XMLHttpRequest> {
  const { retries = 5, ...fetchOptions } = options;

  function onError() {
    if (retries === 1) {
      throw new Error("No retries left");
    }
    return fetchWithRetry(url, {
      ...fetchOptions,
      ...{ retries: retries - 1 },
    });
  }

  return new HTTPTransport().request(url, fetchOptions).catch(onError);
}
