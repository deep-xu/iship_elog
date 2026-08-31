import LibraryTreeWindow from './LibraryTreeWindow.jsx'

const ITEMS = [
  'Audits',
  'Campaigns',
  'Drills & Training',
  'Inspection - General',
  'Inspection - HSQE',
  'Meetings',
]

export default function InspectionDescriptionWindow(props) {
  return (
    <LibraryTreeWindow {...props} title="Inspection Description (Text)" items={ITEMS} showIcons={false} />
  )
}
