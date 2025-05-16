import {test as base} from '@playwright/test';
import {HomePage} from "../pages/home.page";
import {ProductsPage} from "../pages/products.page";
import {CartPage} from "../pages/cart.page";
import {Helpers} from "../helpers/helpers";

type Pages = {
    home: HomePage;
    products: ProductsPage;
    cart: CartPage;
    helper: Helpers;
};

export const test = base.extend<Pages>({
    // home page
    home: async ({page}, use) => {
        await use(new HomePage(page));
    },

    // products page
    products: async ({page}, use) => {
        await use(new ProductsPage(page));
    },

    // cart page
    cart: async ({page}, use) => {
        await use(new CartPage(page));
    },

    // helper for cookies / context stuff
    helper: async ({page, context}, use) => {
        await use(new Helpers(page, context));
    },
});
export const expect = test.expect;
