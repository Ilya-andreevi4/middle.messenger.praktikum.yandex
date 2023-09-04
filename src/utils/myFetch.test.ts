import { expect } from "chai";
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from "sinon";
import http from "./myFetch";

describe("myFetch", () => {
  let xhr: SinonFakeXMLHttpRequestStatic, instance: http;
  const requests: SinonFakeXMLHttpRequest[] = [];
  const originalXMLHttpRequest = global.XMLHttpRequest;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new http("/chats");
  });

  afterEach(() => {
    requests.length = 0;
  });

  after(() => {
    global.XMLHttpRequest = originalXMLHttpRequest;
  });

  it(".get() should send GET request", () => {
    instance.get("/");
    const [request] = requests;
    expect(request.method).to.eq("GET");
  });

  it(".put() should send PUT request with proper data", () => {
    const data = { chatId: 1, users: [] };

    instance.put("/users", { data });
    const [request] = requests;

    expect(request.method).to.eq("PUT");
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it(".post() should send POST request with proper data", () => {
    const data = { title: "text" };

    instance.post("/", { data });
    const [request] = requests;

    expect(request.method).to.eq("POST");
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it(".delete() should send DELETE request with proper data", () => {
    const data = { chatId: 1 };

    instance.delete("/", { data });
    const [request] = requests;

    expect(request.method).to.eq("DELETE");
    expect(request.requestBody).to.eq(JSON.stringify(data));
  });
});
