const Personal = ({ personalData, setPersonalData}) => {
  const formItem = [
    {
      title: 'Firstname' ,
      name: 'area',
      type: 'text',
      placeholder: 'enter firstname'
    },
    {
      title: 'Lastname',
      name: 'lastname',
      type: 'text',
      placeholder: 'enter lastname'
    }
  ]

  const inputHandler = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
    <div className="text-2xl">
    <span>personal detail</span>
    </div>
      <div className="my-2 grid md:grid-cols-3 sm:grid-cols-1">
        {formItem.map((item, index) => {
      return(
        <div className="my-2" key={index}>
          <label htmlFor={item.name}>{item.title}</label>
          <input
            type={item.type}
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            className="pl-4 p-1 w-64 rounded-md"
            required 
            onChange={inputHandler}
            value={personalData[item.name]}
            pattern={item?.pattern}
            />
        </div>
      )
        })}
      </div>
    </>
  );
}

export default Personal;