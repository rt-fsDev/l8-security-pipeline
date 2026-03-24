describe("Enhetstester för applikationen", () => {
  test("Kontrollera att 1+1 = 2", () => {
    expect(1 + 1).toBe(2);
  });

  test("Kontrollera att applikationen laddas", () => {
    const app = require("./sårbarKod");
    expect(app).toBeDefined();
  });
});
