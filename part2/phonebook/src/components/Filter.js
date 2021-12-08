const Filter = ({ search, onChange }) => {
    return (
        <div>
            Filter shown with <input value={search} onChange={onChange} />
        </div>
    )
}

export default Filter;
