import useTimeAgo from 'hooks/useTimeAgo'
import Avatar from 'components/Avatar'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Tuit ({ avatar, userName, img, content, createdAt, id }) {
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
      <>
        <article onClick={handleArticleClick}>
            <div>
                <Avatar alt={userName} src={avatar}/>
            </div>
            <section>
                <header>
                    <strong>{userName}</strong>
                    <span> · </span>
                    <Link href={`/status/${id}`}>
                        <a>
                            <time>{timeago}</time>
                        </a>
                    </Link>
                </header>
                <p>{content}</p>
                {img && <img src={img}/>}
            </section>
        </article>

        <style jsx>{`
            article{
                border-bottom: 1px solid #eee;
                display: flex;
                padding: 10px 15px;
            }

            article:hover{
                background: #f5f8fa;
                cursor:pointer; 
            }

            div{
                padding-right: 10px;
            }

            p{
                line-height: 1.3125;
                margin: 0;
            }

            a{
                color: #555;
                font-size: 14px;
                text-decoration: none;
            }

            a:hover{
                text-decoration: underline;
            }

            img{
                width: 100%;
                height: auto;
                border-radius: 10px;
                margin-top: 10px;
            }
        `}</style>
      </>
  )
}
