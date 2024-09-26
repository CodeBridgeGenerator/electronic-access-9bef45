import React from "react";
import { render, screen } from "@testing-library/react";

import SystemAccessLevelEditDialogComponent from "../SystemAccessLevelEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders systemAccessLevel edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <SystemAccessLevelEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("systemAccessLevel-edit-dialog-component")).toBeInTheDocument();
});
