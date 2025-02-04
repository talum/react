import {Meta} from '@storybook/react'
import React, {useRef, useState} from 'react'
import {theme, ThemeProvider} from '..'
import BaseStyles from '../BaseStyles'
import Box from '../Box'
import {ItemInput} from '../deprecated/ActionList/List'
import {DropdownButton} from '../deprecated/DropdownMenu'
import {SelectPanel} from '../SelectPanel'

const meta: Meta = {
  title: 'Composite components/SelectPanel',
  component: SelectPanel,
  decorators: [
    (Story: React.ComponentType<React.PropsWithChildren<unknown>>): JSX.Element => {
      return (
        <ThemeProvider theme={theme}>
          <BaseStyles>
            <Story />
          </BaseStyles>
        </ThemeProvider>
      )
    }
  ],
  parameters: {
    controls: {
      disable: true
    }
  }
}
export default meta

function getColorCircle(color: string) {
  return function () {
    return (
      <Box
        bg={color}
        borderColor={color}
        width={14}
        height={14}
        borderRadius={10}
        margin="auto"
        borderWidth="1px"
        borderStyle="solid"
      />
    )
  }
}

const items = [
  {leadingVisual: getColorCircle('#a2eeef'), text: 'enhancement', id: 1},
  {leadingVisual: getColorCircle('#d73a4a'), text: 'bug', id: 2},
  {leadingVisual: getColorCircle('#0cf478'), text: 'good first issue', id: 3},
  {leadingVisual: getColorCircle('#ffd78e'), text: 'design', id: 4},
  {leadingVisual: getColorCircle('#ff0000'), text: 'blocker', id: 5},
  {leadingVisual: getColorCircle('#a4f287'), text: 'backend', id: 6},
  {leadingVisual: getColorCircle('#8dc6fc'), text: 'frontend', id: 7}
]

export function MultiSelectStory(): JSX.Element {
  const [selected, setSelected] = React.useState<ItemInput[]>([items[2], items[4]])
  const [filter, setFilter] = React.useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))
  const [open, setOpen] = useState(false)

  return (
    <>
      <h1>Multi Select Panel</h1>
      <div>Please select labels that describe your issue:</div>
      <SelectPanel
        renderAnchor={({...anchorProps}) => <DropdownButton {...anchorProps}>Select Labels</DropdownButton>}
        title="Select Labels"
        inputLabel="Filter Labels"
        inputPlaceholder="design..."
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{width: 'medium', height: 'large'}}
      />
    </>
  )
}
MultiSelectStory.storyName = 'Multi Select'

export function SingleSelectStory(): JSX.Element {
  const [selected, setSelected] = React.useState<ItemInput | undefined>(items[2])
  const [filter, setFilter] = React.useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))
  const [open, setOpen] = useState(false)

  return (
    <>
      <h1>Single Select Panel</h1>
      <div>Please select a label that describe your issue:</div>
      <SelectPanel
        renderAnchor={({...anchorProps}) => <DropdownButton {...anchorProps}>Select Label</DropdownButton>}
        title="Select a Label"
        inputLabel="Filter Labels"
        inputPlaceholder="design..."
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{width: 'medium', height: 'large'}}
      />
    </>
  )
}
SingleSelectStory.storyName = 'Single Select'

export function ExternalAnchorStory(): JSX.Element {
  const [selected, setSelected] = React.useState<ItemInput | undefined>(items[1])
  const [filter, setFilter] = React.useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <h1>Select Panel With External Anchor</h1>
      <DropdownButton ref={buttonRef} onClick={() => setOpen(!open)}>
        Select a Label
      </DropdownButton>
      <SelectPanel
        renderAnchor={null}
        anchorRef={buttonRef}
        title="Select a Label"
        inputLabel="Filter Labels"
        inputPlaceholder="design..."
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{width: 'medium', height: 'large'}}
      />
    </>
  )
}
ExternalAnchorStory.storyName = 'With External Anchor'

