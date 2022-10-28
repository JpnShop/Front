import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cls } from '../../../utils'
import HeartIcon from '../../common/HeartIcon'
import { ReactComponent as LinkIcon } from '/public/assets/link.svg'
import ModalContent from './ModalContent'
import ProductCard from './ProductCard'
import KakaoIcon from '/public/assets/kakao-icon.png'
import { useSelector, useDispatch } from 'react-redux'
import { useAddCartItemMutation } from '../../../store/api/cartApiSlice'
import { addCartItems } from '../../../store/slices/cartSlice'
import { useCookies } from 'react-cookie'
import { resetCount } from '../../../store/slices/productSlice'

const DetailBtn = ({ list, kakaoShareBtn }) => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const token = cookies.accessToken
  const [isOpen, setIsOpen] = useState(false)
  const [buyProduct, setBuyProduct] = useState(false)
  const [addCartItem] = useAddCartItemMutation()
  const navigate = useNavigate()
  const salePrice = parseInt(list.price * (1 - list.sale / 100))
  const items = useSelector((state) => state.product)
  const dispatch = useDispatch()

  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근 가능
    if (window.Kakao) {
      const kakao = window.Kakao
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(import.meta.env.VITE_APP_KAKAO_KEY)
      }
      kakao.Share.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링
        container: '#kakao-link-btn',
        objectType: 'commerce',
        content: {
          title: `[${list.brand}] ${list.productName}`,
          imageUrl: list.thumbnail,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        commerce: {
          productName: list.brand,
          regularPrice: list.price,
          discountRate: list.sale,
          discountPrice: salePrice,
          currencyUnit: '¥',
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      })
    }
  }

  const ModalOpenHandler = () => {
    buyProduct && setBuyProduct((prev) => !prev)
    setIsOpen((prev) => !prev)
    dispatch(resetCount())
  }
  const GoToCart = () => {
    setBuyProduct((prev) => !prev)
    if (!token) {
      dispatch(addCartItems({ ...list, ...items }))
    }
    addCartItem({
      product_id: list['productId'],
      count: items['count'],
    })
  }

  const onClickHandler = () => {
    isOpen ? GoToCart() : ModalOpenHandler()
  }

  const onBuyControlHandler = () => {
    isOpen ? BuyProudctNow() : ModalOpenHandler()
  }

  const goToShoppingCart = (data) => {
    navigate('/cart')
  }

  const BuyProudctNow = () => {
    navigate('/order', { state: [{ ...list, ...items }] })
  }

  const copyUrl = () => {
    const url = window.document.location.href
    if (navigator.share) {
      navigator
        .share({
          title: list.brand,
          text: list.productName,
          url,
        })
        .then(() => console.log('공유 성공'))
        .catch((error) => console.log('공유 실패', error))
    }
  }

  const ContinueShopping = () => {
    setBuyProduct(false)
    setIsOpen(false)
    setTimeout(() => {
      dispatch(resetCount())
    }, 2000)
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/kakao.js'
    script.async = true
    document.body.appendChild(script)

    return () => document.body.removeChild(script)
  }, [dispatch])
  return (
    <>
      {isOpen && (
        <div
          className="bg-gray-900 bg-opacity-50 fixed inset-0 z-30"
          onClick={ModalOpenHandler}
        ></div>
      )}
      <aside className="fixed inset-x-0 flex bottom-0 z-50">
        <section
          className={cls(
            'pointer-events-auto w-screen transition ease-in-out duration-500',
            isOpen ? 'translate-y-0' : 'translate-y-full',
          )}
        >
          <div className="flex w-full flex-col overflow-y-scroll bg-white shadow-xl pb-[78px] rounded-md">
            {isOpen && !buyProduct && <ModalContent />}
            {buyProduct && <ProductCard />}
          </div>
        </section>
      </aside>
      <div className="hover:cursor-pointer fixed bottom-0 left-0 right-0 z-50">
        <div
          className={cls(
            'h-[80px] gap-4 w-full flex flex-col justify-center items-center text-white-200 bg-point pb-4',
          )}
        >
          {buyProduct ? (
            <div className="flex items-center justify-between">
              <div className="text-xl" onClick={ContinueShopping}>
                쇼핑계속하기
              </div>
              <div className="mx-5 grow w-[1px] h-[12px] bg-black-200"></div>
              <div className="text-xl" onClick={goToShoppingCart}>
                장바구니가기
              </div>
            </div>
          ) : (
            <>
              <div className="flex w-full px-5 items-center">
                <div className="flex gap-5 flex-grow">
                  <HeartIcon size="24" fill="#ffffff" />
                  <LinkIcon width="24" height="24" onClick={copyUrl} />
                  {kakaoShareBtn && (
                    <button id="kakao-link-btn" className="w-6 block">
                      <img src={KakaoIcon} alt="카카오 공유하기" />
                    </button>
                  )}
                </div>
                <div className="flex gap-3 items-center pl-5">
                  <span className="text-[20px]" onClick={onClickHandler}>
                    장바구니
                  </span>
                  <div className="w-[1px] h-[12px] bg-black-200"></div>
                  <span
                    className="flex flex-end text-[20px]"
                    onClick={onBuyControlHandler}
                  >
                    구매하기
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default DetailBtn
