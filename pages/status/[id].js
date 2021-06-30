import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Tuit from 'components/Tuit'
import Loading from 'components/Loading'
import { firestore } from 'firebase/admin'
import { useRouter } from 'next/router'
import Head from 'next/head'
export default function TuitPage (props) {
  const router = useRouter()
  if (router.isFallback) return <Loading/>

  return (
        <>
            <Head>
              <title>{props.userName} tuit | Tuita</title>
            </Head>
            <Header title={`${props.userName} tuit`} back={true}/>
            <section>
              <Tuit {...props}/>
            </section>
            <Navbar/>
            <style jsx>{`
                section{
                  flex: 1;
                }
            `}</style>
        </>
  )
}

export async function getStaticPaths () {
  return {
    paths: [{ params: { id: 'kDguNu5Yxln4QXGa4GDl' } }],
    fallback: true
  }
}

export async function getStaticProps (context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection('tuits')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data
      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate()
      }
      return { props }
    }).catch(() => {
      return { props: {} }
    })
}
