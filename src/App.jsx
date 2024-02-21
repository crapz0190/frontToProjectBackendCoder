import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VerifiedAccount from "./pages/VerifiedAccount";
import RecoverPassword from "./pages/RecoverPassword";
import RecoverPwdToken from "./pages/RecoverPwdToken";
import ProtectedRouteAdmin from "./pages/ProtectedRouteAdmin";
import ProductsPage from "./pages/ProductsPage";
import UpdateProducts from "./pages/UpdateProducts";
import SettingProducts from "./components/SettingProducts";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductsContext";
import Navbar from "./components/Navbar";
import AddProducts from "./pages/AddProducts";
import UpdateDataProducId from "./pages/UpdateDataProducId";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRouteUser from "./pages/ProtectedRouteUser";
import ConfigureImages from "./pages/ConfigureImages";
import UserDocuments from "./pages/UserDocuments";
import ConfigureUsers from "./pages/ConfigureUsers";
import ProtectedRoutePremium from "./pages/ProtectedRoutePremium";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <main className="flex justify-center items-center">
            <Navbar />
            <Routes>
              <Route path="/" element={<h1 className="pt-40">Home Page</h1>} />
              <Route
                path="/users/cuenta-activada"
                element={<h1 className="pt-40">Cuenta Activada</h1>}
              />
              <Route
                path="/users/error"
                element={<h1 className="pt-40">La cuenta ya está activada</h1>}
              />
              <Route path="/users/login" element={<LoginPage />} />
              <Route path="/users/signup" element={<RegisterPage />} />
              <Route
                path="/users/verified-account/:token"
                element={<VerifiedAccount />}
              />
              <Route
                path="/users/recover-password"
                element={<RecoverPassword />}
              />
              <Route
                path="/users/:uid/recover-password/:token"
                element={<RecoverPwdToken />}
              />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route element={<ProtectedRouteAdmin />}>
                <Route path="/admin/products" element={<ProductsPage />} />
                <Route
                  path="/admin/products/add-products"
                  element={<AddProducts />}
                />
                <Route
                  path="/admin/products/update-products"
                  element={<UpdateProducts />}
                />
                <Route
                  path="/admin/products/configure-product/:pid"
                  element={<SettingProducts />}
                />
                <Route
                  path="/admin/products/update-data-product-by-id/:pid"
                  element={<UpdateDataProducId />}
                />
                <Route
                  path="/admin/products/configure-images/:pid"
                  element={<ConfigureImages />}
                />
                <Route
                  path="/admin/configure-users"
                  element={<ConfigureUsers />}
                />
              </Route>
              <Route element={<ProtectedRoutePremium />}>
                <Route path="/premium/products" element={<ProductsPage />} />
                <Route
                  path="/premium/products/add-products"
                  element={<AddProducts />}
                />
                <Route
                  path="/premium/products/update-products"
                  element={<UpdateProducts />}
                />
                <Route
                  path="/premium/products/configure-product/:pid"
                  element={<SettingProducts />}
                />
                <Route
                  path="/premium/products/update-data-product-by-id/:pid"
                  element={<UpdateDataProducId />}
                />
                <Route
                  path="/premium/products/configure-images/:pid"
                  element={<ConfigureImages />}
                />
              </Route>
              <Route element={<ProtectedRouteUser />}>
                <Route path="/users/products" element={<ProductsPage />} />
                <Route
                  path="/users/:uid/documents"
                  element={<UserDocuments />}
                />
              </Route>
            </Routes>
          </main>
          <footer className="h-80 text-slate-100 absolute bottom-2/2 left-0 right-0">
            pie de pagina
          </footer>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
