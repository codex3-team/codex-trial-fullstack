export default function Car({ id, model, make, year }) {
    return (
        <div key={id} className="box-border w-46 p-4 border-2 border-indigo-200 rounded">
            <span className="box-content block">Model: {model}</span>
            <span className="box-content block">By {make}</span>
            <span className="box-content block">In {year}</span>
            <small>{id}</small>
        </div>
    )
}
