import { Bounce, ToastContainer } from "react-toastify";

type MessageContainerProps = {
    children: React.ReactNode;
}

export function MessagesContainer({ children }: MessageContainerProps) {
    return <>
    {children}
    <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
              />    
    
    
    
    
    </>

}