import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import {getDataFromDB, removeFromDB} from '../service-folder/movies-service'

export default function SmartTable() {
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        getDataFromDB('marvel').then(data=>{
        setTableData(data)
       })
    }, [])
    const columns = [
        {
            name: "title",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "release_date",
            label: "Release Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "vote_average",
            label: "Rating",
            options: {
                filter: true,
                sort: true,
            }
        }
    ];
    const options = {
        filterType: 'checkbox',
        onRowsDelete: (e) => removeFromDB('marvel',e.data)
   };
    
    return <div >
        <MUIDataTable 
            title={"Marvel Movies"}
            data={tableData}
            columns={columns}
            options={options}
        />
    </div>

}