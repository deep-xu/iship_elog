import { useState } from 'react'
import QueryWindow from './QueryWindow.jsx'
import { SPACE_COLUMNS, SPACE_SECTIONS } from '../data/spaceList.js'
import { STRUCTURE_COLUMNS, STRUCTURE_SECTIONS } from '../data/structureList.js'

const MENUS = [
  { label: 'Spaces & Structures', accel: 0 },
  { label: 'Help', accel: 0 },
]

const HEADER_TABS = [
  { key: 'spaces', label: 'Spaces' },
  { key: 'structures', label: 'Structures' },
]

export default function SpacesStructuresWindow(props) {
  const [mode, setMode] = useState('spaces')

  const isSpaces = mode === 'spaces'

  return (
    <QueryWindow
      {...props}
      title="Spaces & Structures"
      menus={MENUS}
      toolbar={['open', 'refresh', 'archive', 'find']}
      sections={isSpaces ? SPACE_SECTIONS : STRUCTURE_SECTIONS}
      columns={isSpaces ? SPACE_COLUMNS : STRUCTURE_COLUMNS}
      panelWidth="42%"
      headerTabs={HEADER_TABS}
      activeHeaderTab={mode}
      onHeaderTabChange={setMode}
    />
  )
}
