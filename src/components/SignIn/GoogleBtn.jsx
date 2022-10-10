import React, { useCallback, useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'

const clientId =
  '560053142694-jjm6hrkbsomh91oupj4arim0vri4tt1d.apps.googleusercontent.com'

const GoogleBtn = ({ onSocial }) => {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId,
        scope: 'email',
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  const onSuccess = (response) => {
    console.log(response)
  }
  const onFailure = (response) => {
    console.log(response)
  }
  return (
    <div>
      {/* <Button classprop="justify-between border border-black-100 mt-6 gap-2">
          <GooGleIcon className="ml-3" />
          <span>Googleでログイン</span>
          <GooGleIcon className="mr-3 opacity-0" />
        </Button> */}
      <GoogleLogin
        className="w-full mt-6 border border-black-100 text-center"
        clientId={clientId}
        buttonText="Googleでログイン"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  )
}

export default GoogleBtn
