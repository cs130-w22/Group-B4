import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ChipFilter from '../src/components/ChipFilter'
import UserCard from '../src/components/Explore/UserCard'
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

describe('Testing React Functional Components', () => {
    // Smoke test to mount App and ensure it doesn't throw during rendering
    it('App renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<App />, div)
    })
    
    it('Chip Filter Component Render Check', () => {
        function dummyHook(){
            //not checking hook useState, simply checking for render errors
        }
        const div = document.createElement('div');
        ReactDOM.render(
            <ChipFilter
            setTagOptions={dummyHook}
            type="Affiliations"
            tagOptions={['a','b','c','d','e','f','g','h']}
            defaultShownTags={['a','b','c','d']}
            setSelectedTags={dummyHook}
            selectedTags={['a','b']}
        /> 
        ,
        div)
    })
    it ('User Card Component Render Check', () => {
        const info = {
            index: 1,
            username:"testing",
            year: "testing",
            major:"testing",
            pronouns:"testing",
            classTags: [],
            interestTags:[],
            affiliationTags:[],
            bio:"testing"
        }
        const div = document.createElement('div');
        ReactDOM.render(
            <UserCard key={info.index}
            displayName={info.username}
            year={info.year}
            major={info.major}
            pronouns={info.pronouns}
            classTags={info.classTags}
            interestTags={info.interestTags}
            affiliationTags={info.affiliationTags}
            bio={info.bio}
            />,
            div
        )
    })

    it('App Snapshot Check',() => {
        const tree = renderer.create(<App></App>).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Chip Filter Check',() => {
        function dummyHook(){
            //not checking hook useState, simply checking for render errors
        }
        const tree = renderer.create(            
        <ChipFilter
            setTagOptions={dummyHook}
            type="Affiliations"
            tagOptions={['a','b','c','d','e','f','g','h']}
            defaultShownTags={['a','b','c','d']}
            setSelectedTags={dummyHook}
            selectedTags={['a','b']}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it ('User Card Check', () => {
        const info = {
            index: 1,
            username:"testing",
            year: "testing",
            major:"testing",
            pronouns:"testing",
            classTags: [],
            interestTags:[],
            affiliationTags:[],
            bio:"testing"
        }
        const tree = renderer.create(
            <UserCard key={info.index}
            displayName={info.username}
            year={info.year}
            major={info.major}
            pronouns={info.pronouns}
            classTags={info.classTags}
            interestTags={info.interestTags}
            affiliationTags={info.affiliationTags}
            bio={info.bio}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it ('User Card Field Population Check',() => {
        const info = {
            index: 1,
            username:"Brandon",
            year: "Senior",
            major:"CS",
            pronouns:"He/Him",
            classTags: [],
            interestTags:[],
            affiliationTags:[],
            bio:"Bio"
        }
        const { getByTestId } = render(<UserCard 
            key={info.index}
            displayName={info.username}
            year={info.year}
            major={info.major}
            pronouns={info.pronouns}
            classTags={info.classTags}
            interestTags={info.interestTags}
            affiliationTags={info.affiliationTags}
            bio={info.bio}
        />)
        expect(getByTestId("username_test")).toHaveTextContent("Brandon");
        expect(getByTestId("year_test")).toHaveTextContent("Senior");
        expect(getByTestId("major_test")).toHaveTextContent("CS");
        expect(getByTestId("pronoun_test")).toHaveTextContent("He/Him");
        expect(getByTestId("bio_test")).toHaveTextContent("Bio");
        //fields have been set in the constant info from above
    })
})