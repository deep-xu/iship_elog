import LibraryTreeWindow from './LibraryTreeWindow.jsx'

const ITEMS = ['Equipment for GCC Install']

export default function SubjectIndexWindow(props) {
  return <LibraryTreeWindow {...props} title="Subject Index" items={ITEMS} />
}
