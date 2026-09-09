import LibraryTreeWindow from '@/features/setup/components/LibraryTreeWindow.jsx'

const ITEMS = ['Equipment for GCC Install']

export default function SubjectIndexWindow(props) {
  return <LibraryTreeWindow {...props} title="Subject Index" items={ITEMS} />
}
