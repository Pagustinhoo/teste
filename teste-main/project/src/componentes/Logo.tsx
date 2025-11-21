import React from 'react';
import { Building2 } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="relative">
      {/* Logo Container */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg">
        {/* Building Icon */}
        <Building2 
          size={32} 
          className="text-white" 
        />
      </div>
    </div>
  );
};

export default Logo;
