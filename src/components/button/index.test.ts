import { expect } from "chai";
import sinon from "sinon";
import { Button } from "./index";
import Router from "../../utils/Router";

describe("Button", () => {
  let callback = sinon.stub();
  const button = new Button({
    label: "",
    className: "",
    events: {
      click: callback
    }
  });

  const element = button.element as HTMLButtonElement;

  afterEach(() => {
    callback = sinon.stub();
  });

  it("should fire callback after click", () => {
    element.click();

    expect(callback.calledOnce).to.eq(true);
  });

  it("should return button", () => {
    expect(element).to.be.instanceof(window.HTMLButtonElement);
  });

  it("should go to passed route on click", () => {
    const secButton = new Button({
      label: "",
      className: "",
      to: "/"
    });
    const spy = sinon.spy(Router, "go");
    const secElement = secButton.element as HTMLButtonElement;

    secElement.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
