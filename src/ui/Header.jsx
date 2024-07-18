import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <div className=" flex bg-cyan-600 justify-between items-center px-4 py-4 mb-8">
        <Link to="/">
          <h2>
            <span className="font-extrabold uppercase text-cyan-50 text-lg">
              mylogo
            </span>
          </h2>
        </Link>
        <nav>
          <ul className="flex gap-2 text-cyan-50">
            <li>
              <Link to="/table">Table List</Link>
            </li>
            <li>
              <Link to="/sign-up">
                <span className="font-bold text-gray hover:text-cyan-400">
                  SignUp
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
