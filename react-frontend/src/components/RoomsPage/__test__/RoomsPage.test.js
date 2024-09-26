import React from "react";
import { render, screen } from "@testing-library/react";

import RoomsPage from "../RoomsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders rooms page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RoomsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("rooms-datatable")).toBeInTheDocument();
    expect(screen.getByRole("rooms-add-button")).toBeInTheDocument();
});
