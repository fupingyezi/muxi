import Active from "../pages/Active/Active"
import Completed from "../pages/Completed/Completed"
import All from "../pages/All/All"
import Input from "../pages/Input/Input"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Input />,
        children: [
            {
                element: <All />,
                index: true
            },
            {
                path: "active",
                element: <Active />
            },
            {
                path: "completed",
                element: <Completed />
            }
        ]
    }
])

export default router