import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/error/TestError";
import NotFound from "../../features/error/NotFound";
import ServerError from "../../features/error/ServerError";


export const router = createBrowserRouter([
	{
	path: "/",
	element: <App />,
	children: [
		{path: "", element: <HomePage />},
		{path: "activities", element: <ActivityDashboard />},
		{path: "activities/:id", element: <ActivityDetailPage />},
		{path: "create-activity", element: <ActivityForm key={"create"}/>},
		{path: "edit-activity/:id", element: <ActivityForm />},
		{path: "counter", element: <Counter />},
		{path: "errors", element: <TestErrors />},
		{path: "not-found", element: <NotFound />},
		{path: "server-error", element: <ServerError />},
		{path: "*", element: <Navigate to="/not-found" />},
	]
	}
]);