import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Culinary", path: "/menu/culinary" },
  { name: "Nature Tourism", path: "/menu/nature tourism" },
  { name: "Cultural Festival", path: "/menu/cultural festival" },
];

export default function Navbar() {
  return (
    <nav className="w-[80%] mx-auto mt-5 px-[30px] py-[15px] bg-white/70 rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] text-center relative z-[5]">
      <ul className="list-none inline-flex gap-[30px] flex-wrap justify-center">
        {menuItems.map((item) => (
          <li key={item.path} className="relative">
           <NavLink
            to={item.path}
            end={item.path === "/"}
            onClick={(e) => {
            if (item.path === "/") {
              e.preventDefault(); 
              window.location.href = "/"; 
    }
  }}
  className="nav-link relative px-[10px] py-[5px] font-[500] text-[16px] transition-all duration-300 text-black hover:text-[#EC764E] font-[Alatsi,sans-serif]"
>
  {item.name}
</NavLink>

          </li>
        ))}
      </ul>
    </nav>
  );
}
