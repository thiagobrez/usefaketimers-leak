import { renderRouter } from "expo-router/testing-library";

test("renderRouter() is leaking fake timers", () => {
  // renderRouter will call `jest.useFakeTimers()` and it leaks to all next tests
  renderRouter();
});

test("second test expecting real timers", (done) => {
  const callback = jest.fn(() => {
    expect(callback).toHaveBeenCalledTimes(1);
    done(); // Mark the test as complete when callback is called
  });

  // Set a timeout with real timers
  setTimeout(callback, 100); // this should run in real time (100ms)

  // Since fake timers are still in place, this won't complete naturally,
  // and the test will hang or fail because the callback won't be invoked.

  // To fix this, we can rollback to real timers at the beginning of this test:
  // `
  //  jest.runOnlyPendingTimers();
  //  jest.useRealTimers();
  // `
  // but ideally this should be handled by in renderRouter's code itself
});
