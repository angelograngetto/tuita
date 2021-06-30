import { colors } from 'styles/theme'
import Link from 'next/link'
import Create from 'components/Icons/Create'
import Home from 'components/Icons/Home'
import Logout from 'components/Icons/Logout'
import { logout } from 'firebase/client'

const Navbar = () => {
  const handleLogout = () => {
    logout()
  }

  return (
        <>
            <nav>
                    <Link href='/home'>
                        <a title="Go home">
                            <Home width={32} height={32} stroke="#09f"/>
                        </a>
                    </Link>
                    <Link href='/compose/tuit'>
                        <a title="Make a tuit">
                            <Create width={32} height={32} stroke="#09f"/>
                        </a>
                    </Link>
                    <a title="Logout" onClick={handleLogout}>
                        <Logout width={32} height={32} stroke="#09f"/>
                    </a>
                </nav>

                <style jsx>{`
                    
                nav{
                    background: #fff;
                    position: sticky;
                    border-top: 1px solid #eee;
                    bottom: 0;
                    height: 49px;
                    width: 100%;
                    display: flex;
                    padding: 8px;
                }   

                nav a{
                    align-items: center;
                    display: flex;
                    flex: 1 1 auto;
                    height: 100%;
                    justify-content: center;
                    cursor: pointer;
                } 

                nav a:hover{
                    background: radial-gradient(#0099ff11 15%, transparent 16%);
                    background-size: 180px 180px;
                    background-position:center;
                }

                nav a:hover > :global(svg){
                    stroke: ${colors.primary}
                }
                `}</style>
        </>
  )
}

export default Navbar
