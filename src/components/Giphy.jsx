import React, { useEffect, useState } from "react";
import axios from 'axios'
import Loader from './Loader'
import Paginate from "./Paginate";

const Giphy = () => {
    const url = 'https://api.giphy.com/v1/gifs/trending';
    const apiKey = 'A8sWabITcp7QqL9J3BODutTnsoPUkP3r';
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const indexOFLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOFLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem , indexOFLastItem);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const results = await axios(url, {
                    params: {
                        api_key: apiKey,
                        limit: 1000
                    }
                });
                setData(results.data.data);

                console.log(data);

            } catch (err) {
                setIsError(true);
                console.error(err);
                setTimeout(() => {
                    setIsError(false);
                }, 6000);
            }

            setIsLoading(false);

        }
        fetchData()
    }, [])

    const renderGifs = () => {
        if (isLoading) {
            return <Loader />
        }
        return currentItems.map(el => {
            return (
                <div key={el.id} className="gif">
                    <img src={el.images.fixed_height.url} alt={el.title} onClick={() => { window.location = el.url }} />
                </div>
            )
        })
    }
    const renderError = () => {
        if (isError) {
            return (
                <div className="error">
                    <div class="alert alert-danger" role="alert"> Giphy isn't reloading. Please try again later</div>
                </div>
            )
        }
    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmit = async event => {
        event.preventDefault();
        setIsError(false);
        setIsLoading(true);

        try {
            const results = await axios('https://api.giphy.com/v1/gifs/search', {
                params: {
                    api_key: apiKey,
                    q: search,
                    limit: 100
                }
            });

            setData(results.data.data);
        
        }
        catch (err) {
            setIsError(true);
            console.error(err);
            setTimeout(() => {
                setIsError(false);

            }, 6000);
        }
        setIsLoading(false);
    }

    const pageSelected = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="m-2">
            {renderError()}
            <form className="form-inline justify-content-center m-2">
                <input type="text" placeholder="Search" className="form-control" value={search} onChange={handleSearchChange} />
                <button type="submit" className="btn btn-primary mx-2" onClick={handleSubmit}>Search gif</button>
            </form>
            <Paginate
                pageSelected={pageSelected}
                currentPage={currentPage}
                itemPerPage={itemPerPage}
                totalItems={data.length} />
            <div className="container gifs">
                {renderGifs()}
            </div>
        </div>)
}
export default Giphy;