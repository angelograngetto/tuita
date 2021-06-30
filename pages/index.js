import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser, { USER_STATES } from 'hooks/useUser'
import Head from 'next/head'
import Button from 'components/Button'
import Loading from 'components/Loading'
import GitHub from 'components/Icons/GitHub'
import { colors } from 'styles/theme'

import { loginWithGitHub } from '../firebase/client'
import Logo from 'components/Logo'

export default function Home () {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }
  return (
    <>
      <Head>
        <title>Tuita | The functional Twitter clone</title>
        <meta name="description" content="The functional Twitter clone" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

        <section>
          <Logo/>
          <h1>Tuita</h1>
          <h2>The functional Twitter clone.</h2>
          <div>
            {
                user === USER_STATES.NOT_LOGGED &&
                <Button onClick={handleClick} color='#000'>
                  <GitHub fill='#fff' width={24} height={24}/>
                  Login with GitHub
                </Button>
              }
              {
                user === USER_STATES.NOT_KNOWN && <Loading/>
              }
          </div>
        </section>

      <style jsx>{`
        img{
          width: 120px;
        }

        div{
          margin-top: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-items:center;
          place-content: center;
        }

        h1{
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 8px;
        }

        h2{
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
          text-align: center;
        }
      `}</style>

    </>
  )
}
