import React from 'react'
import { useParams } from 'react-router-dom'
// import { useGetQuestionQuery } from '../../../store/api/questionSlice'
import Card from '../QnA/Card'
import Content from './Content'
import Answer from './Answer'
import ErrorCom from '../../common/ErrorCom'
import Loading from '../../layout/Loading'

import { questions } from '../../../dummy/qeustions'

const index = () => {
  const params = useParams()
  const lists = questions.filter((item) => item.id == params.id)
  // const { data: list, isLoading, isError } = useGetQuestionQuery(params.id)
  const [list] = lists
  return (
    <>
      {/* {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorCom />
      ) : (
        list && (
          <>
            <div className="px-5 mt-5 py-4 border-b border-black-200 font-bold">
              {list.createdDate}
            </div>
            <div className="px-5 py-4 text-primary font-bold">{list.type}</div>

            {list.product && <Card item={list.product} />}
            <Content item={list} />
            {list.answerYn === '답변완료' && <Answer item={list} />}
          </>
        )
      )}          <> */}
      <div className="px-5 mt-5 py-4 border-b border-black-200 font-bold">
        {list.createdDate}
      </div>
      <div className="px-5 py-4 text-primary font-bold">{list.type}</div>

      {list.product && <Card item={list.product} />}
      <Content item={list} />
      {list.answerYn === '답변완료' && <Answer item={list} />}
    </>
    // </>
  )
}

export default index
