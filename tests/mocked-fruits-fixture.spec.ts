import {expect, test} from "./fixtures/test"

test("should show mocked fruits", async ({mockedFruitsPage}) => {
    await expect(mockedFruitsPage.getByText("QA Automation Apple")).toBeVisible();
    await expect(mockedFruitsPage.getByText("Playwright Banana")).toBeVisible();
    await expect(mockedFruitsPage.getByText("Strawberry")).not.toBeVisible();
})