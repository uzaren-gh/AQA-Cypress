import { LoginPageTest } from "./pages/login";

import { HomePageTests } from "./pages/HomePage";

const loginPage = new LoginPageTest();
const homePage = new HomePageTests();

const signData = {
  login1: "user888@gmail.com",
  pass1: "1234567890",
  login2: "testowyqa@qa.team",
  pass2: "QA!automation-1",
};

describe("LMS login/logout", () => {
  it("Enter e-mail#1, enter password#1", () => {
    loginPage.visitt("https://www.edu.goit.global/account/login");

    loginPage.SignIn(signData.login1, signData.pass1);

    homePage.exit();
  });

  it("Enter e-mail#2, enter password#2", () => {
    loginPage.visitt("https://www.edu.goit.global/account/login");

    loginPage.SignIn(signData.login2, signData.pass2);

    homePage.exit();
  });
});
