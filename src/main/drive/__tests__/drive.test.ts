import Drive from "../index"

describe("驱动测试：", () => {
  it("寻找驱动", () => {
    const testAppPath = "/Users/wuliuqi/Desktop/zzh-project/z-app"
    const d = new Drive(testAppPath);
    expect(d.appRootPath).toBe(testAppPath);
  });
})
