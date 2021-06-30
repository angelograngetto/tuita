
import Tuit from 'components/Tuit'
import { useEffect, useState } from 'react'
import useUser from 'hooks/useUser'
import { listenLatestTuits } from 'firebase/client'

import Head from 'next/head'
import Header from 'components/Header'
import Navbar from 'components/Navbar'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsuscribe
    if (user) {
      unsuscribe = listenLatestTuits((newTuits) => {
        setTimeline(newTuits)
      })
    }
    return () => unsuscribe && unsuscribe()
  }, [user])

  return (
        <>
                <Head>
                    <title>Home | Tuita</title>
                </Head>
                <Header
                    title='Home'
                />
                <section>
                    {timeline.map(({ id, img, createdAt, userName, avatar, content, userId }) => {
                      return (
                        <Tuit
                            key={id}
                            createdAt={createdAt}
                            userName={userName}
                            avatar={avatar}
                            content={content}
                            id={id}
                            userId={userId}
                            img={img}
                        />
                      )
                    })}
                </section>
                <Navbar/>

            <style jsx>{`
                header{
                    height: 49px;
                    position: sticky;
                    top: 0;
                    border-bottom: 1px solid #eee;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    background: #ffffffee;
                    backdrop-filter: blur(5px);
                }
                section{
                    flex: 1;
                }

                h2{
                    font-size: 22px;
                    font-weight: 800;
                    padding-left: 15px;
                }


            `}</style>
            </>
  )
}
