import coreLogo from '../assets/logo.png';
import jhuLogo from '../assets/jhu_logo.png';

const Header = () => {
  return (
    <header className="bg-brandBlue text-white py-10 shadow-md relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex row with logos and title */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          
          {/* Left logo (CORE) */}
          <img
            src={coreLogo}
            alt="CORE Logo"
            className="max-h-22 max-w-[180px] w-auto object-contain"
          />

          {/* Title centered */}
          <div className="text-center flex-1 sm:px-6">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              CORE for Solving Global Poverty
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl mt-1">
              Synthesizing Social Science Research into Actionable Policy Insights
            </p>
          </div>

          {/* Right logo (JHU) */}
          <img
            src={jhuLogo}
            alt="JHU Logo"
            className="max-h-22 max-w-[180px] w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
