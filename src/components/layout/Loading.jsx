import React from 'react'
import '~/animate.css'

function Loading() {
  return (
    <div className="h-screen pb-28 flex justify-center items-center">
      <div className="firstBall mr-3">
        <svg
          width="35"
          height="35"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.6103 10.4041H17.9254V1.0078C21.8185 2.65057 24.7503 6.15417 25.6103 10.4041ZM12.9345 0.00146484C14.1706 0.00146484 15.3681 0.177534 16.5013 0.503826V10.4041H0.260394C1.4595 4.47587 6.68668 0.00146484 12.9345 0.00146484ZM0 12.9999C0 12.6073 0.0176811 12.2197 0.0530433 11.8352H15.4951L4.52154 22.8629C1.75525 20.4771 0 16.9412 0 12.9999ZM5.66117 23.7417L16.5013 12.848V24.2989L14.9116 22.703L13.9054 23.7142L15.8487 25.6671C14.9116 25.8852 13.9359 25.9999 12.9345 25.9999C10.239 25.9966 7.73468 25.1647 5.66117 23.7417ZM17.9254 24.9903V11.8352H25.8176C25.8514 12.2197 25.8707 12.6073 25.8707 12.9999C25.8691 18.3901 22.5868 23.0245 17.9254 24.9903Z"
            fill="#D86145"
          />
        </svg>
      </div>
      <div className="secondBall mr-3">
        <svg
          width="35"
          height="35"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.8132 14.8122L24.1571 6.42716C25.2871 8.35746 25.9365 10.6027 25.9365 12.9999C25.9365 16.3258 24.6859 19.3642 22.6333 21.666L15.8132 14.8122ZM13.0019 0.00146484C16.9368 0.00146484 20.465 1.77669 22.839 4.57117H3.16479C5.53888 1.77669 9.06867 0.00146484 13.0019 0.00146484ZM0.0673828 12.9999C0.0673828 10.4251 0.816418 8.02309 2.10553 6.00234H22.5658L14.8054 13.801L10.9863 9.96146L9.98006 10.9726L13.8008 14.8122L5.25277 23.4008C2.10714 21.0263 0.0673828 17.2481 0.0673828 12.9999ZM6.46152 24.2085L14.8054 15.8234L21.6255 22.6772C19.335 24.7399 16.3115 25.9966 13.0019 25.9966C10.6182 25.9966 8.38233 25.344 6.46152 24.2085Z"
            fill="#D86145"
          />
        </svg>
      </div>
      <div className="thirdBall">
        <svg
          width="35"
          height="35"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.4698 25.223L25.8185 15.192C25.0293 19.8376 21.7808 23.6497 17.4698 25.223ZM26.0001 12.7432L16.1903 24.5301V0.384443C21.7406 1.77199 25.8844 6.76976 26.0001 12.7432ZM9.82996 0.413519L2.6466 20.6873C1.06816 18.5324 0.134277 15.8736 0.134277 13C0.135885 6.95552 4.26041 1.86245 9.82996 0.413519ZM3.70747 21.9585L11.4518 0.101765C11.9822 0.035537 12.5207 0 13.0688 0C13.6443 0 14.2101 0.0387675 14.7662 0.111456V25.8837C14.2101 25.958 13.6443 25.9952 13.0688 25.9952C9.38954 25.9968 6.06549 24.4461 3.70747 21.9585Z"
            fill="#D86145"
          />
        </svg>
      </div>
    </div>
  )
}

export default Loading