import ArrowLeft from 'components/Icons/ArrowLeft'
import Link from 'next/link'
const Header = ({ title, back }) => {
  return (
        <>
            <header>
                { back && <Link href='/home'>
                    <a>
                     <ArrowLeft width={32} height={32} stroke="#09f"/>
                    </a>
                    </Link>}
                <h2>{title}</h2>
            </header>

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
                h2{
                    font-size: 22px;
                    font-weight: 800;
                    padding-left: 15px;
                }
                a{
                    margin: 0.2rem 0rem 0 0.5rem;
                }
            `}</style>
        </>
  )
}

export default Header
