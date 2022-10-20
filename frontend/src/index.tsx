import ReactDOM from "react-dom/client"
import "./index.css"

import AppContainer from "./containers/AppContainer"

//  no 'dotenv' needed
//  https://stackoverflow.com/questions/42182577/is-it-possible-to-use-dotenv-in-a-react-project
//    dotenv is already here, 'under the hood'

// TODO: how much typing can we do for FC's? Or does React now handle component typing automatically?
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<AppContainer />)
