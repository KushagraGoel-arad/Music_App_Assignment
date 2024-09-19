const Button = ({type="secondary", size="medium", disabled=false, onClick=()=>{}, children}) => {
    return <button disabled={disabled} className={`btn-${type}`} onClick={onClick}>
        {children}
    </button>
}

export default Button