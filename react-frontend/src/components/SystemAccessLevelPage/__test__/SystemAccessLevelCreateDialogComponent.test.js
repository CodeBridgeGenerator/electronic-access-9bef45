import React from "react";
import { render, screen } from "@testing-library/react";

import SystemAccessLevelCreateDialogComponent from "../SystemAccessLevelCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders systemAccessLevel create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SystemAccessLevelCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("systemAccessLevel-create-dialog-component")).toBeInTheDocument();
});
