import { useState } from 'react'
import Footer from '../components/footer'

export default function New() {
    const [disabled, setDisabled] = useState(false)

    async function addCar(e) {
        e.preventDefault()
        setDisabled(true)

        const form = new window.FormData(e.target)
        const formData = {
            model: form.get('model'),
            make: form.get('make'),
            year: form.get('year')
        }

        const resp = await fetch('/api/car', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        const results = await resp.json()

        if (results.errors && results.errors.length) {
            console.log(JSON.stringify(results.errors))
        } else if (results.data) {
            console.log(results.data)
            // @TODO
            // form.reset()
        }

        setDisabled(false)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="min-w-full mx-auto sm:px-6 lg:px-8 bg-gray-100">
                <h1 className="text-6xl font-bold py-10 text-center">New</h1>
                <div className="md:grid md:grid-cols-3 md:gap-6 pb-10">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Please fill in required fields</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Some additional description goes here...
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={addCar}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div>
                                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                                    <div className="mt-1">
                                        <input type="text" name="model" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none sm:text-sm border-gray-300 bg-gray-50 text-gray-500 text-sm py-1" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col">
                                        <label htmlFor="make" className="block text-sm font-medium text-gray-700">Made by</label>
                                        <div className="mt-1">
                                            <input type="text" name="make" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 bg-gray-50 text-gray-500 text-sm py-1" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                                        <div className="mt-1">
                                            <input type="number" name="year" max="2021" min="1886" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 bg-gray-50 text-gray-500 text-sm py-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={disabled}>Save</button>
                            </div>
                            </div>
                        </form>
                    </div>
            </div>
            </div>

            <Footer></Footer>
        </div>
    )
}
