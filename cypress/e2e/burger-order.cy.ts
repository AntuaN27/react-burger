/// <reference types="cypress" />
export {};
import { INGREDIENTS } from '../fixtures/ingredients';

const {
  bun,
  sauceSpace,
  meatMeteor,
  sauceSpicyX
} = INGREDIENTS;
const testUrl = "http://localhost:3000/";
const testUser = {
  email: "testik123@test.ru",
  password: "272727"
};

const selectors = {
  ingredient: (id: string) => `[data-test="ingredient-${id}"]`,
  burgerConstructor: '[data-test="burger-constructor"]',
  submitButton: '[data-test="submit-button"]',
  orderModal: '[data-test="order-modal"]',
  closeModal: '[data-test="close-modal"]',
  ingredientModal: '[data-test="ingredient-modal"]',
  modalOverlay: '[data-test="modal-overlay"]',
};

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

    cy.visit(testUrl);
  });

  it('should create burger and submit order', () => {
    // Подготовленные данные
    [bun, sauceSpace, meatMeteor].forEach(ingredient => {
      cy.get(selectors.ingredient(ingredient._id)).trigger('dragstart');
      cy.get(selectors.burgerConstructor).trigger('drop');
    });

    cy.get(selectors.burgerConstructor)
      .should('contain.text', "Краторная булка N-200i")
      .should('contain.text', "Соус фирменный Space Sauce")
      .should('contain.text', "Говяжий метеорит (отбивная)")

    // Нажатие на кнопку заказа
    cy.get(selectors.submitButton).click();

    // Авторизация через cypress commands
    cy.login(testUser.email, testUser.password);

    // Запрос на оформление заказа
    cy.url().should('eq', testUrl)
    cy.get(selectors.submitButton).click();
    cy.wait('@postOrder');

    // Открываем модальное окно
    cy.get(selectors.orderModal, { timeout: 1000 })
      .should('exist')
      .and('be.visible')
      .and('contain.text', '12345');

    // Закрываем модальное окно
    cy.get(selectors.closeModal).click();
    cy.get(selectors.orderModal).should('not.exist');
  });
  it("should test sauceSpicyX ingredient open/close modal", () => {
    // Открываем модальное окно
    cy.get(selectors.ingredient(sauceSpicyX._id)).click();
    cy.get(selectors.ingredientModal).should('exist');

    // Проверка содержимого
    cy.get(selectors.ingredientModal).within(() => {
      cy.get(`img`).should('have.attr', 'src', sauceSpicyX.image);
      cy.contains(sauceSpicyX.name).should('exist');
      cy.contains('Калории, ккал').next().should('contain.text', sauceSpicyX.calories);
      cy.contains('Белки,г').next().should('contain.text', sauceSpicyX.proteins);
      cy.contains('Жиры, г').next().should('contain.text', sauceSpicyX.fat);
      cy.contains('Углеводы, г').next().should('contain.text', sauceSpicyX.carbohydrates);
    });

    // 1. Закрытие по кнопке
    cy.get(selectors.closeModal).last().click();
    cy.get(selectors.ingredientModal).should('not.exist');

    // Повторное открытие
    cy.get(selectors.ingredient(sauceSpicyX._id)).click();
    cy.get(selectors.ingredientModal).should("exist");

    // 2. Закрытие кликом по оверлею
    cy.get(selectors.modalOverlay).last().click({ force: true });
    cy.get(selectors.ingredientModal).should('not.exist');

    // Повторное открытие
    cy.get(selectors.ingredient(sauceSpicyX._id)).click();
    cy.get(selectors.ingredientModal).should("exist");

    // 3. Закрытие клавишей Esc
    cy.get('body').type('{esc}');
    cy.get(selectors.ingredientModal).should('not.exist');
  })
});