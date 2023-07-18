interface NavbarItem {
	title: string
	classprops?: string
}

const NavbarItem = ({ title, classprops }: NavbarItem) => (
	<li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
)

export default NavbarItem
