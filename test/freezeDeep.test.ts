import freezeDeep from "../src/freezeDeep";

describe("single nested object", () => {
  const anyObject = freezeDeep({ a: 1, b: 2, c: "one", d: "two" });

  it("should not change the value of the property of the object", () => {
    try {
      anyObject.c = 2;
    } catch (e) {}
    expect(anyObject.c).toBe("one");
  });

  it("should throw error when the object is mutated", () => {
    let error;
    try {
      anyObject.a = 2;
    } catch (err) {
      error = err;
    }
    expect(error).not.toBe(undefined);
  });
});

describe("single nested array (array like object)", () => {
  const anyArray = freezeDeep(["one", "two", 1, 2, 3]);

  it("should not change the value of each element", () => {
    try {
      anyArray[0] = 2;
    } catch (e) {}
    expect(anyArray[0]).toBe("one");
  });

  it("should not add or remove any element in the array", () => {
    const clonedArray = [...anyArray];
    try {
      anyArray.push(1);
      anyArray.pop();
    } catch (e) {}
    expect(anyArray).toEqual(clonedArray);
  });

  it("should not throw error on any attemption of mutation", () => {
    let mutatingValueError;
    let addElementError;
    let removeElementError;

    try {
      anyArray[0] = 1;
    } catch (e) {
      mutatingValueError = e;
    }

    try {
      anyArray.push(1);
    } catch (e) {
      addElementError = e;
    }

    try {
      anyArray.pop();
    } catch (e) {
      removeElementError = e;
    }
    expect(mutatingValueError).not.toBe(undefined);
    expect(addElementError).not.toBe(undefined);
    expect(removeElementError).not.toBe(undefined);
  });
});

describe("Json --> nested(arrays + objects)", () => {
  const nestedJson = freezeDeep({
    employee: {
      name: "xyz",
      emails: ["xyz@gmail.com", "abcd@.com"],
      salary: 10
    }
  });

  it("should not change value when object is accessed by a reference", () => {
    const clonedNestedJson = JSON.parse(JSON.stringify(nestedJson));
    const employeeRef = nestedJson.employee;
    try {
      employeeRef.name = "bad name";
    } catch (e) {}
    expect(clonedNestedJson).toEqual(nestedJson);
  });

  it("should not change value when array is accessed by a reference", () => {
    const clonedNestedJson = JSON.parse(JSON.stringify(nestedJson));
    const emailsRef = nestedJson.employee.emails;
    try {
      emailsRef[0] = "bad name";
      emailsRef.push(1);
      emailsRef.pop(1);
    } catch (e) {}
    expect(clonedNestedJson).toEqual(nestedJson);
  });

  it("should throw error when object is accessed by a reference", () => {
    const employeeRef = nestedJson.employee;
    let error;
    try {
      employeeRef.name = "bad name";
    } catch (e) {
      error = e;
    }
    expect(error).not.toEqual(undefined);
  });

  it("should throw error when array is accessed by a reference", () => {
    const emailsRef = nestedJson.employee.emails;
    let error;
    try {
      emailsRef[0] = "bad name";
      emailsRef.push(1);
      emailsRef.pop(1);
    } catch (e) {
      error = e;
    }
    expect(error).not.toEqual(undefined);
  });
});
