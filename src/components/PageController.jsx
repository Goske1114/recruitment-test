import React from 'react'

export default function PageController({page, maxPage, pattern, nextPage, prevPage}) {
    return (
        pattern !== '' ? null :
            <div className="flex flex-row justify-center items-center">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md my-2 hover:bg-blue-700"
                    onClick={() => prevPage()}
                >
                    Prev
                </button>
                <h1 className="text-3xl mr-5 ml-5">{`${page + 1} / ${maxPage + 1}`}</h1>
                <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md my-2 hover:bg-blue-700"
                onClick={() => nextPage()}
                >
                Next
                </button>
            </div>
    )
}