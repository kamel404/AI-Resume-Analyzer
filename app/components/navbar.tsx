import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/">
          <p className="text-2xl font-bold text-gradient">Resumind</p>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/upload" className="primary-button w-fit">
            Upload Resume
          </Link>
          <Link 
            to="/wipe" 
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg w-fit"
          >
            Wipe Data
          </Link>
        </div>
    </nav>
  );
}

export default Navbar;