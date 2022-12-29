import Header from "../Header";

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