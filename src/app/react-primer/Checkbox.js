import { useState, useEffect } from "react"

const Checkbox = ({ disabled, label, controlChecked }) => {
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setChecked(controlChecked)
    }, [controlChecked]);
    return (
        <div>
            <input type="checkbox" disabled={disabled} checked={checked} onChange={() => { setChecked(!checked); }} />
            {label}
        </div>
    )
}

export default Checkbox