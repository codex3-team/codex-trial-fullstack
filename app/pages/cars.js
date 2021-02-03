import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Car from '../components/car'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Menu from '../components/menu'

function Cars() {
    const [cars, setCars] = useState(false)
    const [total, setTotal] = useState(0)

    const router = useRouter()
    const p = Number(router.query.p || 1)

    useEffect(() => {
        async function loadCars() {
            const resp = await fetch(`/api/cars?p=${p}`)
            const results = await resp.json()

            if (results.errors && results.errors.length) {
                console.warn(JSON.stringify(results.errors))
                setCars(false)
                setTotal(0)
            } else if (results.data && results.data.cars) {
                setCars(results.data.cars)
                setTotal(results.data.total)
            }
        }
        loadCars()
    }, [p])

    return (
        <div className="flex flex-col min-h-screen">
            <Menu></Menu>

            <main className="flex flex-col items-center flex-1 px-20">
                <h1 className="text-6xl font-bold py-10">Cars</h1>
                <div className="bg-white overflow-hidden">
                    <div className="grid grid-cols-3 gap-4">
                    {!cars && <small>loading...</small>}
                    {cars && cars.map((car) => (
                        <Car key={car.id} id={car.id} model={car.model} make={car.make} year={car.year}></Car>
                    ))}
                    </div>
                </div>
            </main>

            <Nav total={total}></Nav>
            <Footer></Footer>
        </div>
    )
}

export default Cars
