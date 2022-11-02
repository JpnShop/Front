import { Route, Routes, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { store } from './store'
import './App.css'
import Home from './pages/Home'
import Like from './pages/Like'
import Oneul from './pages/Oneul'
import LoginIndex from './pages/Login'
import Login from './pages/Login/Login'
import FindIDPw from './pages/Login/FindIDPw'
import Cart from './pages/Cart'
import MyPage from './pages/My/MyPage'
import MyPageComp from './components/My/MyPage'
import MyReview from './pages/My/MyReview'
import MyReviewComp from './components/My/MyReview'
import MyReviewWrite from './components/My/MyReview/Write'
import SignUp from './pages/SignUp'
import Category from './pages/Category'
import NavBottom from './components/layout/NavBottom'
import TermService from './pages/SignUp/TermService'
import SignUpId from './pages/SignUp/SignUpId'
import SignUpPw from './pages/SignUp/SignUpPw'
import UserInfo from './pages/SignUp/UserInfo'
import Finish from './pages/SignUp/Finish'
import ProductDetail from './pages/Prdoucts/ProductDetail'
import SnapDetail from './pages/SnapDetail'
import MagazineDetail from './pages/MagazineDetail'
import Search from './pages/Search'
import RequireAuth from './components/RequireAuth'
import QnA from './pages/My/QnA'
import QnAComp from './components/My/QnA'
import QnADetail from './components/My/QnADetail'
import QnAWrite from './components/My/QnAWrite'
import Notice from './pages/Notice'
import Faq from './pages/Faq'
import CategoryFashion from './components/Category'
import MainCategory from './pages/Category/MainCategory'
import AfterSearch from './pages/Search/AfterSearch'
import BeforeSearch from './pages/Search/BeforeSearch'
import OrderMain from './pages/Order'
import Order from './pages/Order/Order'
import CompletedOrder from './pages/Order/CompletedOrder'
import OrderDetail from './pages/My/OrderDetail'
import OrderList from './pages/My/OrderList'
import OrderPage from './pages/My/Order'
import UserEditInfo from './pages/My/UserEditInfo'
import Refund from './pages/My/Refund'
import RefundListPage from './pages/My/Refund/RefundListPage'
import RefundDetailPage from './pages/My/Refund/RefundDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import OrderCheck from './pages/OrderCheck'
import Liked from './components/Liked/Liked'
import RecentView from './components/Liked/RecentView'
import EventDetail from './pages/EventDetail'
import LoadingPage from './pages/LoadingPage'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const currentPath = location.pathname
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  return (
    <>
      <div className="pb-[70px]">
        <CookiesProvider>
          <Provider store={store}>
            <Routes>
              {loading ? (
                <Route path="/" element={<LoadingPage />} />
              ) : (
                <Route path="/" element={<Home />} />
              )}
              <Route path="/event" element={<EventDetail />} />
              <Route path="/category" element={<Category />}>
                <Route index element={<MainCategory />} />
                <Route path=":topCG/:subCG" element={<CategoryFashion />} />
              </Route>
              <Route path="/oneul" element={<Oneul />} />
              <Route path="/like" element={<Like />}>
                <Route path="" element={<Liked />} />
                <Route path="recent-view" element={<RecentView />} />
              </Route>
              <Route path="/my" element={<MyPage />}>
                <Route index element={<MyPageComp />} />
                <Route path="review" element={<MyReview />}>
                  <Route index element={<MyReviewComp />} />
                  <Route path="write" element={<MyReviewWrite />} />
                </Route>
                <Route path="order-list" element={<OrderPage />}>
                  <Route index element={<OrderList />} />
                  <Route path=":id" element={<OrderDetail />} />
                </Route>
                <Route path="qna" element={<QnA />}>
                  <Route index element={<QnAComp />} />
                  <Route path=":id" element={<QnADetail />} />
                  <Route path="write" element={<QnAWrite />} />
                </Route>
                <Route path="edit-user-info" element={<UserEditInfo />} />
                <Route path="refund-list" element={<Refund />}>
                  <Route index element={<RefundListPage />} />
                  <Route path=":refundId" element={<RefundDetailPage />} />
                </Route>
              </Route>
              <Route path="order-check" element={<OrderCheck />} />
              <Route path="recent-view" element={<Liked />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/login" element={<LoginIndex />}>
                <Route index element={<Login />} />
                <Route path="findIdPw" element={<FindIDPw />} />
              </Route>
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/oneul/detail" element={<SnapDetail />} />
              <Route path="/magazine/:id" element={<MagazineDetail />} />
              <Route path="/signup" element={<SignUp />}>
                <Route path="" element={<TermService />} />
                <Route path="idform" element={<SignUpId />} />
                <Route path="pwform" element={<SignUpPw />} />
                <Route path="infoform" element={<UserInfo />} />
                <Route path="finish" element={<Finish />} />
              </Route>
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<Search />}>
                <Route path="" element={<BeforeSearch />} />
                <Route path=":search" element={<AfterSearch />} />
              </Route>
              <Route path="/order" element={<OrderMain />}>
                <Route path="" element={<Order />} />
                <Route path="completed" element={<CompletedOrder />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {!currentPath.includes('/signup') &&
              currentPath !== '/login' &&
              !currentPath.includes('/cart') &&
              !currentPath.includes('/product') && <NavBottom />}
          </Provider>
        </CookiesProvider>
      </div>
    </>
  )
}

export default App
