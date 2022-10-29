import { useParams } from 'react-router-dom'
import ErrorCom from '../../common/ErrorCom'
import { useGetProductQuery } from '../../../store/api/productApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  setSecletedOption,
  changeCount,
} from '../../../store/slices/productSlice'

const ModalContent = () => {
  const params = useParams()
  const productCount = useSelector((state) => state.product).count
  const { data: list, isError } = useGetProductQuery(params.id)
  const { thumbnail, price, productName, productOption: size, sale } = list
  const dispatch = useDispatch()
  const onChangeHandler = (e) => {
    dispatch(setSecletedOption(e.target.value))
  }
  const countChangeHandler = (e) => {
    if (e == '-1' && productCount === 1) return
    dispatch(changeCount(e))
  }

  return (
    <>
      {isError ? (
        <ErrorCom />
      ) : (
        <div>
          <div className="px-6 pt-6">
            <select
              onChange={onChangeHandler}
              defaultValue="option"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {size ? (
                size.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))
              ) : (
                <option>FF</option>
              )}
            </select>
            <div className="pt-6">
              <div className="relative p-4 bg-white-400">
                <div className="text-sm">{productName}</div>
                <div className="mt-3 flex justify-between items-center">
                  {/* 버튼 컴포넌트 */}
                  <div className="rounded py-1 w-[6rem] grid grid-cols-3 text-center border border-black-200 text-sm">
                    <div
                      className="border-r"
                      onClick={() => countChangeHandler(-1)}
                    >
                      -
                    </div>
                    <div className="">{productCount}</div>
                    <div
                      className="border-l"
                      onClick={() => countChangeHandler(+1)}
                    >
                      +
                    </div>
                  </div>
                  <div className="text-sm">
                    ¥{' '}
                    {(
                      parseInt((price * (100 - sale)) / 100) * productCount
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="py-5 flex justify-end items-center gap-2">
                <div className="text-xs">총상품 금액</div>
                <div className="">
                  ¥{' '}
                  <strong className="font-bold text">
                    {(
                      parseInt((price * (100 - sale)) / 100) * productCount
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalContent
