import React from "react";
import { render, screen } from "@testing-library/react";

import SystemAccessLevelPage from "../SystemAccessLevelPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders systemAccessLevel page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SystemAccessLevelPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("systemAccessLevel-datatable")).toBeInTheDocument();
    expect(screen.getByRole("systemAccessLevel-add-button")).toBeInTheDocument();
});
