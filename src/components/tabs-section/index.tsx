import React, {lazy, useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {
    createBrowserRouter, Link, Route, Router,
    RouterProvider, Routes, useNavigate,
} from "react-router-dom";
import dummyChart from "../../tabs/dummyChart";
import dummyList from "../../tabs/dummyList";
import dummyTable from "../../tabs/dummyTable";
import DummyChart from "../../tabs/dummyChart";
import DummyTable from "../../tabs/dummyTable";
import DummyList from "../../tabs/dummyList";
import {tab} from "@testing-library/user-event/dist/tab";
import TabsLoader from "../tabs-loader";

interface Tab {
    id: string;
    title: string;
    order: number;
    path: string;
}



const TabsSection = () => {

    const [tabs, setTabs] = useState<Tab[]>()
    const navigate = useNavigate();

    useEffect( () => {
        axios.get('/tabs.json')
            .then((response: AxiosResponse<Tab[]>) => {
                const data = response.data;
                navigate(`/tabs/${data[0].id}`)
                console.log(data)
                setTabs(data)
            })
            .catch((error) => {
                console.error('Error fetching JSON:', error);
            });
    }, [])

    return (
        <div>
            <div style={{ width: '100%', display: 'flex' }}>
                { tabs && tabs.map( el => (
                    <Link key={el.id} to={`/tabs/${el.id}`} style={{ width: '33%', height: 40 }}>
                        <button style={{width: "100%", height: 40}}>{el.title}</button>
                    </Link>

                ))}
            </div>
            <Routes>
                { tabs && tabs.map( el => (
                    <Route key={el.id} path={`/tabs/${el.id}`} element={<TabsLoader filePath={el.path}/>}/>

                ))}

            </Routes>
        </div>
    )
};

export default TabsSection;