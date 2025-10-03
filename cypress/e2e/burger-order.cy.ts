/// <reference types="cypress" />
export {};

describe('burger order app', () => {
  beforeEach(() => {
    // Фейк /login
    cy.intercept('POST', '**/api/auth/login', {
      statusCode: 200,
      body: {
        success: true,
        accessToken: "Bearer test-access",
        refreshToken: "test-refresh",
        user: {
          email: "testik123@test.ru",
          name: "Test User",
        },
      }
    }).as('login');

    // Фейк /order
    cy.intercept('POST', '**/api/orders', {
      statusCode: 200,
      body: {
        success: true,
        order: {
          number: 12345
        }
      }
    }).as('postOrder');

    cy.visit('http://localhost:3000');
  });

  it('should create burger and submit order', () => {
    // Подготовленные данные
    const ingredients = [
      {
          "_id": "643d69a5c3f7b9001cfa093c",
          "name": "Краторная булка N-200i",
          "type": "bun",
          "price": 1255,
      },
      {
          "_id": "643d69a5c3f7b9001cfa0943",
          "name": "Соус фирменный Space Sauce",
          "type": "sauce",
          "price": 80,
      },
      {
        "_id": "643d69a5c3f7b9001cfa0940",
        "name": "Говяжий метеорит (отбивная)",
        "type": "main",
        "price": 3000,
      }
    ]

    ingredients.forEach(ingredient => {
      cy.get(`[data-test="ingredient-${ingredient._id}"]`).trigger('dragstart');
      cy.get('[data-test="burger-constructor"]').trigger('drop');
    });

    cy.get('[data-test="burger-constructor"]')
      .should('contain.text', "Краторная булка N-200i")
      .should('contain.text', "Соус фирменный Space Sauce")
      .should('contain.text', "Говяжий метеорит (отбивная)")

    // Нажатие на кнопку заказа
    cy.get('[data-test="submit-button"]').click();

    // Авторизация
    cy.url().should('include', '/login');
    cy.get('[data-test="login-email"]').type("testik123@test.ru");
    cy.get('[data-test="login-password"]').type("272727");
    cy.get('[data-test="login-submit"]').click();
    cy.wait('@login');

    // Запрос на оформление заказа
    cy.url().should('eq', 'http://localhost:3000/')
    cy.get('[data-test="submit-button"]').click();
    cy.wait('@postOrder');

    // Открываем модальное окно
    cy.get('[data-test="order-modal"]', { timeout: 1000 })
      .should('exist')
      .and('be.visible')
      .and('contain.text', '12345');

    // Закрываем модальное окно
    cy.get('[data-test="close-modal"]').click();
    cy.get('[data-test="order-modal"]').should('not.exist');
  });
  it("should test ingredient open/close modal", () => {
    // Подготовка
    const ingredient = {
      "_id": "643d69a5c3f7b9001cfa0942",
      "name": "Соус Spicy-X",
      "type": "sauce",
      "proteins": 30,
      "fat": 20,
      "carbohydrates": 40,
      "calories": 30,
      "price": 90,
      "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      "__v": 0
    }

    // Открываем модальное окно
    cy.get(`[data-test="ingredient-${ingredient._id}"]`).click();
    cy.get('[data-test="ingredient-modal"]').should('exist');

    // Проверка содержимого
    cy.get('[data-test="ingredient-modal"]').within(() => {
      cy.get(`img`).should('have.attr', 'src', ingredient.image);
      cy.contains(ingredient.name).should('exist');
      cy.contains('Калории, ккал').next().should('contain.text', ingredient.calories);
      cy.contains('Белки,г').next().should('contain.text', ingredient.proteins);
      cy.contains('Жиры, г').next().should('contain.text', ingredient.fat);
      cy.contains('Углеводы, г').next().should('contain.text', ingredient.carbohydrates);
    });

    // 1. Закрытие по кнопке
    cy.get('[data-test="close-modal"]').last().click();
    cy.get('[data-test="ingredient-modal"]').should('not.exist');

    // Повторное открытие
    cy.get(`[data-test="ingredient-${ingredient._id}"]`).click();
    cy.get('[data-test="ingredient-modal"]').should('exist');

    // 2. Закрытие кликом по оверлею
    cy.get('[data-test="modal-overlay"]').last().click({ force: true });
    cy.get('[data-test="ingredient-modal"]').should('not.exist');

    // Повторное открытие
    cy.get(`[data-test="ingredient-${ingredient._id}"]`).click();
    cy.get('[data-test="ingredient-modal"]').should('exist');

    // 3. Закрытие клавишей Esc
    cy.get('body').type('{esc}');
    cy.get('[data-test="ingredient-modal"]').should('not.exist');
  })
});