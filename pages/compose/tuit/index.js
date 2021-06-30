import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import Head from 'next/head'
import Avatar from 'components/Avatar'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Loading from 'components/Loading'

import { addTuit, uploadImage } from 'firebase/client'
import Picture from 'components/Icons/Picture'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_HOVER: 1,
  UPLOADING: 2,
  COMPLETE: 3
}

export default function ComposeTweet () {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({})

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => { setLoading(true) }
      const onError = () => {}
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(imgUrl => {
          setImgURL(imgUrl)
        })
        setLoading(false)
      }
      task.on('state_changed',
        onProgress,
        onError,
        onComplete)
    }
  }, [task])

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addTuit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL
    }).then(() => {
      router.push('/home')
    }).catch(error => {
      console.error(error)
      setStatus(COMPOSE_STATES.ERROR)
    })
  }

  const handleDragEnter = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_HOVER)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
      setError({ error: 'File not supported.' })
    } else {
      setError({})
      const task = uploadImage(file)
      setTask(task)
    }
  }

  const handleFile = files => {
    const file = document.getElementById('fileItem').files[0]
    if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
      setError({ error: 'File not supported.' })
    } else {
      setError({})
      const task = uploadImage(file)
      setTask(task)
    }
  }

  let isButtonDisabled = false
  if (!message.length || status === COMPOSE_STATES.LOADING) {
    isButtonDisabled = true
  }
  if (imgURL !== null) {
    isButtonDisabled = false
  }

  return (
        <>
            <Head>
                <title>Make a tuit | Tuita</title>
            </Head>
            <Header
                    title='Make a tuit'
                    back={true}
            />
            <section className='form-container'>
            {user && <section className='avatar-container'>
                      <Avatar src={user.avatar}/>
                     </section>
            }
              <form onSubmit={handleSubmit}>
                  <textarea
                    onChange={handleChange}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    placeholder='What happened?'
                    >
                    </textarea>
                    {error ? <span>{error.error}</span> : ''}
                    <label title="Upload image" className="custom-file-upload">
                      <input id="fileItem" type="file" onChange={handleFile}/>
                      <Picture stroke="#09f" width={30} height={30}/>
                    </label>
                    {loading ? <Loading/> : ''}
                    {imgURL && <section className='remove-image'>
                        <button onClick={() => setImgURL(null)}>x</button>
                        <img src={imgURL}/>
                      </section>}
                  <div>
                      <Button disabled={isButtonDisabled} color='#09f'>Tuit</Button>
                  </div>
              </form>
            </section>
            <Navbar/>
        <style jsx>{`
            div{
                position: absolute;
                right: 0;
                padding: 15px;
            }
            .avatar-container{
              padding-top: 20px;
              padding-left: 10px;
            }
            form {
              padding: 10px;
            }

            .remove-image{
              position: relative;
            }

            input[type="file"]{
              display: none;
            }

            textarea{
                border: ${drag === DRAG_IMAGE_STATES.DRAG_HOVER ? '3px dashed #09f' : '3px solid transparent'};
                border-radius: 10px;
                resize: none;
                padding: 15px;
                font-size: 21px;
                width: 100%;
                outline: none;
                min-height: 150px;
            }

            img{
              width: 100%;
              heigth: auto;
              max-height: 200px;
              object-fit: cover;
              border-radius: 10px;
            }

            button{
              position: absolute;
              right: 15px;
              top: 15px;
              border: 0;
              background: rgba(0,0,0,0.3);
              border-radius: 999px;
              height: 32px;
              width: 32px;
              color: #fff;
              font-size: 24px;
            }

            button:hover{
              opacity: 0.5;
            }

            .form-container{
              display: flex;
              align-items: flex-start;
              flex: 1;
            }

            .custom-file-upload{
              position: absolute;
              right: 1rem;
              top: 10rem;
              margin: 0;
              cursor: pointer;
            }

            .custom-file-upload:hover > :global(svg){
              background: radial-gradient(#0099ff11 15%, transparent 16%);
              background-size: 180px 180px;
              background-position:center;
            }

            span{
              color: red;
              margin-bottom: 10px;
            }
        `}</style>
        </>
  )
}
