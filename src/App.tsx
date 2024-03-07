
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import router from './Router'
import {store} from './redux/store'
import { Toaster } from 'react-hot-toast'

const App = () => <Provider store={store}><RouterProvider router={router} /> <Toaster /></Provider>
export default App
