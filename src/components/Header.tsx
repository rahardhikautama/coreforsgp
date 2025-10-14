import coreLogo from '../assets/logo.png';
import jhuLogo from '../assets/jhu_logo.png';

const Header = () => {
  return (
    <header className="bg-brandBlue text-white py-6 shadow-md relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MOBILE layout */}
        <div className="flex flex-col items-center sm:hidden">
          {/* Logos side by side */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src={coreLogo}
              alt="CORE Logo"
              className="max-h-16.5 max-w-[180px] w-auto object-contain"
            />
            {/* Temporarily hide JHU logo */}
            {/*
            <img
              src={jhuLogo}
              alt="JHU Logo"
              className="max-h-16.5 max-w-[180px] w-auto object-contain"
            />
            */}
          </div>
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold leading-tight">
              CORE for Solving Global Poverty
            </h1>
            <p className="text-sm mt-1">
              Synthesizing Social Science Research into Actionable Policy Insights
            </p>
          </div>
        </div>

        {/* DESKTOP layout */}
        <div className="hidden sm:flex flex-row items-center justify-between">
          {/* Left logo */}
          <img
            src={coreLogo}
            alt="CORE Logo"
            className="max-h-21 max-w-[180px] w-auto object-contain"
          />

          {/* Title */}
          <div className="text-center flex-1 px-6">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              CORE for Solving Global Poverty
            </h1>
            <p className="text-lg lg:text-xl mt-1">
              Synthesizing Social Science Research into Actionable Policy Insights
            </p>
          </div>

          {/* Temporarily hide JHU logo */}
          {/*
          <img
            src={jhuLogo}
            alt="JHU Logo"
            className="max-h-21 max-w-[180px] w-auto object-contain"
          />
          */}
        </div>

      </div>
    </header>
  );
};

export default Header;
