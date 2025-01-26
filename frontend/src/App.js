import './App.css';
import AllPost from './Components/AllPost/AllPost';
import AssignTask from './Pages/AssignTask/AssignTask';
import PostForm from './Components/PostForm/PostForm';
import Task from './Components/Task/Task';
import ForgetPass from './Pages/ForgetPass/ForgetPass';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import UpdatePass from './Pages/UpdatePass/UpdatePass';
import AddPost from './Pages/AddPost/AddPost';
function App() {
  
 const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
    children:[
      {
        path:'',
        element:<AllPost/>
      },
      {
        path:'postForm',
        element:<PostForm/>
      },
      {
        path:'addPost',
        element: <AddPost/>
      },
      
      {
        path:'mytask',
        element:<Task/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/forgetPass',
    element:<ForgetPass/>
  },
  {
    path:'/updatePass/:email',
    element:<UpdatePass/>
  },
  {
    path:'assigntask',
    element:<AssignTask/>
  }
 ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
