import React from 'react'
import ReactDOM from 'react-dom'
import UserCard from '../components/Explore/UserCard'
import { render, screen } from '@testing-library/react'

// Smoke test to mount User card and ensure it doesn't throw during rendering
it('User card renders without crashing', () => {
    const div = document.createElement('div')
    render(
        <UserCard
            displayName="Rye"
            pronouns="He/him"
            year="4th"
            major="Computer Science"
            classTags={['CS130', 'CS131']}
            interestTags={['Bowling', 'Skating']}
            affiliationTags={['LA Blueprint', 'UPE']}
            bio="This is my bio"
        />,
        div
    )
    expect(screen.getByText('Rye')).toBeInTheDocument()
    expect(screen.getByText('He/him')).toBeInTheDocument()
    expect(screen.getByText('Computer Science')).toBeInTheDocument()
    expect(screen.getByText('CS130')).toBeInTheDocument()
    expect(screen.getByText('Bowling')).toBeInTheDocument()
    expect(screen.getByText('Rye')).toBeInTheDocument()
})
