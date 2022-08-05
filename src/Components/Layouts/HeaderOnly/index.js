import Header from "../LayoutDefault/Header"
function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
        </div>
    )
}
export default HeaderOnly;