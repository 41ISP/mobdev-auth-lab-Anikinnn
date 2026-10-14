const Input = ({label, className, ...props}) => {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <input className={className || 'input-field'} { ...props} />
        </div>
    )
}
export default Input