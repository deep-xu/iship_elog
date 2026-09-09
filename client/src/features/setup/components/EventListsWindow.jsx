import QueryWindow from '@/components/ui/QueryWindow.jsx'
import { EVENT_LISTS_COLUMNS, EVENT_LISTS_SECTIONS } from '@/data/eventLists.js'

const MENUS = [
  { label: 'Event', accel: 0 },
  { label: 'Help', accel: 0 },
]

export default function EventListsWindow(props) {
  return (
    <QueryWindow
      {...props}
      title="Event Lists"
      menus={MENUS}
      toolbar={['new', 'find']}
      sections={EVENT_LISTS_SECTIONS}
      columns={EVENT_LISTS_COLUMNS}
      panelWidth="42%"
    />
  )
}
