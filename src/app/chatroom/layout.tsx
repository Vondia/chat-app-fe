import ChatroomList from './ChatroomList';
export default function Layout({ children }: { children: React.ReactNode }) {
    return <>
    <ChatroomList />
    {children}
    </>;
}