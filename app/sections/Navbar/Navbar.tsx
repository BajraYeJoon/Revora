import Wrapper from "../Wrapper";
import Logo from "./Logo";
import Search from "./Search";
import Menu from "./Menu";
import { SafeUser } from "@/app/types";
import CategoryBar from "../CategoryBar/CategoryBar";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Wrapper>
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0">
            <Logo />
            <Search />
            <Menu currentUser={currentUser} />
          </div>
        </Wrapper>
      </div>

      <CategoryBar />
    </div>
  );
};

export default Navbar;
