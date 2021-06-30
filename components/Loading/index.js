
export default function Loading () {
  return (
        <>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>

        <style jsx>{`
            .lds-ring {
                display: block;
                margin: auto;
                position: relative;
                width: 20px;
                height: 20px;
            }
            .lds-ring div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 30px;
                height: 30px;
                margin: 8px;
                border: 4px solid #09f;
                border-radius: 50%;
                animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: #09f transparent transparent transparent;
            }
            .lds-ring div:nth-child(1) {
                animation-delay: -0.45s;
            }
            .lds-ring div:nth-child(2) {
                animation-delay: -0.3s;
            }
            .lds-ring div:nth-child(3) {
                animation-delay: -0.15s;
            }
                @keyframes lds-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `}</style>
        </>
  )
}
