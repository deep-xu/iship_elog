import LibraryTreeWindow from '@/features/setup/components/LibraryTreeWindow.jsx'

const ITEMS = ['STANDARD PO TEXT', 'STANDARD RFQ TEXT']

export default function LegalAdministrativeWindow(props) {
  return <LibraryTreeWindow {...props} title="Legal Administrative" items={ITEMS} />
}
