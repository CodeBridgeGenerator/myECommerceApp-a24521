import React from "react";
import { render, screen } from "@testing-library/react";

import BillingPage from "../BillingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders billing page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BillingPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("billing-datatable")).toBeInTheDocument();
    expect(screen.getByRole("billing-add-button")).toBeInTheDocument();
});
