import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cls } from '../../utils'
import { ReactComponent as CategoryIcon } from '/public/assets/category.svg'
import { ReactComponent as CategoryIconOn } from '/public/assets/category-on.svg'
import { ReactComponent as HomeIcon } from '/public/assets/home.svg'
import { ReactComponent as HomeIconOn } from '/public/assets/home-on.svg'
import { ReactComponent as LikeIcon } from '/public/assets/like.svg'
import { ReactComponent as LikeIconOn } from '/public/assets/like-on.svg'
import { ReactComponent as MyIcon } from '/public/assets/my.svg'
import { ReactComponent as MyIconOn } from '/public/assets/my-on.svg'
import { ReactComponent as OnulIcon } from '/public/assets/onul.svg'
import { ReactComponent as OnulIconOn } from '/public/assets/onul-on.svg'

const NavBottom = () => {
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <nav className="h-[70px] fixed bottom-0 left-0 right-0 z-10">
      <ul className="h-[70px] flex flex-wrap bg-neutral-100 justify-between pt-1 pb-4 pl-5 pr-5 items-center">
        <li>
          <Link
            to="/category"
            className={cls(
              'flex items-center flex-col ',
              currentPath.includes('/category') ? 'text-primary' : '',
            )}
          >
            {currentPath.includes('/category') ? (
              <CategoryIconOn />
            ) : (
              <CategoryIcon />
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/oneul"
            className={cls(
              'flex items-center flex-col  ',
              currentPath.includes('/oneul') ? 'text-primary' : '',
            )}
          >
            {currentPath.includes('/oneul') ? <OnulIconOn /> : <OnulIcon />}
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className={cls(
              'flex items-center flex-col  ',
              currentPath === '/' ? 'text-primary' : '',
            )}
          >
            {currentPath === '/' ? <HomeIconOn /> : <HomeIcon />}
          </Link>
        </li>
        <li>
          <Link
            to="/like"
            className={cls(
              'flex items-center flex-col  ',
              currentPath.includes('/like') ? 'text-primary' : '',
            )}
          >
            {currentPath.includes('/like') ? <LikeIconOn /> : <LikeIcon />}
          </Link>
        </li>
        <li>
          <Link
            to="/my"
            className={cls(
              'flex items-center flex-col  ',
              currentPath.includes('/my') ? 'text-primary' : '',
            )}
          >
            {currentPath.includes('/my') ? <MyIconOn /> : <MyIcon />}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBottom
