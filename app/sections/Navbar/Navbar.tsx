import Wrapper from "../Wrapper";
import Logo from "./Logo";
import Search from "./Search";
import Menu from "./Menu";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log({ currentUser });

  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Wrapper>
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            <Search />
            <Logo />
            <Menu currentUser={currentUser} />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Navbar;
