import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ChipFilter from '../components/ChipFilter'
import '@testing-library/jest-dom'

const mockData = {
    key: 'a',
    defaultShownTags: ['a', 'b'],
    tagOptions: ['c', 'd'],
    type: 'Classes',
    selectedTags: ['e'],
}

it('Chip Filter renders without crashing', () => {
    const div = document.createElement('div')
    render(
        <ChipFilter
            key={mockData.key}
            defaultShownTags={mockData.defaultShownTags}
            setTagOptions={() => {}}
            tagOptions={mockData.tagOptions}
            type={mockData.type}
            setSelectedTags={() => {}}
            selectedTags={mockData.selectedTags}
        />,
        div
    )
})

it('User is able to remove a tag option when they press the Close Icon', () => {
    let afterDelete
    const div = document.createElement('div')
    render(
        <ChipFilter
            key={mockData.key}
            defaultShownTags={mockData.defaultShownTags}
            setTagOptions={() => {}}
            tagOptions={mockData.tagOptions}
            type={mockData.type}
            setSelectedTags={(selectedTags) => {
                afterDelete = selectedTags
            }}
            selectedTags={mockData.selectedTags}
        />,
        div
    )
    expect(screen.getByText('e')).toBeInTheDocument()
    const deleteIcon = screen.getByTestId('CloseIcon')
    fireEvent.click(deleteIcon)
    expect(afterDelete).toEqual([])
})

it('When a user presses on the Arrow Drop Down Icon, tagOptions are rendered', () => {
    const div = document.createElement('div')
    render(
        <ChipFilter
            key={mockData.key}
            defaultShownTags={mockData.defaultShownTags}
            setTagOptions={() => {}}
            tagOptions={mockData.tagOptions}
            type={mockData.type}
            setSelectedTags={() => {}}
            selectedTags={mockData.selectedTags}
        />,
        div
    )
    const dropDownIcon = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(dropDownIcon)
    expect(screen.getByText('c')).toBeInTheDocument()
    expect(screen.getByText('d')).toBeInTheDocument()
})

it('When a user presses on the Arrow Drop Down Icon and selects a tagOptions users can add the options from the AutoComplete component', () => {
    let selectedTags
    const div = document.createElement('div')
    render(
        <ChipFilter
            key={mockData.key}
            defaultShownTags={mockData.defaultShownTags}
            setTagOptions={() => {}}
            tagOptions={mockData.tagOptions}
            type={mockData.type}
            setSelectedTags={(allSelectedTags) => {
                selectedTags = allSelectedTags
            }}
            selectedTags={mockData.selectedTags}
        />,
        div
    )
    const dropDownIcon = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(dropDownIcon)
    const firstTagOptionClick = screen.getByText('c')
    fireEvent.click(firstTagOptionClick)
    expect(selectedTags).toEqual(['e', 'c'])
})
