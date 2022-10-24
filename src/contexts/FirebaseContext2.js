import React from 'react'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from "../firebase";


export function FirebaseContext2(collectionName, field, expectedValue, field2, expectedValue2, data, extractedField) {
    const getData = collection(firestore, collectionName);
    const q = query(getData, where(field, "==", expectedValue), where(field2, "==", expectedValue2));

    const [value, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );


    const addData = (string) => {
        data.push(string)
    };

    return (
        <>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value && (
                <span>
                    {value.docs.map((doc) => (
                        addData(doc.get(extractedField))
                    ))}
                </span>
            )
            }</>
    )
}
