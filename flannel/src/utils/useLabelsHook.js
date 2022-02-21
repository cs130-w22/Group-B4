import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

// hook to handle getting labels from database
export function useLabels() {
    const [classes, setClasses] = useState([]);
    const [interests, setInterests] = useState([]);
    const [affiliations, setAffiliations] = useState([]);
    const navigate = useNavigate();

    useEffect(async () => {
        const requestObj = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let labels;
        try {
            const response = (await fetch(`http://localhost:3000/label/getLabels`, requestObj));
            labels = await response.json();
        } catch {
            navigate('/');
            return;
        }

        // filter type of labels
        let classesArr = [];
        let interestsArr = [];
        let affiliationsArr = [];
        labels.forEach((interest) => {    
            if (interest.type === 'classes') {
                classesArr.push(interest.name);
            } else if (interest.type === 'interests') {
                interestsArr.push(interest.name);
            } else if (interest.type === 'affiliations') {
                affiliationsArr.push(interest.name);
            }
        }, []);

        setClasses(classesArr);
        setInterests(interestsArr);
        setAffiliations(affiliationsArr);
    },[]);
    return { classes, interests, affiliations };
}

