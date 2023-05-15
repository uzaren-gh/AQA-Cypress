// Візьміть будь-яке публічне API з вказаного списку -
// https://github.com/public-apis/public-apis

// Напишіть серію тестів для цього API. Має бути мінімум 10 автоматизованих тестів,
//  де мають бути покриті наступні аспекти:

// 1. використання різних HTTP методів (GET/POST/etc)
// 2. відправка та перевірка заголовків (headers), як стандартних (User-Agent),
// так і кастомних
// 3. відправка query параметрів, в тому числі рандомізованих
// 4. перевірка тіла відповіді
// 5. перевірка тривалості виконання запиту

// GET: https://parallelum.com.br/fipe/api/v1/carros/marcas

// "https://dummyjson.com/products/search?q=phone"
//   .then((res) => res.json())
//   .then(console.log);

describe('"Happy Path" on dummyjson.com', () => {
  const methods = ["POST", "GET", "PATCH", "PUT", "DELETE"];
  let qs = "add";
  methods.forEach((meth) => {
    it(`response code should be 200 for ${meth}-method`, () => {
      let request = {
        method: meth,
        url: `https://dummyjson.com/products/${qs}`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Proba Pera",
        }),
        failOnStatusCode: false,
      };
      cy.request(request).then((response) => {
        // const status = response.status;
        qs = 1;
        assert.equal(200, response.status);
      });
    });
  });
});

// тестируем API транспортных средств Бразилии :-)
describe("https://parallelum.com.br/fipe/api/v1/carros/marcas", () => {
  const vehicles = {
    types: ["carros", "motos", "caminhoes"],
    // marksArrayLength: [],
    // codes: [],
  };

  //получаем массивы марок транспортных средств по типам
  vehicles.types.forEach((vehicleType) => {
    it(`Get of marks ${vehicleType}, is status code 200`, () => {
      let request = {
        method: "GET",
        url: `https://parallelum.com.br/fipe/api/v1/${vehicleType}/marcas`,
        headers: { "Content-Type": "application/json" },
        failOnStatusCode: false,
      };
      cy.request(request).then((response) => {
        assert.equal(200, response.status);
      });
    });
  });
  //тест по случайной модели из списка легковых авто:
  it(`Get models of random ${vehicles.types[0]} marks, are year and model arrays `, () => {
    const random = (max, min) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let codes = [];
    //для независимости тестов получаем список ТС по маркам легковушек:
    let request = {
      method: "GET",
      url: `https://parallelum.com.br/fipe/api/v1/${vehicles.types[0]}/marcas/`,
      headers: { "Content-Type": "application/json" },
      failOnStatusCode: false,
    };

    cy.request(request).then((response) => {
      //получим массив номеров:
      codes = response.body.map((elem) => elem.codigo);
      //получаем код и марку со случайным номером:
      let randV = random(1, codes.length);
      //код ТС:
      const randomCode = codes[randV];
      //теперь делаем запрос по модели с полученным случайным номером
      request.url = `https://parallelum.com.br/fipe/api/v1/${vehicles.types[0]}/marcas/${randomCode}/modelos`;
      cy.request(request).then((response) => {
        assert.equal(200, response.status);
        //проверяем, являются ли год и модель в ответе массивами:
        assert.isTrue(
          Array.isArray(response.body.anos) &&
            Array.isArray(response.body.modelos)
        );
      });
    });
  });

  //тест по случайной модели из списка мотоциклов:
  it(`Get models of random ${vehicles.types[1]} marks, are year and model arrays `, () => {
    const random = (max, min) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let codes = [];
    //для независимости тестов получаем список ТС по маркам мотоциклов:
    let request = {
      method: "GET",
      url: `https://parallelum.com.br/fipe/api/v1/${vehicles.types[1]}/marcas/`,
      headers: { "Content-Type": "application/json" },
      failOnStatusCode: false,
    };

    cy.request(request).then((response) => {
      //получим массив номеров:
      codes = response.body.map((elem) => elem.codigo);
      //получаем код марки со случайным номером:
      let randV = random(1, codes.length);
      //код ТС:
      const randomCode = codes[randV];
      //теперь делаем запрос по модели с полученным случайным номером
      request.url = `https://parallelum.com.br/fipe/api/v1/${vehicles.types[1]}/marcas/${randomCode}/modelos`;
      cy.request(request).then((response) => {
        assert.equal(200, response.status);

        //проверяем, являются ли год и модель в ответе массивами:
        assert.isTrue(
          Array.isArray(response.body.anos) &&
            Array.isArray(response.body.modelos)
        );
      });
    });
  });

  //тест по случайной модели из списка грузовиков:
  it(`Get models of random ${vehicles.types[2]} marks, are year and model arrays `, () => {
    const random = (max, min) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let codes = [];
    //для независимости тестов получаем список ТС по маркам мотоциклов:
    let request = {
      method: "GET",
      url: `https://parallelum.com.br/fipe/api/v1/${vehicles.types[2]}/marcas/`,
      headers: { "Content-Type": "application/json" },
      failOnStatusCode: false,
    };

    cy.request(request).then((response) => {
      //получим массив номеров:
      codes = response.body.map((elem) => elem.codigo);
      //получаем код марки со случайным номером:
      let randV = random(1, codes.length);
      //код ТС:
      const randomCode = codes[randV];
      //теперь делаем запрос по модели с полученным случайным номером
      request.url = `https://parallelum.com.br/fipe/api/v1/${vehicles.types[2]}/marcas/${randomCode}/modelos`;
      cy.request(request).then((response) => {
        assert.equal(200, response.status);

        //проверяем, являются ли год и модель в ответе массивами:
        assert.isTrue(
          Array.isArray(response.body.anos) &&
            Array.isArray(response.body.modelos)
        );
      });
    });
  });
});
