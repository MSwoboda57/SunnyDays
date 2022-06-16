import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { NavBar } from "./Nav/NavBar";
import { Login } from "./Login/Login";
import { Register } from "./Login/Register";
import { BrowserRouter } from "react-router-dom";
import { Searchpage } from "./Searchpage/SearchPage";
import { HomePage } from "./HomePage/HomePage";
import { ApplicationViews } from "./ApplicationView/ApplicationView";


export const SunnyDays = () => (
    <>
        <BrowserRouter>
            <Route
                render={() => {
                    if (localStorage.getItem("sunny_customer")) {
                        return (
                            <>
                                <NavBar />
                                <ApplicationViews />

                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />


            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </BrowserRouter>
    </>
);