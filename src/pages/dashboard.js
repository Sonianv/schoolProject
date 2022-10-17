import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from "../firebase";

const Dashboard = () => {
    const citire = collection(firestore, 'users');
    const q = query(citire, where("role", "==", "student"));

    const [value, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // const users = value.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data()
    // }));



    return (
        <div>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value && (
                <span>
                    Collection:{' '}
                    {value.docs.map((user) => (
                        <li key={user.id}>
                            {/* {JSON.stringify(doc.data())},{' '} */}
                            <div>
                                {user.id}
                            </div>
                        </li>
                    ))}

                </span>
            )}
        </div>
    );
};

export default Dashboard;
