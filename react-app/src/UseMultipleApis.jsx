import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UseMultipleApis = () => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    axios.get('https://api.example1.com/resource1'),
                    axios.get('https://api.example2.com/resource2')
                ]);
                setData1(response1.data);
                setData2(response2.data);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Data from Multiple APIs</h1>
            <table>
                <thead>
                    <tr>
                        <th>Resource 1</th>
                        <th>Resource 2</th>
                    </tr>
                </thead>
                <tbody>
                    {data1.map((item1, index) => (
                        <tr key={index}>
                            <td>{item1.name}</td>
                            <td>{data2[index]?.name || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UseMultipleApis;