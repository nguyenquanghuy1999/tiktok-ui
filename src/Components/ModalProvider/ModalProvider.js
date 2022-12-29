import { createContext, useState } from "react";

export const ModalContext = createContext();

function ModalProvider({ children }) {

    const [isModalLogin, setIsModalLogin] = useState(false);
    const [isComment, setIsComment] = useState(false);

    const showModalLogin = () => setIsModalLogin(true);
    const hideModalLogin = () => setIsModalLogin(false);
    const showComment = () => setIsComment(true);
    const hideComment = () => setIsComment(false);

    const data = {
        isModalLogin,
        isComment,
        showComment,
        hideComment,
        showModalLogin,
        hideModalLogin,
    }

    return (
        <ModalContext.Provider value={data}>
            {children}
        </ModalContext.Provider>
    )
}
export default ModalProvider;