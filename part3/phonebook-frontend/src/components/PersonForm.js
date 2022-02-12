const PersonForm = ({ newName, onChangeName, newNumber, onChangeNumber, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                Name: <input value={newName} onChange={onChangeName} />
            </div>
            <div>
                Number: <input type="number" value={newNumber} onChange={onChangeNumber} />
            </div>
            <div>
                <button type="submit">ADD</button>
            </div>
        </form>
    )

}
 export default PersonForm;
