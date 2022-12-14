import { NavBar, Search, Chats } from "./"

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavBar />
      <Search />
      <Chats />
    </div>
  )
}
