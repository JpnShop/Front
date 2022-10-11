import Header from './Header'
import Profile from './Profile'
import Process from './Process'
import MyPossession from './MyPossession'
import MyNav from './MyNav'
import Guest from './Guest'
import Button from '../../common/Button'
const index = () => {
  // api (useEffect async await)
  const token = localStorage.getItem('accessToken')
  const logoutHandler = () => {
    //로그아웃 api작성 예정
    console.log('logout!!')
  }
  return (
    <div>
      <Header />
      <div className="pt-16 pb-2">
        {token ? (
          <Guest />
        ) : (
          <>
            <Profile />
            <Process />
            <MyPossession />
            <Button
              onClick={logoutHandler}
              classprop="text-sm mx-5 mt-9 mb-5 bg-primary text-white"
            >
              로그아웃
            </Button>
          </>
        )}
        <MyNav />
      </div>
    </div>
  )
}

export default index