export function SelectPanelWithOverflowingItemsStory(): JSX.Element {
  const [selected, setSelected] = React.useState<ItemInput | undefined>(items[3])
  const [filter, setFilter] = React.useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))
  const [open, setOpen] = useState(false)

  return (
    <>
      <h1>Single Select Panel</h1>
      <div>Please select a label that describe your issue:</div>
      <SelectPanel
        renderAnchor={({...anchorProps}) => <DropdownButton {...anchorProps}>Select Label</DropdownButton>}
        title="Select a Label"
        inputLabel="Filter Labels"
        inputPlaceholder="design..."
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{width: 'medium', height: 'medium'}}
      />
    </>
  )
}
SelectPanelWithOverflowingItemsStory.storyName = 'SelectPanel, Overflowing Items'

export function SelectPanelWithUnderflowingItemsStory(): JSX.Element {
  const underflowingItems = [items[0], items[1]]
  const [selected, setSelected] = React.useState<ItemInput | undefined>(underflowingItems[1])
  const [filter, setFilter] = React.useState('')
  const filteredItems = underflowingItems.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))
  const [open, setOpen] = useState(false)

  return (
    <>
      <h1>Single Select Panel</h1>
      <div>Please select a label that describe your issue:</div>
      <SelectPanel
        renderAnchor={({...anchorProps}) => <DropdownButton {...anchorProps}>Select Label</DropdownButton>}
        title="Select a Label"
        inputLabel="Filter Labels"
        inputPlaceholder="design..."
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{width: 'medium', height: 'medium'}}
      />
    </>
  )
}
SelectPanelWithUnderflowingItemsStory.storyName = 'SelectPanel, Underflowing Items'

export function SelectPanelWithUnderflowingItemsAfterFetch(): JSX.Element {
  const [selected, setSelected] = React.useState<ItemInput | undefined>(undefined)
  const [filter, setFilter] = React.useState('')
  const [fetchedItems, setFetchedItems] = useState<typeof items>([])
  const filteredItems = React.useMemo(
    () => fetchedItems.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase())),
    [fetchedItems, filter]
  )
  const [open, setOpen] = useState(false)

  const onOpenChange = () => {
    setOpen(!open)
    setTimeout(() => {
      setFetchedItems([items[0], items[1]])
      setSelected(items[1]) // Sometimes the selected items need to be fetched async too.
    }, 1500)
  }

  return (
    <>
      <h1>Single Select Panel</h1>
      <div>Please select a label that describe your issue:</div>
      <SelectPanel
        renderAnchor={({...anchorProps}) => <DropdownButton {...anchorProps}>Select Label</DropdownButton>}
        title="Select a Label"
        inputLabel="Filter Labels"
        inputPlaceholder="design..."
        open={open}
        onOpenChange={onOpenChange}
        loading={filteredItems.length === 0}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{width: 'medium', height: 'medium'}}
      />
    </>
  )
}
SelectPanelWithUnderflowingItemsAfterFetch.storyName = 'SelectPanel, Underflowing Items (After Fetch)'

export function SelectPanelAboveTallBody(): JSX.Element {
  const [selected, setSelected] = React.useState<ItemInput | undefined>(items[1])
  const [filter, setFilter] = React.useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))
  const [open, setOpen] = useState(false)

  return (
    <>
      <h1>Single Select Panel</h1>
      <div>Please select a label that describe your issue:</div>
      <SelectPanel
        renderAnchor={({...anchorProps}) => <DropdownButton {...anchorProps}>Select Label</DropdownButton>}
        title="Select a Label"
        inputLabel="Filter Labels"
        inputPlaceholder="design..."
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{width: 'medium', height: 'medium'}}
      />
      <div
        style={{
          backgroundColor: 'cornflowerblue',
          height: '100vh'
        }}
      >
        This element makes the body really tall. This is to test that we do not have layout/focus issues if the Portal
        is far down the page
      </div>
    </>
  )
}
SelectPanelAboveTallBody.storyName = 'SelectPanel, Above a Tall Body'
