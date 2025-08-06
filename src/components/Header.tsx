import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-brandBlue text-white py-6 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Logo on top for mobile, left for desktop */}
          <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
            <img
              src={logo}
              alt="CORE Logo"
              className="h-16 w-auto"
            />
          </div>

          {/* Title centered always */}
          <div className="text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
            <h1 className="text-3xl font-bold leading-tight">
              CORE for Solving Global Poverty
            </h1>
            <p className="text-base mt-1">
              Synthesizing Social Science Research into Actionable Policy Insights
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
