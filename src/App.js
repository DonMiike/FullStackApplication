import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';
import AddOrden from './orders/AddOrder';
import EditOrden from './orders/EditOrder';
import ViewOrden from './orders/ViewOrder';
import AddArticulo from './articles/AddArticles';
import EditArticulo from './articles/EditArticles';
import ViewArticulo from './articles/ViewArticles';
import OrderHome from './pages/OrderHome';
import HomeArticles from './pages/ArticleHome';
import ArticleHome from './pages/ArticleHome';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addUser" element={<AddUser />} />
          <Route exact path="/editUser/:id" element={<EditUser />}></Route>
          <Route exact path="/viewUser/:id" element={<ViewUser />}></Route>

          <Route exact path="/orderHome" element={<OrderHome />} />
          <Route exact path="/addOrden" element={<AddOrden />} />
          <Route exact path="/editOrden/:id" element={<EditOrden />} />
          <Route exact path="/viewOrden/:id" element={<ViewOrden />} />

          <Route exact path="/articleHome" element={<ArticleHome />} />
          <Route exact path="/addArticulo" element={<AddArticulo />} />
          <Route exact path="/editArticulo/:id" element={<EditArticulo />} />
          <Route exact path="/viewArticulo/:id" element={<ViewArticulo />} />
        </Routes>


      </Router>


    </div>
  );
}

export default App;
