import { expect } from "chai";
import { isEqual, isPlainObject, isArrayOrObject, set, merge, handleSliceText } from "./helpers";

describe("isPlainObject function", () => {
  it("should accept plain object", () => {
    const result = isPlainObject({});
    expect(result).to.equal(true);
  });

  it("should reject array", () => {
    const result = isPlainObject([]);
    expect(result).to.equal(false);
  });

  it("should reject string", () => {
    const result = isPlainObject("");
    expect(result).to.equal(false);
  });

  it("should reject number", () => {
    const result = isPlainObject(0);
    expect(result).to.equal(false);
  });

  it("should reject null", () => {
    const result = isPlainObject(null);
    expect(result).to.equal(false);
  });

  it("should reject class instance", () => {
    class TestClass {
      test: string = "test";
    }
    const result = isPlainObject(new TestClass());
    expect(result).to.equal(false);
  });

  it("should reject function", () => {
    const result = isPlainObject(() => true);
    expect(result).to.equal(false);
  });
});

describe("isArrayOrObject function", () => {
  it("should accept plain object", () => {
    const result = isArrayOrObject({});
    expect(result).to.equal(true);
  });

  it("should accept array", () => {
    const result = isArrayOrObject([]);
    expect(result).to.equal(true);
  });

  it("should reject string", () => {
    const result = isArrayOrObject("");
    expect(result).to.equal(false);
  });

  it("should reject number", () => {
    const result = isArrayOrObject(0);
    expect(result).to.equal(false);
  });

  it("should reject null", () => {
    const result = isArrayOrObject(null);
    expect(result).to.equal(false);
  });

  it("should reject class instance", () => {
    class TestClass {
      test: string = "test";
    }
    const result = isArrayOrObject(new TestClass());
    expect(result).to.equal(false);
  });

  it("should reject function", () => {
    const result = isArrayOrObject(() => true);
    expect(result).to.equal(false);
  });
});

describe("isEqual function", () => {
  const obj1 = { a: { b: { d: 2 } } };

  it("should accept equal objects", () => {
    const obj2 = { ...obj1 };
    const result = isEqual(obj1, obj2);
    expect(result).to.equal(true);
  });

  it("should accept empty objects", () => {
    const result = isEqual({}, {});
    expect(result).to.equal(true);
  });

  it("should reject objects with different values", () => {
    const obj2 = { ...obj1, d: 3 };
    const result = isEqual(obj1, obj2);
    expect(result).to.equal(false);
  });

  it("should reject objects with different keys count", () => {
    const obj2 = { ...obj1, c: 3 };
    const result = isEqual(obj1, obj2);
    expect(result).to.equal(false);
  });
});

describe("merge function", () => {
  it("should merge two objects", () => {
    const obj1 = { a: { b: { d: 2 } } };
    const obj2 = { a: { b: { c: 3 } } };
    const result = merge(obj1, obj2);
    expect(result).to.deep.equal({ a: { b: { c: 3, d: 2 } } });
  });

  it("should throw an error if any passed arguments is not an object", () => {
    const notAnObject = 10;
    // @ts-ignore
    const func = () => merge(notAnObject, {});
    expect(func).to.throw(Error);
  });
});

describe("set function", () => {
  const keypath = "test";
  const value = "some value";
  let obj: Record<string, unknown>;

  beforeEach(() => {
    obj = {};
  });

  it("should set a value by keypath to the object", () => {
    set(obj, keypath, value);
    expect(obj).to.haveOwnProperty(keypath, value);
  });

  it("should return original object", () => {
    const result = set(obj, keypath, value);
    obj.test2 = "another value";
    expect(result).to.equal(obj);
  });

  it("should return original object if it's is not an object", () => {
    const notAnObject = "string";
    const result = set(notAnObject, keypath, value);
    expect(result).to.eq(notAnObject);
  });

  it("should throw an error if path is not a string", () => {
    const keypathNotAString = 10;
    // @ts-ignore because we want to check behaviour in runtime
    const func = () => set(obj, keypathNotAString, value);
    expect(func).to.throw(Error);
  });
});

describe("handleSliceText function", () => {
  const largeText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
  const smallText = "Lorem";
  it("should return a trimmed string if it is more than 20 characters", () => {
    const trimmedText20 = "Lorem ipsum dolor si...";
    const result = handleSliceText(largeText);
    expect(result).to.equal(trimmedText20);
  });

  it("should return a trimmed string if string is more than maxSize", () => {
    const maxSize = 5;
    const trimmedText5 = "Lorem...";

    const result = handleSliceText(largeText, maxSize);
    expect(result).to.equal(trimmedText5);
  });

  it("should return the same string if less than 20 characters and handleSliceText doesn't takes maxSize", () => {
    const result = handleSliceText(smallText);
    expect(result).to.equal(smallText);
  });

  it("should throw an error if content is not a string", () => {
    const contentNotAString = {};
    // @ts-ignore because we want to check behaviour in runtime
    const func = () => handleSliceText(contentNotAString);
    expect(func).to.throw(Error);
  });

  it("should throw an error if maxSize is not a number", () => {
    const maxSizeNotANumber = "2";
    // @ts-ignore because we want to check behaviour in runtime
    const func = () => handleSliceText(smallText, maxSizeNotANumber);
    expect(func).to.throw(Error);
  });
});
